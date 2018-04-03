import Tween from './Tween.js';

class JsAnim{
      constructor(opt){
          this._init(opt);     
      }
      _init(opt){
		this.statue = 'init';
		this.value = this._initV.call(this, opt.value);
		this.duration = opt.duration;
		this.timeFun = opt.timeFun || 'linear';
		this.renderFun = opt.renderFun || (()=>{});

		this.onPlay = opt.onPlay;
		this.onEnd = opt.onEnd;
		this.onStop = opt.onStop;
		this.onReset = opt.onReset;
      }
	  _initV(value) {
	 	var result = [];
		value.forEach((item)=>{
			result.push({
				start: parseFloat(item[0]),
				end: parseFloat(item[1]),
			});
		});
		return result;
   	}
	play() {
		this._play();
	}
	end() {
	    this.state === 'play' ? (this.state = 'end') : this._end.bind();
	}
	stop(t) {
		this.state === 'play' ? (this.state = 'stop') : this._stop(t);
	}
	reset() {
		this.state === 'play' ? (this.state = 'init') : this._reset();
	}
	 _renderFun(curT, dT,tF) {
		var tempV = this.value.map((item) => {
			return tF(curT, item.start, item.end, dT);
		});
		this.renderFun(tempV);
	}
	 _loop() {
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
			this._renderFun.call(this, curT,dT,tF);
			window.requestAnimationFrame(this._loop.bind(this));
		}
	};
	 _play() {
		this.state = 'play';
		this.onPlay && this.onPlay();
		this.beginTime = Date.now();
		window.requestAnimationFrame(this._loop.bind(this));
	}
	 _end() {
		this.state = 'end';
		var dT = this.duration;
		var tF = Tween[this.timeFun];
		this._renderFun.call(this, dT,dT,tF);
		this.onEnd && this.onEnd();
	}
	 _stop(t) {
		this.state = 'stop';
		var dT = this.duration;
		var tF = Tween[this.timeFun];
		this._renderFun.call(this, t,dT,tF);
		this.onStop && this.onStop();
	}
	 _reset() {
		this.state = 'init';
		var dT = this.duration;
        var tF = Tween[this.timeFun];
		this._renderFun.call(this, 0,dT,tF);
		this.onReset && this.onReset();
	}

}
export default JsAnim;
