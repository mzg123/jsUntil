(function($){
    function parentIfText(node) {
        return 'tagName' in node ? node : node.parentNode;
    }
    function dispatch(event, target) {
        var e = document.createEvent('Events');
        e.initEvent(event, true, false);
        target.dispatchEvent(e);
    }

    ['swipe', 'swipeLeft', 'swipeRight', 'doubleTap', 'tap'].forEach(function(m){
        $.fn[m] = function(callback) { return $.fn.bind(m, callback);}
    });

    var touch = {}, touchTimeout;
    var down = function(e) {
        var now = Date.now();
		touch.target = parentIfText(e.touches[0].target);
        var delta = now - (touch.last || now);
        touch.x1 = e.touches[0].pageX;
        touchTimeout && clearTimeout(touchTimeout);
	
        if (delta > 0 && delta < 250) {
	    touch.isDoubleTap = true;
        } else {
            touch.last = now;
        }
    }
    var move = function(e) {
        touch.x2 = e.touches[0].pageX;
    }
    var up = function(e) {
	if (touch.isDoubleTap) {
            dispatch('doubleTap', touch.target);
	    touch = {};
        }
        else if (touch.x2 > 0) {
            touch.x1 - touch.x2 > 30 && (dispatch('swipe', touch.target) || dispatch('swipeLeft', touch.target));
            touch.x1 -touch.x2 < -30 && (dispatch('swipe', touch.target) || dispatch('swipeRight', touch.target));
        } else if ('last' in touch) {
            touchTimeout = setTimeout(function(){
                touchTimeout = null;
                dispatch('tap', touch.target);
                touch = {};
            }, 250);
        }
    }
    var cancel = function(e) {
        touch = {};
    }
    var eventMap = {
        down: 'touchstart',
        up: 'touchend',
        move: 'touchmove'
    }
    $('body').on(eventMap.down, down)
        .on(eventMap.up, up)
        .on(eventMap.move, move);
})(jsUntil);
