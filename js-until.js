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
        },
		get: function(index) {
			return $.dom[index||0];
		},
		addClass: function(className) {
			return $(function(el) {
				el.classList.add(className);
			});
		},
		removeClass: function(className) {
			return $(function(el){
				el.classList.remove(className);
			});
		},
		hasClass: function(className) {
			return $.fn.get(0).classList.contains(className);
		},
		css: function(style) {
			return $(function(el) {
				el.style.cssText += ';' + style; 
			});
		},
		remove: function() {
		},
		append: function() {},
		prepend: function() {},
		after: function() {},
		before: function() {},
		empty: function() {},
		anim: function() {},
    };
    (function(){
		function ajax() {
			console.log(3);
		};
        
	})();
    var adj_ops = {append: 'beforeEnd', prepend: 'afterBegin', before: 'beforeBegin', after: 'afterEnd'};	
    
    $.fn.dom = $.dom;
    $.prototype = $.fn;
    return $;
});
