var easingFunctions = {
    default: 'easeInQuad',
    get: function (easing) {
        if (this[easing]) {
            return this[easing];
        }
        else {
            return this[this.default];
        }
    },
    linear: function (t, b, c, d) { return (c * t) / d + b; },
    easeInQuad: function (t, b, c, d) { return c * (t /= d) * t + b; },
    easeOutQuad: function (t, b, c, d) { return -c * (t /= d) * (t - 2) + b; },
    easeInOutQuad: function (t, b, c, d) {
        return (t /= d / 2) < 1 ? (c / 2) * t * t + b : (-c / 2) * (--t * (t - 2) - 1) + b;
    },
    easeInCubic: function (t, b, c, d) { return c * (t /= d) * t * t + b; },
    easeOutCubic: function (t, b, c, d) { return c * ((t = t / d - 1) * t * t + 1) + b; },
    easeInOutCubic: function (t, b, c, d) {
        return (t /= d / 2) < 1
            ? (c / 2) * t * t * t + b
            : (c / 2) * ((t -= 2) * t * t + 2) + b;
    },
    easeInQuart: function (t, b, c, d) { return c * (t /= d) * t * t * t + b; },
    easeOutQuart: function (t, b, c, d) { return -c * ((t = t / d - 1) * t * t * t - 1) + b; },
    easeInOutQuart: function (t, b, c, d) {
        return (t /= d / 2) < 1
            ? (c / 2) * t * t * t * t + b
            : (-c / 2) * ((t -= 2) * t * t * t - 2) + b;
    },
    easeInQuint: function (t, b, c, d) { return c * (t /= d) * t * t * t * t + b; },
    easeOutQuint: function (t, b, c, d) { return c * ((t = t / d - 1) * t * t * t * t + 1) + b; },
    easeInOutQuint: function (t, b, c, d) {
        return (t /= d / 2) < 1
            ? (c / 2) * t * t * t * t * t + b
            : (c / 2) * ((t -= 2) * t * t * t * t + 2) + b;
    }
};

function animate(from, to, duration, easing, update) {
    var easingFunction = typeof easing === 'function' ? easing : easingFunctions.get(easing);
    var start = null;
    var change = to - from;
    var cancel = false;
    function loop(resolve, timestamp) {
        if (cancel) {
            return;
        }
        start = !start ? timestamp : start;
        var progress = timestamp - start;
        update(easingFunction(progress, from, change, duration));
        if (progress < duration) {
            window.requestAnimationFrame(loop.bind(null, resolve));
        }
        else {
            resolve('Animation complete');
        }
    }
    return new CancelablePromise_1.default(function (resolve, reject, onCancel) {
        window.requestAnimationFrame(loop.bind(null, resolve));
        onCancel(function () { return (cancel = true); });
    });
}