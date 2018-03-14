(function($){
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
						settings.error.call(error,settings.context,xhr,settings);
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
          $.fn.load = function(url, selector, success) {   
            var that = this;
            if (!this.length) return this;
            if (Object.prototype.toString.call(selector) === "[object Function]") {
              success = selector;
              selector = null;
            };
            $.get(url, function(data) {
              var resp = data.replace(/<script(.|\s)*?\/script>/gi, '');
              that.html(
                selector ?
                  $(document.createElement('div')).html(resp).find(selector).html()
                  : resp );
              if (success) success();
            });
            return this;
          };
        
	})();
	//ajax end
})(jsUntil);
