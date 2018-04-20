/**
 * Created by hy on 2018/4/9.
 */

/*function A() {
 console.log('A',this);
 }

 A.prototype.Test = function (e) {
 this.A = e;
 console.log('Test', this);
 }
 var B = new A();
 B.Test(1);
 var C= new A();
 C.Test();*/

$.fn.extend({
    // 索引值
    Hindex: 0,

    // 定义定时器
    Htimer: null,

    //初始 调用方法
    Hinit: function (option) {
        // 默认配置
        var Hoption = $.extend({
            "btn": "true",
            "autoPlay":"true",
            "slideType": "fade",
            "intervalTime": 2000
        },option||{});

        // 左右箭头
        if (Hoption.btn == false || Hoption.btn == 'false') {
            $(this).find('.btn').hide()
        } else {
            // 点击箭头 切换下一张
            this.HnextEvent();
            // 点击箭头 切换上一张
            this.HprevEvent();
        }
        // 自动轮播
        if (Hoption.autoPlay == true || Hoption.autoPlay == 'true') {
            // 自动轮播 执行定时器
            this.HstartTimer(Hoption.intervalTime);
            // 鼠标移入  清定时器
            this.HmouseoverEvent();
            // 鼠标移出  开定时器
            this.HmouseoutEvent(Hoption.intervalTime);
        }

        this.Hcircle(0);
        // 点击切换圆点
        this.HcircleEvent();
    },
    // 下一张
    Hnext: function () {
        this.Hindex++;
        this.Hindex = this.Hindex > $(this).find('.pic ul li').length - 1 ? 0 : this.Hindex;
        console.log('下一张', this.Hindex);
        this.Hcircle(this.Hindex);
        // this.HfadeToggle(this.Hindex);
        this.Hseamless();
    },

    // 上一张
    Hprev: function () {
        this.Hindex--;
        this.Hindex = this.Hindex < 0 ? $(this).find('.pic ul li').length - 1 : this.Hindex;
        this.Hcircle(this.Hindex);
        // this.HfadeToggle(this.Hindex);
        this.Hseamless();
    },

    // 点击箭头切换下一张
    HnextEvent: function () {
        var _this = this;
        var next = $(this).find('.btn .next');
        next.click(function () {
            _this.HclearTimer();
            _this.Hnext();
        })
    },

    // 点击箭头切换上一张
    HprevEvent: function () {
        var _this = this;
        var prev = $(this).find('.btn .prev');
        prev.click(function () {
            _this.HclearTimer();
            _this.Hprev();

        })
    },

    // 改变样式  圆点
    Hcircle: function (i) {
        $(this).find('.circle ul li').eq(i).addClass('current').siblings().removeClass("current");
        console.log('圆点', i);
    },

    // 点击切换圆点
    HcircleEvent: function () {
        var _this = this;
        var circle = $(this).find('.circle li');
        circle.click(function () {
            _this.HclearTimer();
            _this.Hcircle($(this).index());
            _this.Hindex = $(this).index();
            // _this.HfadeToggle(_this.Hindex);
            _this.Hseamless();
        });
        console.log(circle);
    },

    //淡入淡出  样式
    HfadeToggle: function (i) {
        $(this).find('.pic ul li').eq(i).fadeIn(500).siblings().fadeOut(500);
    },

    // 无缝   样式
    Hseamless:function(){
        var Liwidth =  $(this).find('.pic ul li').width();
        var Lilength =  $(this).find('.pic ul li').length;
        var Ulwidth = Liwidth*Lilength*2;
        $(this).find('.pic ul').width( Ulwidth) ;

        console.log(222,    $(this).find('.pic ul'));
    },

    // 自动轮播 执行定时器
    HstartTimer: function (intervalTime) {
        var _this = this;
        this.Htimer = setInterval(function () {
            _this.Hnext()
        }, intervalTime);
    },

    // 清除定时器
    HclearTimer: function () {
        clearInterval(this.Htimer);
    },

    // 鼠标移入  清除定时器
    HmouseoverEvent: function () {
        var _this = this;
        $(this).mouseover(function () {
            _this.HclearTimer()
        })
    },

    // 鼠标移出 重启定时器
    HmouseoutEvent: function (intervalTime) {
        var _this = this;
        $(this).mouseout(function () {
            _this.HstartTimer(intervalTime);
        })
    }

});