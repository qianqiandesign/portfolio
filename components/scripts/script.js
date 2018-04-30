$(document).ready(function(){

    var $menu = $('.responsive-menu');
    var $menuBtn = $('.menu-btn');
    var $scrollWrapper = $('.scroll-wrapper');
    var animateBg = $('.animated-bg');

    // function to detect when window width less than or greater than 960px of the navigation
    var windowsize = $(window).width();

    // Function to control the toggle of the mobile menu
    $menuBtn.click(function(){

        if ($menu.hasClass('expand')) {
            // Do things on Nav Close
            $menu.slideUp( "slow" ).removeClass("expand");
        } else {
            // Do things on Nav Open
            $menu.slideDown( "slow" ).addClass("expand");
        }
    });

    $(window).resize(function() {
        windowsize = $(window).width();
        if (windowsize > 960) {
            //if the window is greater than 900px wide then display the navigation
            $menu.css( "display", "block");
        }

        if(windowsize < 960) {
            //if the window is less than 900px wide then hide the navigation
            $menu.css( "display", "none");
        }
    });


    $(window).on('resize scroll', function(e) {
        // Background image/image scrolling fade Loading control
        viewPortDetectController(animateBg, imgAnimationBinder);

        // horizontal slider
        viewPortDetectController($scrollWrapper, bindScrollEvent);

    });

    // Init text rotate
    initTxtRotate();

    // Init video control hidden
    videoHideControl();

});


// Create TxtRotate object for the text rotation functionality on homepage
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

var initTxtRotate = function () {
    var elements = document.getElementsByClassName('txt-rotate');
    for(var i=0; i<elements.length; i++) {
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


// Controller that contains the logic for viewport detection
var viewPortDetectController = function ($bindEl, cb) {

    if(isTargetVisble($bindEl, cb)){
        console.log('in view port');
    }
};

var viewPortDetectHelper = function($bindEl){

    var elementTop = $bindEl.offset().top;
    var elementBottom = elementTop + $bindEl.outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};

var isTargetVisble = function ($bindEl, cb) {
    // Fixing the undefined error for the pages that dont have this scroll wrapper element
    if($bindEl.length > 0) {
        $bindEl.each(function () {
            if (viewPortDetectHelper($(this))) {
                cb($(this));
            }
        });
    }
};


var bindScrollEvent = function ($bindEl) {
    $bindEl.mousewheel(function(event, delta) {

        this.scrollLeft -= (delta * 20);

        event.preventDefault();

        if(this.offsetWidth + this.scrollLeft === this.scrollWidth || this.scrollLeft === 0) {

            $(this).unbind('mousewheel DOMMouseScroll');

        }

    });
};

var imgAnimationBinder = function($bindEl){

    $bindEl.addClass('animated');
};

// Hide the control bar for the video
var videoHideControl = function(){
    //For Firefox we have to handle it in JavaScript
    var vids = $("video");
    $.each(vids, function(){
        this.controls = false;
    });
    //Loop though all Video tags and set Controls as false
};











// horizontal scroll: keep it here for reference
// var bindScrollEvent2 = function ($bindEl){
//     $bindEl.on('mousewheel DOMMouseScroll', function(event){
//
//         var delta = Math.max(-1, Math.min(1, (event.originalEvent.wheelDelta || -event.originalEvent.detail)));
//
//         $(this).scrollLeft( $(this).scrollLeft() - ( delta * 20 ) );
//         event.preventDefault();
//
//         if(this.offsetWidth + this.scrollLeft === this.scrollWidth || this.scrollLeft === 0) {
//             //console.log("event fired ....." + e);
//
//             $(this).unbind('mousewheel DOMMouseScroll');
//
//         }
//
//     });
// };