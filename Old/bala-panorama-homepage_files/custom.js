jQuery(document).ready(function() {
	
	if(/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) { 
    if(/OS [5]_\d(_\d)? like Mac OS X/i.test(navigator.userAgent)) {  
        // iOS 5 so Do Something   
		jQuery('html').addClass('ios5');
		}
    }

	
	if (jQuery('html').hasClass('ipad')) {
		jQuery('#navigation').css('overflow', 'auto');
	} else if (jQuery('html').hasClass('iphone')) {
		jQuery('#navigation').css('overflow', 'auto');
	}
	
	var FullscreenrOptions = { bgID: '#bgimg' };
	jQuery.fn.fullscreenr(FullscreenrOptions);
	
	jQuery('#menu-583-2 a').attr('target', '_blank');
	jQuery('#menu-421-2').append(jQuery('#share'));
	jQuery('#menu-421-2').hover(
		function() {
			jQuery('#share').css('visibility', 'visible');
		},
		function() {
			jQuery('#share').css('visibility', 'hidden');
		}
	);
	jQuery('#menu-680-2').append(jQuery('#follow'));
	jQuery('#menu-680-2').hover(
		function() {
			jQuery('#follow').css('visibility', 'visible');
		},
		function() {
			jQuery('#follow').css('visibility', 'hidden');
		}
	);
	
	jQuery('#realBody').scroll(
		function () {
			jQuery('#titleContainer').css('background-color', 'black');
			
			var topOfPage = jQuery(this).scrollTop();	
			
			if (topOfPage == '0') {
				jQuery('#titleContainer').css('background-color', 'transparent');
			}

				
		}
	);
	
	jQuery('h2.credentials').prepend(', ');
	
	//jQuery('.chrome .front #block-views-project-lists-block-1').css('position', 'relative').css('top', '-40px');
	
	jQuery('.hero-carousel').heroCarousel({
		easing: 'easeOutExpo',
		css3pieFix: true,
		onStart: function(){

		},
		onComplete: function(){
			if (jQuery('.hero-carousel article.current').prev().hasClass('first')) {
				jQuery('.hero-carousel article.last').css('visibility', 'visible');
			}
			jQuery('.overlay').remove();
			jQuery('.hero-carousel article').not('.current').append('<div class="overlay"></div>');
		}
	});
	
	// Slideshow fixes
	
	jQuery('.hero-carousel article').first().next().addClass('first');
	jQuery('.hero-carousel article').first().addClass('last');
	
	jQuery('.hero-carousel-nav .prev').css('display', 'none');
	
	//var lastImg = jQuery('.hero-carousel article.last img').attr('src');
	//jQuery('.hero-carousel article.last img').attr('src', '/sites/all/themes/bala/images/empty.jpg');
	jQuery('.hero-carousel article.last').css('visibility', 'hidden');
	
	jQuery('.hero-carousel article').not('.current').append('<div class="overlay"></div>');
	
	jQuery('.hero-carousel-nav .next').click(
		function() {
			jQuery('.hero-carousel-nav .prev').css('display', 'block');
			if (jQuery('.hero-carousel article.current').prev().hasClass('first')) {
				jQuery('.hero-carousel article.last').css('visibility', 'visible');
			}
			
			if (jQuery('.hero-carousel article.current').next().hasClass('last')) {
				jQuery('.hero-carousel-nav .next img').attr('src', '/sites/all/themes/bala/images/startOverArrow.png');
				jQuery('.hero-carousel-nav .next a').append('<span id="startOver">START OVER</span>')
				jQuery('.hero-carousel article.first').css('visibility', 'hidden');
			}
			
			if (jQuery('.hero-carousel article.current').hasClass('last')) {
					jQuery('.hero-carousel article.last').css('visibility', 'hidden');
					jQuery('.hero-carousel article.first').css('visibility', 'visible');
					jQuery('.hero-carousel-nav .next img').attr('src', '/sites/all/themes/bala/images/nextSlide.png');
					jQuery('#startOver').remove();
					jQuery('.hero-carousel-nav .prev').css('display', 'none');
			}			
		}
	);
	
	jQuery('.hero-carousel-nav .prev').click(
		function() {			
			jQuery('.hero-carousel article.first').css('visibility', 'visible');
			jQuery('.hero-carousel-nav .next img').attr('src', '/sites/all/themes/bala/images/nextSlide.png');
			jQuery('#startOver').remove();
			
			if (jQuery('.hero-carousel article.current').prev().hasClass('first')) {
				jQuery('.hero-carousel-nav .prev').css('display', 'none');
				//jQuery('.hero-carousel article.last img').attr('src', '/sites/all/themes/bala/images/empty.jpg');
				jQuery('.hero-carousel article.last').css('visibility', 'hidden');
			}
			if (jQuery('.hero-carousel article.current').hasClass('last')) {
				jQuery('.hero-carousel-nav .next').css('display', 'block');
			}
		}
	);

	
	//jQuery('.hero-carousel-nav .prev').css('display', 'none');
	//jQuery('.hero-carousel article:first').css('visibility', 'hidden');
	//var mfirst = parseInt(jQuery('div.hero-carousel.hero-carousel-container').css('margin-left')) - 163;
	//jQuery('div.hero-carousel.hero-carousel-container').css('margin-left', mfirst+'px');
	
	//jQuery('.hero-carousel-nav .next').one("click", function() {
		//var mfix = parseInt(jQuery('div.hero-carousel.hero-carousel-container').css('margin-left')) + 163;
		//alert(mfix);  NEEDS TO TAKE THE ORIGINAL VALUE ^
		//jQuery('div.hero-carousel.hero-carousel-container').css('margin-left', mfix+'px');
		//jQuery('.hero-carousel-nav .prev').css('display', 'block');
		//jQuery('.hero-carousel article:last').css('visibility', 'visible');
	//});	
	
	jQuery('.hero-carousel-nav .next').click(
		function () {
			jQuery('.hero-carousel article.current').removeClass('current');
		}
	);
	jQuery('.hero-carousel-nav .prev').click(
		function () {
			jQuery('.hero-carousel article.current').removeClass('current');
		}
	);
	
	jQuery('#superfish-1 li.sf-depth-2 ul').css('width', '400px');
	
	jQuery('#superfish-1 li.sf-depth-2').each(
		function(index) {
			var text = jQuery('span.sf-depth-2.nolink', this).text();
			var url = jQuery('ul li.first.sf-depth-3 a', this).attr('href');
			jQuery('span.sf-depth-2.nolink', this).replaceWith(function() {
				return '<a href="' + url + '">' + text + '</a>';
			});
		}
	);
	
	jQuery(window).load(function(){
		jQuery('#block-views-company-leaders-block .views-row').each(
			function(index) {
				var pos = jQuery(this).offset();
				jQuery(this).hover(
					function () {
						jQuery('#peopleHoverBackground').css('top', pos.top).css('display', 'block');
						jQuery('#block-views-company-leaders-block .views-row a').css('color', '#989b9a');
						jQuery('a', this).css('color', '#ffffff');
						jQuery('span.position', this).css('display', 'inline');
					},
					function () {
						jQuery('#peopleHoverBackground').css('display', 'none');
						jQuery('#block-views-company-leaders-block .views-row a').css('color', '#ffffff');
						jQuery('span.position', this).css('display', 'none');
					}
			);
		});
	});
	
	jQuery('.field-name-field-hover-item .field-items .field-item').each(
		function(index) {
			if (jQuery('.hover-path', this).length) {				
				var path = jQuery('.hover-path', this).html();
				if (path.indexOf('http://') >= 0) {
					var newWindow = 'target="_blank"';
				} else if (path.indexOf('https://') >= 0) {
					var newWindow = 'target="_blank"';
				} else {
					var newWindow = '';
				}
				
				jQuery('.hover-title', this).replaceWith(function() {
					return '<div class="hover-title"><a ' + newWindow + ' href="' + path + '">' + jQuery(this).html(); + '</a></div>';
				});
				jQuery('.hover-text', this).replaceWith(function() {
					return '<div class="hover-text"><a ' + newWindow + ' href="' + path + '">' + jQuery(this).html(); + '</a></div>';
				});
				
				jQuery('.hover-path', this).remove();
			}
		}
	);
			
	
	jQuery('.field-name-field-hover-item .field-items').hover(
		function () {
			var h = jQuery(this).height();
			var p = jQuery(this).offset();
			var pp = p.top - 10;
			var hh = h + 40;
			jQuery('#peopleHoverBackground').css('top', pp).css('height', hh + 'px').css('display', 'block');
			jQuery('.field-item', this).each(
				function(index) {
					jQuery(this).hover(
						function() {
							jQuery('.field-item .hover-title').css('color', '#989b9a');
							jQuery('.field-item .hover-title a').css('color', '#989b9a');
							jQuery('.hover-title', this).css('color', '#ffffff');
							jQuery('.hover-title a', this).css('color', '#ffffff');
							jQuery('.hover-text', this).css('display', 'block');
						},
						function() {
							jQuery('.hover-title', this).css('color', '#989b9a');
							jQuery('.hover-title a', this).css('color', '#989b9a');
							jQuery('.hover-text', this).css('display', 'none');
						}
					);
				}
			);
		},
		function () {
			jQuery('#peopleHoverBackground').css('top', '0px').css('height', '32px').css('display', 'none');
			jQuery('.field-item .hover-title', this).css('color', '#ffffff');
			jQuery('.field-item .hover-title a', this).css('color', '#ffffff');
		}
	);

	jQuery(window).load(function(){
		jQuery('.view-project-lists .views-row').each(
			function(index) {
				var pos = jQuery(this).offset();
				var fix = pos.top - 5;
				jQuery(this).hover(
					function () {
						jQuery('#peopleHoverBackground').css('top', fix).css('display', 'block');
						//jQuery('.chrome .front #peopleHoverBackground').css('top', fix);
						jQuery('.view-project-lists .views-row a').css('color', '#989b9a');
						jQuery('a', this).css('color', '#ffffff');
					},
					function () {
						jQuery('#peopleHoverBackground').css('display', 'none');
						jQuery('.view-project-lists .views-row a').css('color', '#ffffff');
					}
				);
		});
	});
	
	jQuery(window).load(function(){
		jQuery('.field-name-field-child-item .field-collection-view').each(
			function(index) {
				var pos = jQuery(this).offset();
				var fix = pos.top - 10;
				jQuery(this).toggle(
					function() {
						jQuery('#peopleHoverBackground').css('top', '0px');
						jQuery('#peopleHoverBackground').css('display', 'none');
						jQuery('.child-text-wrap').css('display', 'none');
						jQuery('#peopleHoverBackground').css('height','0px');
						jQuery('.child-title').css('background', 'url(/sites/all/themes/bala/images/activeMenu.png) no-repeat 0px 2px transparent');
						
						jQuery('#peopleHoverBackground').css('top', fix).css('display', 'block');
						jQuery('.child-text-wrap', this).css('display', 'block');
						jQuery('.child-title', this).css('background', 'url(/sites/all/themes/bala/images/downArrow.png) no-repeat 0px 2px transparent');
						var h = jQuery('.child-text-wrap', this).height();
						var hh = h + 68;
						jQuery('#peopleHoverBackground').css('height', hh + 'px');
					},
					function() {
						jQuery('#peopleHoverBackground').css('top', '0px');
						jQuery('#peopleHoverBackground').css('display', 'none');
						jQuery('.child-text-wrap').css('display', 'none');
						jQuery('#peopleHoverBackground').css('height','0px');
						jQuery('.child-title').css('background', 'url(/sites/all/themes/bala/images/activeMenu.png) no-repeat 0px 2px transparent');
					}
				);
		});
	});
	
	jQuery(window).load(function(){
		jQuery('.view-careers ul li').each(
			function(index) {
				var pos = jQuery(this).offset();
				var fix = pos.top - 10;
				jQuery('.views-field-title', this).toggle(
					function () {
						jQuery('#peopleHoverBackground').css('display', 'none');
						jQuery('.views-field-field-description').css('display', 'none');
						jQuery('.views-field-nothing').css('display', 'none');
						jQuery('#peopleHoverBackground').css('height','0px');
						jQuery('.view-careers .views-field-title').css('background', 'url(/sites/all/themes/bala/images/activeMenu.png) no-repeat top left');
					
						jQuery('#peopleHoverBackground').css('top', fix).css('display', 'block');
						jQuery(this).parent().children('.views-field-field-description').css('display', 'block');
						jQuery(this).parent().children('.views-field-nothing').css('display', 'block');
						jQuery(this).css('background', 'url(/sites/all/themes/bala/images/downArrow.png) no-repeat top left');
						var h = jQuery(this).parent().children('.views-field-field-description').height();
						var hh = h + 90;
						jQuery('#peopleHoverBackground').css('height', hh + 'px');
					},
					function() {
						jQuery('#peopleHoverBackground').css('display', 'none');
						jQuery('.views-field-field-description').css('display', 'none');
						jQuery('.views-field-nothing').css('display', 'none');
						jQuery('#peopleHoverBackground').css('height','0px');
						jQuery('.view-careers .views-field-title').css('background', 'url(/sites/all/themes/bala/images/activeMenu.png) no-repeat top left');
					}
				);
		});
	});
	
	if (jQuery('#superfish-1 li.active-trail.sf-depth-1').length) {
		jQuery('#superfish-1 li.sf-depth-1').css('color', '#989b9a');
		jQuery('#superfish-1 li.sf-depth-1 a').css('color', '#989b9a');
		jQuery('#superfish-1 li.active-trail.sf-depth-1').css('color', '#ffffff');
		jQuery('#superfish-1 li.active-trail.sf-depth-1 a').css('color', '#ffffff');
	}
	
	jQuery('#superfish-1 li.sf-depth-1').each(
		function(index) {
			jQuery(this).hover(
				function () {
					jQuery('#superfish-1 li.sf-depth-1').css('color', '#989b9a');
					jQuery('#superfish-1 li.sf-depth-1 a').css('color', '#989b9a');
					jQuery(this).css('color', '#ffffff');
					jQuery('a', this).css('color', '#ffffff');
					jQuery(this).css('border-color', '#ffffff');
					jQuery(this).css('height', '60px');
				},
				function () {
					jQuery('#superfish-1 li.sf-depth-1').css('color', '#ffffff');
					jQuery('#superfish-1 li.sf-depth-1 a').css('color', '#ffffff');
					jQuery(this).css('border-color', '#989b9a');
					jQuery(this).css('height', '30px');
					if (jQuery('#superfish-1 li.active-trail.sf-depth-1').length) {
						jQuery('#superfish-1 li.sf-depth-1').css('color', '#989b9a');
						jQuery('#superfish-1 li.sf-depth-1 a').css('color', '#989b9a');
						jQuery('#superfish-1 li.active-trail.sf-depth-1').css('color', '#ffffff');
						jQuery('#superfish-1 li.active-trail.sf-depth-1 a').css('color', '#ffffff');
					}
					jQuery('#superfish-1 li.sf-depth-1 li.sf-depth-2').css('color', '#ffffff');
				}
			);
		}
	);
	
	jQuery('#superfish-1 li.sf-depth-1 li.sf-depth-2').each(
		function(index) {
			jQuery(this).hover(
				function () {
					jQuery('#superfish-1 li.sf-depth-1 li.sf-depth-2 a').css('color', '#989b9a');
					jQuery('a', this).css('color', '#ffffff');
					jQuery('li a', this).css('color', '#ffffff');
				},
				function () {
					jQuery('#superfish-1 li.sf-depth-1 li.sf-depth-2 a').css('color', '#ffffff');
				}
			);
		}
	);
	
	jQuery('#superfish-1 li.sf-depth-1 li.sf-depth-2 li.sf-depth-3').each(
		function(index) {
			jQuery(this).hover(
				function () {
					jQuery('#superfish-1 li.sf-depth-1 li.sf-depth-2 li.sf-depth-3 a').css('color', '#989b9a');
					jQuery('a', this).css('color', '#ffffff');
				},
				function () {
					jQuery('#superfish-1 li.sf-depth-1 li.sf-depth-2 li.sf-depth-3 a').css('color', '#ffffff');
				}
			);
		}
	);
	
	jQuery('#superfish-1 li.sf-depth-2').hover(
		function () {
			var numChildren = jQuery('li.sf-depth-3', this).length;
			var dynamicHeight = 85 + (numChildren * 25);
			jQuery('div#navContainer').css('height', dynamicHeight + 'px');
			if (jQuery('html').hasClass('ipad')) {
				jQuery('#navigation').css('height', dynamicHeight + 'px');
			} else if (jQuery('html').hasClass('iphone')) {
				jQuery('#navigation').css('height', dynamicHeight + 'px');
			}
		},
		function () {
			var isHovering = jQuery('#superfish-1 li.sf-depth-1').hasClass('sfHover');
			if (isHovering) {
				jQuery('div#navContainer').css('height', '32px');
			} else {
				jQuery('div#navContainer').css('height', '0px');
				if (jQuery('html').hasClass('ipad')) {
					jQuery('#navigation').css('height', '82px');
				} else if (jQuery('html').hasClass('iphone')) {
					jQuery('#navigation').css('height', '82px');
				}
			}
		}
	);
	
	jQuery('#superfish-1 li.sf-depth-1').hover(
		function () {
			jQuery('div#navContainer').css('height', '32px');
			if (jQuery('html').hasClass('ipad')) {
				jQuery('#navigation').css('height', '82px');
			} else if (jQuery('html').hasClass('iphone')) {
				jQuery('#navigation').css('height', '82px');
			}
		},
		function () {
			jQuery('div#navContainer').css('height', '0px');
		}
	);
	
	jQuery('#superfish-2 li').each(
		function(index) {
			jQuery(this).hover(
				function () {
					jQuery('#superfish-2 li span').css('color', '#989b9a');
					jQuery('#superfish-2 li a').css('color', '#989b9a');
					jQuery('a', this).css('color', '#ffffff');
					jQuery('span', this).css('color', '#ffffff');
				},
				function () {
					jQuery('#superfish-2 li span').css('color', '#ffffff');
					jQuery('#superfish-2 li a').css('color', '#ffffff');
				}
			);
		}
	);
	
	var bodyHeight = jQuery('body').height();
	var fixHeight = bodyHeight - 32;
	jQuery('#realBody').css('height', fixHeight + 'px');


	// MOBILE MENU CLICK BEHAVIOR
	var mobileDetect = function() {
		var screenwidth = jQuery(window).width();
		if (screenwidth < 769) {
			jQuery('body').addClass('mobile');
		}
	}
	var topClickMobile = function() {
		var topItem = jQuery('#highlighted .menu-block-wrapper ul.menu li.expanded span');
      	topItem.click( function(e) {
      		e.stopPropagation();
      		var thisTopItem = jQuery(this);
	        var thisSubMenu = thisTopItem.siblings('ul.menu');
	        if (thisSubMenu.css("display") == "none") {
	        	thisSubMenu.slideDown('fast');
	        }
	        else {
	         	thisSubMenu.slideUp('fast');
	        }
     	});
	}
  	var clickHamburger = function() {
  		var hamburger = jQuery('.hamburger-wrapper');
  		hamburger.click( function() {
  			if (jQuery('#hamburger-helper').hasClass('menu-open')) {
      			jQuery('#hamburger-helper').removeClass('menu-open');
      			jQuery('#highlighted .block-menu-block').stop().slideUp('fast');
	    	}
	    	else {
	      		jQuery('#hamburger-helper').addClass('menu-open');
	      		jQuery('#highlighted .block-menu-block').stop().slideDown('fast');
	    	}
  		}); 
  	}
  	mobileDetect();
  	topClickMobile();
  	clickHamburger();
  	// END MOBILE MENU BEHAVIOR

	
});