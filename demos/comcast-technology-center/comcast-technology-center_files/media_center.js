$(document).ready(function() {
	$('.media-center-carousel').jcarousel({
		itemLoadCallback: function(carousel, state){
			var txtEl = carousel.container.parent().prev().find('.current-img');
			txtEl.html(carousel.first);
		}
	});
	$('.media-center-carousel.no-hover li .carousel-item-overlay').fadeTo('fast', 1);
	$('.media-center-carousel.hover li').hover(function(e){
		$(this).find('.carousel-item-overlay').fadeTo('fast', 1);
	}, function(e){
		$(this).find('.carousel-item-overlay').fadeTo('fast', 0);
	});
	
	$('.atlas-text .btn-view-all').click(function(e){
		e.preventDefault();
		$(this).parents('.media-center-container').addClass('view-all');
	});
	$('.atlas-text .btn-view-highlights').click(function(e){
		e.preventDefault();
		$(this).parents('.media-center-container').removeClass('view-all');
	});
});