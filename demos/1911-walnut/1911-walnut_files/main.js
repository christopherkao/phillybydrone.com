/*! lightslider - v1.1.6 - 2016-10-25
 * https://github.com/sachinchoolur/lightslider
 * Copyright (c) 2016 Sachin N; Licensed MIT */
(function ($, undefined) {
    'use strict';
    var defaults = {
        item: 3,
        autoWidth: false,
        slideMove: 1,
        slideMargin: 14,
        addClass: '',
        mode: 'slide',
        useCSS: true,
        cssEasing: 'ease',
        easing: 'linear',
        speed: 400,
        auto: true,
        pauseOnHover: true,
        loop: true,
        slideEndAnimation: true,
        pause: 2000,
        keyPress: true,
        controls: true,
        rtl: false,
        vThumbWidth: 100,
        thumbItem: 10,
        pager: true,
        gallery: false,
        galleryMargin: 5,
        thumbMargin: 5,
        currentPagerPosition: 'middle',
        enableTouch: false,
        enableDrag: false,
        freeMove: true,
        swipeThreshold: 40,
        responsive: [],
        /* jshint ignore:start */
        onBeforeStart: function ($el) {},
        onSliderLoad: function ($el) {},
        onBeforeSlide: function ($el, scene) {},
        onAfterSlide: function ($el, scene) {},
        onBeforeNextSlide: function ($el, scene) {},
        onBeforePrevSlide: function ($el, scene) {}
        /* jshint ignore:end */
    };
    $.fn.lightSlider = function (options) {
        if (this.length === 0) {
            return this;
        }

        if (this.length > 1) {
            this.each(function () {
                $(this).lightSlider(options);
            });
            return this;
        }

        var plugin = {},
            settings = $.extend(true, {}, defaults, options),
            settingsTemp = {},
            $el = this;
        plugin.$el = this;

        var $children = $el.children(),
            windowW = $(window).width(),
            breakpoint = null,
            resposiveObj = null,
            length = 0,
            w = 0,
            on = false,
            elSize = 0,
            $slide = '',
            scene = 0,
            property = 'width',
            gutter = 'margin-right',
            slideValue = 0,
            pagerWidth = 0,
            slideWidth = 0,
            thumbWidth = 0,
            interval = null,
            isTouch = ('ontouchstart' in document.documentElement);
        var refresh = {};

        refresh.chbreakpoint = function () {
            windowW = $(window).width();
            if (settings.responsive.length) {
                var item;
                if (settings.autoWidth === false) {
                    item = settings.item;
                }
                if (windowW < settings.responsive[0].breakpoint) {
                    for (var i = 0; i < settings.responsive.length; i++) {
                        if (windowW < settings.responsive[i].breakpoint) {
                            breakpoint = settings.responsive[i].breakpoint;
                            resposiveObj = settings.responsive[i];
                        }
                    }
                }
                if (typeof resposiveObj !== 'undefined' && resposiveObj !== null) {
                    for (var j in resposiveObj.settings) {
                        if (resposiveObj.settings.hasOwnProperty(j)) {
                            if (typeof settingsTemp[j] === 'undefined' || settingsTemp[j] === null) {
                                settingsTemp[j] = settings[j];
                            }
                            settings[j] = resposiveObj.settings[j];
                        }
                    }
                }
                if (!$.isEmptyObject(settingsTemp) && windowW > settings.responsive[0].breakpoint) {
                    for (var k in settingsTemp) {
                        if (settingsTemp.hasOwnProperty(k)) {
                            settings[k] = settingsTemp[k];
                        }
                    }
                }
                if (settings.autoWidth === false) {
                    if (slideValue > 0 && slideWidth > 0) {
                        if (item !== settings.item) {
                            scene = Math.round(slideValue / ((slideWidth + settings.slideMargin) * settings.slideMove));
                        }
                    }
                }
            }
        };

        refresh.calSW = function () {
            if (settings.autoWidth === false) {
                slideWidth = (elSize - ((settings.item * (settings.slideMargin)) - settings.slideMargin)) / settings.item;
            }
        };

        refresh.calWidth = function (cln) {
            var ln = cln === true ? $slide.find('.lslide').length : $children.length;
            if (settings.autoWidth === false) {
                w = ln * (slideWidth + settings.slideMargin);
            } else {
                w = 0;
                for (var i = 0; i < ln; i++) {
                    w += (parseInt($children.eq(i).width()) + settings.slideMargin);
                }
            }
            return w;
        };
        plugin = {
            doCss: function () {
                var support = function () {
                    var transition = ['transition', 'MozTransition', 'WebkitTransition', 'OTransition', 'msTransition', 'KhtmlTransition'];
                    var root = document.documentElement;
                    for (var i = 0; i < transition.length; i++) {
                        if (transition[i] in root.style) {
                            return true;
                        }
                    }
                };
                if (settings.useCSS && support()) {
                    return true;
                }
                return false;
            },
            keyPress: function () {
                if (settings.keyPress) {
                    $(document).on('keyup.lightslider', function (e) {
                        if (!$(':focus').is('input, textarea')) {
                            if (e.preventDefault) {
                                e.preventDefault();
                            } else {
                                e.returnValue = false;
                            }
                            if (e.keyCode === 37) {
                                $el.goToPrevSlide();
                            } else if (e.keyCode === 39) {
                                $el.goToNextSlide();
                            }
                        }
                    });
                }
            },
            controls: function () {
                var _this = this;
                if (settings.controls) {
                    $el.after('<div class="lSAction"><a class="lSPrev"></a><a class="lSNext"></a></div>');

                    if(hugeitSliderObj.navigation_type === '17' || hugeitSliderObj.navigation_type === '18' || hugeitSliderObj.navigation_type === '19' || hugeitSliderObj.navigation_type === '20' || hugeitSliderObj.navigation_type === '21'){
                        var $_next = '<svg class="next_bg" width="22px" height="22px" fill="#999" viewBox="-333 335.5 31.5 31.5" >' +
                            '<path d="M-311.8,340.5c-0.4-0.4-1.1-0.4-1.6,0c-0.4,0.4-0.4,1.1,0,1.6l8,8h-26.6c-0.6,0-1.1,0.5-1.1,1.1s0.5,1.1,1.1,1.1h26.6l-8,8c-0.4,0.4-0.4,1.2,0,1.6c0.4,0.4,1.2,0.4,1.6,0l10-10c0.4-0.4,0.4-1.1,0-1.6L-311.8,340.5z"/>' +
                            '</svg>';
                        var $_prev = '<svg class="prev_bg" width="22px" height="22px" fill="#999" viewBox="-333 335.5 31.5 31.5" >' +
                            '<path d="M-322.7,340.5c0.4-0.4,1.1-0.4,1.6,0c0.4,0.4,0.4,1.1,0,1.6l-8,8h26.6c0.6,0,1.1,0.5,1.1,1.1c0,0.6-0.5,1.1-1.1,1.1h-26.6l8,8c0.4,0.4,0.4,1.2,0,1.6c-0.4,0.4-1.1,0.4-1.6,0l-10-10c-0.4-0.4-0.4-1.1,0-1.6L-322.7,340.5z"/>' +
                            '</svg>';
                        jQuery('.lSPrev').append($_prev);
                        jQuery('.lSNext').append($_next);

                        if(hugeitSliderObj.navigation_type === '21'){
                            jQuery('.lSPrev').append('<p class="prev_title"></p>');
                            jQuery('.lSNext').append('<p class="next_title"></p>');
                        }

                        var $nextIndex, $prevIndex, $nextImg, $prevImg, $nextTitle = '', $prevTitle = '';


                        if(hugeitSliderObj.navigation_type !== '17'){
                            jQuery('.lSNext').hover(function(){
                                $nextImg = jQuery('li.group').eq(scene + 1).find('img').attr('src');
                                $nextTitle = jQuery('li.group').eq(scene + 1).find('img').attr('alt');

                                jQuery(this).find('.next_title').text($nextTitle);
                                jQuery(this).css({
                                    backgroundImage: 'url(' + $nextImg + ')',
                                    backgroundPosition: 'left center',
                                    backgroundSize: '100px 90px',
                                    backgroundRepeat: 'no-repeat'

                                });
                            }, function(){
                                jQuery(this).find('.next_title').text('');
                                jQuery(this).css({
                                    backgroundImage: ''
                                });
                            });
                            jQuery('.lSPrev').hover(function(){
                                $prevImg = jQuery('li.group').eq(scene - 1).find('img').attr('src');
                                $prevTitle = jQuery('li.group').eq(scene - 1).find('img').attr('alt');

                                jQuery(this).find('.prev_title').text($prevTitle);
                                jQuery(this).css({
                                    backgroundImage: 'url(' + $prevImg + ')',
                                    backgroundPosition: 'right center',
                                    backgroundSize: '100px 90px',
                                    backgroundRepeat: 'no-repeat'
                                });
                            }, function(){
                                jQuery(this).find('.prev_title').text('');
                                jQuery(this).css({
                                    backgroundImage: ''
                                });
                            });
                        } else {
                            jQuery('.lSNext').hover(function(){
                                $nextImg = jQuery('li.group').eq(scene + 1).find('img').attr('src');

                                jQuery(this).css({
                                    backgroundImage: 'url(' + $nextImg + ')',
                                    backgroundPosition: 'center center'

                                });
                            }, function(){
                                jQuery(this).css({
                                    backgroundImage: ''
                                });
                            });
                            jQuery('.lSPrev').hover(function(){
                                $prevImg = jQuery('li.group').eq(scene - 1).find('img').attr('src');

                                jQuery(this).css({
                                    backgroundImage: 'url(' + $prevImg + ')',
                                    backgroundPosition: 'center center'
                                });
                            }, function(){
                                jQuery(this).css({
                                    backgroundImage: ''
                                });
                            });
                        }
                    }

                    if (!settings.autoWidth) {
                        if (length <= settings.item) {
                            $slide.find('.lSAction').hide();
                        }
                    } else {
                        if (refresh.calWidth(false) < elSize) {
                            $slide.find('.lSAction').hide();
                        }
                    }
                    $slide.find('.lSAction a').on('click', function (e) {
                        if (e.preventDefault) {
                            e.preventDefault();
                        } else {
                            e.returnValue = false;
                        }
                        if ($(this).attr('class') === 'lSPrev') {
                            $el.goToPrevSlide();
                        } else {
                            $el.goToNextSlide();
                        }
                        return false;
                    });
                }
            },
            initialStyle: function () {
                var $this = this;
                if (settings.mode === 'fade') {
                    settings.autoWidth = false;
                    settings.slideEndAnimation = false;
                }
                if (settings.auto) {
                    settings.slideEndAnimation = false;
                }
                if (settings.autoWidth) {
                    settings.slideMove = 1;
                    settings.item = 1;
                }
                if (settings.loop) {
                    settings.slideMove = 1;
                    settings.freeMove = false;
                }
                settings.onBeforeStart.call(this, $el);
                refresh.chbreakpoint();
                $el.addClass('lightSlider').wrap('<div class="lSSlideOuter ' + settings.addClass + '"><div class="lSSlideWrapper"></div></div>');
                $slide = $el.parent('.lSSlideWrapper');
                if (settings.rtl === true) {
                    $slide.parent().addClass('lSrtl');
                }
                elSize = $el.outerWidth();
                $children.addClass('lslide');
                if (settings.loop === true && settings.mode === 'slide') {
                    refresh.calSW();
                    refresh.clone = function () {
                        if (refresh.calWidth(true) > elSize) {
                            /**/
                            var tWr = 0,
                                tI = 0;
                            for (var k = 0; k < $children.length; k++) {
                                tWr += (parseInt($el.find('.lslide').eq(k).width()) + settings.slideMargin);
                                tI++;
                                if (tWr >= (elSize + settings.slideMargin)) {
                                    break;
                                }
                            }
                            var tItem = settings.autoWidth === true ? tI : settings.item;

                            /**/
                            if (tItem < $el.find('.clone.left').length) {
                                for (var i = 0; i < $el.find('.clone.left').length - tItem; i++) {
                                    $children.eq(i).remove();
                                }
                            }
                            if (tItem < $el.find('.clone.right').length) {
                                for (var j = $children.length - 1; j > ($children.length - 1 - $el.find('.clone.right').length); j--) {
                                    scene--;
                                    $children.eq(j).remove();
                                }
                            }
                            /**/
                            for (var n = $el.find('.clone.right').length; n < tItem; n++) {
                                $el.find('.lslide').eq(n).clone().removeClass('lslide').addClass('clone right').appendTo($el);
                                scene++;
                            }
                            for (var m = $el.find('.lslide').length - $el.find('.clone.left').length; m > ($el.find('.lslide').length - tItem); m--) {
                                $el.find('.lslide').eq(m - 1).clone().removeClass('lslide').addClass('clone left').prependTo($el);
                            }
                            $children = $el.children();
                        } else {
                            if ($children.hasClass('clone')) {
                                $el.find('.clone').remove();
                                $this.move($el, 0);
                            }
                        }
                    };
                    refresh.clone();
                }
                refresh.sSW = function () {
                    length = $children.length;
                    if (settings.rtl === true) {
                        gutter = 'margin-left';
                    }
                    if (settings.autoWidth === false) {
                        $children.css(property, slideWidth + 'px');
                    }
                    $children.css(gutter, settings.slideMargin + 'px');
                    w = refresh.calWidth(false);
                    $el.css(property, w + 'px');
                    if (settings.loop === true && settings.mode === 'slide') {
                        if (on === false) {
                            scene = $el.find('.clone.left').length;
                        }
                    }
                };
                refresh.calL = function () {
                    $children = $el.children();
                    length = $children.length;
                };
                if (this.doCss()) {
                    $slide.addClass('usingCss');
                }
                refresh.calL();
                if (settings.mode === 'slide') {
                    refresh.calSW();
                    refresh.sSW();
                    if (settings.loop === true) {
                        slideValue = $this.slideValue();
                        this.move($el, slideValue);
                    }
                    this.setHeight($el, false);

                } else {
                    this.setHeight($el, true);
                    $el.addClass('lSFade');
                    if (!this.doCss()) {
                        $children.fadeOut(0);
                        $children.eq(scene).fadeIn(0);
                    }
                }
                if (settings.loop === true && settings.mode === 'slide') {
                    $children.eq(scene).addClass('active');
                } else {
                    $children.first().addClass('active');
                }
            },
            pager: function () {
                var $this = this;
                refresh.createPager = function () {
                    thumbWidth = (elSize - ((settings.thumbItem * (settings.thumbMargin)) - settings.thumbMargin)) / settings.thumbItem;
                    var $children = $slide.find('.lslide');
                    var length = $slide.find('.lslide').length;
                    var i = 0,
                        pagers = '',
                        v = 0;
                    for (i = 0; i < length; i++) {
                        if (settings.mode === 'slide') {
                            // calculate scene * slide value
                            if (!settings.autoWidth) {
                                v = i * ((slideWidth + settings.slideMargin) * settings.slideMove);
                            } else {
                                v += ((parseInt($children.eq(i).width()) + settings.slideMargin) * settings.slideMove);
                            }
                        }
                        var thumb = $children.eq(i * settings.slideMove).attr('data-thumb');
                        if (settings.gallery === true) {
                            pagers += '<li style="width:100%;' + property + ':' + thumbWidth + 'px;' + gutter + ':' + settings.thumbMargin + 'px"><a href="#"><img src="' + thumb + '" /></a></li>';
                        } else {
                            pagers += '<li><a href="#">' + (i + 1) + '</a></li>';
                        }
                        if (settings.mode === 'slide') {
                            if ((v) >= w - elSize - settings.slideMargin) {
                                i = i + 1;
                                var minPgr = 2;
                                if (settings.autoWidth) {
                                    pagers += '<li><a href="#">' + (i + 1) + '</a></li>';
                                    minPgr = 1;
                                }
                                if (i < minPgr) {
                                    pagers = null;
                                    $slide.parent().addClass('noPager');
                                } else {
                                    $slide.parent().removeClass('noPager');
                                }
                                break;
                            }
                        }
                    }
                    var $cSouter = $slide.parent();
                    $cSouter.find('.lSPager').html(pagers);
                    if (settings.gallery === true) {
                        pagerWidth = (i * (settings.thumbMargin + thumbWidth)) + 0.5;
                        $cSouter.find('.lSPager').css({
                            property: pagerWidth + 'px',
                            'transition-duration': settings.speed + 'ms'
                        });
                        $cSouter.find('.lSPager').css(property, pagerWidth + 'px');
                    }
                    var $pager = $cSouter.find('.lSPager').find('li');
                    $pager.first().addClass('active');
                    $pager.on('click', function () {
                        if (settings.loop === true && settings.mode === 'slide') {
                            scene = scene + ($pager.index(this) - $cSouter.find('.lSPager').find('li.active').index());
                        } else {
                            scene = $pager.index(this);
                        }
                        $el.mode(false);
                        if (settings.gallery === true) {
                            $this.slideThumb();
                        }
                        return false;
                    });

                    /*var $h = (settings.maxHeight / settings.maxWidth) * jQuery('.lSSlideOuter').width();
                     jQuery('.lSSlideOuter').height($h);
                     if(settings.dotsPos === 'top'){
                     jQuery('.lSPager.lSpg').css({
                     top: (jQuery('.lSSlideWrapper').height() - jQuery('.lSSlideOuter').height()) / 2 + 10 + 'px'
                     });
                     } else {
                     jQuery('.lSPager.lSpg').css({
                     bottom: (jQuery('.lSSlideWrapper').height() - jQuery('.lSSlideOuter').height()) / 2 - jQuery('.lSSlideWrapper').height() + 15 + 'px'
                     });
                     }*/
                };
                if (settings.pager) {
                    var cl = 'lSpg';
                    if (settings.gallery) {
                        cl = 'lSGallery';
                    }
                    if(hugeitSliderObj.navigation_position === 'top' && !settings.gallery){
                        $slide.before('<ul class="lSPager ' + cl + '"></ul>');
                    } else {
                        $slide.after('<ul class="lSPager ' + cl + '"></ul>');
                    }
                    var gMargin = 'margin-top';
                    $slide.parent().find('.lSPager').css(gMargin, settings.galleryMargin + 'px');
                    refresh.createPager();
                }

                setTimeout(function () {
                    refresh.init();
                }, 0);
            },
            setHeight: function (ob, fade) {
                var obj = null,
                    $this = this;
                if (settings.loop) {
                    obj = ob.children('.lslide ').first();
                } else {
                    obj = ob.children().first();
                }
                var setCss = function () {
                    var tH = obj.outerHeight(),
                        tP = 0,
                        tHT = tH;
                    if (fade) {
                        tH = 0;
                        tP = ((tHT) * 100) / elSize;
                    }
                    ob.css({
                        'height': tH + 14 + 'px',
                        'padding-bottom': tP + '%'
                    });
                };
                setCss();
                if (obj.find('img').length) {
                    if ( obj.find('img')[0].complete) {
                        setCss();
                        if (!interval) {
                            $this.auto();
                        }
                    }else{
                        obj.find('img').on('load', function () {
                            setTimeout(function () {
                                setCss();
                                if (!interval) {
                                    $this.auto();
                                }
                            }, 100);
                        });
                    }
                }else{
                    if (!interval) {
                        $this.auto();
                    }
                }
            },
            active: function (ob, t) {
                if (this.doCss() && settings.mode === 'fade') {
                    $slide.addClass('on');
                }
                var sc = 0;
                if (scene * settings.slideMove < length) {
                    ob.removeClass('active');
                    if (!this.doCss() && settings.mode === 'fade' && t === false) {
                        ob.fadeOut(settings.speed);
                    }
                    if (t === true) {
                        sc = scene;
                    } else {
                        sc = scene * settings.slideMove;
                    }
                    //t === true ? sc = scene : sc = scene * settings.slideMove;
                    var l, nl;
                    if (t === true) {
                        l = ob.length;
                        nl = l - 1;
                        if (sc + 1 >= l) {
                            sc = nl;
                        }
                    }
                    if (settings.loop === true && settings.mode === 'slide') {
                        //t === true ? sc = scene - $el.find('.clone.left').length : sc = scene * settings.slideMove;
                        if (t === true) {
                            sc = scene - $el.find('.clone.left').length;
                        } else {
                            sc = scene * settings.slideMove;
                        }
                        if (t === true) {
                            l = ob.length;
                            nl = l - 1;
                            if (sc + 1 === l) {
                                sc = nl;
                            } else if (sc + 1 > l) {
                                sc = 0;
                            }
                        }
                    }

                    if (!this.doCss() && settings.mode === 'fade' && t === false) {
                        ob.eq(sc).fadeIn(settings.speed);
                    }
                    ob.eq(sc).addClass('active');
                } else {
                    ob.removeClass('active');
                    ob.eq(ob.length - 1).addClass('active');
                    if (!this.doCss() && settings.mode === 'fade' && t === false) {
                        ob.fadeOut(settings.speed);
                        ob.eq(sc).fadeIn(settings.speed);
                    }
                }
            },
            move: function (ob, v) {
                if (settings.rtl === true) {
                    v = -v;
                }

                if(settings.item === 3){
                    settings.slideMargin = 20;
                }

                v = v - Math.floor(settings.item / 2) * (slideWidth + settings.slideMargin);

                if (this.doCss()) {
                    ob.css({
                        'transform': 'translate3d(' + (-v) + 'px, 0px, 0px)',
                        '-webkit-transform': 'translate3d(' + (-v) + 'px, 0px, 0px)'
                    });
                } else {
                    ob.css('position', 'relative').animate({
                        left: -v + 'px'
                    }, settings.speed, settings.easing);
                }
                var $thumb = $slide.parent().find('.lSPager').find('li');
                this.active($thumb, true);
            },
            move_: function (ob, v) {
                if (settings.rtl === true) {
                    v = -v;
                }

                if (this.doCss()) {
                    ob.css({
                        'transform': 'translate3d(' + (-v) + 'px, 0px, 0px)',
                        '-webkit-transform': 'translate3d(' + (-v) + 'px, 0px, 0px)'
                    });
                } else {
                    ob.css('position', 'relative').animate({
                        left: -v + 'px'
                    }, settings.speed, settings.easing);
                }
                var $thumb = $slide.parent().find('.lSPager').find('li');
                this.active($thumb, true);
            },
            fade: function () {
                this.active($children, false);
                var $thumb = $slide.parent().find('.lSPager').find('li');
                this.active($thumb, true);
            },
            slide: function () {
                var $this = this;
                refresh.calSlide = function () {
                    if (w > elSize) {
                        slideValue = $this.slideValue();
                        $this.active($children, false);
                        if ((slideValue) > w - elSize - settings.slideMargin) {
                            slideValue = w - elSize - settings.slideMargin;
                        } else if (slideValue < 0) {
                            slideValue = 0;
                        }
                        $this.move($el, slideValue);
                        if (settings.loop === true && settings.mode === 'slide') {
                            if (scene >= (length - ($el.find('.clone.left').length / settings.slideMove))) {
                                $this.resetSlide($el.find('.clone.left').length);
                            }
                            if (scene === 0) {
                                $this.resetSlide($slide.find('.lslide').length);
                            }
                        }
                    }
                };
                refresh.calSlide();
            },
            resetSlide: function (s) {
                var $this = this;
                $slide.find('.lSAction a').addClass('disabled');
                setTimeout(function () {
                    scene = s;
                    $slide.css('transition-duration', '0ms');
                    slideValue = $this.slideValue();
                    $this.active($children, false);
                    plugin.move($el, slideValue);
                    setTimeout(function () {
                        $slide.css('transition-duration', settings.speed + 'ms');
                        $slide.find('.lSAction a').removeClass('disabled');
                    }, 50);
                }, settings.speed + 100);
            },
            slideValue: function () {
                var _sV = 0;
                if (settings.autoWidth === false) {
                    _sV = scene * ((slideWidth + settings.slideMargin) * settings.slideMove);
                } else {
                    _sV = 0;
                    for (var i = 0; i < scene; i++) {
                        _sV += (parseInt($children.eq(i).width()) + settings.slideMargin);
                    }
                }
                return _sV;
            },
            slideThumb: function () {
                var position;
                switch (settings.currentPagerPosition) {
                    case 'left':
                        position = 0;
                        break;
                    case 'middle':
                        position = (elSize / 2) - (thumbWidth / 2);
                        break;
                    case 'right':
                        position = elSize - thumbWidth;
                }
                var sc = scene - $el.find('.clone.left').length;
                var $pager = $slide.parent().find('.lSPager');
                if (settings.mode === 'slide' && settings.loop === true) {
                    if (sc >= $pager.children().length) {
                        sc = 0;
                    } else if (sc < 0) {
                        sc = $pager.children().length;
                    }
                }
                var thumbSlide = sc * ((thumbWidth + settings.thumbMargin)) - (position);
                if ((thumbSlide + elSize) > pagerWidth) {
                    thumbSlide = pagerWidth - elSize - settings.thumbMargin;
                }
                if (thumbSlide < 0) {
                    thumbSlide = 0;
                }
                this.move_($pager, thumbSlide);
            },
            auto: function () {
                if (settings.auto) {
                    clearInterval(interval);
                    interval = setInterval(function () {
                        $el.goToNextSlide();
                    }, settings.pause);
                }
            },
            pauseOnHover: function(){
                var $this = this;
                if (settings.auto && settings.pauseOnHover) {
                    $slide.on('mouseenter', function(){
                        $(this).addClass('ls-hover');
                        $el.pause();
                        settings.auto = true;
                    });
                    $slide.on('mouseleave',function(){
                        $(this).removeClass('ls-hover');
                        if (!$slide.find('.lightSlider').hasClass('lsGrabbing')) {
                            $this.auto();
                        }
                    });
                }
            },
            touchMove: function (endCoords, startCoords) {
                $slide.css('transition-duration', '0ms');
                if (settings.mode === 'slide') {
                    var distance = endCoords - startCoords;
                    var swipeVal = slideValue - distance;
                    if ((swipeVal) >= w - elSize - settings.slideMargin) {
                        if (settings.freeMove === false) {
                            swipeVal = w - elSize - settings.slideMargin;
                        } else {
                            var swipeValT = w - elSize - settings.slideMargin;
                            swipeVal = swipeValT + ((swipeVal - swipeValT) / 5);

                        }
                    } else if (swipeVal < 0) {
                        if (settings.freeMove === false) {
                            swipeVal = 0;
                        } else {
                            swipeVal = swipeVal / 5;
                        }
                    }
                    this.move($el, swipeVal);
                }
            },

            touchEnd: function (distance) {
                $slide.css('transition-duration', settings.speed + 'ms');
                if (settings.mode === 'slide') {
                    var mxVal = false;
                    var _next = true;
                    slideValue = slideValue - distance;
                    if ((slideValue) > w - elSize - settings.slideMargin) {
                        slideValue = w - elSize - settings.slideMargin;
                        if (settings.autoWidth === false) {
                            mxVal = true;
                        }
                    } else if (slideValue < 0) {
                        slideValue = 0;
                    }
                    var gC = function (next) {
                        var ad = 0;
                        if (!mxVal) {
                            if (next) {
                                ad = 1;
                            }
                        }
                        if (!settings.autoWidth) {
                            var num = slideValue / ((slideWidth + settings.slideMargin) * settings.slideMove);
                            scene = parseInt(num) + ad;
                            if (slideValue >= (w - elSize - settings.slideMargin)) {
                                if (num % 1 !== 0) {
                                    scene++;
                                }
                            }
                        } else {
                            var tW = 0;
                            for (var i = 0; i < $children.length; i++) {
                                tW += (parseInt($children.eq(i).width()) + settings.slideMargin);
                                scene = i + ad;
                                if (tW >= slideValue) {
                                    break;
                                }
                            }
                        }
                    };
                    if (distance >= settings.swipeThreshold) {
                        gC(false);
                        _next = false;
                    } else if (distance <= -settings.swipeThreshold) {
                        gC(true);
                        _next = false;
                    }
                    $el.mode(_next);
                    this.slideThumb();
                } else {
                    if (distance >= settings.swipeThreshold) {
                        $el.goToPrevSlide();
                    } else if (distance <= -settings.swipeThreshold) {
                        $el.goToNextSlide();
                    }
                }
            },



            enableDrag: function () {
                var $this = this;
                if (!isTouch) {
                    var startCoords = 0,
                        endCoords = 0,
                        isDraging = false;
                    $slide.find('.lightSlider').addClass('lsGrab');
                    $slide.on('mousedown', function (e) {
                        if (w < elSize) {
                            if (w !== 0) {
                                return false;
                            }
                        }
                        if ($(e.target).attr('class') !== ('lSPrev') && $(e.target).attr('class') !== ('lSNext')) {
                            startCoords = e.pageX;
                            isDraging = true;
                            if (e.preventDefault) {
                                e.preventDefault();
                            } else {
                                e.returnValue = false;
                            }
                            // ** Fix for webkit cursor issue https://code.google.com/p/chromium/issues/detail?id=26723
                            $slide.scrollLeft += 1;
                            $slide.scrollLeft -= 1;
                            // *
                            $slide.find('.lightSlider').removeClass('lsGrab').addClass('lsGrabbing');
                            clearInterval(interval);
                        }
                    });
                    $(window).on('mousemove', function (e) {
                        if (isDraging) {
                            endCoords = e.pageX;
                            $this.touchMove(endCoords, startCoords);
                        }
                    });
                    $(window).on('mouseup', function (e) {
                        if (isDraging) {
                            $slide.find('.lightSlider').removeClass('lsGrabbing').addClass('lsGrab');
                            isDraging = false;
                            endCoords = e.pageX;
                            var distance = endCoords - startCoords;
                            if (Math.abs(distance) >= settings.swipeThreshold) {
                                $(window).on('click.ls', function (e) {
                                    if (e.preventDefault) {
                                        e.preventDefault();
                                    } else {
                                        e.returnValue = false;
                                    }
                                    e.stopImmediatePropagation();
                                    e.stopPropagation();
                                    $(window).off('click.ls');
                                });
                            }

                            $this.touchEnd(distance);

                        }
                    });
                }
            },




            enableTouch: function () {
                var $this = this;
                if (isTouch) {
                    var startCoords = {},
                        endCoords = {};
                    $slide.on('touchstart', function (e) {
                        endCoords = e.originalEvent.targetTouches[0];
                        startCoords.pageX = e.originalEvent.targetTouches[0].pageX;
                        startCoords.pageY = e.originalEvent.targetTouches[0].pageY;
                        clearInterval(interval);
                    });
                    $slide.on('touchmove', function (e) {
                        if (w < elSize) {
                            if (w !== 0) {
                                return false;
                            }
                        }
                        var orig = e.originalEvent;
                        endCoords = orig.targetTouches[0];
                        var xMovement = Math.abs(endCoords.pageX - startCoords.pageX);
                        var yMovement = Math.abs(endCoords.pageY - startCoords.pageY);
                        if ((xMovement * 3) > yMovement) {
                            e.preventDefault();
                        }
                        $this.touchMove(endCoords.pageX, startCoords.pageX);
                    });
                    $slide.on('touchend', function () {
                        if (w < elSize) {
                            if (w !== 0) {
                                return false;
                            }
                        }
                        var distance;
                        distance = endCoords.pageX - startCoords.pageX;
                        $this.touchEnd(distance);
                    });
                }
            },
            build: function () {
                var $this = this;
                $this.initialStyle();
                if (this.doCss()) {

                    if (settings.enableTouch === true) {
                        $this.enableTouch();
                    }
                    if (settings.enableDrag === true) {
                        $this.enableDrag();
                    }
                }

                $(window).on('focus', function(){
                    $this.auto();
                });

                $(window).on('blur', function(){
                    clearInterval(interval);
                });

                $this.pager();
                $this.pauseOnHover();
                $this.controls();
                $this.keyPress();
            }
        };
        plugin.build();
        refresh.init = function () {
            refresh.chbreakpoint();
            elSize = $slide.outerWidth();
            if (settings.loop === true && settings.mode === 'slide') {
                refresh.clone();
            }
            refresh.calL();
            if (settings.mode === 'slide') {
                $el.removeClass('lSSlide');
            }
            if (settings.mode === 'slide') {
                refresh.calSW();
                refresh.sSW();
            }
            setTimeout(function () {
                if (settings.mode === 'slide') {
                    $el.addClass('lSSlide');
                }
            }, 1000);
            if (settings.pager) {
                refresh.createPager();
            }
            if (settings.mode === 'slide') {
                plugin.setHeight($el, false);
            } else {
                plugin.setHeight($el, true);
            }
            if (settings.gallery === true) {
                plugin.slideThumb();
            }
            if (settings.mode === 'slide') {
                plugin.slide();
            }
            if (settings.autoWidth === false) {
                if ($children.length <= settings.item) {
                    $slide.find('.lSAction').hide();
                } else {
                    $slide.find('.lSAction').show();
                }
            } else {
                if ((refresh.calWidth(false) < elSize) && (w !== 0)) {
                    $slide.find('.lSAction').hide();
                } else {
                    $slide.find('.lSAction').show();
                }
            }
        };
        $el.goToPrevSlide = function () {
            if (scene > 0) {
                settings.onBeforePrevSlide.call(this, $el, scene);
                scene--;
                $el.mode(false);
                if (settings.gallery === true) {
                    plugin.slideThumb();
                }
            } else {
                if (settings.loop === true) {
                    settings.onBeforePrevSlide.call(this, $el, scene);
                    if (settings.mode === 'fade') {
                        var l = (length - 1);
                        scene = parseInt(l / settings.slideMove);
                    }
                    $el.mode(false);
                    if (settings.gallery === true) {
                        plugin.slideThumb();
                    }
                } else if (settings.slideEndAnimation === true) {
                    $el.addClass('leftEnd');
                    setTimeout(function () {
                        $el.removeClass('leftEnd');
                    }, 400);
                }
            }
        };
        $el.goToNextSlide = function () {
            var nextI = true;
            if (settings.mode === 'slide') {
                var _slideValue = plugin.slideValue();
                nextI = _slideValue < w - elSize - settings.slideMargin;
            }
            if (((scene * settings.slideMove) < length - settings.slideMove) && nextI) {
                settings.onBeforeNextSlide.call(this, $el, scene);
                scene++;
                $el.mode(false);
                if (settings.gallery === true) {
                    plugin.slideThumb();
                }
            } else {
                if (settings.loop === true) {
                    settings.onBeforeNextSlide.call(this, $el, scene);
                    scene = 0;
                    $el.mode(false);
                    if (settings.gallery === true) {
                        plugin.slideThumb();
                    }
                } else if (settings.slideEndAnimation === true) {
                    $el.addClass('rightEnd');
                    setTimeout(function () {
                        $el.removeClass('rightEnd');
                    }, 400);
                }
            }
        };
        $el.mode = function (_touch) {
            if (on === false) {
                if (settings.mode === 'slide') {
                    if (plugin.doCss()) {
                        $el.addClass('lSSlide');
                        if (settings.speed !== '') {
                            $slide.css('transition-duration', settings.speed + 'ms');
                        }
                        if (settings.cssEasing !== '') {
                            $slide.css('transition-timing-function', settings.cssEasing);
                        }
                    }
                } else {
                    if (plugin.doCss()) {
                        if (settings.speed !== '') {
                            $el.css('transition-duration', settings.speed + 'ms');
                        }
                        if (settings.cssEasing !== '') {
                            $el.css('transition-timing-function', settings.cssEasing);
                        }
                    }
                }
            }
            if (!_touch) {
                settings.onBeforeSlide.call(this, $el, scene);
            }
            if (settings.mode === 'slide') {
                plugin.slide();
            } else {
                plugin.fade();
            }
            if (!$slide.hasClass('ls-hover')) {
                plugin.auto();
            }
            setTimeout(function () {
                if (!_touch) {
                    settings.onAfterSlide.call(this, $el, scene);
                }
            }, settings.speed);
            on = true;
        };
        $el.play = function () {
            $el.goToNextSlide();
            settings.auto = true;
            plugin.auto();
        };
        $el.pause = function () {
            settings.auto = false;
            clearInterval(interval);
        };
        $el.refresh = function () {
            refresh.init();
        };
        $el.getCurrentSlideCount = function () {
            var sc = scene;
            if (settings.loop) {
                var ln = $slide.find('.lslide').length,
                    cl = $el.find('.clone.left').length;
                if (scene <= cl - 1) {
                    sc = ln + (scene - cl);
                } else if (scene >= (ln + cl)) {
                    sc = scene - ln - cl;
                } else {
                    sc = scene - cl;
                }
            }
            return sc + 1;
        };
        $el.getTotalSlideCount = function () {
            return $slide.find('.lslide').length;
        };
        $el.goToSlide = function (s) {
            if (settings.loop) {
                scene = (s + $el.find('.clone.left').length - 1);
            } else {
                scene = s;
            }
            $el.mode(false);
            if (settings.gallery === true) {
                plugin.slideThumb();
            }
        };
        $el.destroy = function () {
            if ($el.lightSlider) {
                $el.goToPrevSlide = function(){};
                $el.goToNextSlide = function(){};
                $el.mode = function(){};
                $el.play = function(){};
                $el.pause = function(){};
                $el.refresh = function(){};
                $el.getCurrentSlideCount = function(){};
                $el.getTotalSlideCount = function(){};
                $el.goToSlide = function(){};
                $el.lightSlider = null;
                refresh = {
                    init : function(){}
                };
                $el.parent().parent().find('.lSAction, .lSPager').remove();
                $el.removeClass('lightSlider lSFade lSSlide lsGrab lsGrabbing leftEnd right').removeAttr('style').unwrap().unwrap();
                $el.children().removeAttr('style');
                $children.removeClass('lslide active');
                $el.find('.clone').remove();
                $children = null;
                interval = null;
                on = false;
                scene = 0;
            }

        };
        setTimeout(function () {
            settings.onSliderLoad.call(this, $el);
        }, 10);
        $(window).on('resize orientationchange', function (e) {
            setTimeout(function () {
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;
                }
                refresh.init();

                /*var $h = (settings.maxHeight / settings.maxWidth) * jQuery('.lSSlideOuter').width();
                 jQuery('.lSSlideOuter').height($h);
                 if(settings.dotsPos === 'top'){
                 jQuery('.lSPager.lSpg').css({
                 top: (jQuery('.lSSlideWrapper').height() - jQuery('.lSSlideOuter').height()) / 2 + 10 + 'px'
                 });
                 } else {
                 jQuery('.lSPager.lSpg').css({
                 bottom: (jQuery('.lSSlideWrapper').height() - jQuery('.lSSlideOuter').height()) / 2 - jQuery('.lSSlideWrapper').height() + 15 + 'px'
                 });
                 }*/
            }, 200);
        });
        return this;
    };
}(jQuery));





