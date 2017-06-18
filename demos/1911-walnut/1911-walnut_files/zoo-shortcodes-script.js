


jQuery(document).ready(function($) {

"use strict";  
/*-----------------------------------------------------------------------------------*/
/* Scroll Animation
/*===================================================================================*/

	
	if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){
       	var s = skrollr.init({
			smoothScrollingDuration:30,
			forceHeight:false
		});
    }
    else{
		$('html').addClass('noSkrollr');
    }



/*-----------------------------------------------------------------------------------*/
/* Skill Rating Bar
/*===================================================================================*/
	var	bar = $('.bar');
	//Check if Elements are visible
	$.fn.visible = function(partial){
		var $t        = $(this),
		$w        = $(window),
		viewTop     = $w.scrollTop(),
		viewBottom    = viewTop + $w.height(),
		_top      = $t.offset().top,
		_bottom     = _top + $t.height(),
		compareTop    = partial === true ? _bottom : _top,
		compareBottom = partial === true ? _top : _bottom;
		return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
	};
	function animateBar(){

		bar.each(function() {
		if( $(this).visible(true) ) {
		    $(this).addClass('enabled');
		  	} 
		else { $(this).removeClass('enabled'); }
		});
	};
/*-----------------------------------------------------------------------------------*/
/* Superslides
/*===================================================================================*/



	$('.slides-container .slide-caption img').addClass('preserve');	
	$('.slide-caption').each(function(){
		$(this).children().not('.scrollanimation, .videobg').wrapAll('<div class="captioninner"></div>');

	});



	function captionPosition(){
		$('#superslider_home .captioninner').each(function(){
			var captionHeight = $(this).outerHeight() / 2,
			captionMargin = '-' + (captionHeight + 25) + 'px';
			$(this).css('marginTop', captionMargin);
		});
	}
	

	if (typeof superslider_animation !== 'undefined') {
		$('#superslider_home').superslides({
			animation: superslider_animation,
			play: superslider_play, // Milliseconds for delay
			slide_speed: 1000,
			pagination: superslider_pagination,
			hashchange: false,
			scrollable: true // Allow scrollable content inside slide
		});
		if(superslider_animation == 'fade'){
			setTimeout(function() {
				if ( $('.slides-container').children().length > 1 ) {
		  			$(".slides-container, .slides-navigation").addClass('loaded');
		  	
		  		}
		  		else{
		  			$(".slides-container").addClass('loaded');
		  			$(".slides-navigation").remove();
		  
		  		}
		  		$("#superslider_loading").addClass('unloaded');
		  		captionPosition();
			}, 400);
		}
	}
	else{
		$('#superslider_home').superslides({
			scrollable: false // Allow scrollable content inside slide
		});
	}

	$('body, html').on('init.slides', function() {

  		if ( $('.slides-container').children().length > 1 ) {
  			$(".slides-container, .slides-navigation").addClass('loaded');

  		}
  		else{
  			$(".slides-container").addClass('loaded');
  			$(".slides-navigation").remove();
  		}
  		

  		$("#superslider_loading").addClass('unloaded');
  		captionPosition();


	});


	/*Touch Swipe*/
	/*if ($('html').hasClass("noSkrollr")) {  
	    $("#superslider_home").swipe( {
	        swipeLeft:function() {
	          $('.slides-navigation .next').trigger('click'); 
	        },
	        swipeRight:function() {
	          $('.slides-navigation .prev').trigger('click'); 
	        },
	    });
	}*/

	

/*-----------------------------------------------------------------------------------*/
/* Video Slides
/*===================================================================================*/


	if( $('.youtubeplayer').length ){
		$('.videobg').each( function() {
			var youtubeplayer = $(this).find('.youtubeplayer'),
			tubelink = $(this).find('.tubelink').val();
			
			youtubeplayer.tubeplayer({
			    width: '', 
			    height: '', 
			    initialVideo: tubelink, 
			    preferredQuality: "default"
			});
		});
	}
	if( $('.vimeoplayer').length ){
		var vimeoid = 1;
		$('.vimeoplayer').each( function() {
			$(this).attr("id", "vimeoplayer" + vimeoid);
			$(this).attr("src", $(this).attr("src").replace("vimeoplayer", "vimeoplayer" + vimeoid++));
		});
	}

	function videoSlides(){
	
		if (!$('html').hasClass("noSkrollr")) {
			var currentSlideIndex = $('#superslider_home').superslides('current'),
		        currentSlide = $('.slides-container > li')[currentSlideIndex];

			/*Local Video*/
			if (Modernizr.video) {

		        $("video").each(function () { this.pause() });

		        var currentVid = $(currentSlide).find("video")[0];                  
		        if ($(currentVid).length) {     
		            $(currentVid)[0].oncanplaythrough = $(currentVid)[0].play() 
		        }
		    }
		    else{
		    	$('video').hide;
		    }

			/*Vimeo*/
			if( $('.vimeoplayer').length ){
				
				$('.vimeoplayer').each( function() {

					var frameid = $(this).attr('id'),
						vimeoframe = $('#'+ frameid)[0],
					    vimeoplayer = $f(vimeoframe);
					
				    vimeoplayer.addEvent('ready', function() {
				 		vimeoplayer.api('pause');
					});
				
				   	var currentVimeo = $(currentSlide).find(vimeoframe)[0];                  
				    if ($(currentVimeo).length) {     
				        vimeoplayer.addEvent('ready', function() { vimeoplayer.api('play'); });
				    }
				});		
			}    
			/*YouTube*/
			if( $('.youtubeplayer').length ){
				$.tubeplayer.defaults.afterReady = function($player) { 
					$('.videobg').each( function() {
						var youtubeplayer = $(this).find('.youtubeplayer');
						youtubeplayer.tubeplayer("pause");
						var currentTube = $(currentSlide).find(youtubeplayer);                  
						if ($(currentTube).length) {     
						    youtubeplayer.tubeplayer("play");
						}
					});	
				};

				$('.videobg').each( function() {
					var youtubeplayer = $(this).find('.youtubeplayer');
					youtubeplayer.tubeplayer("pause");
					var currentTube = $(currentSlide).find(youtubeplayer);                  
					if ($(currentTube).length) {     
					    youtubeplayer.tubeplayer("play");
					}
				});	
			}
		}
		else{
			$('.videobg').hide();
		}	
	}

	$('body, html').on('animated.slides || init.slides', function() {   
		videoSlides();
	});
	if(superslider_animation == 'fade'){
		setTimeout(function() {
			videoSlides();
		}, 600);
	}

  	function videoPos(){
		$('.videobg .video').each(function(){
			var vidWidth = $(this).outerWidth() / 2 + 'px';
			$(this).css({'position':'absolute', 'left':'50%', 'margin-left':'-' + vidWidth});

		});	
  	}
  	videoPos();

/*-----------------------------------------------------------------------------------*/
/* Portfolio
/*===================================================================================*/

	function riftHeight(){
		$('#portfolioinner li').each(function(){
			var height = $(this).outerWidth();
			$(this).css('height', height );
		});
	}

	$('.rift').rift();
	$('#portfolioinner').mixitup({
		onMixEnd: function(){
			$('.mix:visible').removeClass('mixHidden');
			$('.mix:hidden').addClass('mixHidden');
			
			if (!$('html').hasClass("noSkrollr")) { s.refresh(); }

		}
	});
	riftHeight();
	$('.filter').click(function(){
		riftHeight();
	});
	$(".grid > div").fitVids();
	if( $('#main').length ){
		var	main = $('#main, #primary-nav, .footer');
	}
	else{
		var main = $('body').children().not( ".mfp-bg, .mfp-wrap" );
	}
		
	var	topbar = $('#topbar,#active-bar'),
		activeBar = $('#active-bar'),
		portfolio = $(".nav-links li a:contains('Portfolio') , .nav-links li a:contains('portfolio')"),
		scrollY;
	$('#portfolioinner').magnificPopup({
		delegate: '.mix:not(.mixHidden) a',
		closeMarkup:'<div class="loadernav"><button title="%title%" class="mfp-close"><i class="mfp-close-icn">&times;</i></button></div>', 
		closeBtnInside: false, 
		closeOnBgClick:false,
		type: 'ajax',
		fixedContentPos:false,
		mainClass: 'mfp-fade',
		midClick: true,
		gallery: {
			enabled: true, 
			preload: [0,2], 
			navigateByImgClick: true,
			tCounter: '<span class="mfp-counter">%curr% of %total%</span>' // markup of counter
		},
		callbacks: {
			parseAjax: function(mfpResponse) {
              	mfpResponse.data = $(mfpResponse.data).siblings('.portfolios');
            },
			change: function() {
				if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){
					$.magnificPopup.instance.next = function () {return false}; 
					$.magnificPopup.instance.prev = function () {return false}; 
				}
			},
			ajaxContentAdded: function() {
				if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){
					$('.parallaxBackground').each(function(){
						if($(this).prev().html() == false){
							$(this).prev().remove();
						}
					});
					$(".grid > div").fitVids();
					initFlexSliders();
				}
				else{
					$('article').waitForImages(function() {
						$(".grid > div").fitVids();
						initFlexSliders();
						var loadernav = $('.loadernav');
						$(window).scrollTop(0);
						if (!$('html').hasClass("noSkrollr")) { s.refresh(); }
						$('.parallaxBackground').each(function(){
							if($(this).prev().html() == false){
								$(this).prev().remove();
							}
						});
						loadernav.animate({ marginTop: "0px" }, 200 );
						$.magnificPopup.instance.next = function () { 
							if (loadernav.is(':animated') || $('.mfp-container').hasClass('mfp-s-loading') ) {
						        return false;
						    }else{
							loadernav.animate({ marginTop: "-50px" }, 200 ); setTimeout(function(){ $.magnificPopup.proto.next.call(this); }, 200); };
							} 
						$.magnificPopup.instance.prev = function () { 
								if (loadernav.is(':animated') || $('.mfp-container').hasClass('mfp-s-loading') ) {
						        return false;
						    }else{
							loadernav.animate({ marginTop: "-50px" }, 200 ); setTimeout(function(){ $.magnificPopup.proto.prev.call(this); }, 200); };
							}
						$.magnificPopup.instance.close = function () { loadernav.animate({ marginTop: "-50px" }, 100 ); setTimeout(function(){ $.magnificPopup.proto.close.call(this); }, 100); };
					});
				}	
			},
			open: function() {
				if( $('#wpadminbar').length ){
					 var wpadminbar = $('#wpadminbar').outerHeight() + 'px';
					  $('.loadernav').css('top',wpadminbar);
				}
			    if($('.mix:not(.mixHidden)').length > 1){
			    	$('.loadernav').append(this.arrowLeft.add(this.arrowRight));
			    }	
				scrollY = window.pageYOffset || document.documentElement.scollTop;
				$('.mfp-wrap').css('top','0');
				$('.lt-ie8 body').css('overflow','auto');
				main.addClass('hide');
				topbar.animate({ marginTop: "-1px" }, 200)
				if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){ $.magnificPopup.instance.close = function () {return false}; }
			},
			close: function() {
	    		main.removeClass('hide');
	    		topbar.css('marginTop','0');
	    		$('.lt-ie8 body').css('overflow','hidden');
			},
	    	afterClose: function() {
				$(window).scrollTop(scrollY);
		   		riftHeight();
		   		captionPosition();
		   		setTimeout(function(){ 
		   			if (!$('html').hasClass("noSkrollr")) { s.refresh(); }
		   			portfolio.parent().addClass('nav-active').siblings().removeClass('nav-active'); 
		   			var xMove = $('.nav-active').offset().left;
					var barWidth =  $('.nav-active').outerWidth() + 'px';
					activeBar.css({ left: xMove, width: barWidth });
	    		}, 200);
	  		}
		}
	});
