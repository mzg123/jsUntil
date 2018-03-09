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
	function elSelector(el, selector) {
		return [].slice.call(el.querySelectorAll(selector));
	}
    function dispatch(event, target) {
        var e = document.createEvent('Events');
        e.initEvent(event, true, false);
        target.dispatchEvent(e);
    }
    var touch = {}, touchTimeout;
    document.ontouchstart = function(e) {
        var now = Date.now();
		touch.target = e.touches[0].target;
        var delta = now - (touch.last || now);
        touch.x1 = e.touchs[0].pageX;
        touchTimeout && clearTimeout(touchTimeout);
	
        if (delta > 0 && delta < 250) {
	    touch.isDoubleTap = true;
        } else {
            touch.last = now;
        }
    }
    document.ontouchmove = function(e) {
        touch.x2 = e.touches[0].pageX;
    }
    document.ontouchend = function(e) {
	if (touch.isDoubleTap) {
            dispatch('doubleTap', touch.target);
	    touch = {};
        }
        else if (touch.x2 > 0) {
            touch.x1 - touch.x2 > 30 && dispatch('swipeLeft', touch.target);
            touch.x1 -touch.x2 < -30 && dispatch('swipeRight', touch.target);
        } else if ('last' in touch) {
            touchTimeout = setTimeout(function(){
                touchTimeout = null;
                dispatch('tap', touch.target);
                touch = {};
            }, 250);
        }
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
			return $($.dom.map(function(el){ return elSelector(el, selector);})
				.reduce(function(a, b) {
					return a.concat(b);
				}, []));
		},
		closest: function(selector) {
			var el = this.dom[0].parentNode, nodes = elSelector(document, selector);
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
		css: function(style) {
			return $(function(el) {
				el.style.cssText += ';' + style; 
			});
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
            return this.css('display:block');
        },
        hide: function() {
            return this.css('display:none');
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
	    anim: function(transform, opacity, dur){
		    return this.css('-webkit-transition:all '+(dur||0.5)+'s;'+
			'-webkit-transform:'+transform+';opacity:'+(opacity===0?0:opacity||1));
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
    ['swipeLeft', 'swipeRight', 'doubleTap', 'tap'].forEach(function(m){
        $.fn[m] = function(callback) { return this.bind(m, callback);}
    });
	//ajax start
    (function(){
          $.ajaxSettings = {
			type: 'GET',
			beforeSend: empty,
			success: empty,
			error: empty,
			complete: empty,
			context: null,
			// Whether to trigger "global" Ajax events
			global: true,
			xhr: function () {
			  return new window.XMLHttpRequest()
			},
			accepts: {
			  script: 'text/javascript, application/javascript, application/x-javascript',
			  json:   'application/json',
			  xml:    'application/xml, text/xml',
			  html:   'text/html',
			  text:   'text/plain'
			},
			crossDomain: false,
			timeout: 0,
			processData: true,
			cache: true,
			dataFilter: empty
		  }
		function empty() {};
		function ajax(option) {
			var settings = Object.assign($.ajaxSettings, option);
			var dataType = settings.dataType;
			if (dataType === 'jsonp') {
				console.log('jsonp is sending');
			}
			
			var mime = settings.accepts[dataType],
				headers = { },
				setHeader = function(name, value) { headers[name.toLowerCase()] = [name, value] },
				protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
				xhr = settings.xhr(),
				nativeSetHeader = xhr.setRequestHeader;

			if (!settings.crossDomain) setHeader('X-Requested-With', 'XMLHttpRequest');
			setHeader('Accept', mime || '*/*');
			if (mime = settings.mimeType || mime) {
			  if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0]
			  xhr.overrideMimeType && xhr.overrideMimeType(mime)
			};
			if (settings.contentType ||
				(settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET')){
			  setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded')
			};

			if (settings.headers) {
				for (name in settings.headers) {
					setHeader(name, settings.headers[name]);
				}
			};
			xhr.setRequestHeader = setHeader;
			xhr.onreadystatechange = function(){
			  if (xhr.readyState == 4) {
				xhr.onreadystatechange = empty
				var result, error = false
				if ((xhr.status >= 200 && xhr.status < 300)
						|| xhr.status == 304
						|| (xhr.status == 0 && protocol == 'file:')) {

				  if (xhr.responseType == 'arraybuffer' || xhr.responseType == 'blob')
					result = xhr.response
				  else {
					result = xhr.responseText
					try {
					  if (dataType == 'xml') {
						result = xhr.responseXML;
				      } else if (dataType == 'json') {
							result = JSON.parse(result);
					  };
					} catch (e) { error = e }

					if (error){
						settings.error.call(settings.context,xhr,settings);
                    }
				  }
				  settings.success.call(settings.context,result,xhr,settings);
				} else {
				    settings.error.call(settings.context,xhr,settings);
				}
			  };
			};
			xhr.open(settings.type, settings.url, true);
			xhr.send(settings.data ? settings.data : null);
			
		};

		$.get = function(option){
			/*var option = {
				url: url,
				data: data,
				success: success,
				dataType: dataType
			};*/
			ajax(option);
		};
		$.post = function(option){
			 option.type = 'POST';
			 ajax(option); 

		};
		$.getJSON = function(url, success){
			$.get(url, function(json){ success(JSON.parse(json)) });
		};
        
	})();
	//ajax end
    
    $.prototype = $.fn;
    return $;
});