//////////////////////////////////////////





(function ($, window, document) {

    'use strict';

    var defaults = {
        maxWidth: 900,
        maxHeight: 700,
        transition: 'random',
        customTransitions: [],
        fallback3d: 'fade',
        perspective: 1000,
        navigation: +hugeitSliderObj.show_arrows,
        thumbMargin: .5,
        autoPlay: true,
        controls: 'dot',
        cropImage: 'stretch',
        delay: 5000,
        transitionDuration: 2000,
        pauseOnHover: true,
        startSlide: 0,
        keyNav: false
    };

    function Slider(elem, settings) {
        this.$slider = $(elem).addClass('huge-it-slider');
        this.settings = $.extend({}, defaults, settings);
        this.$slides = this.$slider.find('> li');
        this.totalSlides = this.$slides.length;
        this.cssTransitions = testBrowser.cssTransitions();
        this.cssTransforms3d = testBrowser.cssTransforms3d();
        this.currentPlace = this.settings.startSlide;
        this.$currentSlide = this.$slides.eq(this.currentPlace);
        this.inProgress = false;
        this.$sliderWrap = this.$slider.wrap('<div class="huge-it-wrap" />').parent();
        this.$sliderBG = this.$slider.wrap('<div class="huge-it-slide-bg" />').parent();
        this.settings.slider = this;

        this.init();
    }

    Slider.prototype.cycling = null;

    Slider.prototype.$slideImages = null;

    Slider.prototype.init = function () {

        var _this = this;

        this.captions();

        (this.settings.transition === 'custom') && (this.nextAnimIndex = -1);

        +this.settings.navigation && this.setArrows();


        this.settings.keyNav && this.setKeys();

        for (var i = 0; i < this.totalSlides; i++) {
            this.$slides.eq(i).addClass('huge-it-slide-' + i);
        }

        this.settings.autoPlay && this.setAutoPlay();

        if (+this.settings.pauseOnHover) {
            this.$slider.hover(function () {

                _this.$slider.addClass('slidePause');
                _this.setPause();

            }, function () {

                _this.$slider.removeClass('slidePause');

                if(!jQuery('.huge-it-wrap').hasClass('isPlayed')){
                    _this.setAutoPlay();
                }

            });
        }

        jQuery('.playSlider').on('click', function () {
            _this.setAutoPlay();
            jQuery('.huge-it-wrap').removeClass('isPlayed');
        });
        jQuery('.pauseSlider').on('click', function () {
            _this.setPause();
            jQuery('.huge-it-wrap').addClass('isPlayed');
        });

        this.$slideImages = this.$slides.find('img:eq(0)').addClass('huge-it-slide-image');

        this.setup();

        var $id = $(this)[0].$currentSlide.context.id;

        jQuery(window).resize(function(){
            _this.cropImage();

            if(_this.settings.controls === 'thumbnail'){
                jQuery('.huge-it-wrap').height(jQuery('#' + $id).height() + +hugeitSliderObj.thumb_height);
            } else {
                jQuery('.huge-it-wrap').height(jQuery('#' + $id).height());
            }

        });

        if(_this.settings.controls === 'thumbnail'){
            jQuery('.huge-it-wrap').height(jQuery('#' + $id).height() + +hugeitSliderObj.thumb_height);
        } else {
            jQuery('.huge-it-wrap').height(jQuery('#' + $id).height());
        }
    };

    Slider.prototype.setup = function () {
        var sliderWidth, sliderHeight;
        sliderWidth = +this.settings.maxWidth;
        sliderHeight = (this.settings.controls === 'thumbnail') ?
        +this.settings.maxHeight + +hugeitSliderObj.thumb_height + 3 * +hugeitSliderObj.slideshow_border_size + 2 * this.settings.thumbMargin
            : +this.settings.maxHeight;
        this.$sliderWrap.css({
            maxWidth: sliderWidth + 'px',
            maxHeight: sliderHeight + 'px'
        });

        switch (this.settings.controls) {
            case 'dot':
                this.setDots();
                break;
            case 'thumbnail':
                this.setThumbs();
                break;
            case 'none':
                break;
        }

        jQuery('.slider-description div').each(function(){
            if(jQuery(this).text().length > 300){
                var text = jQuery(this).text();
                jQuery(this).attr('title', text);
                text = jQuery(this).text().substring(0, 300) + '...';
                jQuery(this).text(text);
            }
        });

        this.cropImage();

        this.$currentSlide.css({'opacity': 1, 'z-index': 2});
    };

    Slider.prototype.cropImage = function(){

        var w = this.settings.maxWidth,
            h = this.settings.maxHeight,
            wT, hT, r, d, mTop, mLeft;

        if(jQuery(window).width() < +this.settings.maxWidth || jQuery(window).height() < +this.settings.maxHeight){
            w = jQuery(window).width();
            h = +this.settings.maxHeight / +this.settings.maxWidth * w;
        }

        if(jQuery('.huge-it-slide-bg').width() < +this.settings.maxWidth || jQuery('.huge-it-slide-bg').height() < +this.settings.maxHeight){
            w = jQuery('.huge-it-slide-bg').width();
        }

        switch (hugeitSliderObj.crop_image) {
            case 'stretch':
                this.$slideImages.css({
                    'width': '100%',
                    'height': h + 'px',
                    'visibility': 'visible',
                    'max-height': 'none'
                });
                break;
            case 'fill':
                this.$slideImages.each(function () {
                    wT = $(this)[0].naturalWidth;
                    hT = $(this)[0].naturalHeight;
                    if ((wT / hT) < (w / h)) {
                        r = w / wT;
                        d = (Math.abs(h - (hT * r))) * 0.5;
                        mTop = '-' + d + 'px';
                        $(this).css({
                            'height': hT * r,
                            'margin-left': 0,
                            'margin-right': 0,
                            'margin-top': mTop,
                            'visibility': 'visible',
                            'width': w,
                            'max-width': 'none',
                            'max-height': 'none'
                        });
                    } else {
                        r = h / hT;
                        d = (Math.abs(w - (wT * r))) * 0.5;
                        mLeft = '-' + d + 'px';
                        $(this).css({
                            'height': h,
                            'margin-left': mLeft,
                            'margin-right': mLeft,
                            'margin-top': 0,
                            'visibility': 'visible',
                            'width': wT * r,
                            'max-width': 'none',
                            'max-height': 'none'
                        });
                    }
                });
                break;
        }
    };

    Slider.prototype.setArrows = function () {
        var _this = this;

        this.$sliderWrap.append('<a href="#" class="huge-it-arrows huge-it-prev"></a><a href="#" class="huge-it-arrows huge-it-next"></a>');

        if(hugeitSliderObj.navigation_type === '17' || hugeitSliderObj.navigation_type === '18' || hugeitSliderObj.navigation_type === '19' || hugeitSliderObj.navigation_type === '20' || hugeitSliderObj.navigation_type === '21'){
            var $_next = '<svg class="next_bg" width="22px" height="22px" fill="#999" viewBox="-333 335.5 31.5 31.5" >' +
                '<path d="M-311.8,340.5c-0.4-0.4-1.1-0.4-1.6,0c-0.4,0.4-0.4,1.1,0,1.6l8,8h-26.6c-0.6,0-1.1,0.5-1.1,1.1s0.5,1.1,1.1,1.1h26.6l-8,8c-0.4,0.4-0.4,1.2,0,1.6c0.4,0.4,1.2,0.4,1.6,0l10-10c0.4-0.4,0.4-1.1,0-1.6L-311.8,340.5z"/>' +
                '</svg>';
            var $_prev = '<svg class="prev_bg" width="22px" height="22px" fill="#999" viewBox="-333 335.5 31.5 31.5" >' +
                '<path d="M-322.7,340.5c0.4-0.4,1.1-0.4,1.6,0c0.4,0.4,0.4,1.1,0,1.6l-8,8h26.6c0.6,0,1.1,0.5,1.1,1.1c0,0.6-0.5,1.1-1.1,1.1h-26.6l8,8c0.4,0.4,0.4,1.2,0,1.6c-0.4,0.4-1.1,0.4-1.6,0l-10-10c-0.4-0.4-0.4-1.1,0-1.6L-322.7,340.5z"/>' +
                '</svg>';
            jQuery('.huge-it-prev').append($_prev);
            jQuery('.huge-it-next').append($_next);

            if(hugeitSliderObj.navigation_type === '21'){
                jQuery('.huge-it-prev').append('<p class="prev_title"></p>');
                jQuery('.huge-it-next').append('<p class="next_title"></p>');
            }

            var $nextIndex, $prevIndex, $nextImg, $prevImg, $nextTitle = '', $prevTitle = '';


            if(hugeitSliderObj.navigation_type !== '17'){
                jQuery('.huge-it-next').hover(function(){
                    if(_this.currentPlace + 1 == _this.totalSlides){
                        $nextIndex = 0;
                    } else {
                        $nextIndex = _this.currentPlace + 1;
                    }

                    $nextImg = jQuery('li.group').eq($nextIndex).find('img').attr('src');
                    $nextTitle = jQuery('li.group').eq($nextIndex).find('img').attr('alt');

                    jQuery(this).find('.next_title').text($nextTitle);
                    jQuery(this).css({
                        backgroundImage: 'url(' + $nextImg + ')',
                        backgroundPosition: 'left center',
                        backgroundSize: '100px 90px',
                        backgroundRepeat: 'no-repeat'

                    });
                }, function(){
                    jQuery(this).find('.next_title').text('');
                    jQuery(this).css({
                        backgroundImage: ''
                    });
                });
                jQuery('.huge-it-prev').hover(function(){
                    if(_this.currentPlace - 1 < 0){
                        $prevIndex = _this.totalSlides - 1;
                    } else {
                        $prevIndex = _this.currentPlace - 1;
                    }

                    $prevImg = jQuery('li.group').eq($prevIndex).find('img').attr('src');
                    $prevTitle = jQuery('li.group').eq($prevIndex).find('img').attr('alt');

                    jQuery(this).find('.prev_title').text($prevTitle);
                    jQuery(this).css({
                        backgroundImage: 'url(' + $prevImg + ')',
                        backgroundPosition: 'right center',
                        backgroundSize: '100px 90px',
                        backgroundRepeat: 'no-repeat'
                    });
                }, function(){
                    jQuery(this).find('.prev_title').text('');
                    jQuery(this).css({
                        backgroundImage: ''
                    });
                });
            } else {
                jQuery('.huge-it-next').hover(function(){
                    if(_this.currentPlace + 1 == _this.totalSlides){
                        $nextIndex = 0;
                    } else {
                        $nextIndex = _this.currentPlace + 1;
                    }
                    $nextImg = jQuery('li.group').eq($nextIndex).find('img').attr('src');
                    jQuery(this).css({
                        backgroundImage: 'url(' + $nextImg + ')',
                        backgroundPosition: 'center center'

                    });
                }, function(){
                    jQuery(this).css({
                        backgroundImage: ''
                    });
                });
                jQuery('.huge-it-prev').hover(function(){
                    if(_this.currentPlace - 1 < 0){
                        $prevIndex = _this.totalSlides - 1;
                    } else {
                        $prevIndex = _this.currentPlace - 1;
                    }

                    $prevImg = jQuery('li.group').eq($prevIndex).find('img').attr('src');
                    jQuery(this).css({
                        backgroundImage: 'url(' + $prevImg + ')',
                        backgroundPosition: 'center center'
                    });
                }, function(){
                    jQuery(this).css({
                        backgroundImage: ''
                    });
                });
            }
        }

        $('.huge-it-next', this.$sliderWrap).on('click', function (e) {
            e.preventDefault();
            _this.next();
        });

        $('.huge-it-prev', this.$sliderWrap).on('click', function (e) {
            e.preventDefault();
            _this.prev();
        });

        if(this.settings.controls === 'thumbnail'){
            this.$sliderWrap.append('<a href="#" class="thumb_arr thumb_prev"></a><a href="#" class="thumb_arr thumb_next"></a>');
        }

        $('.thumb_next').on('click', function (e) {
            e.preventDefault();
            var width = (Math.min(jQuery('.huge-it-slide-bg').width(), +_this.settings.maxWidth) - (2 * +hugeitSliderObj.thumb_count_slides * _this.settings.thumbMargin)) / +hugeitSliderObj.thumb_count_slides + 1,
                position = parseFloat($('.huge-it-thumb-wrap').css('marginLeft')) || 0;

            position = +position.toFixed(4) - +width.toFixed(4);

            if (position >= (_this.totalSlides - hugeitSliderObj.thumb_count_slides) * (-width)) {
                $('.huge-it-thumb-wrap').css({
                    'marginLeft': position + 'px'
                });
            }

            if (_this.currentPlace == 0) {
                $('.huge-it-thumb-wrap').css({
                    'marginLeft': '0'
                });
            }
        });

        $('.thumb_prev').on('click', function (e) {
            e.preventDefault();
            var width = (Math.min(jQuery('.huge-it-slide-bg').width(), +_this.settings.maxWidth) - (2 * +hugeitSliderObj.thumb_count_slides * _this.settings.thumbMargin)) / +hugeitSliderObj.thumb_count_slides + 1,
                position = parseFloat($('.huge-it-thumb-wrap').css('marginLeft')) || 0;

            position = +position.toFixed(4) + +width.toFixed(4);

            if (position <= 0) {
                $('.huge-it-thumb-wrap').css({
                    'marginLeft': position + 'px'
                });
            }

            if (this.currentPlace == _this.totalSlides - 1) {
                position = (_this.totalSlides - hugeitSliderObj.thumb_count_slides) * (-width);
                $('.huge-it-thumb-wrap').css({
                    'marginLeft': position + 'px'
                });
            }
        });
    };

    Slider.prototype.next = function () {
        if (this.settings.transition === 'custom') {
            this.nextAnimIndex++;
        }

        if (this.currentPlace === this.totalSlides - 1) {
            this.transition(0, true);
        } else {
            this.transition(this.currentPlace + 1, true);
        }

        if(jQuery('li.group').eq(this.currentPlace).hasClass('video_iframe') && jQuery('.huge-it-slider').attr('data-autoplay') == 1){
            jQuery('li.group').eq(this.currentPlace).find('.playButton').click();
        }

        var width = (Math.min(jQuery('.huge-it-slide-bg').width(), +this.settings.maxWidth) - (2 * +hugeitSliderObj.thumb_count_slides * this.settings.thumbMargin)) / +hugeitSliderObj.thumb_count_slides + 1;

        $('.huge-it-thumb-wrap').css({
            'marginLeft': -this.currentPlace * width + 'px'
        });

        if(this.totalSlides - +hugeitSliderObj.thumb_count_slides <= this.currentPlace){
            $('.huge-it-thumb-wrap').css({
                'marginLeft': -(this.totalSlides - +hugeitSliderObj.thumb_count_slides) * width + 'px'
            });
        }

        if (this.currentPlace == 0) {
            $('.huge-it-thumb-wrap').css({
                'marginLeft': '0'
            });
        }
    };

    Slider.prototype.prev = function () {
        if (this.settings.transition === 'custom') {
            this.nextAnimIndex--;
        }

        if (this.currentPlace == 0) {
            this.transition(this.totalSlides - 1, false);
        } else {
            this.transition(this.currentPlace - 1, false);
        }

        if(jQuery('li.group').eq(this.currentPlace).hasClass('video_iframe') && jQuery('.huge-it-slider').attr('data-autoplay') == 1){
            jQuery('li.group').eq(this.currentPlace).find('.playButton').click();
        }

        var width = (Math.min(jQuery('.huge-it-slide-bg').width(), +this.settings.maxWidth) - (2 * +hugeitSliderObj.thumb_count_slides * this.settings.thumbMargin)) / +hugeitSliderObj.thumb_count_slides + 1;

        $('.huge-it-thumb-wrap').css({
            'marginLeft': -this.currentPlace * width + 'px'
        });

        if(this.totalSlides - +hugeitSliderObj.thumb_count_slides <= this.currentPlace){
            $('.huge-it-thumb-wrap').css({
                'marginLeft': -(this.totalSlides - +hugeitSliderObj.thumb_count_slides) * width + 'px'
            });
        }
    };

    Slider.prototype.setKeys = function () {
        var _this = this;

        $(document).on('keydown', function (e) {
            if (e.keyCode === 39) {
                _this.next();
            } else if (e.keyCode === 37) {
                _this.prev();
            }
        });
    };

    Slider.prototype.setAutoPlay = function () {
        var _this = this;

        if(!this.$slider.hasClass('slidePause')){
            this.cycling = setTimeout(function () {
                _this.next();
            }, this.settings.delay);
        }
    };

    Slider.prototype.setPause = function () {
        clearTimeout(this.cycling);
    };

    Slider.prototype.setDots = function () {
        var _this = this;

        this.$dotWrap = $('<div class="huge-it-dot-wrap" />').appendTo(this.$sliderWrap);

        for (var i = 0; i < this.totalSlides; i++) {
            var $thumb = $('<a />')
                .attr('href', '#')
                .data('huge-it-num', i);

            $thumb.appendTo(this.$dotWrap);
        }

        this.$dotWrapLinks = this.$dotWrap.find('a');

        this.$dotWrapLinks.eq(this.settings.startSlide).addClass('active');

        this.$dotWrap.on('click', 'a', function (e) {
            e.preventDefault();

            _this.transition(parseInt($(this).data('huge-it-num')));
        });
    };

    Slider.prototype.setThumbs = function () {
        var _this = this,
            width = (Math.min(jQuery('.huge-it-slide-bg').width(), +this.settings.maxWidth) - (2 * +hugeitSliderObj.thumb_count_slides * this.settings.thumbMargin)) / +hugeitSliderObj.thumb_count_slides;

        this.$thumbWrap = $('<div class="huge-it-thumb-wrap" />').appendTo(this.$sliderWrap);

        this.$slider.parents('.huge-it-wrap').find('.huge-it-thumb-wrap').css({
            width: this.totalSlides * (width + 2) + 'px',
            position: 'absolute'
        });

        var k = +this.settings.maxHeight / +this.settings.maxWidth * jQuery(window).width() + +hugeitSliderObj.thumb_height + 1;

        $('.huge-it-wrap').height(k);

        for (var i = 0; i < this.totalSlides; i++) {
            var $thumb = $('<a />')
                .css({
                    width: width + 'px',
                    margin: this.settings.thumbMargin + 'px'
                })
                .attr('href', '#')
                .data('huge-it-num', i);

            this.$slideImages.eq(i).clone()
                .removeAttr('style')
                .appendTo(this.$thumbWrap)
                .wrap($thumb);
        }

        this.$thumbWrapLinks = this.$thumbWrap.find('a');

        this.$thumbWrap.children().last().css('margin-right', -10);

        this.$thumbWrapLinks.eq(this.settings.startSlide).addClass('active');

        this.$thumbWrap.on('click', 'a', function (e) {
            e.preventDefault();

            _this.transition(parseInt($(this).data('huge-it-num')));
        });
    };

    Slider.prototype.captions = function () {
        var _this = this,
            $captions = this.$slides.find('.huge-it-caption');

        $captions.css({
            opacity: 0
        });

        this.$currentSlide.find('.huge-it-caption').css('opacity', 1);

        $captions.each(function () {
            $(this).css({
                transition: 'opacity ' + _this.settings.transitionDuration + 'ms linear',
                backfaceVisibility: 'hidden'
            });
        });
    };

    Slider.prototype.transition = function (slideNum, forward) {
        if (!this.inProgress) {
            if (slideNum !== this.currentPlace) {
                if (typeof forward === 'undefined') {
                    forward = (slideNum > this.currentPlace);
                }

                switch (this.settings.controls) {
                    case 'dot':
                        this.$dotWrapLinks.eq(this.currentPlace).removeClass('active');
                        this.$dotWrapLinks.eq(slideNum).addClass('active');
                        break;
                    case 'thumbnail':
                        this.$thumbWrapLinks.eq(this.currentPlace).removeClass('active');
                        this.$thumbWrapLinks.eq(slideNum).addClass('active');
                        break;
                    case 'none':
                        break;
                }

                this.$nextSlide = this.$slides.eq(slideNum);

                this.currentPlace = slideNum;

                if (jQuery('li.group').eq(this.currentPlace - 1).hasClass('video_iframe') || jQuery('li.group').eq(this.currentPlace).hasClass('video_iframe')) {
                    var streffect = this.settings.transition;
                    if (streffect == "cube_v" || streffect == "cube_h" || streffect == "none" || streffect == "fade") {
                        new Transition(this, this.settings.transition, forward);
                    } else {
                        new Transition(this, 'fade', forward);
                    }
                } else {
                    new Transition(this, this.settings.transition, forward);
                }

            }
        }
    };

    function Transition(Slider, transition, forward) {
        this.Slider = Slider;
        this.Slider.inProgress = true;
        this.forward = forward;
        this.transition = transition;

        if (this.transition === 'custom') {
            this.customAnims = this.Slider.settings.customTransitions;
        }

        if (this.transition === 'custom') {
            var _this = this;
            $.each(this.customAnims, function (i, obj) {
                if ($.inArray(obj, _this.anims) === -1) {
                    _this.customAnims.splice(i, 1);
                }
            });
        }

        this.fallback3d = this.Slider.settings.fallback3d;

        this.init();
    }

    Transition.prototype.fallback = 'fade';

    Transition.prototype.anims = ['cube_h', 'cube_v', 'fade', 'slice_h', 'slice_v', 'slide_h', 'slide_v', 'scale_out', 'scale_in', 'block_scale', 'kaleidoscope', 'fan', 'blind_h', 'blind_v'];

    Transition.prototype.customAnims = [];

    Transition.prototype.init = function () {
        this[this.transition]();
    };

    Transition.prototype.before = function (callback) {
        var _this = this;

        this.Slider.$currentSlide.css('z-index', 2);
        this.Slider.$nextSlide.css({'opacity': 1, 'z-index': 1});

        if (this.Slider.cssTransitions) {
            this.Slider.$currentSlide.find('.huge-it-caption').css('opacity', 0);
            this.Slider.$nextSlide.find('.huge-it-caption').css('opacity', 1);
        } else {
            this.Slider.$currentSlide.find('.huge-it-caption').animate({'opacity': 0}, _this.Slider.settings.transitionDuration);
            this.Slider.$nextSlide.find('.huge-it-caption').animate({'opacity': 1}, _this.Slider.settings.transitionDuration);
        }

        if (typeof this.setup === 'function') {
            var transition = this.setup();

            setTimeout(function () {
                callback(transition);
            }, 20);
        } else {
            this.execute();
        }

        if (this.Slider.cssTransitions) {
            $(this.listenTo).one('webkitTransitionEnd transitionend otransitionend oTransitionEnd mstransitionend', $.proxy(this.after, this));
        }
    };

    Transition.prototype.after = function () {
        this.Slider.$sliderBG.removeAttr('style');
        this.Slider.$slider.removeAttr('style');
        this.Slider.$currentSlide.removeAttr('style');
        this.Slider.$nextSlide.removeAttr('style');

        this.Slider.$currentSlide.css({
            zIndex: 1,
            opacity: 0
        });
        this.Slider.$nextSlide.css({
            zIndex: 2,
            opacity: 1
        });

        if (typeof this.reset === 'function') {
            this.reset();
        }

        if (this.Slider.settings.autoPlay && !jQuery('.huge-it-wrap').hasClass('isPlayed')) {
            clearTimeout(this.Slider.cycling);
            this.Slider.setAutoPlay();
        }

        this.Slider.$currentSlide = this.Slider.$nextSlide;

        this.Slider.inProgress = false;

    };

    Transition.prototype.fade = function () {
        var _this = this;

        if (this.Slider.cssTransitions) {
            this.setup = function () {
                _this.listenTo = _this.Slider.$currentSlide;

                _this.Slider.$currentSlide.css('transition', 'opacity ' + _this.Slider.settings.transitionDuration + 'ms linear');
            };

            this.execute = function () {
                _this.Slider.$currentSlide.css('opacity', 0);
            }
        } else {
            this.execute = function () {
                _this.Slider.$currentSlide.animate({'opacity': 0}, _this.Slider.settings.transitionDuration, function () {
                    _this.after();
                });
            }
        }

        this.before($.proxy(this.execute, this));
    };

    Transition.prototype.cube = function (tz, ntx, nty, nrx, nry, wrx, wry) {
        if (!this.Slider.cssTransitions || !this.Slider.cssTransforms3d) {
            return this[this['fallback3d']]();
        }

        var _this = this;

        this.setup = function () {
            _this.listenTo = _this.Slider.$slider;

            this.Slider.$sliderBG.css('perspective', 1000);

            _this.Slider.$currentSlide.css({
                transform: 'translateZ(' + tz + 'px)',
                backfaceVisibility: 'hidden'
            });

            _this.Slider.$nextSlide.css({
                opacity: 1,
                backfaceVisibility: 'hidden',
                transform: 'translateY(' + nty + 'px) translateX(' + ntx + 'px) rotateY(' + nry + 'deg) rotateX(' + nrx + 'deg)'
            });

            _this.Slider.$slider.css({
                transform: 'translateZ(-' + tz + 'px)',
                transformStyle: 'preserve-3d'
            });
        };

        this.execute = function () {
            _this.Slider.$slider.css({
                transition: 'all ' + _this.Slider.settings.transitionDuration + 'ms ease-in-out',
                transform: 'translateZ(-' + tz + 'px) rotateX(' + wrx + 'deg) rotateY(' + wry + 'deg)'
            });
        };

        this.before($.proxy(this.execute, this));
    };

    Transition.prototype.none = function () {

        this.Slider.settings.transitionDuration = 1;

        if (this.forward) {
            this.cube(1, 1, 0, 0, 0, 0, 0);
        } else {
            this.cube(1, -1, 0, 0, 0, 0, 0);
        }
    };

    Transition.prototype.cube_h = function () {
        var dimension = $(this.Slider.$slides).width() / 2;

        if (this.forward) {
            this.cube(dimension, dimension, 0, 0, 90, 0, -90);
        } else {
            this.cube(dimension, -dimension, 0, 0, -90, 0, 90);
        }
    };

    Transition.prototype.cube_v = function () {
        var dimension = $(this.Slider.$slides).height() / 2;

        if (this.forward) {
            this.cube(dimension, 0, -dimension, 90, 0, -90, 0);
        } else {
            this.cube(dimension, 0, dimension, -90, 0, 90, 0);
        }
    };

    Transition.prototype.grid = function (cols, rows, ro, tx, ty, sc, op) {
        if (!this.Slider.cssTransitions) {
            return this[this['fallback']]();
        }

        var _this = this;

        this.setup = function () {
            var count = (_this.Slider.settings.transitionDuration) / (cols + rows);

            function gridlet(width, height, t, l, top, left, src, imgWidth, imgHeight, c, r) {
                var delay = (c + r) * count;

                return $('<div class="huge-it-gridlet" />').css({
                    width: width,
                    height: height,
                    top: t,
                    left: l,
                    backgroundImage: 'url(' + src + ')',
                    backgroundPosition: '-' + left + 'px -' + top + 'px',
                    backgroundSize: imgWidth + 'px ' + imgHeight + 'px',
                    transition: 'all ' + _this.Slider.settings.transitionDuration + 'ms ease-in-out ' + delay + 'ms',
                    transform: 'none'
                });
            }

            _this.$img = _this.Slider.$currentSlide.find('img.huge-it-slide-image');

            _this.$grid = $('<div />').addClass('huge-it-grid');

            _this.Slider.$currentSlide.prepend(_this.$grid);

            var imgWidth = _this.$img.width(),
                imgHeight = _this.$img.height(),
                imgSrc = _this.$img.attr('src'),
                colWidth = Math.floor(imgWidth / cols),
                rowHeight = Math.floor(imgHeight / rows),
                colRemainder = imgWidth - (cols * colWidth),
                colAdd = Math.ceil(colRemainder / cols),
                rowRemainder = imgHeight - (rows * rowHeight),
                rowAdd = Math.ceil(rowRemainder / rows),
                leftDist = 0,
                l = (_this.$grid.width() - _this.$img.width()) / 2;

            tx = tx === 'auto' ? imgWidth : tx;
            tx = tx === 'min-auto' ? -imgWidth : tx;
            ty = ty === 'auto' ? imgHeight : ty;
            ty = ty === 'min-auto' ? -imgHeight : ty;

            for (var i = 0; i < cols; i++) {
                var t = (_this.$grid.height() - _this.$img.height()) / 2,
                    topDist = 0,
                    newColWidth = colWidth;

                if (colRemainder > 0) {
                    var add = colRemainder >= colAdd ? colAdd : colRemainder;
                    newColWidth += add;
                    colRemainder -= add;
                }

                for (var j = 0; j < rows; j++) {
                    var newRowHeight = rowHeight,
                        newRowRemainder = rowRemainder;

                    if (newRowRemainder > 0) {
                        add = newRowRemainder >= rowAdd ? rowAdd : rowRemainder;
                        newRowHeight += add;
                        newRowRemainder -= add;
                    }

                    _this.$grid.append(gridlet(newColWidth, newRowHeight, t, l, topDist, leftDist, imgSrc, imgWidth, imgHeight, i, j));

                    topDist += newRowHeight;
                    t += newRowHeight;
                }

                leftDist += newColWidth;
                l += newColWidth;
            }

            _this.listenTo = _this.$grid.children().last();

            _this.$grid.show();
            _this.$img.css('opacity', 0);

            _this.$grid.children().first().addClass('huge-it-top-left');
            _this.$grid.children().last().addClass('huge-it-bottom-right');
            _this.$grid.children().eq(rows - 1).addClass('huge-it-bottom-left');
            _this.$grid.children().eq(-rows).addClass('huge-it-top-right');
        };

        this.execute = function () {
            _this.$grid.children().css({
                opacity: op,
                transform: 'rotate(' + ro + 'deg) translateX(' + tx + 'px) translateY(' + ty + 'px) scale(' + sc + ')'
            });
        };

        this.before($.proxy(this.execute, this));

        this.reset = function () {
            _this.$img.css('opacity', 1);
            _this.$grid.remove();
        }
    };

    Transition.prototype.slice_h = function () {
        this.grid(1, 8, 0, 'min-auto', 0, 1, 0);
    };

    Transition.prototype.slice_v = function () {
        this.grid(10, 1, 0, 0, 'auto', 1, 0);
    };

    Transition.prototype.slide_v = function () {
        var dir = this.forward ?
            'min-auto' :
            'auto';

        this.grid(1, 1, 0, 0, dir, 1, 1);
    };

    Transition.prototype.slide_h = function () {
        var dir = this.forward ?
            'min-auto' :
            'auto';

        this.grid(1, 1, 0, dir, 0, 1, 1);
    };

    Transition.prototype.scale_out = function () {
        this.grid(1, 1, 0, 0, 0, 1.5, 0);
    };

    Transition.prototype.scale_in = function () {
        this.grid(1, 1, 0, 0, 0, .5, 0);
    };

    Transition.prototype.block_scale = function () {
        this.grid(8, 6, 0, 0, 0, .6, 0);
    };

    Transition.prototype.kaleidoscope = function () {
        this.grid(10, 8, 0, 0, 0, 1, 0);
    };

    Transition.prototype.fan = function () {
        this.grid(1, 10, 45, 100, 0, 1, 0);
    };

    Transition.prototype.blind_v = function () {
        this.grid(1, 8, 0, 0, 0, .7, 0);
    };

    Transition.prototype.blind_h = function () {
        this.grid(10, 1, 0, 0, 0, .7, 0);
    };

    Transition.prototype.random = function () {
        this[this.anims[Math.floor(Math.random() * this.anims.length)]]();
    };

    Transition.prototype.custom = function () {
        if (this.Slider.nextAnimIndex < 0) {
            this.Slider.nextAnimIndex = this.customAnims.length - 1;
        }
        if (this.Slider.nextAnimIndex === this.customAnims.length) {
            this.Slider.nextAnimIndex = 0;
        }

        this[this.customAnims[this.Slider.nextAnimIndex]]();
    };

    var testBrowser = {
        browserVendors: ['', '-webkit-', '-moz-', '-ms-', '-o-', '-khtml-'],

        domPrefixes: ['', 'Webkit', 'Moz', 'ms', 'O', 'Khtml'],

        testDom: function (prop) {
            var i = this.domPrefixes.length;

            while (i--) {
                if (typeof document.body.style[this.domPrefixes[i] + prop] !== 'undefined') {
                    return true;
                }
            }

            return false;
        },

        cssTransitions: function () {
            if (typeof window.Modernizr !== 'undefined' && Modernizr.csstransitions !== 'undefined') {
                return Modernizr.csstransitions;
            }

            return this.testDom('Transition');
        },

        cssTransforms3d: function () {
            if (typeof window.Modernizr !== 'undefined' && Modernizr.csstransforms3d !== 'undefined') {
                return Modernizr.csstransforms3d;
            }

            if (typeof document.body.style['perspectiveProperty'] !== 'undefined') {
                return true;
            }

            return this.testDom('Perspective');
        }
    };

    $.fn['sliderPlugin'] = function (settings) {
        return this.each(function () {
            if (!$.data(this, 'sliderPlugin')) {
                $.data(this, 'sliderPlugin', new Slider(this, settings));
            }
        });
    }

})(window.jQuery, window, window.document);