/*-----------------------------------------------------------------------------------*/
/* Parallax Section
/*===================================================================================*/
	var parallaxSection = 1;					
	$('.parallaxSection').each(function(){
		$(this).attr("id", "parallaxSection" + parallaxSection++);
	})	
	$('.scrollanimation').each(function(){
		if ($(this).parent().parent().hasClass('parallaxSection')){
		    var parallaxSectionId = $(this).parent().parent().attr("id");
		    $(this).attr("data-anchor-target", "#" + parallaxSectionId);
		}
		else if($(this).parent().hasClass('iconholder')){
			var parallaxSectionId = $(this).closest('.parallaxSection').attr("id");
		    $(this).attr("data-anchor-target", "#" + parallaxSectionId);
		}
	});
/*-----------------------------------------------------------------------------------*/
/* Parallax Background
/*===================================================================================*/
	$('.parallaxBackground').each(function(){
		if ($(this).parent().hasClass('page')){
			$(this).parent().addClass('nopadding');
		}
		if($(this).next().hasClass('parallaxSection')){
			$(this).next().css('margin-top','0');
		}
		if($(this).prev().html() == false){
			$(this).prev().remove();
		}
	});
	$('#main > div:nth-child(2) .parallaxBackground').removeAttr("data-bottom-top");	

