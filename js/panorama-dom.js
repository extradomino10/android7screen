(function(){

	//Inicializacion de Menu panoramico
	var menuContainer = $('div#menu-container .panorama').css('overflow', 'hidden'),
		panoramaMenu = new Panorama(menuContainer, $('div#menu-container').find('.nav-control'));


	panoramaMenu.nav.find('.nav-button').on('click', function(){
		panoramaMenu.setCurrent( $(this).data('dir') );
		panoramaMenu.transition();
	});


	menuContainer
		.on('mousewheel', function(event, delta, deltaX, deltaY) {
			var move = panoramaMenu.scrollPos + (delta * panoramaMenu.scrollWidth);
			//a.slice(-2)[0]: penultimo elemento del array a
			if (panoramaMenu.panelItemsLen > 1)
				if(move >= 0 && move <= panoramaMenu.panelItemsMargin.slice(-2)[0]){
					panoramaMenu.transition(move);
				}
		});

	var scrollSwipe = 40;
	$$('div#menu-container .panorama')
		.swipeLeft(function(){
			panoramaMenu.setCurrent( 'next' );
			panoramaMenu.transition();
		});
	$$('div#menu-container .panorama')
		.swipeRight(function(){
			panoramaMenu.setCurrent( 'prev' );
			panoramaMenu.transition();
		});
	 	/*.touchwipe({
			     wipeLeft: function() { 
					panoramaMenu.setCurrent( 'next' );
					panoramaMenu.transition();
			     },
			     wipeRight: function() { 
					panoramaMenu.setCurrent( 'prev' );
					panoramaMenu.transition();
			     },
			     min_move_x: 10,
			     min_move_y: 10,
			     preventDefaultEvents: true
		});*/


	//Inicializacion de Dashboard panoramico
	var dashboardContainer = $('div#dashboard-container .panorama').css('overflow', 'hidden'),
		panoramaDash = new Panorama(dashboardContainer, $('div#dashboard-container').find('.nav-control'));


	panoramaDash.nav.find('.nav-button').on('click', function(){
		panoramaDash.setCurrent( $(this).data('dir') );
		panoramaDash.transition();
	});
	panoramaDash.addPanel(900);
	panoramaDash.addPanel(750);

	dashboardContainer
		.on('mousewheel', function(event, delta, deltaX, deltaY) {
			var move = panoramaDash.scrollPos + (delta * panoramaDash.scrollWidth);
			//a.slice(-2)[0]: penultimo elemento del array a
			if (panoramaDash.panelItemsLen > 1)
				if(move >= 0 && move <= panoramaDash.panelItemsMargin.slice(-2)[0]){
					panoramaDash.transition(move);
				}
		});
	
	$('.panorama-hide').click(function(){
        $(this).parent().parent().animate({'top':'-800px'},500,function(){
            $('#overlay').fadeOut('fast');
        });
    });

    //Remover Panel
    dashboardContainer.on('click', '.panel-close', function(e){
    	//$(this).closest('li')
    	$(this).parent().parent().hide('slow', function(){
    		panoramaDash.removePanel($(this));
    	});
    });

    //Efecto Hover para panel-close
    $('.panel-close').hover(
    	function(){
    		//$(this).closest('li').animate({'opacity': 0.4}, 50);
    		$(this).parent().parent().animate({'opacity': 0.4}, 50);
    	},
    	function(){
    		//$(this).closest('li').animate({'opacity': 1}, 50);
    		$(this).parent().parent().animate({'opacity': 1}, 50);
    	});

})();