jQuery(window).load(function () {
    jQuery('div[class*=slider-loader-]').css({
        display: 'none'
    });
    jQuery('.huge-it-wrap, .lSSlideOuter, .huge-it-slider').css({
        opacity: '1'
    });
    if(jQuery('li.group').first().hasClass('video_iframe') && jQuery('.huge-it-slider').attr('data-autoplay') == 1){
        jQuery('.playButton').first().click();
    }

});

var tag = document.createElement('script');
tag.src = "//www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var playerInfoList = [], YTplayer = {}, i;
jQuery('.huge_it_youtube_iframe').each(function () {
    var id = jQuery(this).attr('id'),
        videoId = jQuery(this).attr('data-id'),
        controls = jQuery(this).attr('data-controls'),
        showinfo = jQuery(this).attr('data-showinfo'),
        volume = jQuery(this).attr('data-volume'),
        quality = jQuery(this).attr('data-quality'),
        rel = jQuery(this).attr('data-rel'),
        index = jQuery(this).parent().find('div[class*=youtube_play_icon_]').attr('data-index'),
        width = jQuery(this).attr('data-width'),
        height = jQuery(this).attr('data-height'),
        delay = jQuery(this).attr('data-delay');
    YTplayer[i] = {
        id: id,
        videoId: videoId,
        controls: controls,
        showinfo: showinfo,
        volume: volume,
        quality: quality,
        rel: rel,
        index: index,
        width: width,
        height: height,
        delay: delay
    };
    playerInfoList.push(YTplayer[i]);
    i++;
});

