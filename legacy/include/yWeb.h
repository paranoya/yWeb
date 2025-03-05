#ifndef YWEB_H
#define YWEB_H 1

#include<vector>
#include<iostream>
#include<fstream>
#include<sstream>
using namespace std;

const string dir_admin(ADMIN_DIR);

//---------------------------------------------------------------------
class Menu
//---------------------------------------------------------------------
{
  public:
    
    Menu( const string URL="", const string Title="", const string Full_name="", bool Must_compile=false )
    : url(URL), title(Title), full_name(Full_name), must_compile(Must_compile)
    { };
    
    ~Menu()
    {
      for(unsigned int i=0; i<entry.size(); i++) delete entry[i];
    }
    
    Menu* add( const string URL, string Title="", const string Full_name="", bool Must_compile=true )
    {
      if( Title == "" ) Title = URL;
      Menu* new_entry = new Menu( URL, Title, Full_name, Must_compile );
      entry.push_back( new_entry );
      return( new_entry );
    }
    
    void add_submenu_file( const string directory, const string filename, const string Full_name )
    {
      cout << "> " << directory+filename << endl;
      ifstream file( (directory+filename).c_str() );
      if( file.good() == false )
      {
	cout << " Cannot open input file '"<< directory+filename <<"'! \n";
	return;
      }
      
      do
      {
	while( file.peek()=='#' ) file.ignore(999999,'\n'); //ignore comments
	
	string url_entry, title_entry, next_submenu_file;
	bool compile_entry;
	file >> url_entry;
	file >> compile_entry;
	file >> next_submenu_file;
	file.get(); // ignore space
	getline( file, title_entry );
	if( title_entry != "" )
	{
// 	  cout << title_entry << endl;
	  Menu *submenu = add( url_entry, title_entry, Full_name, compile_entry );
	  if( next_submenu_file != "-" ) submenu->add_submenu_file( directory, next_submenu_file, Full_name );
	}
      }
      while( !file.eof() );
    }
    
    void compile( const string &header, const string &menu_head, const string &menu_tail, const string &footer )
    {
      int n = entry.size();
      
      if( must_compile )
      {
	cout << "> Compiling '" << title << "'";
	cout.flush();
	ofstream page( ( dir_admin+"public_html/"+url ).c_str() );
	if( !page.good() )
	{
	  cout << " Cannot open output file '"<< dir_admin+"public_html/"+url <<"'! \n";
	  return;
	}
	page << header;
	if( full_name !="" ) page << full_name <<" - ";
	page << title;
	page << menu_head;
	page << "  <li class='sel'><a href='" << url << "'>" << title << "</a></li>\n";
	if( n > 0 ) // Sub-menu
	{
	  page << "<ul>\n";
	  for(int i=0; i<n; i++)
	  {
	    page << "  <li><a href='" << entry[i]->url << "'>" << entry[i]->title << "</a></li>\n";
	  }
	  page << "</ul>\n";
	}
	page << menu_tail;
	page << "<h2>";
	if( full_name[0] != 0 ) page << full_name << " - ";
	page << title << "</h2>";
	page << "\n</div>\n\n";
	
	ifstream body_file( (dir_admin+"CONTENTS/"+url).c_str() );
	if( !body_file.good() )
	{
	  cout << " Cannot open input file '"<< dir_admin+"CONTENTS/"+url <<"'! \n";
	  return;
	}
	string line;
	while( getline(body_file, line) ) page << line << "\n";
	
	page << footer;
	cout << "\t OK\n";
      }
      
      for(int i=0; i<n; i++)
      {
	ostringstream new_menu_head, new_menu_tail;
	
	new_menu_head << menu_head;
	if( url[0] !=0 ) new_menu_head << "  <li class='sel'><a href='" << url << "'>" << title << "</a></li>\n";
	new_menu_head << "<ul>\n";
	for(int j=0; j<i; j++)
	{
	  new_menu_head << "  <li><a href='" << entry[j]->url << "'>" << entry[j]->title << "</a></li>\n";
	}
	for(int j=i+1; j<n; j++)
	{
	  new_menu_tail << "  <li><a href='" << entry[j]->url << "'>" << entry[j]->title << "</a></li>\n";
	}
	new_menu_tail << "</ul>\n";
	new_menu_tail << menu_tail;
	
	entry[i]->compile( header, new_menu_head.str(), new_menu_tail.str(), footer );
      }
    }
    
    //  private:
    string url;
    string title;
    string full_name;
    bool must_compile;
    vector<Menu*> entry;
};

#endif
//------------------------------------------------------
//                              ... Paranoy@ Rulz! ;^D
//------------------------------------------------------
