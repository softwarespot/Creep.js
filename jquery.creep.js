/*
 * Creep.js
 * http://creepjs.com
 * Author: James Pederson (jpederson.com), softwarespot (softwarespot.wordpress.com)
 * Licensed under the MIT, GPL licenses.
 * Version: 2.0.0-beta
 */
; // jshint ignore:line
(function ($, window, document, undefined) {

    // PLUGIN LOGIC

    // let's start our plugin logic.
    $.fn.extend({

        // scroll when the selected element(s) are clicked.
        creep: function (options) {

            // set our options from the defaults, overriding with the
            // parameter we pass into this function.
            options = $.extend({}, $.fn.creep.options, options);

            // check the options.
            checkOptions(options);

            // iterate through all the matching elements and return
            // the jQuery object to preserve chaining.
            return this.each(function () {

                // store a jQuery object for our element so we can use it
                // inside our other bindings.
                var $elem = $(this);

                // get the href attribute value.
                var href = $elem.attr('href');

                // only bind if it's a valid anchor link.
                if (href === null || !/^#[\w\-]+$/.test(href)) {
                    return;
                }

                // bind to the click event.
                $elem.on('click.creep.js', function (event) {

                    // prevent default click propagation.
                    event.preventDefault();

                    // get the element based on the id.
                    $elem = $(href);

                    // scroll to the element.
                    creepToElement($elem, options, href);

                    // fallback to prevent jitter.
                    return false;

                });

            });

        },

        // scroll to the selected element.
        creepTo: function (options) {

            // set our options from the defaults, overriding with the
            // parameter we pass into this function.
            options = $.extend({}, $.fn.creep.options, options);

            // check the options.
            checkOptions(options);

            // scroll to the first element, if more than one exist.
            creepToElement($(this).first(), options, null);

            // continue chaining.
            return this;
        }

    });

    // METHODS

    // check the options.
    function checkOptions(options) {

        if ($.type(options.history) !== 'boolean') {
            options.history = false;
        }

        // set the default value if not a number.
        if ($.isNumeric(options.offset)) {
            options.offset = 0;
        }

        // set the default value if not a number or less that zero.
        if (!$.isNumeric(options.speed) || options.speed < 0) {
            options.speed = 500;
        }

    }

    // scroll to element handler.
    function creepToElement($elem, options, id) {

        // if the destination element exists.
        if ($elem !== undefined && $elem !== null && $elem.length !== 0) {

            // scroll to the element.
            $('html, body').animate({
                scrollTop: $elem.offset().top + options.offset
            }, options.speed);

            // if we have pushState.
            if (options.history && id !== null && $.isfunction(history.pushState)) {
                history.pushState(null, null, id);
            }

        }

    }

    // DEFAULTS

    // Set up some default options for our plugin that can be overridden
    // as needed when we actually instantiate our plugin link elements.
    $.fn.creep.options = {
        history: false,
        offset: 0,
        speed: 500
    };

})(jQuery, window, document);
