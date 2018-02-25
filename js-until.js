(
    function(name, context, definition) {
        'use strict';
        if(typeof module !== 'undefined' && module.exports) {
            module.exports = definition();
        } else if(typeof define === 'function' && define.amd) {
            define(definition);
        } else {
            context[name] = definition();
        }
    }
)('jsUntil', this, function() {
    'use strict';
    var $ = function(any) {
        if(typeof any === 'function') {
            $.dom.forEach(any);
        } else {
            $.dom = [].slice.apply(document.querySelectorAll(any));
            $.fn.dom = $.dom;
        }
        return $.fn;
    }

    $.fn = {
        on: function(type, handler, useCapture) {
            useCapture === undefined || (useCapture = false);
            return $(function(el) {
                if(el.addEventListener) {
                    el.addEventListener(type, handler, useCapture); 
                } else if(el.attachEvent) {
                    el.attachEvent('on' + type, handler);
                } else {
                    el['on' + type] = handler;
                }
            });
        },
        off: function(type, handler, useCapture) {
            return $(function(el) {
                useCapture === undefined || (useCapture = false);
                if(el.removeEventListener) {
                    el.removeEventListener(type, handler, useCapture); 
                } else if(el.detachEvent) {
                    el.detachEvent('on' + type, handler);
                } else {
                    el['on' + type] = null;
                }
            });
        },
        length: function() {
            return $.dom.length;
        },
        forEach: function(fn) {
            return $(fn);
        }
    }
    $.fn.dom = $.dom;
    $.prototype = $.fn;
    return $;
});
