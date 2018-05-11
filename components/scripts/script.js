$(document).ready(function(){

    var $menuBtn = $('.menu-btn');
    var $scrollWrapper = $('.scroll-wrapper');
    window.USER_IS_TOUCHING = false;

    // On Pageload all scrollWrappers need to remove the mobile class
    $scrollWrapper.removeClass('mobile');

    /***************************************************/
    /*               Attach Event handler              */
    /***************************************************/
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

    // Attach scroll event
    $(window).on('resize scroll', function(e) {
        var $animateBg = $(document).find('.animated-bg');
        var $animateEl = $(document).find('.animatedEl');

        // Background image scrolling fade in Loading control
        viewPortDetectController($animateBg, bgImgAnimationBinder);

        //image/Text scrolling fade in Loading control
        viewPortDetectController($animateEl, animationBinder);

        // horizontal slider
        if(!window.USER_IS_TOUCHING){
            viewPortDetectController($scrollWrapper, bindScrollEvent);
        }else {
            mobileHorizontalScroll($scrollWrapper);
        }

        disableParallexOnMobile();
    });

    //Detect whether user is using touch device
    window.addEventListener('touchstart', function() {
        window.USER_IS_TOUCHING = true;
    });

    // init filter function
    if($(".homepage").length >0){
        filter.init();
    }

    // Init text rotate
    initTxtRotate();

    // Init video control hidden
    videoHideControl();

    // Init macbook scrolling
    scrollMacBook();

    // init filter dropdown
    selectDropdown();

    // Init the page loading and fadeout animation
    initPageLoadingAnimation();

    // Disable parallex effect on touch device
    disableParallexOnMobile();

});


var initPageLoadingAnimation = function(){
    window.setTimeout(function(){
        $('.transition-background').addClass('animated fadeOut').css({zIndex: 0, height: 0});
        $('.initEl').addClass('animated fadeInUpBig');

        $('.animated-header').animateCss('fadeInDownBig', function() {
            // Do somthing after animation
            $(this).removeClass('animated fadeInDownBig');
        });
    }, 5000);
};

var disableParallexOnMobile = function () {
    if(window.USER_IS_TOUCHING){
        var $desktopEl = $('.desktop-paralex');
        if($desktopEl.length > 0){
            $desktopEl.addClass('hidden');
        }
        var $mobileEl = $('.mobile-paralex');
        if($mobileEl.length > 0){
            $mobileEl.removeClass('hidden');
        }
    }
};


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

var scrollPastEl = function ($bindEl) {
    var elementTop = $bindEl.offset().top;
    var elementBottom = elementTop + $bindEl.outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom < viewportBottom;
};

var scrollInEl = function ($bindEl) {
    var elementTop = $bindEl.offset().top;
    var elementBottom = elementTop + $bindEl.outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementTop < viewportBottom;
};

