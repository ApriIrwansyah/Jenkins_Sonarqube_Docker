$(document).ready(function() {

    /* var = { 'Arrat', 'sahhs', 'sasa', 121 };
    const = Array('sasa', 223);
    let = new Array() */
    $('.fa-bars').click(function() {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('load scroll', function() {
        $('.fa-bars').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if ($(window).scrollTop() > 30) {
            $('.header').css({
                'background': '#6C5CE7',
                'box-shadow': '0 .2rem .5rem rgba(0,0,0,.4)',
                'transition': 'ease-in-out .8s'
            });
        } else {
            $('.header').css({
                'background': 'none',
                'box-shadow': 'none'
            })
        }
    });

    $('.accordion-header').on('click', function() {
        $('.accordion .accordion-body').slideUp();
        $(this).next('.accordion-body').slideDown();
        $('.accordion .accordion-header span').text("+");
        $(this).children('span').text('-')
    });

    // smooth
    $('a[href*="#"]').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
                scrollTop: $($(this).attr('href')).offset().top,
            },
            500,
            'linear'
        );
    });

});