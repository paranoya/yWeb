#include"yWeb.h"
#include"string.h"

//----------------------------------------------------------------------
int main(int argc,char** argv)
//----------------------------------------------------------------------
{
  string username;
  if( argc > 1 ) username = argv[1];
  else           username = USERNAME;
  
  bool web_admin = (username=="web_admin");
  
  Menu main;
  
  main.add( "index.html", "Welcome", web_admin );
  Menu* people = main.add( "people.html", "People", web_admin );
  if( !web_admin )
  {
    Menu* me = people->add( (username+"/index.html").c_str(), MY_NAME, false );
    {
      me->add( (username+"/index.html", "Presentation" );
      me->add( (username+"/research.html", "Research" );
      me->add( (username+"/teaching.html", "Teaching" );
    }
  }
  main.add( "research.html", "Research", web_admin );
  main.add( "teaching.html", "Teaching", web_admin );
  main.add( "TJM.html", "Observatory", web_admin );
  main.add( "history.html", "History", web_admin );
//   main.add( "Links", "Useful links", web_admin );
  
  ostringstream header;
  header << "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\">\n";
  header << "<HTML>\n\n";
  header << "<HEAD>\n";
  header << "<base href='file:///home/yago/work/misc/web_astro/public_html/'>\n";
//   header << "  <link rel='stylesheet' type='text/css' href='http://www.uam.es/StaticFiles/DptoFisica/css/styles.css' media='all'>\n";
//   header << "  <link rel='stylesheet' type='text/css' href='http://www.uam.es/StaticFiles/DptoFisica/css/print.css' media='print'>\n";
  header << "  <link rel='stylesheet' type='text/css' href='common_files/styles.css' media='all'>\n";
  header << "  <link rel='stylesheet' type='text/css' href='common_files/print.css' media='print'>\n";
  header << "  <link type='image/x-icon' href='common_files/logo_Astro.ico' rel='shortcut icon'>\n";
  header << "  <TITLE>Astro @ UAM - "<< MY_NAME <<" - ";
  
  ostringstream menu_head;
  menu_head << "</TITLE>\n";
  menu_head << "  <meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>\n";
  menu_head << "  <meta name='Keywords' content='Grupo de Astrofisica'>\n";
  menu_head << "  <meta name='Description' content='Grupo de Astrofisica'>\n";
  menu_head << "  <meta name='Author' content='Yago Ascasibar'>\n";
  menu_head << "  <meta name='Robots' content='all'>\n";
  menu_head << "</HEAD>\n\n";

  ifstream top_menu( (string(HOME_DIR)+"common_files/menu_ft.htm").c_str() );
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
  footer << "<p> &nbsp; Grupo de Astrofísica - Universidad Autónoma de Madrid &copy; 2011\n";
  footer << "</div></div>\n\n";
  
//   footer << "</DIV></DIV>\n";
  footer << "</BODY>\n";
  footer << "</HTML>\n";
  
  main.compile( header.str(), menu_head.str(), menu_tail.str(), footer.str(), MY_NAME );
  
  return(0);
}
