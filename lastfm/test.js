/*TODO:
  -ip city / multiple city storage
  -change location / merge with choose location
  -investigate if lastfm recommended events includes this entire set. if so, filter by top artists still. if it doesn't then add loading gif
 */

$(document).ready(function() {	
	console.log(geoip_country_code());
	console.log(geoip_region_name());

   if($.browser.mozilla){
   	$("#first").prepend("Username: ");
   	$("#second").prepend("Artist: ");
   }

   if(document.URL.indexOf("?") != -1) {

   	 strs = document.URL.split('?')[1].split('&');
   	 inf = {};
   	 for(s in strs){
   	 	var temp = strs[s].split('=');
   	 	inf[temp[0]] = temp[1];
   	 }

   	 u_name = inf['username'].replace(/%20/g," ");
   	 met = inf['city'].replace(/%20/g," ");
   	 $(".main").attr("readonly","readonly");
	 $(".main").attr("onKeyPress","return false");

	 if(localStorage.getItem('city')) 
	     $("body").prepend("<a href = \"javascript:change_loc()\" style=\"font-size:13px;float:right\" id=\"ch_loc\"><small> Change location </small></a>");

	 run();
   }

 });
all_artists = {};
COUNTRY = {
	"AF":"AFGHANISTAN",
	"AX":"ALAND ISLANDS",
	"AL":"ALBANIA",
	"DZ":"ALGERIA",
	"AS":"AMERICAN SAMOA",
	"AD":"ANDORRA",
	"AO":"ANGOLA",
	"AI":"ANGUILLA",
	"AQ":"ANTARCTICA",
	"AG":"ANTIGUA AND BARBUDA",
	"AR":"ARGENTINA",
	"AM":"ARMENIA",
	"AW":"ARUBA",
	"AU":"AUSTRALIA",
	"AT":"AUSTRIA",
	"AZ":"AZERBAIJAN",
	"BS":"BAHAMAS",
	"BH":"BAHRAIN",
	"BD":"BANGLADESH",
	"BB":"BARBADOS",
	"BY":"BELARUS",
	"BE":"BELGIUM",
	"BZ":"BELIZE",
	"BJ":"BENIN",
	"BM":"BERMUDA",
	"BT":"BHUTAN",
	"BO":"BOLIVIA, PLURINATIONAL STATE OF",
	"BA":"BOSNIA AND HERZEGOVINA",
	"BW":"BOTSWANA",
	"BV":"BOUVET ISLAND",
	"BR":"BRAZIL",
	"IO":"BRITISH INDIAN OCEAN TERRITORY",
	"BN":"BRUNEI DARUSSALAM",
	"BG":"BULGARIA",
	"BF":"BURKINA FASO",
	"BI":"BURUNDI",
	"KH":"CAMBODIA",
	"CM":"CAMEROON",
	"CA":"CANADA",
	"CV":"CAPE VERDE",
	"KY":"CAYMAN ISLANDS",
	"CF":"CENTRAL AFRICAN REPUBLIC",
	"TD":"CHAD",
	"CL":"CHILE",
	"CN":"CHINA",
	"CX":"CHRISTMAS ISLAND",
	"CC":"COCOS (KEELING) ISLANDS",
	"CO":"COLOMBIA",
	"KM":"COMOROS",
	"CG":"CONGO",
	"CD":"CONGO, THE DEMOCRATIC REPUBLIC OF THE",
	"CK":"COOK ISLANDS",
	"CR":"COSTA RICA",
	"CI":"COTE D'IVOIRE",
	"HR":"CROATIA",
	"CU":"CUBA",
	"CY":"CYPRUS",
	"CZ":"CZECH REPUBLIC",
	"DK":"DENMARK",
	"DJ":"DJIBOUTI",
	"DM":"DOMINICA",
	"DO":"DOMINICAN REPUBLIC",
	"EC":"ECUADOR",
	"EG":"EGYPT",
	"SV":"EL SALVADOR",
	"GQ":"EQUATORIAL GUINEA",
	"ER":"ERITREA",
	"EE":"ESTONIA",
	"ET":"ETHIOPIA",
	"FK":"FALKLAND ISLANDS (MALVINAS)",
	"FO":"FAROE ISLANDS",
	"FJ":"FIJI",
	"FI":"FINLAND",
	"FR":"FRANCE",
	"GF":"FRENCH GUIANA",
	"PF":"FRENCH POLYNESIA",
	"TF":"FRENCH SOUTHERN TERRITORIES",
	"GA":"GABON",
	"GM":"GAMBIA",
	"GE":"GEORGIA",
	"DE":"GERMANY",
	"GH":"GHANA",
	"GI":"GIBRALTAR",
	"GR":"GREECE",
	"GL":"GREENLAND",
	"GD":"GRENADA",
	"GP":"GUADELOUPE",
	"GU":"GUAM",
	"GT":"GUATEMALA",
	"GG":"GUERNSEY",
	"GN":"GUINEA",
	"GW":"GUINEA-BISSAU",
	"GY":"GUYANA",
	"HT":"HAITI",
	"HM":"HEARD ISLAND AND MCDONALD ISLANDS",
	"VA":"HOLY SEE (VATICAN CITY STATE)",
	"HN":"HONDURAS",
	"HK":"HONG KONG",
	"HU":"HUNGARY",
	"IS":"ICELAND",
	"IN":"INDIA",
	"ID":"INDONESIA",
	"IR":"IRAN, ISLAMIC REPUBLIC OF",
	"IQ":"IRAQ",
	"IE":"IRELAND",
	"IM":"ISLE OF MAN",
	"IL":"ISRAEL",
	"IT":"ITALY",
	"JM":"JAMAICA",
	"JP":"JAPAN",
	"JE":"JERSEY",
	"JO":"JORDAN",
	"KZ":"KAZAKHSTAN",
	"KE":"KENYA",
	"KI":"KIRIBATI",
	"KP":"KOREA, DEMOCRATIC PEOPLE'S REPUBLIC OF",
	"KR":"KOREA, REPUBLIC OF",
	"KW":"KUWAIT",
	"KG":"KYRGYZSTAN",
	"LA":"LAO PEOPLE'S DEMOCRATIC REPUBLIC",
	"LV":"LATVIA",
	"LB":"LEBANON",
	"LS":"LESOTHO",
	"LR":"LIBERIA",
	"LY":"LIBYAN ARAB JAMAHIRIYA",
	"LI":"LIECHTENSTEIN",
	"LT":"LITHUANIA",
	"LU":"LUXEMBOURG",
	"MO":"MACAO",
	"MK":"MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF",
	"MG":"MADAGASCAR",
	"MW":"MALAWI",
	"MY":"MALAYSIA",
	"MV":"MALDIVES",
	"ML":"MALI",
	"MT":"MALTA",
	"MH":"MARSHALL ISLANDS",
	"MQ":"MARTINIQUE",
	"MR":"MAURITANIA",
	"MU":"MAURITIUS",
	"YT":"MAYOTTE",
	"MX":"MEXICO",
	"FM":"MICRONESIA, FEDERATED STATES OF",
	"MD":"MOLDOVA, REPUBLIC OF",
	"MC":"MONACO",
	"MN":"MONGOLIA",
	"ME":"MONTENEGRO",
	"MS":"MONTSERRAT",
	"MA":"MOROCCO",
	"MZ":"MOZAMBIQUE",
	"MM":"MYANMAR",
	"NA":"NAMIBIA",
	"NR":"NAURU",
	"NP":"NEPAL",
	"NL":"NETHERLANDS",
	"AN":"NETHERLANDS ANTILLES",
	"NC":"NEW CALEDONIA",
	"NZ":"NEW ZEALAND",
	"NI":"NICARAGUA",
	"NE":"NIGER",
	"NG":"NIGERIA",
	"NU":"NIUE",
	"NF":"NORFOLK ISLAND",
	"MP":"NORTHERN MARIANA ISLANDS",
	"NO":"NORWAY",
	"OM":"OMAN",
	"PK":"PAKISTAN",
	"PW":"PALAU",
	"PS":"PALESTINIAN TERRITORY, OCCUPIED",
	"PA":"PANAMA",
	"PG":"PAPUA NEW GUINEA",
	"PY":"PARAGUAY",
	"PE":"PERU",
	"PH":"PHILIPPINES",
	"PN":"PITCAIRN",
	"PL":"POLAND",
	"PT":"PORTUGAL",
	"PR":"PUERTO RICO",
	"QA":"QATAR",
	"RE":"REUNION",
	"RO":"ROMANIA",
	"RU":"RUSSIAN FEDERATION",
	"RW":"RWANDA",
	"BL":"SAINT BARTHELEMY",
	"SH":"SAINT HELENA, ASCENSION AND TRISTAN DA CUNHA",
	"KN":"SAINT KITTS AND NEVIS",
	"LC":"SAINT LUCIA",
	"MF":"SAINT MARTIN",
	"PM":"SAINT PIERRE AND MIQUELON",
	"VC":"SAINT VINCENT AND THE GRENADINES",
	"WS":"SAMOA",
	"SM":"SAN MARINO",
	"ST":"SAO TOME AND PRINCIPE",
	"SA":"SAUDI ARABIA",
	"SN":"SENEGAL",
	"RS":"SERBIA",
	"SC":"SEYCHELLES",
	"SL":"SIERRA LEONE",
	"SG":"SINGAPORE",
	"SK":"SLOVAKIA",
	"SI":"SLOVENIA",
	"SB":"SOLOMON ISLANDS",
	"SO":"SOMALIA",
	"ZA":"SOUTH AFRICA",
	"GS":"SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS",
	"ES":"SPAIN",
	"LK":"SRI LANKA",
	"SD":"SUDAN",
	"SR":"SURINAME",
	"SJ":"SVALBARD AND JAN MAYEN",
	"SZ":"SWAZILAND",
	"SE":"SWEDEN",
	"CH":"SWITZERLAND",
	"SY":"SYRIAN ARAB REPUBLIC",
	"TW":"TAIWAN, PROVINCE OF CHINA",
	"TJ":"TAJIKISTAN",
	"TZ":"TANZANIA, UNITED REPUBLIC OF",
	"TH":"THAILAND",
	"TL":"TIMOR-LESTE",
	"TG":"TOGO",
	"TK":"TOKELAU",
	"TO":"TONGA",
	"TT":"TRINIDAD AND TOBAGO",
	"TN":"TUNISIA",
	"TR":"TURKEY",
	"TM":"TURKMENISTAN",
	"TC":"TURKS AND CAICOS ISLANDS",
	"TV":"TUVALU",
	"UG":"UGANDA",
	"UA":"UKRAINE",
	"AE":"UNITED ARAB EMIRATES",
	"UK":"UNITED KINGDOM",
	"US":"UNITED STATES",
	"UM":"UNITED STATES MINOR OUTLYING ISLANDS",
	"UY":"URUGUAY",
	"UZ":"UZBEKISTAN",
	"VU":"VANUATU",
	"VE":"VENEZUELA, BOLIVARIAN REPUBLIC OF",
	"VN":"VIET NAM",
	"VG":"VIRGIN ISLANDS, BRITISH",
	"VI":"VIRGIN ISLANDS, U.S.",
	"WF":"WALLIS AND FUTUNA",
	"EH":"WESTERN SAHARA",
	"YE":"YEMEN",
	"ZM":"ZAMBIA",
	"ZW ":"ZIMBABWE"
};
    	/* Create a cache object */
