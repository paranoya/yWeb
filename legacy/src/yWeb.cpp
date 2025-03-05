#include"yWeb.h"

//----------------------------------------------------------------------
string get_name( string user )
//----------------------------------------------------------------------
{
  if( user == "web_admin" ) return("");
  if( user == "observatorio" ) return("");
  if( user == "yago" ) return("Yago Ascasibar");
  if( user == "template" ) return("Your Name");

  return("Not found");
}

//----------------------------------------------------------------------
int main( int argc, char** argv )
//----------------------------------------------------------------------
{
  if( argc != 2 )
  {
    cerr << " USAGE: yWeb <username> \n";
    return(-1);
  }
  string username  = argv[1];
  string full_name = get_name( username );
  if( full_name == "Not found" )
  {
    cerr << " ERROR: username '"<< username <<"' not found in the database \n";
    return(-1);
  }
  
  //-------------------------------------------------------
  Menu main;
  //-------------------------------------------------------
  
  main.add( "index.html", "Welcome", "", username=="web_admin" );

  Menu* people = main.add( "people.html", "People", "", username=="web_admin" );
  if( full_name!="" )
  {
    Menu* me = people->add( username+"/index.html", full_name, full_name, false );
    me->add_submenu_file( dir_admin+"CONTENTS/"+username+"/sitemap/", "personal_pages.txt", full_name );
  }

  main.add( "research.html", "Research", "", username=="web_admin" );
  main.add( "teaching.html", "Teaching", "", username=="web_admin" );
//  main.add( "https://www.ft.uam.es/masterastrofisica", "Graduate studies", "", false );
  main.add( "outreach.html", "Outreach", "", username=="web_admin" );

  Menu *observatory = main.add( "observatorio/index.html", "Observatory", "UAM Astronomical Observatory", false );
  observatory->add( "observatorio/index.html", "Presentation", "UAM Astronomical Observatory", username=="observatorio" );
  observatory->add( "observatorio/history.html", "History", "UAM Astronomical Observatory", username=="observatorio" );
  observatory->add( "https://observatoriouam.weebly.com/noches-abiertas.html", "Open Nights", "", false );

  main.add( "history.html", "History", "", username=="web_admin" );
//  main.add( "links.html", "Useful links", "", username=="web_admin" );
  
  //-------------------------------------------------------
  
  ostringstream header;
  header << "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\">\n";
  header << "<HTML>\n\n";
  header << "<HEAD>\n";
//  header << "<base href='file://"<< ADMIN_DIR << "public_html/'>\n";
  header << "<base href='https://astro.ft.uam.es/'>\n";
  
  header << "  <link rel='stylesheet' type='text/css' href='common_files/ft_simple.css' media='all'>\n";
  header << "  <link rel='stylesheet' type='text/css' href='common_files/print.css' media='print'>\n";
  header << "  <link type='image/x-icon' href='common_files/logo_Astro.ico' rel='shortcut icon'>\n";
  header << "  <TITLE>Astro @ UAM - ";
  
  ostringstream menu_head;
  menu_head << "</TITLE>\n";
  menu_head << "  <meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>\n";
  menu_head << "  <meta name='Keywords' content='Grupo de Astrofisica'>\n";
  menu_head << "  <meta name='Description' content='Grupo de Astrofisica'>\n";
  menu_head << "  <meta name='Author' content='Yago Ascasibar'>\n";
  menu_head << "  <meta name='Robots' content='all'>\n";
  menu_head << "</HEAD>\n\n";

  menu_head << "<BODY>\n";

  ifstream top_menu( (dir_admin+"common_files/menu_ft.htm").c_str() );
  if( !top_menu.good() )
  {
    cerr << " Cannot open input FT menu! \n\n";
    throw(-1);
  }
  string line;
  while( getline(top_menu, line) ) menu_head << line << "\n";

  menu_head << "<DIV id='cuerpo'>\n";
  menu_head << "<DIV id='contenido' class='clear'>\n\n";
  menu_head << "<DIV class='col1'>\n";
  menu_head << "<UL class='menudept' id='menu_vertical'>\n";
  menu_head << "<LI class='dept'> <a href='https://astro.ft.uam.es'>Astrophysics and Cosmology</a>\n";

  ostringstream menu_tail;
  menu_tail << "</LI></UL></DIV>\n\n";
  
  menu_tail << "<DIV class='col3'>\n";
  menu_tail << "<DIV class='contenido_ppal'>\n\n";
  
  menu_tail << "<div class='titulares_contenido_ppal'>\n";

  ostringstream footer;
  footer << "</DIV></DIV>\n\n";
  
  footer << "</DIV></DIV>\n\n";
  
  footer << "<div id='pie'><div class='clear'>\n";
  footer << "<p> Grupo de Astrofísica - Universidad Autónoma de Madrid &copy; 2011 \n";
//   footer << "<br> Page maintained with <a href='yago/yWeb.html'>yWeb</a> -";
  footer << "<br> Page maintained with yWeb - Last updated on ";
  time_t now; time( &now );
  footer << ""<< ctime( &now );
  footer << "- ... Paranoy@ Rulz! </p>\n";
//   footer << "- <a href='yago/politeware.html'>... Paranoy@ Rulz!</a> </p>\n";
  footer << "</div></div>\n\n";
  
//   footer << "</DIV></DIV>\n";
  footer << "</BODY>\n";
  footer << "</HTML>\n";
  
  //-------------------------------------------------------
  
  main.compile( header.str(), menu_head.str(), menu_tail.str(), footer.str() );
  
  return(0);
}
