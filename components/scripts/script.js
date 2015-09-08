$(document).ready(function(){
	
	// Function to control the toggle of the mobile menu
    $( '.menu-btn' ).click(function(){
        //$('.responsive-menu').toggleClass('expand');

        if ($('.responsive-menu').hasClass('expand')) {
			// Do things on Nav Close
			//$('#page').removeClass('navigating');
				$(".responsive-menu").slideUp( "slow" ).removeClass("expand");
			//$('#sidebar').find('i.tooltips span').show();
			} else {
			// Do things on Nav Open
			//$('#page').addClass('navigating');
				$(".responsive-menu").slideDown( "slow" ).addClass("expand");
			//$('#sidebar').find('i.tooltips span').hide();
		}
	});

	// function to detect when window width less than or greater than 900px of the navigation
	var windowsize = $(window).width();

	$(window).resize(function() {
	  windowsize = $(window).width();
	  if (windowsize > 900) {
	    //if the window is greater than 900px wide then display the navigation
	    $(".responsive-menu").css( "display", "block");
	  }

	  if(windowsize < 900) {
	  	//if the window is less than 900px wide then hide the navigation
	  	$(".responsive-menu").css( "display", "none");
	  }
	});

    
});