cache = new LastFMCache();

/* Create a LastFM object */
lastfm = new LastFM({
	apiKey    : 'a82fb638014679c4de2bc043e89aee83',
	apiSecret : 'aa9bcd5864cf910acff3aa7bc2bc25f9',
	cache     : cache
});


console.log(lastfm.user.getRecommendedEvents({user:'blood and iron'}));

function change_loc() {
	loc = [];
	$("#ch_loc").after("<br/><br/><div id=\"loc\" style=\"float:right;border-radius:20px;width:20%\"> </div><br/>");
	lastfm.geo.getMetros({},{success: function(data){
		for(var i in data.metros.metro) {
			if(loc.indexOf(data.metros.metro[i].country) == -1) {
				$("#loc").append("<input class = \"country\" name = \"" + data.metros.metro[i].country.replace(" ","") + "\" type = \"text\" readonly = \"readonly\" value = \"" + data.metros.metro[i].country+ "\" onClick = \"return clickCountry(this,event)\"> </input>");
				$("input[name="+data.metros.metro[i].country.replace(" ","")+"]").animate({
				opacity: "0"
				}, 0, function() {
				//	alert(data.metros.metro[i].country);
					$(this).animate({opacity: "255"}, 1500);
				});
				loc.push(data.metros.metro[i].country);
			}
		}
	}, error: function(code,message){}});
	return true;
}