/*-----------------------------------------------------------------------------------*/
/* Tabbed Page
/*===================================================================================*/
	$('ul.tabs').each(function(){
		var $active, $content, $links = $(this).find('a');
		$active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
		$active.addClass('active');
		$content = $($active.attr('href'));
		$links.not($active).each(function () {
			$($(this).attr('href')).hide();
		});
		$(this).on('click', 'a', function(e){
		    $active.removeClass('active');
		    $content.hide();
		    $active = $(this);
		    $content = $($(this).attr('href'));
		    $active.addClass('active');
		    $content.show();
			e.preventDefault();
			if (!$('html').hasClass("noSkrollr")) { s.refresh(); }
		});
	});  

/*-----------------------------------------------------------------------------------*/
/* Googlemap - slightly modified code from http://aquagraphite.com/
/*===================================================================================*/
	function googleMap(){
		$('.googlemap').each( function() {
			var $map_id = $(this).attr('id'),
			$title = $(this).find('.title').val(),
			$location = $(this).find('.location').val(),
			$zoom = parseInt( $(this).find('.zoom').val() ),
			$hue = $(this).find('.hue').val(),
			$saturation = $(this).find('.saturation').val(),
			$lightness = $(this).find('.lightness').val(),
			$iconLink = $(this).find('.iconLink').val(),
			geocoder, map;
			var styles = [
			  {
			    stylers: [
			      { hue: $hue },
			      { saturation: $saturation },
			      { lightness: $lightness}
			    ]
			  }
			];

			var mapOptions = {
				zoom: $zoom,
				scrollwheel: false,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				styles: styles
			};
			geocoder = new google.maps.Geocoder();
			geocoder.geocode( { 'address': $location}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					var mapOptions = {
						zoom: $zoom,
						scrollwheel: false,
						mapTypeId: google.maps.MapTypeId.ROADMAP,
						styles: styles
					};
					map = new google.maps.Map($('#'+ $map_id + ' .map_canvas')[0], mapOptions);
				
					//MAP IN TAB
					$('.tabs li a').click(function(){
						var content = $(this).attr('href');
						if($(content).find('.googlemap').length > 0){
							setTimeout(function() {
								google.maps.event.trigger(map, 'resize');
								map.setCenter(results[0].geometry.location);
							}, 0);
						}
					});



					map.setCenter(results[0].geometry.location);
					var marker = new google.maps.Marker({
					  map: map, 
					  position: results[0].geometry.location,
					  title : $location,
					  icon: $iconLink
	
					});
					var contentString = '<div class="map-infowindow">'+
						( ($title) ? '<h3>' + $title + '</h3>' : '' ) + 
						$location + '<br/>' +
						'<a href="https://maps.google.com/?q='+ $location +'" target="_blank">View on Google Map</a>' +
						'</div>';
					var infowindow = new google.maps.InfoWindow({
					  content: contentString
					});
					google.maps.event.addListener(marker, 'click', function() {
						infowindow.open(map,marker);
					});
				} else {
					$('#'+ $map_id).html("Geocode was not successful for the following reason: " + status);
				}
			});




		});
	};
