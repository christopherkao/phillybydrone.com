$(document).ready(function(e){

	var $locknav = $(".locknav");

	if($locknav.length <= 0){
		return;
	}

	var $nav = $("#navigation");

	$(window).scroll( function() {
		var $stickyOffset = $('.story-module').length > 0 ? $('.story-module').height() : 0;

		if ($(window).scrollTop() > $stickyOffset ) {
			$locknav.addClass("fixed").css("top",0);
			//$( ".components-content" ).css({ paddingTop:$(".components-nav").height() });
			$locknav.next().css({ paddingTop : $nav.height() });
		} else {
			$locknav.removeClass('fixed');
			//$( ".components-content" ).css({ paddingTop:0 });
			$locknav.next().css({ paddingTop : 0 });
		}

		if ( $('.gstl_50').is(':visible') ) {
			var posTop = $('#nav-search-field').height() + $('#nav-search-field').offset().top - 11;
			$('.gstl_50.gssb_c').css({ top: posTop });
		}
	});


});

