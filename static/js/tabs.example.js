/*
 * Example accessible TABS Script (jQuery) 
 * Much based on: http://heydonworks.com/practical_aria_examples/
 * TODO: does not yet work with multiple NESTED tabs on page!!
 * ************************************************************************* */
$(document).ready(function(){
    // Selectors, Classnames, ARIA roles, etc
    var activeClass = 'is-active',
        tabsClass = 'tabs',
        tabClass = 'tabs--nav',
        panelClass = 'tabs__content',
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