var isTargetVisble = function ($bindEl, cb) {
    // Fixing the undefined error for the pages that dont have this scroll wrapper element
    if($bindEl.length > 0) {
        $bindEl.each(function () {
            if (viewPortDetectHelper($(this))) {
                cb($(this));
            }

            if(scrollPastEl($(this))){
                $(this).addClass('shown');
            }

            if(scrollInEl($(this))){
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

var bgImgAnimationBinder = function($bindEl){

    $bindEl.addClass('animated');

};

var animationBinder = function($bindEl){

    $bindEl.addClass('animated fadeInUp');

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
            //console.log("scroll down");
            if (elementBottom > currY && elementTop < viewportBottom) {
                scrollPercent = (viewportBottom - elementTop) / elemHeight;
                rotateDeg = 90 * scrollPercent;
                translateZ = 580 * scrollPercent;

                if(scrollPercent > 0 && scrollPercent <= 1){
                    $elem.addClass('scrollable');
                    //$elem.find(".screen-close").addClass('hidden');

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
            //console.log("none")
        }else {
            //console.log("scroll up");
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

var selectDropdown = function(){
    var triggerOpen		= $('#input');
    var triggerClose 	= $('#dropdown-menu').find('li');
    var marka 			= $('#icon');

    // set initial Marka icon
    if(marka.length> 0){
        var m = new Marka('#icon');
        m.set('triangle').size(16);
        m.rotate('down');
    }


    // trigger dropdown
    triggerOpen.add(marka).on('click', function(e) {
        e.preventDefault();
        $('#dropdown-menu').add(triggerOpen).toggleClass('open');


        if($('#icon').hasClass("marka-icon-times")) {
            m.set('triangle').size(16);
        } else {
            m.set('times').size(18);
        }
    });

    triggerClose.on('click', function() {
        // set new placeholder for demo
        var options = $(this).find('a').html();
        triggerOpen.text(options);

        $('#dropdown-menu').add(triggerOpen).toggleClass('open');
        m.set('triangle').size(16);
    });
};

var filter =  filter || {};

filter.data = {
    projects : [
        {
            "id": "voco",
            "name": "VOCO",
            "color": "rgb(111, 86, 241)",
            "type": "APP",
            "link": "voco.html"
        },
        {
            "id": "pch",
            "name": "Pacific Coast Highway One",
            "color": "rgb(145, 210, 196)",
            "type": "website",
            "link": "pch.html"

        },
        {
            "id": "color-theory",
            "name": "Color Theory",
            "color": "rgb(233, 232, 237)",
            "type": "website",
            "link": "color.html"
        },
        {
            "id": "less-than-one",
            "name": "Less Than One",
            "color": "rgb(22, 23, 67)",
            "type": "motion",
            "link": "soulmate.html"
        },
        {
            "id": "petopia",
            "name": "Petopia",
            "color": "rgb(255, 198, 170)",
            "type": "Branding",
            "link": "petopia.html"
        },
        {
            "id": "pillow",
            "name": "Pillow",
            "color": "rgb(25, 163, 157)",
            "type": "website",
            "link": "pillow.html"
        },
        {
            "id": "crazy-ramen",
            "name": "Crazy Ramen",
            "color": "rgb(241, 128, 72)",
            "type": "website",
            "link": "ramen.html"
        },
        {
            "id": "short-term-rental",
            "name": "Short Term Rental",
            "color": "rgb(218, 227, 224)",
            "type": "dashboard",
            "link": "dashboard.html"
        },
        {
            "id": "volunteer-match",
            "name": "Volunteer Match",
            "color": "rgb(255, 203, 173)",
            "type": "website",
            "link": "volunteermatch.html"
        },
        {
            "id": "kidzjet",
            "name": "Kidzjet",
            "color": "rgb(251, 250, 255)",
            "type": "dashboard &amp; APP",
            "link": "kidzjet.html"
        },
        {
            "id": "promotion",
            "name": "Promotion",
            "color": "rgb(247, 245, 247)",
            "type": "Marketing Materials",
            "link": "promotion.html"
        },
        {
            "id": "post-rock-music",
            "name": "Post-Rock Music",
            "color": "rgb(29, 29, 29)",
            "type": "Website",
            "link": "rock.html"
        }

    ]
};

filter.init = function(){
    var filterButton = $('.filter_button');

    this.render(this.data);

    filterButton.click(this.filterHandler);
};


filter.render = function (data){
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);
    var html = template(data);
    $('.projects-container').html(html);
};



filter.filterHandler = function (){
    console.log("inside the filterhandler.....");
    var filterText = $(this).text().toLowerCase();

    var newData = {};
    var newProjects = [];
    var project;

    if (filterText === 'all projects'){
        filter.render(filter.data);
    }else {
        for(var i = 0; i < filter.data.projects.length; i++ ){
            project = filter.data.projects[i];
            if(project && project.type){
                if(project.type.toLowerCase().indexOf(filterText) > -1){
                    newProjects.push(project);
                }
            }else {
                console.log("this project object doesn't has the matching type");
            }
        }

        newData.projects = newProjects;

        filter.render(newData);
    }
};



var animation = bodymovin.loadAnimation({
    container: document.getElementById('bm'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'data/onnuri.json'
});

//Extend Jquery to add a function to detect when an animation ends
$.fn.extend({
    animateCss: function(animationName, callback) {
        var animationEnd = (function(el) {
            var animations = {
                animation: 'animationend',
                OAnimation: 'oAnimationEnd',
                MozAnimation: 'mozAnimationEnd',
                WebkitAnimation: 'webkitAnimationEnd',
            };

            for (var t in animations) {
                if (el.style[t] !== undefined) {
                    return animations[t];
                }
            }
        })(document.createElement('div'));

        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);

            if (typeof callback === 'function') callback();
        });

        return this;
    },
});





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