function clickCountry(form){
	  for(var i = 0; i < loc.length; i++) {
	  	if(loc[i] != form.name)
	  		$("input[name="+loc[i].replace(" ","")+"]").animate({
	  		opacity: "0"
	  		}, 1500, function() {
	  			$(this).remove();
	  		});
	  	else
	  		$("input[name="+loc[i].replace(" ","")+"]").animate({
	  		opacity: "0"
	  		}, 1500,function(){
	  	$(this).remove();
	  });
	  } 
	  lastfm.geo.getMetros({country: form.value},{success: function(data){
	  	met_array = data.metros.metro.sort(function names(a,b) { if(a.name.toLowerCase() < b.name.toLowerCase()) return -1; else if(a.name.toLowerCase() > b.name.toLowerCase())  return 1; else return 0;});
		for(var mets in met_array){
			$("#loc").append("<input class = \"country\" name = \"" + mets + "\" type = \"text\" readonly = \"readonly\" value = \"" + met_array[mets].name + "\" onClick = \"return clickCity(this,event)\"> </input>");
	$("input[name="+mets+"]").animate({
	  	opacity: "0"
	  }, 0, function(){
	  	$(this).animate({
	  opacity: "255"
	  }, 20000);
	  });
	  	}
	  }, error: function(code,message){}});
	  	alert(met_array[met_array.length-1]);

	  return true;
}

