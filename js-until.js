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
			$._ = any;
            $.dom = [].slice.apply(document.querySelectorAll(any));
            $.fn.dom = $.dom;
        }
        return $.fn;
    }
	function deleteDom(el) {
		var index = $.dom.indexOf(el);
        console.log(index);
		if (index > -1) {
			$.dom.splice(index, 1);
		}
	};
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
			if (this.length === 0) {
				return false;
			}
			return $.fn.get(0).classList.contains(className);
		},
		css: function(style) {
			return $(function(el) {
				el.style.cssText += ';' + style; 
			});
		},
		remove: function() {
			$(function(el) {
				el.parentNode.removeChild(el);
			});
			return $($._);
		},
		empty: function() {
			return $(function(el) {
				el.innerHTML = '';
			});
		},
		anim: function() {},
    };
	Object.defineProperty($.fn, 'length', {
    	get: function() {
			return $.dom.length;
    	}
    });
    (function(){
		function ajax(method, url, success, error) {
			var x = new XMLHttpRequest();
			x.onreadystatechange = function(){
				console.log(x);
				if(x.readyState == 4 && (x.status == 200 || x.status == 0)) {
					success(x.responseText);
				} else {
				}
			};
			x.open(method,url,true);
			x.send(null);
		};

		$.get = function(url, success){ ajax('GET', url, success); };
		$.post = function(url, success){ ajax('POST', url, success); };
		$.getJSON = function(url, success){
			$.get(url, function(json){ success(JSON.parse(json)) });
		};
        
	})();
    var adj_ops = {append: 'beforeEnd', prepend: 'afterBegin', before: 'beforeBegin', after: 'afterEnd'};	
	for(var key in adj_ops) {
		$.fn[key] = (function(key){
			return function(html){
				return $(function(el){
					el.insertAdjacentHTML(key, html);
				})			
			}
		})(adj_ops[key]);
	}
    
    $.prototype = $.fn;
    return $;
});
