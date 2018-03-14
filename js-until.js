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
            $.dom = any instanceof Array ? any :
						(any instanceof Element ? [any] : [].slice.apply(document.querySelectorAll(any)));
            $.fn.dom = $.dom;
            $.fn.extend = $.extend;
        }
        return $.fn;
    }
	function deleteDom(el) {
		var index = $.dom.indexOf(el);
		if (index > -1) {
			$.dom.splice(index, 1);
		}
	};
	function classRE(name){
	    return new RegExp("(^|\\s)"+name+"(\\s|$)", 'g');
	}
	function $$(el, selector) {
		return [].slice.call(el.querySelectorAll(selector));
	}
    function dispatch(event, target) {
        var e = document.createEvent('Events');
        e.initEvent(event, true, false);
        target.dispatchEvent(e);
    }
    function compact(array) {
        return array.filter(function(el) {
            return el !== void 0 && el !== null;
        });
    }
    $.extend = function(target, src) {
        for(var k in src){
            target[k] = src[k];
        }
    }
    function camelize(str){
        return str.replace(/-+(.)?/g, function(match, chr){
                return chr ? chr.toUpperCase() : '';
            });
    }
    function parentIfText(node) {
        return 'tagName' in node ? node : node.parentNode;
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
        live: function(event, callback) {
            var selector = $._;
            return $(document.body).delegate(selector, event, callback);
        },
        delegate: function(selector, event, callback) {
            return $(function(el) {
                el.addEventListener(event, function(e) {
                    var target = e.target;
                    var nodes = [].slice.call(document.querySelectorAll(selector));
                    while(target && nodes.indexOf(target) < 0) {
                        target = target.parentNode;
                    }
                    if (target && !(target === el) && !(target === document)) {
                        callback.call(target, e);
                    }
                    
                });
            });
        },
        bind: function(event, callback) {
            return $(function(el) {
                event.split(/\s/).forEach(function(item) {
                    el.addEventListener(item, callback, false);
                });
            });
        },
        forEach: function(fn) {
            return $(fn);
        },
		get: function(index) {
			return index === undefined ? this.dom: $.dom[index];
		},
		find: function(selector) {
			return $($.dom.map(function(el){ return $$(el, selector);})
				.reduce(function(a, b) {
					return a.concat(b);
				}, []));
		},
        filter: function(selector) {
            return $(this.dom.filter(function(el){ return $$(el.parentNode, selector).indexOf(el)>=0; }));    
        },
        is: function(selector) {
            return this.dom.length > 0 && $(this.dom[0]).filter(selector).dom.length > 0;
        },
		closest: function(selector) {
			var el = this.dom[0].parentNode, nodes = $$(document, selector);
			while (el && nodes.indexOf(el) < 0) {
				el = el.parentNode;
			}
 			return $(el && !(el === document) ? el : []);
		},
		index: function(target) {
			return this.dom.indexOf($(target).get(0));
		},
		offset: function() {
			var obj = this.dom[0].getBoundingClientRect();
			return { left: obj.left+document.body.scrollLeft,
						top: obj.top+document.body.scrollTop,
						width: obj.width,
						height: obj.height
					};
		},
        each: function(callback) {
            return $(function(el) {
                callback(el);
            });
        },
        prev: function() {
            return $(this.dom.map(function(el){return el.previousElementSibling}));
        },
        next: function() {
            return $(this.dom.map(function(el){return el.nextElementSibling}));
        },
		addClass: function(className) {
			return $(function(el) {
				el.classList.add(className);
                //!classRE(className).test(el.className) && (el.className += (el.className ? ' ' : '') + className);
			});
		},
		removeClass: function(className) {
			return $(function(el){
				el.classList.remove(className);
                //el.className = el.className.replace(classRE(className), ' ').replace(/^\s+|\s+$/g, '');
			});
		},
		hasClass: function(className) {
			if (this.length === 0) {
				return false;
			}
			return $.fn.get(0).classList.contains(className);
		},
        toggleClass: function(className) {
            return $(function(el) {
                el.classList.toggle(className);
            });
        },
		pluck: function(property){ return this.dom.map(function(el){ return el[property] }) },
		compact: function(){ return $(this.dom) },
		css: function(prop, value) {
            if(value === void 0 && typeof prop == 'string') return this.dom[0].style[camelize(prop)];
            var css="", k;
            for(k in prop) {
                css += k+':'+prop[k]+';';
            }
            if(typeof prop == 'string') css = prop+":"+value;
            return $(function(el) { el.style.cssText += ';' + css });
		},
        attr: function(name, value) {
            if (typeof name === 'string' && value === undefined) {
                return this.dom.length > 0 ? this.get(0).getAttribute(name) || undefined : null;
            }
            return $(function(el) {
				if (typeof name === 'object') {
					for (key in name) {
						el.setAttribute(key, name[key]);
					}
				} else {
                    el.setAttribute(name, value);
				}
            });
        },
		html: function(html) {
			return html === void 0 ? (this.dom.length>0 ? this.dom[0].innerHTML : null) :
					$(function(el){ el.innerHTML = html });
		},
        show: function() {
            return this.css({'display':'block'});
        },

        hide: function() {
            return this.css({'display':'none'});
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
	    anm: function(transform, opacity, dur){
            return this.css({'-webkit-transition':'all '+(dur||0.5)+'s',
                '-webkit-transform':transform,'opacity':(opacity===0?0:opacity||1)});
		},
        anim: function(props, dur, ease){
            var transforms = [], opacity, k;
            for (k in props) k === 'opacity' ? opacity=props[k] : transforms.push(k+'('+props[k]+')');
            return this.css({ '-webkit-transition': 'all '+(dur||0.5)+'s '+(ease||''),
                '-webkit-transform': transforms.join(' '), opacity: opacity });
        },
    };
	Object.defineProperty($.fn, 'length', {
    	get: function() {
			return $.dom.length;
    	}
    });


    var adj_ops = {append: 'beforeEnd', prepend: 'afterBegin', before: 'beforeBegin', after: 'afterEnd'};	
	for(var key in adj_ops) {
		$.fn[key] = (function(key){
			return function(html){
				return $(function(el){
					el['insertAdjacent' + (html instanceof Element ? 'Element' : 'HTML')](key,html);
				})			
			}
		})(adj_ops[key]);
	}
    ['width','height'].forEach(function(m){ $.fn[m] = function(){ return this.offset()[m] }});
    
    $.prototype = $.fn;
    return $;
});
