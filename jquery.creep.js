/*
 * Creep.js
 * http://creepjs.com
 * Author: James Pederson (jpederson.com)
 * Licensed under the MIT, GPL licenses.
 * Version: 1.1.0
 */
; (function($, window, document, undefined) {

    // let's start our plugin logic.
    $.extend($.fn, {

        // Creep when the selected element(s) are clicked.
        creep: function(options) {

            // set our options from the defaults, overriding with the
            // parameter we pass into this function.
            options = $.extend({}, $.fn.creep.options, options);

            // Iterate through all the matching elements and return
            // the jQuery object to preserve chaining.
            return this.each(function() {

                // Store a jQuery object for our element so we can use it
                // inside our other bindings.
                var $elem = $(this);

                // bind to the click event.
                $elem.on('click', function(event) {

                    var href = $elem.attr('href');

                    // only do this if it's an anchor link.
                    if (href.match('#') && href !== '#' && !href.match('http')) {

                        // prevent default click propagation.
                        event.preventDefault();

                        // remove the octothorpe.
                        var href_trimmed = href.replace('#', '');

                        // scroll to the element.
                        creepToElement(href_trimmed, options);

                        // fallback to prevent jitter.
                        return false;

                    }

                });

            });

        },

        // Creep to the selected element
        creepTo: function(options) {

            // set our options from the defaults, overriding with the
            // parameter we pass into this function.
            options = $.extend({}, $.fn.creep.options, options);

            // Iterate through all the matching elements and return
            // the jQuery object to preserve chaining.
            return this.each(function() {

                // Store a jQuery object for our element so we can use it
                // inside our other bindings.
                var $elem = $(this);

                // bind to the click event.
                $elem.on('click', function(event) {

                    var href = $elem.attr('href');

                    // only do this if it's an anchor link.
                    if (href.match('#') && href !== '#' && !href.match('http')) {

                        // prevent default click propagation.
                        event.preventDefault();

                        // remove the octothorpe.
                        var href_trimmed = href.replace('#', '');

                        // scroll to the element.
                        creepToElement(href_trimmed, options);

                        // fallback to prevent jitter.
                        return false;

                    }

                });

            });

        }

    });

    // scroll to element handler.
    var creepToElement = function(id, options) {

        // grab the element to scroll to based on the name attribute of an a element.
        var $elem = $('a[name="' + id + '"]');

        // if that didn't work, look for an element with just the id.
        if ($elem.length === 0) {
            $elem = $('#' + id);
        }

        // if the destination element exists.
        if ($elem.length !== 0) {

            // scroll to the element.
            $('html, body').animate({
                scrollTop: $elem.offset().top + options.offset
            }, options.speed);

            // if we have pushState
            if (typeof(history.pushState) === 'function') {
                history.pushState(null, null, '#' + id);
            }

        }

    };

    // DEFAULTS
    // Set up some default options for our plugin that can be overridden
    // as needed when we actually instantiate our plugin link elements.
    $.fn.creep.options = {
        offset: 0,
        speed: 1000
    };

})(jQuery, window, document);
