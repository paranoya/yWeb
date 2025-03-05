#ifndef YWEB_H
#define YWEB_H 1

#include<vector>
#include<iostream>
#include<fstream>
#include<sstream>
using namespace std;

//---------------------------------------------------------------------
class Menu
//---------------------------------------------------------------------
{
  public:
    
    Menu( const char* URL="", const char* Title="", bool Must_compile=false )
    : url(URL), title(Title), must_compile(Must_compile)
    { };
    
    ~Menu()
    {
      for(unsigned int i=0; i<entry.size(); i++) delete entry[i];
    }
    
    Menu* add( const char* URL, const char* Title="", bool Must_compile=true )
    {
      if( Title[0] == 0 ) Title = URL;
      Menu* new_entry = new Menu( URL, Title, Must_compile );
      entry.push_back( new_entry );
      return( new_entry );
    }
    
    void compile( const string &header, const string &menu_head, const string &menu_tail, const string &footer )
    {
      int n = entry.size();
      
      if( must_compile )
      {
	cout << "> Compiling '" << title << "'";
	cout.flush();
	ofstream page( (string(HOME_DIR)+"public_html/"+url+".html").c_str() );
	if( !page.good() )
	{
	  cerr << " Cannot open output file! \n\n";
	  throw(-1);
	}
	page << header;
	page << title;
	page << menu_head;
	page << "  <li class='sel'><a href='" << url << ".html'>" << title << "</a></li>\n";
	if( n > 0 ) // Sub-menu
	{
	  page << "<ul>\n";
	  for(int i=0; i<n; i++)
	  {
	    page << "  <li><a href='" << entry[i]->url << ".html'>" << entry[i]->title << "</a></li>\n";
	  }
	  page << "</ul>\n";
	}
	page << menu_tail;
	page << "<h2>" << title << "</h2>";
	page << "</div>\n\n";
	
	ifstream body_file( (string(HOME_DIR)+"CONTENTS/"+url+".html").c_str() );
	if( !body_file.good() )
	{
	  cerr << " Cannot open input file! \n\n";
	  throw(-1);
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
	if( url[0] !=0 ) new_menu_head << "  <li class='sel'><a href='" << url << ".html'>" << title << "</a></li>\n";
	new_menu_head << "<ul>\n";
	for(int j=0; j<i; j++)
	{
	  new_menu_head << "  <li><a href='" << entry[j]->url << ".html'>" << entry[j]->title << "</a></li>\n";
	}
	for(int j=i+1; j<n; j++)
	{
	  new_menu_tail << "  <li><a href='" << entry[j]->url << ".html'>" << entry[j]->title << "</a></li>\n";
	}
	new_menu_tail << "</ul>\n";
	new_menu_tail << menu_tail;
	
	entry[i]->compile( header, new_menu_head.str(), new_menu_tail.str(), footer );
      }
    }
    
    //  private:
    const char* url;
    const char* title;
    bool must_compile;
    vector<Menu*> entry;
};

#endif
//------------------------------------------------------
//                              ... Paranoy@ Rulz! ;^D
//------------------------------------------------------
