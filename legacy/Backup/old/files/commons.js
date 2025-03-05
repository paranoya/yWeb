var rutaStatics = "/StaticFiles/DptoFisica" //para desarrollo
//var rutaStatics = "./" //para local  
var isIE = '\v' == 'v';
//detecta si es explorer 6.0
swIE60 = (navigator.appVersion.indexOf("6.0") != -1)?1:0;
var Css={
	reset:function(){
		var styOp="<style type='text/css'>";
		var styCss="#destacados_scroll{height:auto!important; overflow:hidden!important;}\n";
		var styCss1="#videos_scroll{height:auto!important; overflow:hidden!important;}\n";
		var styCss2="a#print{visibility:visible;}\n";
		var styCss3="div #destacados_scroll div{width:23em;}\n";
		var styCss4="div#carrusel ul#ulCarrusel{display:block;}\n";
		var styCss5=".mensaje{background: url("+rutaStatics+"/img/bg_tooltip_top.gif) no-repeat top left;position:absolute; top:2.1em; left:29.1em; width:17em; padding:.5em 0 0 0; color:#000; visibility:hidden;}\n";
		var styCss6="div#dCalendar{font-size:1.1em; background:#e6e3dc url("+rutaStatics+"/img/bg_agenda_cal.gif) repeat-x bottom right; padding:.5em .9em; display:block; height:12em;}";
		var styCss7="#content_flash p{font-size:1.2em; margin-bottom:.5em; display:none;}";
		var styCl="</style>";
		document.write(styOp+styCss+styCss1+styCss2+styCss3+styCss4+styCss5+styCss6+styCss7+styCl);
	} 
};  Css.reset(); 

var previousOnload;

if(window.onload){
	previousOnload=window.onload;
}

