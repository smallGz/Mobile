function startMove(obj, json, times, fx, fn) {
	var iCur = {};
	var startTime = nowTime();

	if (typeof times == 'undefined') {
		times = 400;
		fx = 'linear';
	}

	if (typeof times == 'string') {
		if (typeof fx == 'function') {
			fn = fx;
		}
		fx = times;
		times = 400;
	} else if (typeof times == 'function') {
		fn = times;
		times = 400;
		fx = 'linear';
	} else if (typeof times == 'number') {
		if (typeof fx == 'function') {
			fn = fx;
			fx = 'linear';
		} else if (typeof fx == 'undefined') {
			fx = 'linear';
		}
	}

	for (var attr in json) {
		iCur[attr] = 0;
		if (attr == 'opacity') {
			iCur[attr] = Math.round(getStyle(obj, attr) * 100);
		} else {
			iCur[attr] = parseInt(getStyle(obj, attr));
		}
	}

	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var changeTime = nowTime();
		//startTime changeTime

		var scale = 1 - Math.max(0, startTime + times - changeTime) / times; //2000 - 0 -> 1-0 -> 0-1
		for (var attr in json) {
			var value = Tween[fx](scale * times, iCur[attr], json[attr] - iCur[attr], times);
			if (attr == 'opacity') {
				obj.style.filter = 'alpha(opacity=' + value + ')';
				obj.style.opacity = value / 100;
			} else {
				obj.style[attr] = value + 'px';
			}
		}

		if (scale == 1) {
			clearInterval(obj.timer);
			if (fn) {
				fn.call(obj);
			}
		}
	}, 30);

	function nowTime() {
		return (new Date()).getTime();
	}
}

function getStyle(obj, attr) {
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];
}


var Tween = {
	linear: function(t, b, c, d) { //匀速
		return c * t / d + b;
	},
	easeIn: function(t, b, c, d) { //加速
		return c * (t /= d) * t + b;
	},
	easeOut: function(t, b, c, d) { //减速
		return -c * (t /= d) * (t - 2) + b;
	},
	easeBoth: function(t, b, c, d) { //先加速，中间为分界，后减速
		if ((t /= d / 2) < 1) {
			return c / 2 * t * t + b;
		}
		return -c / 2 * ((--t) * (t - 2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d) { //不断加速，比加速还要快
		return c * (t /= d) * t * t * t + b;
	},
	easeOutStrong: function(t, b, c, d) { //不断减速（刹车的感觉）
		return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d) { //先不断加速，中间为分界，后不断减速度
		if ((t /= d / 2) < 1) {
			return c / 2 * t * t * t * t + b;
		}
		return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p) { //弹性运动，在开始弹
		if (t === 0) {
			return b;
		}
		if ((t /= d) == 1) {
			return b + c;
		}
		if (!p) {
			p = d * 0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p / (2 * Math.PI) * Math.asin(c / a);
		}
		return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	},
	elasticOut: function(t, b, c, d, a, p) { //弹性运动，在结束弹
		if (t === 0) {
			return b;
		}
		if ((t /= d) == 1) {
			return b + c;
		}
		if (!p) {
			p = d * 0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p / (2 * Math.PI) * Math.asin(c / a);
		}
		return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
	},
	elasticBoth: function(t, b, c, d, a, p) {	//两头都弹动
		if (t === 0) {
			return b;
		}
		if ((t /= d / 2) == 2) {
			return b + c;
		}
		if (!p) {
			p = d * (0.3 * 1.5);
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p / (2 * Math.PI) * Math.asin(c / a);
		}
		if (t < 1) {
			return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) *
				Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		}
		return a * Math.pow(2, -10 * (t -= 1)) *
			Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
	},
	backIn: function(t, b, c, d, s) { //先往左走点，然后在往右走
		if (typeof s == 'undefined') {
			s = 1.70158;
		}
		return c * (t /= d) * t * ((s + 1) * t - s) + b;
	},
	backOut: function(t, b, c, d, s) {	//到目标了再往右走点再加来
		if (typeof s == 'undefined') {
			s = 3.70158; //回缩的距离
		}
		return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	},
	backBoth: function(t, b, c, d, s) {
		if (typeof s == 'undefined') {
			s = 1.70158;
		}
		if ((t /= d / 2) < 1) {
			return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
		}
		return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d) { //弹球减振（弹球渐出）在起点弹动
		return c - Tween['bounceOut'](d - t, 0, c, d) + b;
	},
	bounceOut: function(t, b, c, d) {	//在结束点弹动
		if ((t /= d) < (1 / 2.75)) {
			return c * (7.5625 * t * t) + b;
		} else if (t < (2 / 2.75)) {
			return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
		} else if (t < (2.5 / 2.75)) {
			return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
		}
		return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
	},
	bounceBoth: function(t, b, c, d) {	//两头都弹动
		if (t < d / 2) {
			return Tween['bounceIn'](t * 2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
	}
}