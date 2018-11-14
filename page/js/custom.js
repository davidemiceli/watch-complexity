/*------------------------------------------------------------------
Project:        Wolfram
Author:         Yevgeny Simzikov
URL:            http://simpleqode.com/
                https://twitter.com/YevSim
                https://www.facebook.com/simpleqode
Version:        2.2.0
Created:        18/08/2014
Last change:    30/04/2015
-------------------------------------------------------------------*/

/* -------------------- *\
    #PRELOADER
\* -------------------- */
/*
$(window).load(function() {

    $('.preloader__img').fadeOut(500);
    setTimeout(function() {
        $('.preloader').addClass('active').delay(1000).fadeOut(500);
    }, 1000);

});
*/

/* -------------------- *\
    #SIDEBAR
\* -------------------- */

$(".sidebar__btn").on('click', function() {
    $(".sidebar__btn_open").toggleClass("show hidden");
    $(".sidebar__menu").toggleClass("sidebar__menu_hidden");
    return false;
});


/* -------------------- *\
    #PORTFOLIO SCREEN
\* -------------------- */

/* Requires isotope.pkgd.min.js & imagesloaded.pkgd.min.js */

/**
 * Isotope filtering
 */

// init Isotope
// var $container = $('.portfolio__items').imagesLoaded( function() {
//     $container.isotope({
//         itemSelector: '.filter__item',
//         layoutMode: 'fitRows'
//     });
// });
// filter items on button click
$('.portfolio__nav > a').on('click', function() {
    var filterValue = $(this).attr('data-filter');
    $container.isotope({ filter: filterValue });
    return false;
});