function getAllTopArtists(){
	var periods = ["overall","7day","3month","6month","12month"];
	
	//arr = [];
	
	var artists = {};
	for(var per in periods) {
		lastfm.user.getTopArtists({user: u_name, period: periods[per]}, {success: function(data){
		//	var table = prettyPrint( data, { /*optional options object */ } );
		//	document.body.appendChild(table);
			for( var art in data.topartists.artist){
		//		if( arr.indexOf([data.topartists.artist[art].name, data.topartists.artist[art].mbid]) == -1 )
					//alert(data.topartists.artist[art].name);
					artists[data.topartists.artist[art].name] = data.topartists.artist[art].mbid;
			}
		//	alert(arr.length);
		//data.topartists.artist.forEach(arr.push);
		}, error: function(code, message){}});
	}
//	var all = 0;
//	arr.sort(function fun(a,b){return 1});
	//arr = arr.sort(function(a,b) { if(a[0].toLowerCase() < b[0].toLowerCase()) return -1; else if(a[0].toLowerCase() > b[0].toLowerCase())  return 1; else return 0;});
/*	while(all < arr.length){
		while(all+1 < arr.length && arr[all+1][0] == arr[all][0] && arr[all+1][1] == arr[all][1])
			arr.splice(all,all+1);
		all++;
	}*/
	//alert("fdafdsaf" + arr.length);
//	return arr;
	return artists;
}
function getLocalEvents(mbid, name){
//	alert(name);
	art_ev = {};
	var counter = 0;
	lastfm.artist.getEvents({artist: name, mbid: mbid}, {success: function(data){
		if(data.events != null) {
			for(var evs in data.events.event) {
				if(data.events.event[evs].venue.location.city.toLowerCase().indexOf(met.toLowerCase()) != -1) {
					art_ev[counter++] = data.events.event[evs];
					lastfm.artist.getImages({artist: name, mbid: mbid}, {success: function(dat){
						$("#body").append("<br/><a href = \"" + data.events.event[evs].url + "\"><img src = \"" + dat.images.image[0].sizes.size[2]["#text"]+ "\" /> </a> <input id = \"city\" name = \"" + name + "\" type = \"text\" readonly = \"readonly\"  value = \"" + name + "\"> </input>");
					}, error: function(code,message){}});
				}
			}
		}
		}, error: function(code, message){alert(message);}});

	return art_ev;
}
function clickArtist(form){
	if(!all_artists[form.value].displayed) {
		for(var temp in all_artists[form.value].events) {
			$("#"+form.value).append("<p>" + all_artists[form.value].events[temp].title+ "</p>");
		}
		all_artists[form.value].displayed = !all_artists[form.value].displayed;
	}
	else {
		//hide them
	}
	return true;
}

