var arr = [
    { 'url': './src/img/0.png' },
    { 'url': './src/img/1.png' },
    { 'url': './src/img/2.png' },
    { 'url': './src/img/3.png' },
    { 'url': './src/img/4.png' },
    { 'url': './src/img/5.png' },
    { 'url': './src/img/6.png' },
    { 'url': './src/img/7.png' },
    { 'url': './src/img/8.png' },
    { 'url': './src/img/9.png' },
    { 'url': './src/img/10.png' },
    { 'url': './src/img/11.png' },
    { 'url': './src/img/12.png' },
    { 'url': './src/img/13.png' },
    { 'url': './src/img/14.jpg' },
    { 'url': './src/img/16.png' },
    { 'url': './src/img/17.png' }
];

init();
function init() {
    //生成图片结构
    renderPage();
    // 让当前li的高度等于其宽度
    $('li').css('height', $('li').width());
    //绑定事件
    bindEvent();
}
//生成图片结构
function renderPage() {
    var str = '';
    arr.forEach(function (ele, index) {
        str += '<li><img src="' + ele.url + '" alt=""></li>'
    });
    $('.wrapper ul').append(str);
}
//绑定事件
function bindEvent() {
    var index;
    $('li').on('tap', function () {
        //点击哪张图片展示在show里
        index = $(this).index();
        //加载图片
        loadImg(index);
    });
    $('.show').on('tap', function () {
        $(this).css('display', 'none');
    }).on('swipeLeft', function () {
        index++;
        if (index < arr.length) {
            loadImg(index);
        }else{
            index = arr.length - 1;
        }
    }).on('swipeRight', function () {
        index--;
        if (index >= 0) {
            loadImg(index);
        }else{
            index = 0;
        }
    })
}

//加载图片
function loadImg(index) {
    //设备宽高比
    var deviceW_H = $(window).width() / $(window).height();
    //当显示新图的时候，把之前的show清空
    $('.show').html('');
    //当图片加载完再插入
    var img = new Image();
    img.src = arr[index].url;
    $('.show').css('display', 'block').append(img);
    img.onload = function () {
        var imgW_H = img.width / img.height;
        if (imgW_H < deviceW_H) {
            //图片宽高比小于设备宽高比
            $(this).css('height', '100%');
        } else{
             //图片宽高比大于等于设备宽高比
            $(this).css('width', '100%');
        }
    }
}