/* Añadiremos trim al prototype de String */
String.prototype.trim = function(){ return this.replace(/^\s+|\s+$/g,'') }
//Control Dom
var dom={
	$:function(id){
		return document.getElementById(id);
	},
	/* Written by Jonathan Snook, http://www.snook.ca/jonathan Add-ons by Robert Nyman, http://www.robertnyman.com */
	getElementsByClassName:function(el, strTagName, strClassName){
		var oElm=el || document;
		var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
		var arrReturnElements = new Array();
		strClassName = strClassName.replace(/\-/g, "\\-");
		var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
		var oElement;
		for(var i=0; i<arrElements.length; i++){
				oElement = arrElements[i];      
				if(oRegExp.test(oElement.className)){
							arrReturnElements.push(oElement);
				}   
		}
		return (arrReturnElements)
    },
	/*Funcion que le pasas 2 parmetros y elimina los elementos undefined de un objeto. Devuelve un array de objetos.*/
	onlyThisElement:function(tag,obj){
		var newObj=[]
		for(var xx=0;xx<obj.childNodes.length;xx++){
		  if(obj.childNodes[xx].tagName==tag.toUpperCase()){
				 newObj[newObj.length]=obj.childNodes[xx]
		  }
		}
		return newObj
	},
	//Posicionamiento x e y
	posX:function(objN){
	var curleft = 0;
	if (objN.offsetParent){
		while (objN.offsetParent){
			curleft += objN.offsetLeft
			objN = objN.offsetParent;
		}
	}else if (objN.x){
		curleft += objN.x;
	}
	return curleft;
	},
	
	posY:function(objN){
		var curtop = 0;
		if (objN.offsetParent){
			while (objN.offsetParent){
				curtop += objN.offsetTop
				objN = objN.offsetParent;
			}
		}else if (objN.y){
			curtop += objN.y;
		}
		return curtop;
	}
}
/* gestor de eventos eventos */
var e = {
	addEvent : function(obj, evType, fn, useCapture){
		if (obj.addEventListener){
			obj.addEventListener(evType, fn, useCapture);
			return true;
		}else if (obj.attachEvent){
			var r = obj.attachEvent("on"+evType, fn);
			return r;
		}else {
			return false; 
		}
	}
}
/*para desplegar contenido*/
var desplegar = {
	parent:function(qObj){
		aux_parent = qObj.split("parent");
		fondo = "menos";
		estado = (dom.$("child"+aux_parent[1]).style.display == "none")?"block":"none";
		dom.$("child"+aux_parent[1]).style.display = estado;
		if (estado == "none"){ fondo = "mas";}
		dom.$(qObj).className = fondo;
	}
}
//funciones comunes uam
var uam ={
	//Definimos todas las funciones
	funciones : function(){
		//si existe lista de buscador en cabecera
		if(dom.$("ul_buscador")){
		dom.$("busqueda").onfocus = function(){
				this.value="";
			}
		}
		//para igualar la altura en modulos subhome
		if(dom.getElementsByClassName(document,"div","separado")[0]){
			uam.igualaAlturaSubhome();
		}
		//vamos a igualar la columna gris a capa contenido
		if (dom.getElementsByClassName(document,"div","agenda")[0]){
			var alturaContenido = dom.$("contenido").offsetHeight;
			var alturaAgenda  = dom.getElementsByClassName(document,"div","agenda")[0];
			var aux_alturaAgenda = alturaAgenda.offsetHeight;
			if(aux_alturaAgenda<=alturaContenido){
				alturaAgenda.style.minHeight = parseInt(alturaContenido/10)+3+"em";
				if(swIE60){
					alturaAgenda.style.height = parseInt(alturaContenido/10)+3+"em";
				}
			}
		}
		//calendarios
		if (dom.$("calendario_ida") != null && dom.$("calendario_vuelta") != null){ 
			dom.$("f_desde").value="dd/mm/aaaa";
			dom.$("f_hasta").value="dd/mm/aaaa";
			uam.appendCalendar(dom.$("calendario_ida"),''+rutaStatics+'/img/ico_calendario.gif');
			uam.appendCalendar(dom.$("calendario_vuelta"),''+rutaStatics+'/img/ico_calendario.gif');
			
			uam.launchCalendar(dom.$('calendario_ida'),dom.$('f_desde'));
			uam.launchCalendar(dom.$('calendario_vuelta'),dom.$('f_hasta'));
		}
		if (dom.$("calendario_ida2") != null && dom.$("calendario_vuelta2") != null){ 
			uam.appendCalendar(dom.$("calendario_ida2"),''+rutaStatics+'/img/ico_calendario.gif');
			uam.appendCalendar(dom.$("calendario_vuelta2"),''+rutaStatics+'/img/ico_calendario.gif');
			
			uam.launchCalendar(dom.$('calendario_ida2'),dom.$('adj_pro'));
			uam.launchCalendar(dom.$('calendario_vuelta2'),dom.$('adj_proh'));
		}
		if (dom.$("calendario_ida3") != null && dom.$("calendario_vuelta3") != null){ 
			dom.$("adj_def").value="dd/mm/aaaa";
			dom.$("adj_defh").value="dd/mm/aaaa";
			uam.appendCalendar(dom.$("calendario_ida3"),''+rutaStatics+'/img/ico_calendario.gif');
			uam.appendCalendar(dom.$("calendario_vuelta3"),''+rutaStatics+'/img/ico_calendario.gif');
			
			uam.launchCalendar(dom.$('calendario_ida3'),dom.$('adj_def'));
			uam.launchCalendar(dom.$('calendario_vuelta3'),dom.$('adj_defh'));
		}
		//calendario de la home
		if (dom.$("agendaCalendar")){
			//se captura la fecha actual
			var dateToday = new Date();
			today = dateToday.getDate();		//Que dia es hoy
			month = dateToday.getMonth();		//Que mes es el actual //el rango es desde 0(enero) hasta 11(diciembre)
			aux_year = dateToday.getYear();		//Anio actual. Tener en cuenta que en Mozilla
			year = (aux_year < 2000)?aux_year+1900:aux_year;
			peticion.nuevoXML();
			peticion.calendar((month+1),year);
			dom.$("agendaCalendar").style.display = "block";
		}
		//limpia calendario
		if(dom.$("f_desde")){
			uam.limpiaCalendario(); 
		}
		//enlace volver atras
		if (dom.$("back")){
			dom.$("back").onclick = function(){
				history.back(); return false;
			}
			dom.$("back").style.visibility = "visible";
		}
		//delicious
		if(dom.$("deli")){
			dom.$("deli").style.display="block";
			dom.$("deli").onclick = function (){
				var forDelilink = document.location.href
				window.open (this.href+forDelilink);
				return false;
			}
		}
		//imprimir
		if(dom.$("print")){
			var litPrint = dom.$("print").innerHTML.split("&")[0];
			var titularNot = dom.getElementsByClassName(document,"div","titulares_contenido_ppal")[0].getElementsByTagName("h2")[0].innerHTML; 
			dom.$("print").title= litPrint+":  "+ titularNot;
			dom.$("print").onclick=function(){ window.print();return false;}
		}
		//Para abrir en ventana nueva sin necesidad de about blank
		var blank = dom.getElementsByClassName(document,"a","blank");
		if(blank){
			for(var i=0;i<blank.length;i++){
				blank[i].onclick = function(){
					window.open (this.href,"","location=1,status=1,scrollbars=1,width=1024,height=768"); 
					return false;
				}
			}
		}
		if(dom.$("video")){
			paraVideo.cargoBgModulovideos();
		}
		//funcionalidad para el video
		if(dom.$("videos_scroll")||dom.$("video")){
			if(dom.$("videos_scroll")){
				var enlaceScroll = dom.$("videos_scroll").getElementsByTagName("a");
			}
			paraVideo.cargoBgModulovideos();//este a lo mejor hay que quitarlo en todas las llamadas.
			paraVideo.cambioVideoid(videoId,videoPie);
			if(enlaceScroll){
				for(var i=0;i<enlaceScroll.length;i++){
					enlaceScroll[i].onclick = function(){
						paraVideo.cargoBgModulovideos();
						var videoId = this.rel;
						videoId = videoId.split("=")[1] 
						var videoPie = this.getElementsByTagName("span")[0].innerHTML;
						if(videoId!=""){
							paraVideo.cambioVideoid(videoId,videoPie);
						}else{
							alert("Esta imagen no tiene video realcionado");
						}
						return false;
					}
				}
			}
		}
		//rompo flotacion de span en lista de buscadores
		var paginador = dom.getElementsByClassName(document,"div","paginador")[0];
		if(paginador){
			var noticia = dom.getElementsByClassName(document,"div","noticia");
			for(var i=0;i<noticia.length;i++){
				var spanNoticia = noticia[i].getElementsByTagName("span");
				for(var s=0 ;s < spanNoticia.length ; s++){
					spanNoticia[s].style.display="block";
					spanNoticia[s].style.marginTop=".4em";
				}
			}
		}
		//altura de las listas en el apartado de contratos públicos
		var nbp = dom.getElementsByClassName(document,"div","nbp");
		if(nbp){
			for(var i=0;i<nbp.length;i++){
				var ref = nbp[i].getElementsByTagName("span")[0];
				var aux_titSpan = nbp[i].getElementsByTagName("span")[1].offsetHeight;
				var titSpan = parseInt((aux_titSpan/10)+2)+"em"
				if(ref.className=="ftl"){
					ref.style.height = titSpan;
				}
			}	
		}
		//rompo flotacion de span en lista de buscadores
		if(dom.getElementsByClassName(document,"div","destacado")[0]){
			var destacadoImg = dom.getElementsByClassName(document,"div","destacado")[0].getElementsByTagName("div")[0];
			destacadoImg.style.minHeight = (dom.$("menu_vertical").offsetHeight/11)+"em";		
		}
		var paraNoticiali =  dom.getElementsByClassName(document,"div","noticia");
		if(paraNoticiali){
			for(var i=0;i<paraNoticiali.length;i++){
				var esLI = paraNoticiali[i].parentNode;
				if(esLI.tagName === "LI"){
					esLI.style.backgroundImage="none";
				};
			}
		}
		//Muestra Google maps
		if(dom.$("wrapper_gmpas")){
			dom.$("wrapper_gmpas").style.display="block";
			load(inicio);
		}
		//para seleccionar el idioma
		var paraidioma = dom.getElementsByClassName(document,"ul","idioma")[0];
		var lnkparaidioma = paraidioma.getElementsByTagName("a");
		var auxUrl = window.location.href;
		var auxidioma =  auxUrl.split("/")[6];
		if(paraidioma){
			for(var i=0;i<lnkparaidioma.length;i++){
				lnkparaidioma[i].onclick = function(){
					if(auxidioma == "es"){
						var nuevaUrl = auxUrl.replace("/es/", "/en/");
						window.location.href = nuevaUrl;
					}
					if(auxidioma == "en"){
						var nuevaUrli = auxUrl.replace("/en/", "/es/");
						window.location.href = nuevaUrli;
					}
					return false;
				}
			}
		}
		//deplegables
		var level1 = 1;
		while (dom.$("parent"+level1)!=null){
			dom.$("child"+level1).style.display = "none";
			dom.$("parent"+level1).className = "mas";
			dom.$("parent"+level1).onclick = function(){
				desplegar.parent(this.id);
				return false;
			}
			var level2 = 1;
			while (dom.$("parent"+level1+level2)){
				dom.$("child"+level1+level2).style.display = "none";
				dom.$("parent"+level1+level2).className = "mas";
				dom.$("parent"+level1+level2).onclick = function(){
					desplegar.parent(this.id);
					return false;
				}
				level2++;
			}
			level1++;
		}
		//para la galeria de fotos
		var galImg =  dom.getElementsByClassName(document,"div","wrapper_galeria")[0];
		altoBloqueImg = 0;
		if(galImg){
			var bloqueImg = galImg.getElementsByTagName("div");
			for(var i=0;i<bloqueImg.length;i++){
				if(bloqueImg[i].offsetHeight >= altoBloqueImg){altoBloqueImg = bloqueImg[i].offsetHeight;}
			}
			var aux_alto = ((altoBloqueImg)/11);
			for(var i=0;i<bloqueImg.length;i++){
				bloqueImg[i].style.height = aux_alto+"em"
			}
		}
		//ficha pdi
		var fichaPdi = dom.getElementsByClassName(document,"div","ficha_pdi")[0];
		if(fichaPdi){
			var imgPdi = fichaPdi.getElementsByTagName("img");
			var ddPdi = fichaPdi.getElementsByTagName("dd");
			if(imgPdi.length == 0){
				for(var dd=0;dd<ddPdi.length;dd++){
					ddPdi[dd].style.width="16em";
				}
			}
		}
		var destc_home = dom.getElementsByClassName(document,"div","not_destacada_home")[0];
		if(destc_home){
			var img_dest_home = destc_home.getElementsByTagName("img");
			var ul_dest_home = destc_home.getElementsByTagName("ul")[0];
			if(img_dest_home.length == 0){
				ul_dest_home.style.width="100%";
			}
			/*if(swIE60){
				dom.getElementsByClassName(document,"div","soporte")[0].style.width="101.5em";
				var menusupIe = dom.getElementsByClassName(document,"div","menu_sup")[0];
				menusupIe.style.borderLeft=".8em solid #fff";
				menusupIe.style.borderRight=".7em solid #fff";
			}*/
		}
		//img de promo
		var promo = dom.getElementsByClassName(document,"div","promo")[0];
		if(promo){
			var promo_txt = dom.getElementsByClassName(document,"div","destacado_txt")[0];
			var promo_img = promo.getElementsByTagName("img");
			if(promo_img.length<=0){
				if(promo_txt){
					promo_txt.style.width="95%";
				}
			}
		}
	},
	//////////////fin de funciones()///////////////
	//marcamos seleccion de buscador en cabecera
	selFormCabecera :function(evt){
		evt = (evt) ? evt : ((event) ? event : null);
		if(evt){
			var aux = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
		}
		var aux_fBuscLiA = dom.$("ul_buscador");
		var fBuscLiA = aux_fBuscLiA.getElementsByTagName("a");
		var donde = aux.getAttribute("name");
		var literal = aux.innerHTML;
		
		for(var a=0;a<fBuscLiA.length;a++){
			var aux_hrefBiblio = fBuscLiA[1].href;
			var hrefBiblio = aux_hrefBiblio.split("/");
			fBuscLiA[1].id=""+aux_hrefBiblio.split("/")[2]+"";
			
			fBuscLiA[a].href="#";
			fBuscLiA[a].className="";
			fBuscLiA[1].target="";
		}
		if(aux.tagName=="A"){
			aux.className="sel";
			dom.$("quebuscador").value= donde;
		}
	},
	//para calendario
	appendCalendar:function(obj,img_src){
		var img=document.createElement('img');
		//img.setAttribute('alt','Abrir calendario');
		obj.appendChild(img);
		img.setAttribute('src',img_src);
	},
	
	sw_calendar:false,
	
	//lanza calendario
	launchCalendar:function(obj,way_fly,pX,pY){
		obj.onclick	= function(){
			if (calendario.capa != null){
				if (calendario.capa.style.display == 'none'){
					uam.sw_calendar = false;
				}
			}
			if(uam.sw_calendar == false){
				calendario.init(obj,way_fly);
				uam.sw_calendar = true;				
			}else{
				calendario.capa.style.display='none';	
				uam.sw_calendar = false;					
			}
		}
	},
	//limpia input calendario
	limpiaCalendario:function(){
		var inputDesde = dom.$("f_desde");
		var inputHasta = dom.$("f_hasta");
		var inputenviar = dom.$("btn_buscar_f");
		var inputadj_pro = dom.$("adj_pro");
		var inputadj_proh =  dom.$("adj_proh");
		var inputadj_def = dom.$("adj_def"); 
		var inputadj_defh = dom.$("adj_defh");
		
		inputenviar.onclick = function(){
			switch(inputDesde.value) {
				case "dd/mm/aaaa":
					inputDesde.value = "";
				break;
					inputDesde.value = "";
				case "dd/mm/yyyy":
				break;
				default:
					inputDesde.value;
				break;
			}
			switch(inputHasta.value) {
				case "dd/mm/aaaa":
					inputHasta.value = "";
				break;
				case "dd/mm/yyyy":
					inputHasta.value = "";
				break;
				default:
					inputHasta.value;
				break;
			}
			if(dom.$("adj_def")){
				switch(inputadj_def.value) {
					case "dd/mm/aaaa":
						inputadj_def.value = "";
					break;
					case "dd/mm/yyyy":
						inputadj_def.value = "";
					break;
					default:
						inputadj_def.value;
					break;
				}
			}
			if(dom.$("adj_defh")){
				switch(inputadj_defh.value) {
					case "dd/mm/aaaa":
						inputadj_defh.value = "";
					break;
					case "dd/mm/yyyy":
						inputadj_defh.value = "";
					break;
					default:
						inputadj_defh.value;
					break;
				}
			}
		}
		//para limpiar los campos
		inputDesde.onfocus = function(){
			this.value="";
		}
		
		inputHasta.onfocus = function(){
			this.value="";
		}
		if(inputadj_def){
			inputadj_def.onfocus = function(){
				this.value="";
			}
		}
		
		if(inputadj_defh){
			inputadj_defh.onfocus = function(){
				this.value="";
			}
		}
	},
	//fin para calendario
	//para igualar la altura en modulos subhome
	igualaAlturaSubhome:function(){
		var cnt_not_subhome = dom.getElementsByClassName(document,"div","contenedor_noticia_doscol");
		for (var ii=0;ii<cnt_not_subhome.length;ii++){
			for (var jj=0;jj<cnt_not_subhome[ii].childNodes.length;jj++){
				var objDIV = dom.onlyThisElement("DIV",cnt_not_subhome[ii].childNodes[jj]);
				if (cnt_not_subhome[ii].childNodes[jj].tagName=="DIV"){
					if ((jj % 2)==0){
						hHeightLayer = cnt_not_subhome[ii].childNodes[jj].offsetHeight;
						if (cnt_not_subhome[ii].childNodes[jj+1] != null) { 
							hHeightLayer2 = cnt_not_subhome[ii].childNodes[jj+1].offsetHeight;
							hHeightLayer = (hHeightLayer >= hHeightLayer2)?hHeightLayer:hHeightLayer2;
							cnt_not_subhome[ii].childNodes[jj+1].style.height=(hHeightLayer/12)+"em";
						}
						cnt_not_subhome[ii].childNodes[jj].style.height=(hHeightLayer/12)+"em";
					}
				}
			}
		}
	}
}
var paraVideo = {
	cargoBgModulovideos : function(){
		dom.$("video").style.background="#fff url("+rutaStatics+"/img/cargando.gif) no-repeat 50% 50%";
		var contFlash = dom.getElementsByClassName(document,"div","wrp_flash")[0];
		var ultimaCol = dom.getElementsByClassName(document,"div","lastc")[0];
		if(ultimaCol){contFlash.className='ftn wrp_flash'};
	},
	cambioVideoid : function(videoId,videoPie){
		var cntVideo = dom.$("video");
		var cambioPie = dom.$("pievideo");
		if(dom.$("videos_scroll")){
			cntVideo.innerHTML='<object width="234" height="166" type="application/x-shockwave-flash" id="objectId" data="http://www.youtube.com/v/'+videoId+'" style="display:block;" ><param name="movie"  id="objectIdIe" value="http://www.youtube.com/v/'+videoId+'" /><param name="wmode" value="transparent" /></object>';
		}else{
			cntVideo.innerHTML='<object width="320" height="260" type="application/x-shockwave-flash" id="objectId" data="http://www.youtube.com/v/'+videoId+'" style="display:block;" ><param name="movie"  id="objectIdIe" value="http://www.youtube.com/v/'+videoId+'" /><param name="wmode" value="transparent" /></object>';
		}
		if(cambioPie){cambioPie.innerHTML = videoPie}
	}
}
e.addEvent(window,'load',uam.funciones,false)