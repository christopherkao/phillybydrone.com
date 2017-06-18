/* 
*	jQuery Plugins.
*	Other plugin scripts located in the Zoo Shortcodes Plugin. 
*	zoo-shortcodes/js/zoo-shortcodes-plugins.js 
*/

jQuery(document).ready(function($) {
		
/*-----------------------------------------------------------------------------------*/
/* Single Page Scrolling Navigation
/*===================================================================================*/
/**
 * Copyright (c) 2007-2012 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * @author Ariel Flesler
 * @version 1.4.3
 */
;(function($){var h=$.scrollTo=function(a,b,c){$(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($.fn.$)>=1.3?0:1,limit:true};h.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(!e)return;var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}$.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,e,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})($);


/*
 * $ One Page Nav Plugin
 * http://github.com/davist11/$-One-Page-Nav
 *
 * Copyright (c) 2010 Trevor Davis (http://trevordavis.net)
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as $, see:
 * http://$.org/license
 *
 * @version 2.2.0
 *
 * Example usage:
 * $('#nav').onePageNav({
 *   currentClass: 'current',
 *   changeHash: false,
 *   scrollSpeed: 750
 * });
 */

;(function($, window, document, undefined){

	// our plugin constructor
	var OnePageNav = function(elem, options){
		this.elem = elem;
		this.$elem = $(elem);
		this.options = options;
		this.metadata = this.$elem.data('plugin-options');
		this.$nav = this.$elem.find('a');
		this.$win = $(window);
		this.sections = {};
		this.didScroll = false;
		this.$doc = $(document);
		this.docHeight = this.$doc.height();
	};

	// the plugin prototype
	OnePageNav.prototype = {
		defaults: {
			currentClass: 'current',
			changeHash: false,
			easing: 'swing',
			filter: '',
			scrollSpeed: 750,
			scrollOffset: 0,
			scrollThreshold: 0.5,
			begin: false,
			end: false,
			scrollChange: false
		},

		init: function() {
			var self = this;
			
			// Introduce defaults that can be extended either
			// globally or using an object literal.
			self.config = $.extend({}, self.defaults, self.options, self.metadata);
			
			//Filter any links out of the nav
			if(self.config.filter !== '') {
				self.$nav = self.$nav.filter(self.config.filter);
			}
			
			//Handle clicks on the nav
			self.$nav.on('click.onePageNav', $.proxy(self.handleClick, self));

			//Get the section positions
			self.getPositions();
			
			//Handle scroll changes
			self.bindInterval();
			
			//Update the positions on resize too
			self.$win.on('resize.onePageNav', $.proxy(self.getPositions, self));

			return this;
		},
		
		adjustNav: function(self, $parent) {
			self.$elem.find('.' + self.config.currentClass).removeClass(self.config.currentClass);
			$parent.addClass(self.config.currentClass);
		},
		
		bindInterval: function() {
			var self = this;
			var docHeight;
			
			self.$win.on('scroll.onePageNav', function() {
				self.didScroll = true;
			});
			
			self.t = setInterval(function() {
				docHeight = self.$doc.height();
				
				//If it was scrolled
				if(self.didScroll) {
					self.didScroll = false;
					self.scrollChange();
				}
				
				//If the document height changes
				if(docHeight !== self.docHeight) {
					self.docHeight = docHeight;
					self.getPositions();
				}
			}, 250);
		},
		
		getHash: function($link) {
			return $link.attr('href').split('#')[1];
		},
		
		getPositions: function() {
			var self = this;
			var linkHref;
			var topPos;
			var $target;
			
			self.$nav.each(function() {
				linkHref = self.getHash($(this));
				$target = $('#' + linkHref);

				if($target.length) {
					topPos = $target.offset().top;
					self.sections[linkHref] = Math.round(topPos) - self.config.scrollOffset;
				}
			});
		},
		
		getSection: function(windowPos) {
			var returnValue = null;
			var windowHeight = Math.round(this.$win.height() * this.config.scrollThreshold);

			for(var section in this.sections) {
				if((this.sections[section] - windowHeight) < windowPos) {
					returnValue = section;
				}
			}
			
			return returnValue;
		},
		
		handleClick: function(e) {
			var self = this;
			var $link = $(e.currentTarget);
			var $parent = $link.parent();
			var newLoc = '#' + self.getHash($link);
			

			if(!$parent.hasClass(self.config.currentClass)) {
				

				//Start callback
				if(self.config.begin) {
					self.config.begin();
				}
				
				//Change the highlighted nav item
				self.adjustNav(self, $parent);
				var xMove = $(".nav-active").offset().left;
				var barWidth =  $(".nav-active").outerWidth() + 'px';
				$('#active-bar').css({ left: xMove, width: barWidth }); 
				//Removing the auto-adjust on scroll
				self.unbindInterval();
				
				//Scroll to the correct position
				$.scrollTo(newLoc, self.config.scrollSpeed, {
					axis: 'y',
					easing: self.config.easing,
					offset: {
						top: -self.config.scrollOffset
					},
					onAfter: function() {
						//Do we need to change the hash?
						if(self.config.changeHash) {
							window.location.hash = newLoc;
						}
						
						//Add the auto-adjust on scroll back in
						self.bindInterval();
						
						//End callback
						if(self.config.end) {
							self.config.end();
						}
					}
				});
			}

			e.preventDefault();
		},
		
		scrollChange: function() {
			var windowTop = this.$win.scrollTop();
			var position = this.getSection(windowTop);
			var $parent;
			
			//If the position is set
			if(position !== null) {
				$parent = this.$elem.find('a[href$="#' + position + '"]').parent();
				
				//If it's not already the current section
				if(!$parent.hasClass(this.config.currentClass)) {
					//Change the highlighted nav item
					this.adjustNav(this, $parent);
					var xMove = $(".nav-active").offset().left;
					var barWidth =  $(".nav-active").outerWidth() + 'px';
					$('#active-bar').css({ left: xMove, width: barWidth }); 
					//If there is a scrollChange callback
					if(this.config.scrollChange) {
						this.config.scrollChange($parent);
					}
				}
			}
		},
		
		unbindInterval: function() {
			clearInterval(this.t);
			this.$win.unbind('scroll.onePageNav');
		}
	};

	OnePageNav.defaults = OnePageNav.prototype.defaults;

	$.fn.onePageNav = function(options) {
		return this.each(function() {
			new OnePageNav(this, options).init();
		});
	};
	
})( $, window , document );

/*-----------------------------------------------------------------------------------*/
/* Smooth Scrolling For Chrome
/*===================================================================================*/

// SmoothScroll v0.9.9
// Licensed under the terms of the MIT license.

// People involved
// - Balazs Galambosi: maintainer (CHANGELOG.txt)
// - Patrick Brunner (patrickb1991@gmail.com)
// - Michael Herf: ssc_pulse Algorithm
function ssc_init(){if(!document.body)return;var e=document.body;var t=document.documentElement;var n=window.innerHeight;var r=e.scrollHeight;ssc_root=document.compatMode.indexOf("CSS")>=0?t:e;ssc_activeElement=e;ssc_initdone=true;if(top!=self){ssc_frame=true}else if(r>n&&(e.offsetHeight<=n||t.offsetHeight<=n)){ssc_root.style.height="auto";if(ssc_root.offsetHeight<=n){var i=document.createElement("div");i.style.clear="both";e.appendChild(i)}}if(!ssc_fixedback){e.style.backgroundAttachment="scroll";t.style.backgroundAttachment="scroll"}if(ssc_keyboardsupport){ssc_addEvent("keydown",ssc_keydown)}}function ssc_scrollArray(e,t,n,r){r||(r=1e3);ssc_directionCheck(t,n);ssc_que.push({x:t,y:n,lastX:t<0?.99:-.99,lastY:n<0?.99:-.99,start:+(new Date)});if(ssc_pending){return}var i=function(){var s=+(new Date);var o=0;var u=0;for(var a=0;a<ssc_que.length;a++){var f=ssc_que[a];var l=s-f.start;var c=l>=ssc_animtime;var h=c?1:l/ssc_animtime;if(ssc_pulseAlgorithm){h=ssc_pulse(h)}var p=f.x*h-f.lastX>>0;var d=f.y*h-f.lastY>>0;o+=p;u+=d;f.lastX+=p;f.lastY+=d;if(c){ssc_que.splice(a,1);a--}}if(t){var v=e.scrollLeft;e.scrollLeft+=o;if(o&&e.scrollLeft===v){t=0}}if(n){var m=e.scrollTop;e.scrollTop+=u;if(u&&e.scrollTop===m){n=0}}if(!t&&!n){ssc_que=[]}if(ssc_que.length){setTimeout(i,r/ssc_framerate+1)}else{ssc_pending=false}};setTimeout(i,0);ssc_pending=true}function ssc_wheel(e){if(!ssc_initdone){init()}var t=e.target;var n=ssc_overflowingAncestor(t);if(!n||e.defaultPrevented||ssc_isNodeName(ssc_activeElement,"embed")||ssc_isNodeName(t,"embed")&&/\.pdf/i.test(t.src)){return true}var r=e.wheelDeltaX||0;var i=e.wheelDeltaY||0;if(!r&&!i){i=e.wheelDelta||0}if(Math.abs(r)>1.2){r*=ssc_stepsize/120}if(Math.abs(i)>1.2){i*=ssc_stepsize/120}ssc_scrollArray(n,-r,-i);e.preventDefault()}function ssc_keydown(e){var t=e.target;var n=e.ctrlKey||e.altKey||e.metaKey;if(/input|textarea|embed/i.test(t.nodeName)||t.isContentEditable||e.defaultPrevented||n){return true}if(ssc_isNodeName(t,"button")&&e.keyCode===ssc_key.spacebar){return true}var r,i=0,s=0;var o=ssc_overflowingAncestor(ssc_activeElement);var u=o.clientHeight;if(o==document.body){u=window.innerHeight}switch(e.keyCode){case ssc_key.up:s=-ssc_arrowscroll;break;case ssc_key.down:s=ssc_arrowscroll;break;case ssc_key.spacebar:r=e.shiftKey?1:-1;s=-r*u*.9;break;case ssc_key.pageup:s=-u*.9;break;case ssc_key.pagedown:s=u*.9;break;case ssc_key.home:s=-o.scrollTop;break;case ssc_key.end:var a=o.scrollHeight-o.scrollTop-u;s=a>0?a+10:0;break;case ssc_key.left:i=-ssc_arrowscroll;break;case ssc_key.right:i=ssc_arrowscroll;break;default:return true}ssc_scrollArray(o,i,s);e.preventDefault()}function ssc_mousedown(e){ssc_activeElement=e.target}function ssc_setCache(e,t){for(var n=e.length;n--;)ssc_cache[ssc_uniqueID(e[n])]=t;return t}function ssc_overflowingAncestor(e){var t=[];var n=ssc_root.scrollHeight;do{var r=ssc_cache[ssc_uniqueID(e)];if(r){return ssc_setCache(t,r)}t.push(e);if(n===e.scrollHeight){if(!ssc_frame||ssc_root.clientHeight+10<n){return ssc_setCache(t,document.body)}}else if(e.clientHeight+10<e.scrollHeight){overflow=getComputedStyle(e,"").getPropertyValue("overflow");if(overflow==="scroll"||overflow==="auto"){return ssc_setCache(t,e)}}}while(e=e.parentNode)}function ssc_addEvent(e,t,n){window.addEventListener(e,t,n||false)}function ssc_removeEvent(e,t,n){window.removeEventListener(e,t,n||false)}function ssc_isNodeName(e,t){return e.nodeName.toLowerCase()===t.toLowerCase()}function ssc_directionCheck(e,t){e=e>0?1:-1;t=t>0?1:-1;if(ssc_direction.x!==e||ssc_direction.y!==t){ssc_direction.x=e;ssc_direction.y=t;ssc_que=[]}}function ssc_pulse_(e){var t,n,r;e=e*ssc_pulseScale;if(e<1){t=e-(1-Math.exp(-e))}else{n=Math.exp(-1);e-=1;r=1-Math.exp(-e);t=n+r*(1-n)}return t*ssc_pulseNormalize}function ssc_pulse(e){if(e>=1)return 1;if(e<=0)return 0;if(ssc_pulseNormalize==1){ssc_pulseNormalize/=ssc_pulse_(1)}return ssc_pulse_(e)}var ssc_framerate=150;var ssc_animtime=500;var ssc_stepsize=80;var ssc_pulseAlgorithm=true;var ssc_pulseScale=6;var ssc_pulseNormalize=1;var ssc_keyboardsupport=true;var ssc_arrowscroll=50;var ssc_frame=false;var ssc_direction={x:0,y:0};var ssc_initdone=false;var ssc_fixedback=true;var ssc_root=document.documentElement;var ssc_activeElement;var ssc_key={left:37,up:38,right:39,down:40,spacebar:32,pageup:33,pagedown:34,end:35,home:36};var ssc_que=[];var ssc_pending=false;var ssc_cache={};setInterval(function(){ssc_cache={}},10*1e3);var ssc_uniqueID=function(){var e=0;return function(t){return t.ssc_uniqueID||(t.ssc_uniqueID=e++)}}();$.browser.chrome=/chrome/.test(navigator.userAgent.toLowerCase());if($.browser.chrome){ssc_addEvent("mousedown",ssc_mousedown);ssc_addEvent("mousewheel",ssc_wheel);ssc_addEvent("load",ssc_init)}


/*-----------------------------------------------------------------------------------*/
/* Load Retina Images
/*===================================================================================*/
(function() {

  var root = (typeof exports == 'undefined' ? window : exports);

  var config = {
    // Ensure Content-Type is an image before trying to load @2x image
    // https://github.com/imulus/retinajs/pull/45)
    check_mime_type: true
  };



  root.Retina = Retina;

  function Retina() {}

  Retina.configure = function(options) {
    if (options == null) options = {};
    for (var prop in options) config[prop] = options[prop];
  };

  Retina.init = function(context) {
    if (context == null) context = root;

    var existing_onload = context.onload || new Function;

    context.onload = function() {
      var images = document.getElementsByTagName("img"), retinaImages = [], i, image;
      for (i = 0; i < images.length; i++) {
        image = images[i];
        retinaImages.push(new RetinaImage(image));
      }
      existing_onload();
    }
  };

  Retina.isRetina = function(){
    var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\
(min--moz-device-pixel-ratio: 1.5),\
(-o-min-device-pixel-ratio: 3/2),\
(min-resolution: 1.5dppx)";

    if (root.devicePixelRatio > 1)
      return true;

    if (root.matchMedia && root.matchMedia(mediaQuery).matches)
      return true;

    return false;
  };


  root.RetinaImagePath = RetinaImagePath;

  function RetinaImagePath(path, at_2x_path) {
    this.path = path;
    if (typeof at_2x_path !== "undefined" && at_2x_path !== null) {
      this.at_2x_path = at_2x_path;
      this.perform_check = false;
    } else {
      this.at_2x_path = path.replace(/\.\w+$/, function(match) { return "@2x" + match; });
      this.perform_check = true;
    }
  }

  RetinaImagePath.confirmed_paths = [];

  RetinaImagePath.prototype.is_external = function() {
    return !!(this.path.match(/^https?\:/i) && !this.path.match('//' + document.domain) )
  }

  RetinaImagePath.prototype.check_2x_variant = function(callback) {
    var http, that = this;
    if (this.is_external()) {
      return callback(false);
    } else if (!this.perform_check && typeof this.at_2x_path !== "undefined" && this.at_2x_path !== null) {
      return callback(true);
    } else if (this.at_2x_path in RetinaImagePath.confirmed_paths) {
      return callback(true);
    } else {
      http = new XMLHttpRequest;
      http.open('HEAD', this.at_2x_path);
      http.onreadystatechange = function() {
        if (http.readyState != 4) {
          return callback(false);
        }

        if (http.status >= 200 && http.status <= 399) {
          if (config.check_mime_type) {
            var type = http.getResponseHeader('Content-Type');
            if (type == null || !type.match(/^image/i)) {
              return callback(false);
            }
          }

          RetinaImagePath.confirmed_paths.push(that.at_2x_path);
          return callback(true);
        } else {
          return callback(false);
        }
      }
      http.send();
    }
  }



  function RetinaImage(el) {
    this.el = el;
    this.path = new RetinaImagePath(this.el.getAttribute('src'), this.el.getAttribute('data-at2x'));
    var that = this;
    this.path.check_2x_variant(function(hasVariant) {
      if (hasVariant) that.swap();
    });
  }

  root.RetinaImage = RetinaImage;

  RetinaImage.prototype.swap = function(path) {
    if (typeof path == 'undefined') path = this.path.at_2x_path;

    var that = this;
    function load() {
      if (! that.el.complete) {
        setTimeout(load, 5);
      } else {
        that.el.setAttribute('width', that.el.offsetWidth);
        that.el.setAttribute('height', that.el.offsetHeight);
        that.el.setAttribute('src', path);
      }
    }
    load();
  }




  if (Retina.isRetina()) {
    Retina.init(root);
  }

})();











});