/*-----------------------------------------------------------------------------------*/
/* Flex Slider
/*===================================================================================*/
	
function initFlexSliders() {	
	if (typeof flex_slider_animation !== 'undefined') {

		$('#testimonials').flexslider({
		    animation: 'fade',
		    controlNav: false,
		    useCSS: false, 
			slideshowSpeed: 4000,
		    slideshow: testimonials_auto_play

		});
		$('.flexslider:visible').flexslider({
			animation: flex_slider_animation,              				//String: Select your animation type, "fade" or "slide"
			direction: flex_slider_direction,        					//String: Select the sliding direction, "horizontal" or "vertical"
			startAt: 0,                     							//Integer: The slide that the slider should start on. Array notation (0 = first slide)
			slideshow: flex_slider_auto_play,              				//Boolean: Animate slider automatically
			slideshowSpeed: flex_slider_slideshowspeed,     			//Integer: Set the speed of the slideshow cycling, in milliseconds 
			initDelay: 0,                   							//{NEW} Integer: Set an initialization delay, in milliseconds
			useCSS: false,                   							//{NEW} Boolean: Slider will use CSS3 transitions if available
			touch: false,                    							//{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
			video: false,                   							//{NEW} Boolean: If using video in the slider, will prevent CSS3 3D Transforms to avoid graphical glitches
			controlNav: flex_slider_controlnav,               							//Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
			prevText: "Previous",           							//String: Set the text for the "previous" directionNav item
			nextText: "Next",               							//String: Set the text for the "next" directionNav item
			keyboard: true,                 							//Boolean: Allow slider navigating via keyboard left/right keys
			multipleKeyboard: false,       								//{NEW} Boolean: Allow keyboard navigation to affect multiple sliders. Default behavior cuts out keyboard navigation with more than one slider present.
			mousewheel: false,              							//{UPDATED} Boolean: Requires jquery.mousewheel.js (https://github.com/brandonaaron/jquery-mousewheel) - Allows slider navigating via mousewheel
			pausePlay: false,               							//Boolean: Create pause/play dynamic element
			pauseText: 'Pause',             							//String: Set the text for the "pause" pausePlay item
			playText: 'Play',  
			start: function(){
				if (!$('html').hasClass("noSkrollr")) { s.refresh(); }

			} 
		});
	}
	else{
		$('.flexslider:visible, #testimonials').flexslider();
	}
};

initFlexSliders();
$('.tabs li a').click(function(){
	setTimeout(function() {
		initFlexSliders();
	}, 150);
});

/*-----------------------------------------------------------------------------------*/
/* Events
/*===================================================================================*/
		

	$(window).load(function(){
		if (!$('html').hasClass("noSkrollr")) { s.refresh(); }
		googleMap();
		captionPosition();

	});
	
	$(window).scroll(function() {
		animateBar();	
	});


	$(window).resize(function() {
	 riftHeight();
	  setTimeout(function() {
	  	videoPos();
	    captionPosition();
	    if (!$('html').hasClass("noSkrollr")) { s.refresh(); }
	  }, 150);
	});


});//End Document Ready