function onYouTubeIframeAPIReady() {
    if (typeof playerInfoList === 'undefined')
        return;

    for (var i = 0; i < playerInfoList.length; i++) {
        createPlayer(playerInfoList[i]);
    }
}

function createPlayer(playerInfo) {
    var _player = new YT.Player(playerInfo.id, {
        width: playerInfo.width,
        height: playerInfo.height,
        videoId: playerInfo.videoId,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        },
        playerVars: {
            'controls': playerInfo.controls,
            'showinfo': playerInfo.showinfo,
            'volume': playerInfo.volume,
            'quality': playerInfo.quality,
            'rel': playerInfo.rel
        }

    });

    function onPlayerReady(e) {
        var nextButton = jQuery('.huge-it-arrows.huge-it-next'),
            prevButton = jQuery('.huge-it-arrows.huge-it-prev');

        _player.setVolume(playerInfo.volume);
        e.target.setPlaybackQuality(playerInfo.quality);

        nextButton.on('click', function () {
            _player.pauseVideo();
            jQuery('.playSlider').click();
        });
        prevButton.on('click', function () {
            _player.pauseVideo();
            jQuery('.playSlider').click();
        });


        var playButton = jQuery('#' + playerInfo.id).parent().find('.playButton');
        playButton.on("click", function() {
            _player.playVideo();
        });

        e.target.setPlaybackQuality('small');
    }

    function onPlayerStateChange(e) {

        e.target.setPlaybackQuality(playerInfo.quality);

        switch (e.data) {
            case 0:
                jQuery('.playSlider').click();
                break;
            case 1:
                jQuery('.pauseSlider').click();
                break;
            case 2:
                var pauseTime = _player.getCurrentTime();
                setTimeout(function () {
                    if (_player.getCurrentTime() == pauseTime) {
                        jQuery('.playSlider').click();
                    }
                }, +playerInfo.pause_time);
                break;
        }
    }

    return _player;
}

