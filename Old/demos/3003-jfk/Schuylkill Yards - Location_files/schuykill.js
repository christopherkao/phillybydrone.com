jQuery( function ($) {
    
    navisOpen = false;
    modalisOpen = false;
    tabisOpen = false;
    
    $('#Menu').click( function() {
        navisOpen = !navisOpen;
		$(this).toggleClass('open');
        $("#Nav").toggleClass('fullheight');
        $('#Navbar').slideToggle('fast');
        $('#Nav ul').slideToggle('fast');
        return false;
	});
    
    $('#n7').click( function() {
        modalisOpen = !modalisOpen;
        if (navisOpen) $('#Menu').click();
        $("#Blackout").fadeIn('fast');
        $("#Modal").fadeIn('fast');
        $("#Wrapper").css('height', '100%');
        $("#Wrapper").css('overflow', 'hidden');
        return false;
	});
    
    $('#CloseModal').click( function() {
        modalisOpen = !modalisOpen;
        $("#Blackout").hide();
        $("#Modal").hide();
        $(formMessages).text('');
        $('#fname').val('');
        $('#femail').val('');
        $('#fsubject').val('');
        $('#fmessage').val('');
        $('#Modal input, #Modal textarea').removeClass('warning');
        $('#Modal .lbl').removeClass('invalid');
   	    $(formMessages).removeClass('error');
        $("#Wrapper").css('height', 'auto');
        $("#Wrapper").css('overflow', 'auto');
        return false;
	});
    
    $('.dark a').click( function() {
        var setter = $(this).attr("href");
        if (!$(this).hasClass( "selected")) {
            $('.dark a').removeClass('selected');
            $(this).addClass('selected');
            $('#Maps div').each(function() {
                if ($(this).attr("id") != setter) {
                    $(this).fadeOut();
                } else {
                    $(this).fadeIn('fast');
                }
            });
        }
        return false;
	});
    
    $('.tab').click(function () {
        tabisOpen = !tabisOpen;
        $('#Overlay').fadeToggle();
        $('.tab span').toggleClass('adown');
        return false;
    });
    
    $('.thumb a').hover(function() {
        $(this).animate({backgroundColor: "rgba(44, 42, 124, 0.8)"}, 300 );
    }, function() {
        $(this).animate({backgroundColor: "rgba(44, 42, 124, 0)"}, 300 );
    });
    
    var form = $('#ajax-contact');
    var formMessages = $('#form-messages');
		
    $(form).submit(function(event) {
        event.preventDefault();
        
        //check fields
        var errors = false;
        $('#Modal input, #Modal textarea').removeClass('warning');
        $('#Modal .lbl').removeClass('invalid');
   	    $(formMessages).removeClass('error');
        $(formMessages).text('');
        
        if(!$('#fname').val() ) {
            $('#fname').addClass('warning');
            $('.nlbl').addClass('invalid');
            errors = true;
        }
        
        if(!$('#femail').val()) {
            $('#femail').addClass('warning');
            $('.elbl').addClass('invalid');
            errors = true;
        } else {
            var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
            if(!testEmail.test($('#femail').val())) {
                $('#femail').addClass('warning');
                $('.elbl').addClass('invalid');
                errors = true;
            }
        }
        
        if(!$('#fsubject').val() ) {
            $('#fsubject').addClass('warning');
            $('.slbl').addClass('invalid');
            errors = true;
        }
        
        if(!$('#fmessage').val() ) {
            $('#fmessage').addClass('warning');
            $('.mlbl').addClass('invalid');
            errors = true;
        }
        
        if (!errors) {
            
        var formData = $(form).serialize();
		
		$.ajax({
   			type: 'POST',
    		url: $(form).attr('action'),
    		data: formData
		})
		
		.done(function(response) {
   			$(formMessages).removeClass('error');
    		$(formMessages).addClass('success');
			$(formMessages).text(response);
			$('#fname').val('');
    		$('#femail').val('');
    		$('#fsubject').val('');
    		$('#fmessage').val('');
		})
		
		.fail(function(data) {
    		$(formMessages).removeClass('success');
    		$(formMessages).addClass('error');
			if (data.responseText !== '') {
    	    	$(formMessages).text(data.responseText);
    		} else {
    			$(formMessages).text('An error occured and your message could not be sent.');
			}
		});
            
        } else {
    		$(formMessages).addClass('error');
            $(formMessages).text('Please complete all form fields.');
        }
    });

    
    $(window).resize(function(){
        var footerHeight = $('#Footer').outerHeight();
        var stickFooterPush = $('#Push').height(footerHeight);
        $('#Wrapper').css({'marginBottom':'-' + footerHeight + 'px'});
        
        var tabWidth = $('#Tab span').outerWidth();
        $('#Tab').css({'width': tabWidth + 'px'});
        var tabWidth2 = $('#Tab').outerWidth();
        $('#Tab').css({'marginLeft':'-' + tabWidth2/2 + 'px'});
        $('#Tab span').css({'marginLeft':'-' + tabWidth/2 + 'px'});
        
        if ($('#Modal').height() > $(window).height()) {
        	$('#Modal').css('max-height', '100%');
        } else {
        	$('#Modal').css('max-height', 'auto');
        }
        
        if ($(window).width() > 768 && tabisOpen == false){
            $('#Overlay').hide();
        } else {
            $('#Overlay').show();
        }
    });
    
    $(window).scroll(function() {
        if (navisOpen) $('#Menu').click();
    });
    
    $(window).scroll();
    $(window).resize();
	
    
});
