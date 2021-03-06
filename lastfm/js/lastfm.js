/*TODO:
  -ip city / multiple city storage
  -change location / merge with choose location
  -investigate if lastfm recommended events includes this entire set. if so, filter by top artists still. if it doesn't then add loading gif
 */

$(document).ready(function() {	
	console.log(geoip_country_code());
	console.log(geoip_region_name());

	if(localStorage.getItem('location'))
	    $('body').prepend('<a href = \"javascript:change_loc()\" style=\"font-size:13px;float:right\" id=\"ch_location\"><small> Change location </small></a>');
	else
	    $('body').prepend('<a href = \"javascript:choose_loc()\" style=\"font-size:13px;float:right\" id=\"ch_location\"><small> Choose location </small></a>');

	return true;
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
	     $("body").prepend('<div style="position:absolute;top:0px;right:0px;font-size:13px;" id="ch_loc"><a href = "javascript:change_loc()"><small> Change location </small></a></div>');

	 // run();
   }

 });

function choose_loc() {
    var ip_country = geoip_country_code();
    $('body').prepend('<div class="locations" style="width:85%;font-weight:lighter;float:left; "></div>');
    lastfm.geo.getMetros({},{success: function(result){
		//global
		locations = {};
		for (var index in result.metros.metro){
		    if(!locations[result.metros.metro[index].country])
			locations[result.metros.metro[index].country] = [];
		    locations[result.metros.metro[index].country].push(result.metros.metro[index].name);
		}
		var counter = 1;
		for (var index in locations) {
		    $('.locations').append('<div id="'+index.split(' ').join('')+'" onclick="choose_country(this.id);" style="-moz-border-radius: 3px; border-radius: 3px; background:grey;font-size:10px;float:left;margin:3px; cursor:pointer;opacity:0.0;padding-left:3px;padding-right:3px;padding-top:1px;padding-bottom:1px;text-align:center;">'+index+'</div>');
		    $('#'+index.split(' ').join('')).animate({opacity: 1.0},25*counter++);
		}
	    }, error: function(code,message) {
	    }
	});
}

function choose_country(id){
    for (var index in locations) {
	var index = index.split(' ').join('');
	if (index != id) {
	    $('#'+index).animate({opacity:0.0},100,function(){$(this).remove();});
	}
	else
	    $('#'+index).animate({opacity:0.0},100,function(){$(this).animate({opacity:1.0},500);});
	    //	    $('#'+index).animate({background: 'blue'},250);
    }

}

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
			borderRadius: "5px"
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