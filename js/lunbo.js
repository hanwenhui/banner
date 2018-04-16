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

    // 轮播类型
    HslideType: '',

    // 默认配置
    optionInit: function (option) {
        var Hoption = $.extend({
            "btn": "true",
            "autoPlay": "true",
            "slideType": "fade",
            "intervalTime": 2000
        }, option || {});
        return Hoption;
    },

    // 初始 调用方法
    Hinit: function (option) {
        // 调用默认配置
        var Hoption = this.optionInit(option);

        // 修改HslideType 目前是scroll(无缝) 和 fade(淡入淡出)
        this.HslideType = Hoption.slideType;

        // 判断如果是无缝模式 就进行li的复制  （把第一个复制到最后一个）
        if (this.HslideType == "scroll") {
            var firstImg = (this).find('li').first().clone();
            // 放在 ul 的最后
            $(this).find('.pic ul').append(firstImg).width(5 * $(this).find('.pic ul').find('li').eq(0).width());
        }

        // 左右箭头 是否显示
        if (Hoption.btn == false || Hoption.btn == 'false') {
            $(this).find('.btn').hide()
        } else {
            // 点击箭头 切换下一张
            this.HnextEvent();
            // 点击箭头 切换上一张
            this.HprevEvent();
        }

        // 自动轮播 是否自动
        if (Hoption.autoPlay == 'true' || Hoption.autoPlay == true) {
            // 自动轮播 执行定时器
            this.HstartTimer(Hoption.intervalTime);
            // 鼠标移入  清定时器
            this.HmouseoverEvent();
            // 鼠标移出  开定时器
            this.HmouseoutEvent(Hoption.intervalTime);
        } else {
            console.log('未设置自动轮播');
        }

        // 给第一个圆点添加 选中状态
        this.Hcircle(0);

        //圆点点击事件
        this.HcircleEvent()
    },


    // 下一张
    Hnext: function () {
        // console.log(123, this.HslideType);
        var HliLength = $(this).find('.pic ul li').length;
        this.Hindex++;
        switch (this.HslideType) {
            case 'fade':
                this.Hindex = this.Hindex > HliLength - 1 ? 0 : this.Hindex;
                this.Hcircle(this.Hindex);
                this.HfadeToggle(this.Hindex);
                break;
            case 'scroll':
                if (this.Hindex == HliLength) {
                    this.Hindex = 1;
                    $(this).find('.pic ul').css({left: 0});
                }
                if (this.Hindex == HliLength - 1) {
                    this.Hcircle(0);
                }
                this.Hcircle(this.Hindex);
                this.HscrollMove(this.Hindex);
                break;
            default:
                console.log('下一张error');
        }
    },

    // 上一张
    Hprev: function () {
        var HliLength = $(this).find('.pic ul li').length;
        this.Hindex--;
        switch (this.HslideType) {
            case 'fade':
                this.Hindex = this.Hindex < 0 ? HliLength - 1 : this.Hindex;
                this.Hcircle(this.Hindex);
                this.HfadeToggle(this.Hindex);
                break;
            case 'scroll':
                if (this.Hindex == -1) {
                    this.Hindex = HliLength - 2;
                    $(this).find('.pic ul').css({left: ($(this).find('.pic ul li').length - 1) * -500});
                }
                if (this.Hindex == HliLength - 1) {
                    this.Hcircle(0);
                }
                this.Hcircle(this.Hindex);
                this.HscrollMove(this.Hindex);
                break;
            default:
                console.log('下一张error');
        }

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
        // console.log('圆点', i);
    },

    // 点击切换圆点
    HcircleEvent: function () {
        var _this = this;
        var circle = $(this).find('.circle li');
        switch (this.HslideType) {
            case 'fade':
                circle.click(function () {
                    _this.HclearTimer();
                    _this.Hcircle($(this).index());
                    _this.Hindex = $(this).index();
                    _this.HfadeToggle(_this.Hindex);
                });

                break;
            case 'scroll':
                circle.click(function () {
                    _this.HclearTimer();
                    _this.Hcircle($(this).index());
                    _this.Hindex = $(this).index();
                    _this.HscrollMove(_this.Hindex);
                });

                break;
            default:
                console.log('圆点error');
        }
        console.log(circle);
    },

    //淡入淡出  样式
    HfadeToggle: function (i) {
        $(this).find('.pic ul li').eq(i).fadeIn(500).siblings().fadeOut(500);
    },

    // 无缝轮播  移动图片
    HscrollMove: function (i) {
        $(this).find('.pic ul').stop().animate({left: i * -500}, 400);
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