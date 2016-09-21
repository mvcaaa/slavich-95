$(document).ready(function() {

    var menuBtn = $('.menu-btn');
    var menu = $('.menu');

    $(".fly-fixed").autoHidingNavbar({
    });

    $(".fancybox").fancybox({
        helpers: {
            overlay: {
                locked: false
            }
        }
    });

    var item,
        i_price,
        i_num,
        i_sum,
        i_parent,
        i_btn;

    $('input.calc-num').on('keyup input', function(){
        fill($(this));
    });

    function fill(elm) {
        i_parent = elm.closest('.calc-bit'),
            i_btn = i_parent.find('button.pp'),
            i_price = parseInt(i_btn.attr('data-price')),
            i_sum = parseInt(i_btn.attr('data-sum'));
        i_num = parseInt(elm.val());
        if ( elm.val() < 0 || elm.val() == '' ) {
            i_num = 1
        }
        i_sum = i_num * i_price;
        i_parent.find('.calc-sum').text(i_sum);

        i_btn.attr({
            'data-num': i_num,
            'data-sum': i_sum
        });
    }

    $('.owl-carousel').owlCarousel({
        loop:true,
        center: true,
        autoplay: true,
        nav:false,
        dots: true,
        items: 3,
        autoplaySpeed: 1000,
        dotsSpeed: 1000,
        responsiveClass:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1.5
            },
            768:{
                items:2
            },
            1200:{
                items:2
            },
            1400:{
                items:3
            },
            1500:{
                items:3
            }
        }

    });

    var wow = new WOW(
        {
            boxClass:     'wow',      // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset:       0,          // distance to the element when triggering the animation (default is 0)
            mobile:       true,       // trigger animations on mobile devices (default is true)
            live:         true,       // act on asynchronously loaded content (default is true)
            callback:     function(box) {
                // the callback is fired every time an animation is started
                // the argument that is passed in is the DOM node being animated
            },
            scrollContainer: null // optional scroll container selector, otherwise use window
        }
    );
    wow.init();

    menuBtn.on('click', function () {
        if (menu.is(':hidden')) {
            menu.addClass('mobile-menu');
            menu.slideToggle(500);
            menuBtn.addClass('active-menu-btn');
        } else {
            menu.slideToggle(500);
            menuBtn.removeClass('active-menu-btn');
        }
    });

    $(window).resize(function () {
        if (this.innerWidth >= 993) {
            menu.show();
            menu.removeClass('mobile-menu');
            menuBtn.removeClass('active-menu-btn');
            menuBtn.hide();
        } else {
            menuBtn.show();
        }
    });

    $(window).resize();
});
