// JavaScript Document 
//Calendario de agenda y noticias
var fechaActual=new Date();
var dateUserInit = fechaActual;//poner fecha de servidor formato etc...
var aux_ruta = document.location.href;
var idiomaRuta = aux_ruta.split("/")[5];
var weekdays = new Array('Lu','Ma','Mi','Ju','Vi','Sa','Do');
var	wdaysAbbr = new Array('Lunes','Martes','Mi\u00E9rcoles','Jueves','Viernes','S\u00E1bado','Domingo')
var	months = new Array('Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre')
var calendario={
	today:fechaActual,
	campoRetorno:null,
	capa:null,
	
	init:function(obj,way_fly)
	{
		
		if(idiomaRuta=="en"){
			weekdays = new Array('Mo','Th','We','Th','Fr','Sa','Su');
			wdaysAbbr = new Array('Monday','Thuesday','Wednesday','Thursday','Friday','Saturday','Sunday');
			months = new Array('January','February','March','April','May','June','July','August','September','October','November','December')
		}
		calendario.valueInput = way_fly;
		calendario.today=fechaActual;
		calendario.today.setHours(0);
		calendario.today.setMinutes(0);
		calendario.today.setSeconds(0);
		calendario.campoRetorno=obj;
		var dia=calendario.today.getDate();
		var mes=calendario.today.getMonth();
		var anyo=calendario.today.getFullYear();
		var capa=document.createElement('div');
		capa.setAttribute('id','CAL_'+calendario.campoRetorno.id);
		capa.className='tablecalendar';		
		calendario.capa=capa;		
		calendario.pintaCalendario(mes,anyo,capa);		
		capa.style.display='block';
	},
	
	compDates:function (s1, s2)
	{	
		if (s1==s2) return 'iguales';
		else return (s1<s2);
	},
	
	anyoBisiesto:function(anyo) 
	{
		if ((anyo%4==0) && ((anyo % 100 != 0) || (anyo % 400 == 0)))
		{
			return true;
		}
		else return false;
	},
	
	diasMes:function(mes,anyo)
	{
		if ((mes==0) || (mes==2) || (mes==4) || (mes==6) || (mes==7) || (mes==9) || (mes==11))
		return 31;
		else if ((mes==3) || (mes==5) || (mes==8) || (mes==10))
			return 30;
			else if ((mes==1) && calendario.anyoBisiesto(anyo))
				return 29;
				else return 28;
	},
	pintaNavegador:function(mes,anyo,capa){
		var p=document.createElement('p');
		p.className='clear';
		var span=document.createElement('span');
		var lnk=document.createElement('a');
		lnk.setAttribute('href','#');
		var img=document.createElement('img');
		img.setAttribute('alt','Mes Anterior');
		img.setAttribute('title','Mes Anterior')
		if(idiomaRuta=="en"){
			img.setAttribute('alt','Previous Month');
			img.setAttribute('title','Previous Month');
		}
		img.style.cssFloat='left';
          img.style.styleFloat='left';
		var newMes=mes-1;
		var newAnyo=anyo;
		
		if (newMes<0) 
		{
			newMes=11;
			newAnyo=anyo-1;
		}
		lnk.onclick=function(){
			calendario.pintaCalendario(newMes,newAnyo,capa,capa.getElementsByTagName('table')[0])
			return false;
		}
		if (dom.$("tipo").value != "AG"){
			img.src=''+rutaStatics+'/img/mes_anterior.gif';
			img.border='1px solid red';
			lnk.appendChild(img);
			p.appendChild(lnk);
		}
		else{
			if ((newAnyo<calendario.today.getFullYear()) || ((newAnyo == calendario.today.getFullYear())&&((newMes+1) <= calendario.today.getMonth()))){
				p.appendChild(img);
				img.setAttribute('src',''+rutaStatics+'/img/0c.gif');
			}
			else{
				img.src=''+rutaStatics+'/img/mes_anterior.gif';
				lnk.appendChild(img);
				p.appendChild(lnk);
			}
		}
		var span=document.createElement('span');
		span.style.cssFloat='left';
		span.style.styleFloat='left';
		span.style.display='block';
		span.style.width='85%'
		span.style.textAlign='center';
		var negrita=document.createElement('strong');
		negrita.appendChild(document.createTextNode(months[mes]+' '+anyo));
		span.appendChild(negrita);
		p.appendChild(span);
		var span=document.createElement('span');
		var lnk=document.createElement('a');
		lnk.setAttribute('href','#');
		var img=document.createElement('img');
		img.setAttribute('alt','Mes Siguiente');
		img.setAttribute('title','Mes Siguiente');
		if(idiomaRuta=="en"){
			img.setAttribute('alt','Next Month');
			img.setAttribute('title','Next Month');
		}
		img.style.cssFloat='right';
		img.style.styleFloat='right';
		img.src=''+rutaStatics+'/img/mes_siguiente.gif';
		lnk.onclick=function()
		{
			var newMes=mes+1;
			var newAnyo=anyo;
			if (newMes==12) 
			{
				newMes=0;
				newAnyo=anyo+1;
			}
			calendario.pintaCalendario(newMes,newAnyo,capa,capa.getElementsByTagName('table')[0])
			return false;
		}
		lnk.appendChild(img);
		p.appendChild(lnk);
		capa.appendChild(p);
	},
	
	pintaDiasSemana:function(weekdays,tabla)
	{
		var thead=document.createElement('thead');
		var fila=document.createElement('tr');
		for (var i=0;i<weekdays.length;i++)
		{
			var celda=document.createElement('th');
			var abbr = document.createElement('abbr');
			abbr.setAttribute('lang','es')
			abbr.setAttribute('title', wdaysAbbr[i]);
			abbr.appendChild(document.createTextNode(weekdays[i]));
			celda.appendChild(abbr);
			fila.appendChild(celda);
		}
		thead.appendChild(fila);
		tabla.appendChild(thead);
	},
	
	pintaMes:function(mes,anyo,tabla)
	{
		var dias=calendario.diasMes(mes,anyo);
		var f=new Date(anyo,mes,1);
		var diacomienzo=f.getDay();
		if (diacomienzo==0) diacomienzo=7;
		/*calculo d?as mes anterior */
		if (mes>0) 
		{
			var diasanterior=calendario.diasMes(mes-1,anyo);
			var mesaux=mes-1;
			var anyoaux=anyo;
		}
		else 
		{
			diasanterior=calendario.diasMes(11,anyo-1);
			var mesaux=11;
			var anyoaux=anyo-1;
		}
		/*primera fila*/
		var tbody=document.createElement('tbody');
		var tr=document.createElement('tr');
		for ( var j=diasanterior-(diacomienzo-1)+1;j<=diasanterior;j++) 
		{
			var parche=new Date();
			parche.setDate(j);
			parche.setMonth(mesaux);
			parche.setFullYear(anyoaux);
			var celda=document.createElement('td');
			celda.className='celdaOtroMes';
			var aux=new Date(anyoaux,mesaux,j);
			if (calendario.compDates(calendario.today,aux))
			{
				/*var lnk=document.createElement('a');
				lnk.setAttribute('href','#');
				lnk.appendChild(document.createTextNode(j));
				lnk.onclick=function()
				{
					calendario.devuelveSeleccion(this.firstChild.data,mesaux,anyoaux)
					return false;
				}
				celda.appendChild(lnk);*/
				
			}
			else
			{
				var continent=document.createElement('span');
				continent.style.color = "#CCC";
			//comentado para NO mostrar dias mes anterior	
				//continent.appendChild(document.createTextNode(j));
				//celda.appendChild(continent);
			}			
			tr.appendChild(celda);
		}
		
		var cont=diacomienzo;
		for (var i=1;i<=7-diacomienzo+1;i++) 
		{
			var celda=document.createElement('td');
			var texto=document.createTextNode(i);
			var lnk=document.createElement('a');
			lnk.setAttribute('href','#');
			var aux=new Date(anyo,mes,i,0,0,0,0)
			if (dom.$("tipo").value != "AG"){
				lnk.appendChild(texto);
				lnk.onclick=function() {
					calendario.devuelveSeleccion(this.firstChild.data,mes,anyo)
					return false;
				}
     			celda.appendChild(lnk);
			}
			else{
				if ((calendario.compDates(calendario.today,aux)) || (calendario.today.getDate()==i)){
					lnk.appendChild(texto);
					lnk.onclick=function(){
						calendario.devuelveSeleccion(this.firstChild.data,mes,anyo)
						return false;
					}
	     			celda.appendChild(lnk);
				}
				else {
					var continent=document.createElement('span');
					continent.style.color = "#CCC";
					continent.appendChild(document.createTextNode(i));
					celda.appendChild(continent);
				}
			}
			tr.appendChild(celda);
			cont++;
		}
		tbody.appendChild(tr);
		tabla.appendChild(tbody);
		var d=i; //dia de hoy
		var fila=2;
		if (mes==11) {
			var messig=0;
			var anyosig=anyo+1;
		}
		else {
			messig=mes+1;
			anyosig=anyo;
		}
		var escribe=0;
		while ((fila<=6) && (parseInt(escribe)<calendario.diasMes(mes,anyo))){
			var row=document.createElement('tr');
			for (var n=1;n<=7;n++) {
				if (d<=calendario.diasMes(mes,anyo)){
					var celda=document.createElement('td');
					var texto=document.createTextNode(d);
					var lnk=document.createElement('a');
					lnk.setAttribute('href','#');
					var aux=new Date(anyo,mes,d+1,0,0,0,0);
					if((aux.getDate() == calendario.today.getDate()+1) && (aux.getMonth() == calendario.today.getMonth())&& (aux.getFullYear() == calendario.today.getFullYear())) {  celda.className = "sel"	} //dia de hoy
					if (dom.$("tipo").value != "AG"){
						lnk.appendChild(texto);
						celda.appendChild(lnk);
						lnk.onclick=function(){
							calendario.devuelveSeleccion(this.firstChild.data,mes,anyo)
							return false;
						}
					}
					else {
						if ((calendario.compDates(calendario.today,aux)) || ((calendario.today.getDate()==d)&&(aux.getMonth()>=mes) && (aux.getMonth()>=anyo))){
							lnk.appendChild(texto);
							celda.appendChild(lnk);
							lnk.onclick=function(){
								calendario.devuelveSeleccion(this.firstChild.data,mes,anyo)
								return false;
							}
						}
						else {
							var continent=document.createElement('span');
							continent.style.color = "#CCC";
							continent.appendChild(document.createTextNode(d));
							celda.appendChild(continent);
						}
					}
					escribe=d;
					row.appendChild(celda);
				}
				else
				{
					var celda=document.createElement('td');
					celda.className='celdaOtroMes';
				/*	var texto=document.createTextNode(d-dias);
					var lnk=document.createElement('a');
					lnk.setAttribute('href','#');
					lnk.appendChild(texto);
					lnk.onclick=function()
					{
						var mesAux=mes+1;
						var anyoAux=anyo;
						if (mesAux==12)
						{
							mesAux=0;
							anyoAux=anyo+1;
						}
						calendario.devuelveSeleccion(this.firstChild.data,mesAux,anyoAux)
						return false;
					}
					celda.appendChild(lnk);*/
					row.appendChild(celda);
				}
				d++;
			}
			tbody.appendChild(row);
			fila++;
		}
	},

	devuelveSeleccion:function(d,mes,anyo,way_fly)
	{
		var mesEscribir=mes+1;
		if (mesEscribir<10)
		{
			mesEscribir='0'+mesEscribir;
		}
     	if(d<10){
		d='0'+d
		}
		calendario.valueInput.value=d+'/'+mesEscribir+'/'+anyo;
		calendario.capa.style.display='none';
	},

	pintaCalendario:function(mes,anyo,capa)
	{
		var hijos=capa.childNodes;
		for (var i=hijos.length-1;i>=0;i--)
		{
			capa.removeChild(hijos[i]);
		}
		var tabla=document.createElement('table')
		tabla.cellPadding=0;
		tabla.cellSpacing=0;
		calendario.campoRetorno.parentNode.parentNode.parentNode.parentNode.appendChild(capa);
		calendario.pintaNavegador(mes,anyo,capa);
		capa.appendChild(tabla);
		calendario.pintaDiasSemana(weekdays,tabla)
		calendario.pintaMes(mes,anyo,tabla);
	}
}
