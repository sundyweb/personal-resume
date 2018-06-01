//封闭作用域
var ppt = {
    //获取ppt数量
    len: $('.slider').length,
    $wrap: $('.wrapper'),
    nowIndex: 0,
    lastIndex: undefined,
    $slider: $('.slider'),
    flag: true,
    timer: undefined,
    //入口函数
    init: function () {
        if (this.len > 1) {
            //如果ppt数量大于一，生成btn和order
            this.createDom(this.len);

            //调用点击事件
            this.bindEvent();
            this.sliderAuto();

        }
    },
    //动态生成order及左右btn
    createDom: function (len) {
        var str = '',
            btnStr = '';
        for (var i = 0; i < len; i++) {
            if (i == 0) {
                str += '<li class = "active"></li>';
            } else {
                str += '<li></li>';
            }
        }
        str = '<div class = "slider-order"><ul>' + str + '</ul></div>';
        btnStr = '<div class="slider-btn">\
                    <span class="left-btn" ></span> \
                    <span class="right-btn" ></span> \
                  </div >';
        this.$wrap.append(str).append(btnStr);
    },
    //点击事件（order部分和btn部分）
    bindEvent: function () {
        //保存this
        var self = this;

        //同时加上点击事件
        //点left:index--   点right:index++  li:获得index

        //点击之后要执行的操作加锁判断
        $('li').add($('.left-btn')).add($('.right-btn')).on('click', function () {
            if ($(this).attr('class') == 'left-btn') {
                self.tool('left');
            } else if ($(this).attr('class') == 'right-btn') {
                self.tool('right');
            } else {
                self.tool($(this).index());//加锁控制
            }
        });

        this.$slider.on('leave', function () {
            // 当前ppt走的时候触发事件
            //当前ppt300毫秒淡出，其中的img宽度变成0%
            $(this).fadeOut(300).find($('img')).animate({ width: '0%' });
        })
        this.$slider.on('come', function () {
            // 当前ppt来的时候触发事件
            // 当前ppt300毫秒淡入，其中的img宽度变成40%，用时也是300ms
            $(this).fadeIn(300).find($('img')).delay(300).animate({
                width: '40%'
            }, 300, 'linear');
            self.flag = true;
            self.sliderAuto();

        })
    },
    //将点击之后执行的操作抽离出来，用锁控制
    tool: function (text) {
        var self = this;
        if (self.flag) {
            self.getIndex(text);
            if (self.lastIndex !== self.nowIndex) {
                self.flag = false;                
                //当点击的不是当前页面的时候，才执行以下操作

                //改变order的选中状态
                self.changeActive(self.nowIndex);
                // tiigger:自定义触发事件
                self.$slider.eq(self.lastIndex).trigger('leave');
                self.$slider.eq(self.nowIndex).delay(300).trigger('come');
                
            }
        }
    },
    //获得当前的索引
    getIndex: function (dir) {
        //保存一下上一个索引值，leave事件的时候用
        this.lastIndex = this.nowIndex;
        if (dir == 'left') {
            this.nowIndex = this.nowIndex == 0 ? this.len - 1 : this.nowIndex - 1;
        } else if (dir == 'right') {
            this.nowIndex = this.nowIndex == this.len - 1 ? 0 : this.nowIndex + 1;
        }
        else {
            this.nowIndex = dir;
        }
        // console.log(this.nowIndex);
    },
    //改变order的选中状态
    changeActive: function (index) {
        $('.active').removeClass('active');
        $('li').eq(index).addClass('active');
    },
    //自动播放
    sliderAuto: function () {
        var self = this;
        clearTimeout(self.timer);
        self.timer = setTimeout(function () {
            self.tool('right');
        }, 3000)
    }
}
// 入口函数
ppt.init();