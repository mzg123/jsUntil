import JsAnim from './js-anim.js';

export default class JsAnimIndex{
    constructor(opt){
        this.anim = new JsAnim(opt);
    }

	play() {
		this.anim.play();
	}
	end() {
	    this.anim.end();
	}
	stop(t) {
        this.anim.stop(t);
	}
	reset() {
        this.anim.reset();
	}
}