function indiv_run(artist_name){
	var met = "New York";
	if(!(all_artists[artist_name])) {
		lastfm.artist.getInfo({artist: artist_name}, {success: function(a) {
			/*if(!(a.artist.mbid))
				search_artist(artist_name);
			else*/ if(!(all_artists[a.artist.name])) {
				all_artists[a.artist.name] = {};
				all_artists[a.artist.name].name = a.artist.name;
				all_artists[a.artist.name].mbid = a.artist.mbid;
				all_artists[a.artist.name].events = [];
				all_artists[a.artist.name].displayed = false;
				all_artists[a.artist.name].image = a.artist.image[3]["#text"];
				lastfm.artist.getEvents({artist: a.artist.name, mbid: all_artists[a.artist.name].mbid}, {success: function(e){
					if(e.events["@attr"])
						var namae = e.events["@attr"].artist;
					else							
						var namae = e.events.artist;
					for(var evs in e.events.event) {
						if(e.events.event[evs].venue && e.events.event[evs].venue.location.city.toLowerCase().indexOf(met.toLowerCase()) != -1) {
							all_artists[namae].events.push(e.events.event[evs]);
						}
					}
					if(all_artists[namae].events[0])
						display_event(all_artists[namae]);
				}, error: function(code, message){alert("Error in Events: " + message);}});
			}
		}, error: function(code, message){alert("Error in Indiv: " + message);search_artist(artist_name);}});
	}
}

function date_compare(a,b){
	var date1 = a.date;
	var date2 = b.date;
	var time1 = a.time;
	var time2 = b.time;
	
	var months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
	if (months.indexOf(date1.slice(0,3)) != months.indexOf(date2.slice(0,3)))
		return ((months.indexOf(date1.slice(0,3)) < months.indexOf(date2.slice(0,3))) ? -1 : 1);
	else {
		if(parseInt(date1.slice(3,5)) != parseInt(date2.slice(3,5)))
			return ((parseInt(date1.slice(3,5)) < parseInt(date2.slice(3,5))) ? -1 : 1);
		else {
			if(parseInt((time1.slice(0,2) + time1.slice(3,5))) != parseInt((time2.slice(0,2) + time2.slice(3,5))))
				return ((parseInt((time1.slice(0,2) + time1.slice(3,5))) < parseInt((time2.slice(0,2) + time2.slice(3,5)))) ? -1 : 1);
			else
				return 0;		
		}
	}	
}

function ani(guy){$(guy).animate({height: "200px"}, 150);}

function unani(guy){$(guy).animate({height: "100px"}, 150);}

