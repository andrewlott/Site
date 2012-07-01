var MX;

$(document).ready(function() {
    $(".wrapper").mousemove(function(e){
	MX = e.clientX;
    });
    //bkg: 2 is off, 1 is on
    localStorage['bkg'] = localStorage['bkg'] || 1;//set on so toggle turns off
    if(localStorage['bkg'] == 1){
	localStorage['bkg'] = 2;
	toggleBkg();
    }
});

function toggleBkg() {
    
    var bkg = $('#bkg_canvas');
    if (localStorage['bkg'] == 1) { //localstorage is whack
	console.log('Background off');
	bkg.remove();
	localStorage['bkg'] = 2;
    }
    else {
	console.log('Background on');
	bkg = document.createElement('canvas');
	
	//$('<canvas id="bkg_canvas" height=100% width=100% style="position: fixed; top:0; left:0; z-index: 0;"></canvas>'); //for some reason using jquery to create the element doesn't work
	//$('.wrapper').prepend('<canvas id="bkg_canvas" data-processing-sources="test.pde" height=100% width=100% style="position: fixed; top:0; left:0; z-index: 0;"></canvas>');
	//bkg = $('#bkg_canvas');
	

	$(bkg).attr('id','bkg_canvas').css({height:'100%',width:'100%',position:'fixed',top:0,left:0,'z-index':0});
	Processing.loadSketchFromSources(bkg, ['test.pde']); //new processing instance?
	$('.wrapper').prepend(bkg);
	localStorage['bkg'] = 1;
    }
    //console.log(localStorage['bkg']);
}