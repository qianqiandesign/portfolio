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
    // $("#owl-carousel").owlCarousel({
    //
    //     autoPlay: 3000, //Set AutoPlay to 3 seconds
    //
    //     items : 4,
    //     itemsDesktop : [1199,3],
    //     itemsDesktopSmall : [979,3]
    //
    // });

    //For Firefox we have to handle it in JavaScript
    var vids = $("video");
    $.each(vids, function(){
        this.controls = false;
    });
    //Loop though all Video tags and set Controls as false


    var $scrollWrapper = $('.scroll-wrapper');

    $(window).on('resize scroll', function(e) {
        // Fixing the undefined error for the pages that dont have this scroll wrapper element
        if($scrollWrapper.length > 0){
            var elementTop = $scrollWrapper.offset().top;
            var elementBottom = elementTop + $scrollWrapper.outerHeight();
        }

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

var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};


});