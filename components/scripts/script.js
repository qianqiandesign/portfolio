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

    
});