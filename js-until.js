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
            $.dom = any instanceof Element ? [any] : [].slice.apply(document.querySelectorAll(any));
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
        forEach: function(fn) {
            return $(fn);
        },
		get: function(index) {
			return index === undefined ? this.dom: $.dom[index];
		},
		index: function(target) {
			return [].indexOf.call(this.dom, $(target).get(0));
		},
        each: function(callback) {
            return $(function(el) {
                callback(el);
            });
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
		css: function(style) {
			return $(function(el) {
				el.style.cssText += ';' + style; 
			});
		},
        attr: function(name, value) {
            if (value === undefined) {
                return this.get(0).getAttribute(name) || undefined;
            }
            return $(function(el) {
                el.setAttribute(name, value);
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
