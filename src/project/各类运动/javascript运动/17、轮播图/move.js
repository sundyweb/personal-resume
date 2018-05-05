function startMove(elem, json, callback) {
    clearInterval(elem.timer);
    var iSpeed, iCur;
    elem.timer = setInterval(function () {
        var bStop = true;
        for (var attr in json) {
            if (attr == 'opacity') {
                iCur = parseFloat(getStyle(elem, attr)) * 100;
            } else {
                iCur = parseInt(getStyle(elem, attr));
            }
            iSpeed = (json[attr] - iCur) / 7;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            if (attr == 'opacity') {
                elem.style.opacity = (iCur + iSpeed) / 100;
            } else {
                elem.style[attr] = iCur + iSpeed + 'px';

            }
            if (iCur != json[attr]) {
                bStop = false;
            }
        }
        if (bStop) {
            clearInterval(elem.timer);
            typeof callback == 'function' ? callback() : '';
        }
    }, 30)
}
function getStyle(elem, prop) {
    if (window.getComputedStyle) {
        //ie8及以下不兼容
        return window.getComputedStyle(elem, null)[prop];
    } else {
        //ie独有
        return elem.currentStyle[prop];//ie
    }
}