$(document).ready(function(){

    var $menu = $('.responsive-menu');

    // Function to control the toggle of the mobile menu
    $( '.menu-btn' ).click(function(){
        //$('.responsive-menu').toggleClass('expand');

        if ($menu.hasClass('expand')) {
            // Do things on Nav Close
            //$('#page').removeClass('navigating');
            $menu.slideUp( "slow" ).removeClass("expand");
            //$('#sidebar').find('i.tooltips span').show();
        } else {
            // Do things on Nav Open
            //$('#page').addClass('navigating');
            $menu.slideDown( "slow" ).addClass("expand");
            //$('#sidebar').find('i.tooltips span').hide();
        }
    });

    // function to detect when window width less than or greater than 900px of the navigation
    var windowsize = $(window).width();

    $(window).resize(function() {
        windowsize = $(window).width();
        if (windowsize > 960) {
            //if the window is greater than 900px wide then display the navigation
            $(".responsive-menu").css( "display", "block");
        }

        if(windowsize < 960) {
            //if the window is less than 900px wide then hide the navigation
            $(".responsive-menu").css( "display", "none");
        }
    });


    //Initialize the owl carousel
    $("#owl-carousel").owlCarousel({

        autoPlay: 3000, //Set AutoPlay to 3 seconds

        items : 4,
        itemsDesktop : [1199,3],
        itemsDesktopSmall : [979,3]

    });

    //For Firefox we have to handle it in JavaScript
    var vids = $("video");
    $.each(vids, function(){
        this.controls = false;
    });
    //Loop though all Video tags and set Controls as false


    var $scrollWrapper = $('.scroll-wrapper');

    $(window).on('resize scroll', function(e) {
        var elementTop = $scrollWrapper.offset().top;
        var elementBottom = elementTop + $scrollWrapper.outerHeight();

        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        //var inViewPort = elementBottom > viewportTop && elementTop < viewportBottom;
        //console.log(inViewPort);
        if(elementBottom > viewportTop && elementTop < viewportBottom){
            console.log('in view port');
            bindScrollEvent2();
        }
    });

    function bindScrollEvent(){
        $scrollWrapper.on('mousewheel DOMMouseScroll', function(event){

            var delta = Math.max(-1, Math.min(1, (event.originalEvent.wheelDelta || -event.originalEvent.detail)));

            $(this).scrollLeft( $(this).scrollLeft() - ( delta * 20 ) );
            event.preventDefault();

            if(this.offsetWidth + this.scrollLeft === this.scrollWidth || this.scrollLeft === 0) {
                //console.log("event fired ....." + e);

                $(this).unbind('mousewheel DOMMouseScroll');

            }

        });
    }

    function bindScrollEvent2() {
        $scrollWrapper.mousewheel(function(event, delta) {

            this.scrollLeft -= (delta * 20);

            event.preventDefault();

            if(this.offsetWidth + this.scrollLeft === this.scrollWidth || this.scrollLeft === 0) {

                $(this).unbind('mousewheel DOMMouseScroll');

            }

        });
    }


});