function search_artist(artist_name){
	lastfm.artist.search({artist: artist_name, limit: 3},{success: function(s){
		for(var maybe in s.results.artistmatches.artist){
			$("#body").append("<div class = \"search\" onMouseOver=\"return ani(this)\" onMouseOut=\"return unani(this)\"><img src=\""+ s.results.artistmatches.artist[maybe].image[3]["#text"] + "\">" + s.results.artistmatches.artist[maybe].name + " </div><br/>");
		}		
	}, error: function(code,message){alert("Error in Search: " + message);}});
}

displayed = [];

function display_event(artist){
	var name = artist.name;
	for(var event in artist.events){
		var title = artist.events[event].title;
		var event_num = artist.events[event].id;
		var roster = ((typeof artist.events[event].artists.artist != "string") ? artist.events[event].artists.artist.join(', ') : artist.events[event].artists.artist);		
		var day = artist.events[event].startDate.slice(0,3);
		var date = artist.events[event].startDate.slice(8,11).toUpperCase() + artist.events[event].startDate.slice(5,7);
		var time = artist.events[event].startDate.slice(17,22);
		var venue = artist.events[event].venue.name;
		var venue_url = artist.events[event].venue.website;
		var site = artist.events[event].website;
		var out = "<table frame=\"border\" rules = \"all\" class = \"event_table\" id = \"" + event_num + "\"><tr> \
					<td class = \"cal\"> \
						" + day + "<br/> \
						<font size=\"+4\">" + date + "</font><br/> \
						" + time + " \
					</td> \
					<td class = \"info\"> \
						<div class = \"img\"><img src = \""+artist.image+"\"/></div> \
						Artist: " + name + "<br/> \
						" + ((name != title) ? "Event Title: " + title + "<br/> " : "") + " \
						Roster: " + roster + "<br/> \
						Venue: <a href = \"" + venue_url + "\">" + venue + "</a><br/> \
						" + ((site) ? "<a href = \"" + site + "\"> Tickets </a>" : "") +" \
					</td> \
				</table>";
		//$("#"+event_num).
		var counter = 0;
		/*
		var temp = $(".event_table:eq("+counter+")");
		while(temp.data("date") != undefined && date_compare(date,time,temp.data("date"),temp.data("time")) > 0) {
			temp= $(".event_table:eq("+(++counter)+")");
		}
		
		if(temp.data("date") == undefined)
			$("#body").append(out);
		else
			$(".event_table:eq("+(counter-1)+")").after(out);
		$("#"+event_num).data("date",date);
		$("#"+event_num).data("time",time);
		*/
//		if($.browser.mozilla){	//WHY U NO WORK
			var temp = {};
			temp.date = date;
			temp.time = time;
			displayed.push(temp);
			displayed.sort(date_compare);
			var counter = displayed.indexOf(temp);
			if (displayed.length == 1)
				$("#body").append(out);
			else if (counter == 0)
				$(".event_table:eq("+(counter)+")").before(out);
			else
				$(".event_table:eq("+(counter-1)+")").after(out);
//		}
//		else
//			$("#body").append(out);
		$("#"+event_num).animate({
	  		opacity: "0"
	  		}, 0, function(){
	  	$(this).animate({
	  		opacity: "255"
	  		}, 15000);
	  		});
	}
	//alert(artist.image);
	artist.displayed = true;
}

