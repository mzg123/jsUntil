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
)('jsAnim', this, function() {
    var Tween = {
		linear: function(t,b,c,d){ return c*t/d + b; },
		easeInQuad: function(t,b,c,d){
			return c*(t/=d)*t + b;
		},
		easeOutQuad: function(t,b,c,d){
			return -c *(t/=d)*(t-2) + b;
		},
		easeInOutQuad: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t + b;
			return -c/2 * ((--t)*(t-2) - 1) + b;
		},
		easeInCubic: function(t,b,c,d){
			return c*(t/=d)*t*t + b;
		},
		easeOutCubic: function(t,b,c,d){
			return c*((t=t/d-1)*t*t + 1) + b;
		},
		easeInOutCubic: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t + b;
			return c/2*((t-=2)*t*t + 2) + b;
		},
		easeInQuart: function(t,b,c,d){
			return c*(t/=d)*t*t*t + b;
		},
		easeOutQuart: function(t,b,c,d){
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		},
		easeInOutQuart: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
			return -c/2 * ((t-=2)*t*t*t - 2) + b;
		},
		easeInQuint: function(t,b,c,d){
			return c*(t/=d)*t*t*t*t + b;
		},
		easeOutQuint: function(t,b,c,d){
			return c*((t=t/d-1)*t*t*t*t + 1) + b;
		},
		easeInOutQuint: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
			return c/2*((t-=2)*t*t*t*t + 2) + b;
		},
		easeInSine: function(t,b,c,d){
			return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
		},
		easeOutSine: function(t,b,c,d){
			return c * Math.sin(t/d * (Math.PI/2)) + b;
		},
		easeInOutSine: function(t,b,c,d){
			return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
		},
		easeInExpo: function(t,b,c,d){
			return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
		},
		easeOutExpo: function(t,b,c,d){
			return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
		},
		easeInOutExpo: function(t,b,c,d){
			if (t==0) return b;
			if (t==d) return b+c;
			if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
			return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
		},
		easeInCirc: function(t,b,c,d){
			return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
		},
		easeOutCirc: function(t,b,c,d){
			return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
		},
		easeInOutCirc: function(t,b,c,d){
			if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
			return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
		},
		easeInElastic: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		},
		easeOutElastic: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
		},
		easeInOutElastic: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
		},
		easeInBack: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158;
			return c*(t/=d)*t*((s+1)*t - s) + b;
		},
		easeOutBack: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158;
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		},
		easeInOutBack: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158; 
			if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
			return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
		},
		easeInBounce: function(t,b,c,d){
			return c - Tween.easeOutBounce(d-t, 0, c, d) + b;
		},
		easeOutBounce: function(t,b,c,d){
			if ((t/=d) < (1/2.75)) {
				return c*(7.5625*t*t) + b;
			} else if (t < (2/2.75)) {
				return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
			} else if (t < (2.5/2.75)) {
				return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
			} else {
				return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
			}
		},
		easeInOutBounce: function(t,b,c,d){
			if (t < d/2) return Tween.easeInBounce(t*2, 0, c, d) * .5 + b;
			else return Tween.easeOutBounce(t*2-d, 0, c, d) * .5 + c*.5 + b;
		}
		}
	var $a = function(opt) {
		return new animC(opt);
	};
	function _init(value) {
		var result = [];
		value.forEach(function(item){
			result.push({
				start: parseFloat(item[0]),
				end: parseFloat(item[1]),
			});
		});
		return result;
	};
	function _defaultRenderFun() {};
	function animC(opt) {
		this.statue = 'init';
		this.value = _init.call(this, opt.value);
		this.duration = opt.duration;
		this.timeFun = opt.timeFun || 'linear';
		this.renderFun = opt.renderFun || _defaultRenderFun.bind(this);

		this.onPlay = opt.onPlay;
		this.onEnd = opt.onEnd;
		this.onStop = opt.onStop;
		this.onReset = opt.onReset;
	};
	function _renderFun(curT, dT,tF) {
		var tempV = this.value.map(function(item) {
			return tF(curT, item.start, item.end, dT);
		});
		this.renderFun(tempV);
	}
	function _loop() {
		var curT = Date.now() - this.beginTime;
		var dT = this.duration;
		var tF = Tween[this.timeFun];
		if (this.state === 'end' || curT > dT) {
			this.end();	
		} else if (this.state === 'init') {
            this.reset();
		} else if (this.state === 'stop') {
			this.stop(curT);
		} else {
			_renderFun.call(this, curT,dT,tF);
			window.requestAnimationFrame(_loop.bind(this));
		}
	};
	function _play() {
		this.state = 'play';
		this.onPlay && this.onPlay();
		this.beginTime = Date.now();
		window.requestAnimationFrame(_loop.bind(this));
	};
	function _end() {
		this.state = 'end';
		var dT = this.duration;
		var tF = Tween[this.timeFun];
		_renderFun.call(this, dT,dT,tF);
		this.onEnd && this.onEnd();
	};
	function _stop(t) {
		this.state = 'stop';
		var dT = this.duration;
		var tF = Tween[this.timeFun];
		_renderFun.call(this, t,dT,tF);
		this.onStop && this.onStop();
	};
	function _reset() {
		this.state = 'init';
		var dT = this.duration;
        var tF = Tween[this.timeFun];
		_renderFun.call(this, 0,dT,tF);
		this.onReset && this.onReset();
	}
    animC.prototype = {
		play: function() {
			_play.bind(this)();
		},
		end: function() {
		    this.state === 'play' ? (this.state = 'end') : _end.bind(this)();
		},
		stop: function(t) {
			this.state === 'play' ? (this.state = 'stop') : _stop.bind(this, t)();
		},
		reset: function() {
			this.state === 'play' ? (this.state = 'init') : _reset.bind(this)();
		}
	};
	
	return $a;	
});
