#include"yWeb.h"

//----------------------------------------------------------------------
string get_name( string user )
//----------------------------------------------------------------------
{
  if( user == "web_admin" ) return("");
  if( user == "yago" ) return("Yago Ascasibar");

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
  bool web_admin = ( username=="web_admin" );
  
  //-------------------------------------------------------
  
  Menu main;
  
  main.add( "index.html", "Welcome", web_admin );
  Menu* people = main.add( "people.html", "People", web_admin );
  if( !web_admin )
  {
    Menu* me = people->add( username+"/index.html", full_name, false );
    me->add_submenu_file( dir_admin+"CONTENTS/"+username+"/sitemap/", "personal_pages.txt" );
  }
  Menu* research = main.add( "research.html", "Research", web_admin );
  {
    research->add( "research.html", "Star formation and exoplanets", false );
    research->add( "research.html", "Extragalactic Astrophysics", false );
    research->add( "research.html", "Computational Astrophysics", false );
    research->add( "research.html", "Astroparticle Physics and Cosmology", false );
  }
  Menu *teaching = main.add( "teaching.html", "Teaching", web_admin );
  {
    teaching->add_submenu_file( dir_admin+"CONTENTS/"+username+"/sitemap/", "teaching.txt" );
  }
  Menu* outreach = main.add( "outreach.html", "Outreach", web_admin );
  {
    outreach->add( "TJM.html", "Observatory", web_admin );
  }
  main.add( "history.html", "History", web_admin );
  main.add( "links.html", "Useful links", web_admin );
  
  //-------------------------------------------------------
  
  ostringstream header;
  header << "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\">\n";
  header << "<HTML>\n\n";
  header << "<HEAD>\n";
  header << "<base href='file:///home/yago/work/misc/web_astro/public_html/'>\n";
//   header << "  <link rel='stylesheet' type='text/css' href='http://www.uam.es/StaticFiles/DptoFisica/css/styles.css' media='all'>\n";
//   header << "  <link rel='stylesheet' type='text/css' href='http://www.uam.es/StaticFiles/DptoFisica/css/print.css' media='print'>\n";
//   header << "  <link rel='stylesheet' type='text/css' href='common_files/styles.css' media='all'>\n";
  header << "  <link rel='stylesheet' type='text/css' href='common_files/ft_simple.css' media='all'>\n";
  header << "  <link rel='stylesheet' type='text/css' href='common_files/print.css' media='print'>\n";
  header << "  <link type='image/x-icon' href='common_files/logo_Astro.ico' rel='shortcut icon'>\n";
  header << "  <TITLE>Astro @ UAM - ";
  if( full_name !="" ) header << full_name <<" - ";
  
  ostringstream menu_head;
  menu_head << "</TITLE>\n";
  menu_head << "  <meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>\n";
  menu_head << "  <meta name='Keywords' content='Grupo de Astrofisica'>\n";
  menu_head << "  <meta name='Description' content='Grupo de Astrofisica'>\n";
  menu_head << "  <meta name='Author' content='Yago Ascasibar'>\n";
  menu_head << "  <meta name='Robots' content='all'>\n";
  menu_head << "</HEAD>\n\n";

  ifstream top_menu( (dir_admin+"common_files/menu_ft.htm").c_str() );
  if( !top_menu.good() )
  {
    cerr << " Cannot open input FT menu! \n\n";
    throw(-1);
  }
  string line;
  while( getline(top_menu, line) ) menu_head << line << "\n";

  menu_head << "<BODY>\n";
  menu_head << "<DIV id='cuerpo'>\n";
  menu_head << "<DIV id='contenido' class='clear'>\n\n";
  menu_head << "<DIV class='col1'>\n";
  menu_head << "<UL class='menudept' id='menu_vertical'>\n";
  menu_head << "<LI class='last dept'> <a href='http://www.uam.es/ss/Satellite/FisicaTeorica/en/1242650577144/subhomeDepartamento/Astrophysics_and_Cosmology.htm'>Astrophysics and Cosmology</a>\n";

  ostringstream menu_tail;
  menu_tail << "</LI></UL></DIV>\n\n";
  
  menu_tail << "<DIV class='col3'>\n";
  menu_tail << "<DIV class='contenido_ppal'>\n\n";
  
  menu_tail << "<div class='titulares_contenido_ppal'>\n";
//   menu_tail << "<a href='#' id='print' title='Imprimir'>Print &gt;</a>\n";
//   menu_tail << "<a href='#' id='back' title='Back'>&lt; Back</a>\n";

  ostringstream footer;
  footer << "</DIV></DIV>\n\n";
  
  footer << "</DIV></DIV>\n\n";
  
  footer << "<div id='pie'><div class='clear'>\n";
  footer << "<p> Grupo de Astrofísica - Universidad Autónoma de Madrid &copy; 2011 \n";
  footer << "<br> Page maintained by Yago Ascasibar using <a href='yago/politeware.html'>yWeb</a> ... Paranoy@ Rulz! </p>\n";
  footer << "</div></div>\n\n";
  
//   footer << "</DIV></DIV>\n";
  footer << "</BODY>\n";
  footer << "</HTML>\n";
  
  //-------------------------------------------------------
  
  main.compile( header.str(), menu_head.str(), menu_tail.str(), footer.str(), full_name );
  
  return(0);
}
