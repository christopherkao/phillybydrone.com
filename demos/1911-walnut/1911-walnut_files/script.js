/* 
*	Custom jQuery.
*	Other script located in the Zoo Shortcodes Plugin. 
*	zoo-shortcodes/js/zoo-shortcodes-script.js 
*/
"use strict";  	
jQuery(document).ready(function($) {

/*-----------------------------------------------------------------------------------*/
/* Navigation
/*===================================================================================*/
	var mainNav = $('.mainnav'),
		superSliderHome = $('#superslider_home'),
		home = $('#main > div:first-child'),
		about = $('#main > div:nth-child(2)'),
		xMove, barWidth, realtop, aboveHeight, halfHeight;	
		$(".mainnav").removeClass('mainnavhide');	
	
	/*Active Item Highlight Bar*/
	function activeNav() {
		xMove = $(".nav-active").offset().left;
		barWidth =  $(".nav-active").outerWidth() + 'px';
		$('#active-bar').css({ left: xMove, width: barWidth }); 
	};
	if( $('#wpadminbar').length )
	{
		var wpadminbar = '-' + $('#wpadminbar').outerHeight() + 'px';
		superSliderHome.css('margin-top',wpadminbar);
	}
	
	/*Setup External Links*/

	$('.nav-links li a').addClass('external');
 	$('.nav-links li.active-children > a').removeClass('external');
    $('.nav-links li.current-menu-item > a').removeClass('external');
 	$('.nav-links li.page-section-parent > a').removeClass('external');
	
	/*Smooth Scrolling*/
	$('.nav-links').onePageNav({
		currentClass: 'nav-active',
		scrollThreshold: 0.5,
		scrollSpeed: 800,
		scrollOffset: 54,
		filter: ':not(.external)'
	}); 
	if($('body').hasClass('home')){
		$('.mainLogo a, .footerLogo').click(function(event){
			 event.preventDefault();
			$('html, body').animate({scrollTop: 0}, 800);
		});
	}
	$('.button').click(function(event){
		var link = $(this).attr('href');
		if(link.indexOf("#") >= 0){
			event.preventDefault();
			$('html, body').animate({scrollTop: $(link).offset().top - 54}, 800);
		}
	});

	/*Mobile Navigation Dropdown*/
	$("#menubutton").click(function(){
		
		if( $('.mainnav').is("[style*='position: absolute;']")){
			$(".nav-links").slideToggle();
			$('html, body').animate({scrollTop: home.outerHeight()}, 800);
		} 
		else{
			$(".nav-links").slideToggle();
		}
	});

	$(".mainnav ul > li a").click(function(){
		if($(window).width() <= 768) {
			$(".nav-links").css('display','none');
		}
	});

	/*Sticky Navigation*/
	function stickyNav(){
		if( $('#superslider_home').length ){
			aboveHeight = home.outerHeight() - $(".mainnav").outerHeight();
			if( $('#wpadminbar').length ){
				var wpadminbar = $('#wpadminbar').outerHeight();
				aboveHeight = home.outerHeight() - $(".mainnav").outerHeight() - wpadminbar;		
			}

			if ($(window).scrollTop() > aboveHeight){
				mainNav.removeAttr( 'style' );
				mainNav.css({'position':'fixed', 'top':'0px'});
				if( $('#wpadminbar').length ){
					var wpadminbar = $('#wpadminbar').outerHeight() + 'px';
					mainNav.css({'position':'fixed', 'top': wpadminbar});		
				}
			}
			else if($(window).scrollTop() < aboveHeight ) {
				mainNav.removeAttr( 'style' );
				mainNav.css({'position':'absolute', 'top': aboveHeight});
				if( $('#wpadminbar').length ){
					var wpadminbar = $('#wpadminbar').outerHeight();
					mainNav.css({'position':'absolute', 'top': aboveHeight + wpadminbar});		
				}
			}
		}

	}
	stickyNav({}); 
	
	
	$(window).load(function(){
		activeNav();
		setTimeout(function() {
	    	stickyNav();

	  	}, 50);
	});
	$(window).scroll(function() {
		stickyNav();
	});
	$(window).resize(function() {
		activeNav();
		if($(window).width() > 768) {
			$(".nav-links").removeAttr("style");

		}
		setTimeout(function() {
	    	stickyNav();
	  	}, 11);
		
	});

});










