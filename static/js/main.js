/* 
 * 
 * Your main.js code
 * 
 */

// Avoid `console` errors in browsers that lack a console.
// By the H5BP guys/girls...
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

/*
 * Very Simple Cookie functionality
 * ************************************************************************* */
// COOKIE functions from: http://www.quirksmode.org/js/cookies.html#script
// setCookie()
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function setCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

// getCookie()
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

// deleteCookie()
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function deleteCookie(name) {
    setCookie(name,"",-1);
}


/*
 * Very Simple Expand/Collapse functionality
 * ************************************************************************* */
$(document).ready(function(){
    var $togglers = $('.js-expand-toggler'),
        $totoggle = $('.js-to-toggle'),
        hideClass = 'is-hidden',
        showClass = 'is-shown';

    // Initially hide all collapsibles..
    // .. unless a cookies to show it is set:
    $totoggle.each(function(){
        var $cPanel = $(this);
        if (!getCookie($cPanel.attr('id'))) {
            $cPanel.addClass(hideClass);
        } else {
            // Adjust toggler arrow
            $togglers.filter('[href*="#'+$cPanel.attr('id')+'"]').text('▾');
        }
    });

    // Clicking togglers
    $togglers.on('click', function(e){
        e.preventDefault();
        var $toggle = $(this),
            $target = $($toggle.attr('href'));
        
        // If we are opening a panel - set a cookie
        if ( $target.hasClass(hideClass) ) {
            setCookie($target.attr('id'), 'show', 30);
        } else {
            deleteCookie($target.attr('id'));
        }
        // .. else: remove that cookie

        $target.toggleClass(hideClass);
        $toggle.text($toggle.text() == '▾' ? '▸' : '▾');
    });
});


/*
 * Example accessible TABS Script (jQuery) 
 * Much based on: http://heydonworks.com/practical_aria_examples/
 * TODO: does not yet work with multiple tabs on page!!
 * ************************************************************************* */
$(document).ready(function(){
    // Selectors, Classnames, ARIA roles, etc
    var activeClass = 'is-active',
        tabsClass = 'sg-tabs-block',
        tabClass = 'sg-tabs',
        panelClass = 'sg-tabs__content',
        tabRole = '[role="tab"]';

    var $tabsui      = $('.'+tabsClass),
        $tabs        = $tabsui.find('.'+tabClass).attr('role','tablist').find('>li').attr('role','presentation'),
        $tablinks    = $tabs.find('a').attr('role','tab').attr('tabindex','-1'),
        $tabcontent  = $tabsui.find('.'+panelClass).attr({'role' : 'tabpanel','tabindex' : '0'});

    // Add ARIA-controls (@href) to all tab links
    $tablinks.each(function(){ $(this).attr('aria-controls', $(this).attr('href').substring(1)); });

    // Add is-active class to first tab (li) and add ARIA-selected to first tab link 
    $tabs.first().addClass(activeClass).find('a').attr({ 'aria-selected' : 'true', 'tabindex' : '0' });

    // Hide all but first tabpanel
    $tabcontent.not(':first').attr({'aria-hidden':'true'});

    // Generic function to hide all TabPanels
    function hideTabPanels() { $tabcontent.attr('aria-hidden', 'true'); }

    // Generic function to show TabPanel
    // $id: [string] ID of tabPanel to show
    function showTabPanel(id) { hideTabPanels(); $tabcontent.filter(id).attr('aria-hidden', null); }

    // Change focus between tabs with arrow keys
    $tablinks.on('keydown', function(evt) {
        // define current, previous and next (possible) tabs
        var $cTab = $(this),
            $prev = $cTab.parents('li').prev().children(tabRole) || $tablinks.first(),
            $next = $cTab.parents('li').next().children(tabRole) || $tablinks.last(),
            $target;

        // find the direction (prev or next)
        switch (evt.keyCode) {
            case 37:
                // Left Arrow
                $target = $prev;
                break;
            case 39:
                // Right Arrow
                $target = $next;
                break;
            default:
                $target = false;
                break;
        }

        // Focus target Tab
        if ( $target.length ) {
            $cTab.attr({ 'tabindex' : '-1', 'aria-selected' : null }).parent().removeClass(activeClass);
            $target.attr({ 'tabindex' : '0', 'aria-selected' : true }).focus().parent().addClass(activeClass);

            // Hide all tabpanels but Show panel which corresponds to target
            showTabPanel('#' + $target.attr('href').substring(1));
        }

    });

    // Handle click on tab to show + focus tabpanel
    $tablinks.on('click', function(evt) {
        evt.preventDefault();
        var $cTab = $(this);

        // remove focusability [sic] and aria-selected
        $tablinks.attr({ 'tabindex': '-1', 'aria-selected' : null }).parent().removeClass(activeClass);
        // .. except for current clicked Tab
        $cTab.attr({ 'tabindex' : '0', 'aria-selected' : true }).focus().parent().addClass(activeClass);

        // Hide all tabpanels but Show panel which corresponds to target
        showTabPanel('#' + $cTab.attr('href').substring(1));
    });    
});