function run(){
	
	//alert(all_artists.length);
//	for (var items in all_artists) {
//		all_artists[items] = getLocalEvents(all_artists[items],items);
//		var table = prettyPrint(all_artists[items], { /*optional options object */ } );
//		document.body.appendChild(table);	
//	}
//	return;
	var periods = ["overall","12month","6month","3month","7day"];
//	all_artists["test"] = {};
//	all_artists["test"].mbid = 123423;
//	all_artists["test"].events = [{}, "a", 3];
	for(var per in periods) {
		lastfm.user.getTopArtists({user: u_name, period: periods[per], limit: 100}, {success: function(a){
			for(var art in a.topartists.artist) {
				if(!(all_artists[a.topartists.artist[art].name])) {
					all_artists[a.topartists.artist[art].name] = {};
					all_artists[a.topartists.artist[art].name].name = a.topartists.artist[art].name;
					all_artists[a.topartists.artist[art].name].mbid = a.topartists.artist[art].mbid;
					all_artists[a.topartists.artist[art].name].events = [];
					all_artists[a.topartists.artist[art].name].displayed = false;
					all_artists[a.topartists.artist[art].name].image = a.topartists.artist[art].image[3]["#text"];
					lastfm.artist.getEvents({artist: a.topartists.artist[art].name, mbid: all_artists[a.topartists.artist[art].name].mbid}, {success: function(e){
//						if(e.events != null) {
						if(e.events["@attr"])
							var namae = e.events["@attr"].artist;
						else							
							var namae = e.events.artist;
							for(var evs in e.events.event) {
								if(e.events.event[evs].venue && e.events.event[evs].venue.location.city.toLowerCase().indexOf(met.toLowerCase()) != -1) {
									all_artists[namae].events.push(e.events.event[evs]);
								}
							}

							if(all_artists[namae].events[0])
								display_event(all_artists[namae]);
//						}
					}, error: function(code, message){alert("Error in Events: " + message);}});
				}
			}
		}, error: function(code, message){alert("Error in Top Artists: " + message);}});
	}
/*	for(var arts in all_artists){
		lastfm.artist.getEvents({artist: arts, mbid: all_artists[arts].mbid}, {success: function(e){
			if(e.events != null) {
				for(var evs in e.events.event) {
					if(e.events.event[evs].venue.location.city.toLowerCase().indexOf(met.toLowerCase()) != -1) {
						//all_artists[e.events["@attr"].artist].events.push(e.events.event[evs]);
					}
				}
			}
		}, error: function(code, message){alert("Error in Events: " + message);}});
	}
	*/

	/*
	
	for(var per in periods) {
	lastfm.user.getTopArtists({user: u_name, period: periods[per]}, {success: function(a){
		for(var art in a.topartists.artist){
			lastfm.artist.getEvents({artist: a.topartists.artist[art].name, mbid: a.topartists.artist[art].mbid}, {success: function(e){
							if(e.events != null) {
								for(var evs in e.events.event) {
									if(e.events.event[evs].venue.location.city.toLowerCase().indexOf(met.toLowerCase()) != -1) {
		//								lastfm.artist.getImages({artist: e.events["@attr"].artist}, {success: function(i){
		//				$("#body").append("<br/><a href = \"" + e.events.event[evs].website + "\"><img src = \"" + i.images.image[0].sizes.size[2]["#text"]+ "\" /> </a> <input id = \"city\" name = \"" + i.images["@attr"].artist + "\" type = \"text\" readonly = \"readonly\"  value = \"" + i.images["@attr"].artist + "\"> </input>");
		//			}, error: function(code,message){}});
								//		var table = prettyPrint( e.events["@attr"].artist, { } );
								//		var table = prettyPrint( data.topartists.artist[art].image, {} );
								//		document.body.appendChild(table);
										//document.body.appendChild("<\br>");
								//		document.write("<img src= " + data.topartists.artist[art].image[3]["#text"] + ">");
									}
								}
							}
				}, error: function(code, message){
					alert(message);
				}});
			}
		}, error: function(code, message){
			alert(message);
		}});
	}
	*/
}

function set_city(value) {
	met = value;
	if(!localStorage.getItem('city')) {
		localStorage.setItem('city',met);
   		$("#body").prepend("<a href  = \"javascript:alert(localStorage.getItem('city'))\" style=\"font-size:13px;float:right\"><small> Change location </small></a>");
	}
}