jQuery('iframe.huge_it_vimeo_iframe').each(function () {
    Froogaloop(this).addEvent('ready', ready);
});

function ready(player_id) {
    var froogaloop = $f(player_id),
        arrows = jQuery('.huge-it-arrows.huge-it-prev, .huge-it-arrows.huge-it-next');

    froogaloop = $f(player_id);

    arrows.on('click', function () {
        froogaloop.api('pause');
    });

    froogaloop.addEvent('ready', function () {
        froogaloop.addEvent('finish', onFinish);
        froogaloop.addEvent('pause', onPause);
        froogaloop.addEvent('finish', onFinish);
        froogaloop.addEvent('play', onPlay);
        froogaloop.api('setVolume', jQuery('li.group').find('.huge_it_vimeo_iframe').attr('data-volume'));
        froogaloop.api('setColor', jQuery('li.group').find('.huge_it_vimeo_iframe').attr('data-controlColor'));
    });

    var playButton = jQuery('#' + player_id).parent().find('.playButton');
    playButton.on("click", function() {
        froogaloop.api("play");
    });

    function onPlay() {
        jQuery('.pauseSlider').click();
    }

    function onFinish() {
        jQuery('.playSlider').click();
    }

    function onPause(data) {
        var pauseTime = data.seconds;
        setTimeout(function () {
            if (data.seconds == pauseTime) {
                jQuery('.playSlider').click();
            }
        }, 3000);
    }

}