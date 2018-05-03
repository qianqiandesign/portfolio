$(document).ready(function(){

    var $menuBtn = $('.menu-btn');
    var $scrollWrapper = $('.scroll-wrapper');
    var $animateBg = $('.animated-bg');
    window.USER_IS_TOUCHING = false;

    // On Pageload all scrollWrappers need to remove the mobile class
    $scrollWrapper.removeClass('mobile');

    // Function to control the toggle of the mobile menu
    $menuBtn.click(function(){
      var windowsize = $(window).width();
      if(windowsize < 960){
        $('.current').removeClass('active');
      }else {
        $('.current').addClass('active');
      }
      
      $(this).toggleClass('active');
      $('.responsive-overlay').toggleClass('open');

    });

    $(window).resize(function() {
      var windowsize = $(window).width();
        if(windowsize < 960){
          $('.current').removeClass('active');
        }else {
          $('.current').addClass('active');
        }
    });

    $(window).on('resize scroll', function(e) {
        // Background image/image scrolling fade Loading control
        viewPortDetectController($animateBg, imgAnimationBinder);

        // horizontal slider
        if(!window.USER_IS_TOUCHING){
            viewPortDetectController($scrollWrapper, bindScrollEvent);
        }else {
            mobileHorizontalScroll($scrollWrapper);
        }
    });

    // Init text rotate
    initTxtRotate();

    // Init video control hidden
    videoHideControl();

    // Init macbook scrolling
    scrollMacBook();

    window.addEventListener('touchstart', function() {
        window.USER_IS_TOUCHING = true;
    });

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

var mobileHorizontalScroll = function($bindEl){
    if($bindEl.length >0){
        $bindEl.addClass('mobile');
    }
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

var scrollMacBook = function(){
    // initialize last scroll position
    var lastY =  $(window).scrollTop();

    // Attach scroll event handler for the macbook element
    $(window).on('scroll', function() {
        var elemHeight;
        var elementTop;
        var elementBottom;
        // get current scroll position
        var currY = $(window).scrollTop();
        var scrollPercent;
        var rotateDeg;
        var translateZ;

        var $elem = $(".macbook");
        if($elem.length > 0){
            elemHeight = $elem.outerHeight();
            elementTop = $elem.offset().top;
            elementBottom = elementTop + elemHeight;
        }

        var windowHeight = $(window).height();
        var viewportBottom = currY + windowHeight;

        // determine current scroll direction
        if(currY > lastY){
            console.log("scroll down");
            if (elementBottom > currY && elementTop < viewportBottom) {
                scrollPercent = (viewportBottom - elementTop) / elemHeight;
                rotateDeg = 90 * scrollPercent;
                translateZ = 580 * scrollPercent;

                if(scrollPercent > 0 && scrollPercent <= 1){
                    $elem.addClass('scrollable');
                    $elem.find(".screen-close").addClass('hidden');

                    $elem.find(".screen-open").css({
                        '-webkit-transform' : 'translateZ(-' + translateZ + 'px) rotateX(0deg)',
                        'transform'         : 'translateZ(-' + translateZ + 'px) rotateX(0deg)',
                        '-webkit-transform-origin': 'center bottom',
                    });
                }else {
                    $elem.removeClass('scrollable');
                }
            }
        }else if(currY === lastY){
            console.log("none")
        }else {
            console.log("scroll up");
            if (elementBottom > currY && elementTop < viewportBottom) {
                scrollPercent = (elementBottom - currY) / elemHeight;
                rotateDeg = 90 * scrollPercent;
                translateZ = 580 * scrollPercent;

                if(scrollPercent > 0 && scrollPercent <= 1){
                    //$elem.addClass('scrollable');
                    $elem.find(".screen-open").css({
                        '-webkit-transform' : 'translateZ(-' + translateZ + 'px) rotateX(-' + rotateDeg + 'deg)',
                        'transform'         : 'translateZ(-' + translateZ + 'px) rotateX(-' + rotateDeg + 'deg)',
                        '-webkit-transform-origin': 'center bottom',
                        '-webkit-transition': 'all 1s ease-in-out'
                    });
                }else {
                    setTimeout(function() {
                        $elem.find(".screen-close").removeClass('hidden').css({
                            '-webkit-transition': 'all 1s ease-in-out, bottom .1s ease-in-out .9s'
                        });
                    }, 650);

                }
            }

        }
        lastY = currY;
    });
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