function submitenter(myfield,e){
var keycode;
if (window.event) 
	keycode = window.event.keyCode;
else if (e) 
	keycode = e.which;
else 
	return true;
if (keycode == 13 && myfield.value != ""){
	if(myfield.id == "c") {
		set_city(myfieldv.value);
		$('#c').animate({
		width: "20%",
	 //   opacity: 0.4,
	  //  marginLeft: "5%",
		fontSize: "12px",
		borderColor: "#8B6969",
		borderWidth: "2px",
		borderRadius: "5px",
	 //   -moz-border-radius: "5px"
	//    value: form.inp.value
	  }, 1500);
	  al(myfield);
	}
	else if(myfield.id == "username"){
		u_name = myfield.value;
		//all_artists = getAllTopArtists();
		//all_artists = getAllTopArtists().sort(function names(a,b) { if(a[0].toLowerCase() < b[0].toLowerCase()) return -1; else if(a[0].toLowerCase() > b[0].toLowerCase())  return 1; else return 0;});
		$(".main").attr("readonly","readonly");
		$(".main").attr("onKeyPress","return false");
	  lastfm.user.getInfo({user : u_name},{success:function(data){ 
	  $("#body").append("<p id = \"city_message\"> <br/>Choose from the following metropolitan areas: <br/> </p>");
	  $("#city_message").animate({
	  	opacity: "0"
	  }, 0, function(){
	  	$(this).animate({
	  opacity: "255"
	  }, 2000);
	  });
	  count = COUNTRY[data.user.country]; 
//	  $("#city_message").attr("opacity","0");
//	  $("#city_message").animate({opacity: "255"},1500);
		lastfm.geo.getMetros({country: count },{success: function(data){
		met_array = data.metros.metro.sort(function names(a,b) { if(a.name.toLowerCase() < b.name.toLowerCase()) return -1; else if(a.name.toLowerCase() > b.name.toLowerCase())  return 1; else return 0;});
		for(var mets in met_array){
			$("#body").append("<input class = \"city\" name = \"" + mets + "\" type = \"text\" readonly = \"readonly\" value = \"" + met_array[mets].name + "\" onClick = \"return clickCity(this,event)\"> </input>");
	$("input[name="+mets+"]").animate({
	  	opacity: "0"
	  }, 0, function(){
	  	$(this).animate({
	  opacity: "255"
	  }, 20000);
	  });
			}

		/* Use data. */
		//met = data.metros.metro[43].name;
	}, error: function(code, message){
		/* Show error message. */
		document.write(message);
	}});
	  
	  },error:function(data){}});

	}
	else{
		indiv_run(myfield.value);
		//weird thing when autofilling from dropdown, doesn't submit..
	}
	return false;
   }
else
   return true;
}

function clickCity(form){
	  for(var i = 0; i < met_array.length; i++) {
	  	if(i != form.name)
	  		$("input[name="+i+"]").animate({
	  		opacity: "0"
	  		}, 1500, function() {
	  			$(this).remove();
	  		});
	  	else
	  		$("input[name="+i+"]").animate({
	  		opacity: "0"
	  		}, 1500,function(){	  /*$("input[name="+form.name+"]").toggleClass("main city");
	  	$("input[name="+form.name+"]").animate({
	  	opacity: "255"
	  }, 2000, function(){
	  	$(this).attr("onClick","");
	  });*/
	  	$(this).remove();
	  });
	  }

	  
	  $("#city_message").animate({
	  		opacity: "0"
	  		}, 1500, function() {
	  			$(this).remove();
	  		});
	  $("#body").append("<br/><br/>");
	  set_city(met_array[form.name].name);
	  run();
	  return true;
}

/*
onLoad: 
  -check url
  -watch for enter on field
  -if they have cities stored, don't ask for more cities and use change location

onSubmit: 
  -get artists through AJAX
  -get country if there is
  -display cities (in country)
  -wait for all clicks on city divs (and store with client-side storage)
  -animate cities away

run:
  -go through artists (if returned) and cross analyze with cities
  -display each when done

other:
  -change location (row across top of nice divs that expand into corresponding cities, cool collapse)
 */