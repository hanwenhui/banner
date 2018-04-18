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
    O: {
        //索引值
        "Hindex": 0,
        // 定时器
        "Htimer": null,
        // 动画方式
        "HslideType": '',
        //动画时间
        "HdurationTime": '1'
    },

    // 初始 调用方法
    Hbanner: function (option) {
        // 默认配置
        var Hoption = $.extend({
            "btn": "true",
            "autoPlay": "true",
            "slideType": "fade",
            "intervalTime": 2000,
            "HdurationTime": '1'
        }, option || {});

        // 修改O.HslideType 目前是scroll(无缝)  fade(淡入淡出)     Hzoom(移走上一张露出下一张)
        this.O.HslideType = Hoption.slideType;
        //动画时间
        this.O.HdurationTime = Hoption.HdurationTime;

        // 生成圆点的dom结构
        var liLength = $(this).find('.pic ul li').length;
        $(".circle").append("<ul></ul>");
        for (var i = 0; i < liLength; i++) {
            $('.circle ul').append('<li></li>')
            // 判断如果是zoom模式   就给每张图片的alt添加索引  为了点击圆点时找到正确的图片
            if (this.O.HslideType == "zoom") {
                // console.log(33);
                $(this).find('.pic ul li img').eq(i).attr('alt',i);
            }
        }
        // 生成左右箭头的dom结构
        $(".btn").append(`<div class='prev'><</div>
            <div class='next'>></div>`);


        // 判断如果是无缝模式 就进行li的复制  （把第一个复制到最后一个）
        if (this.O.HslideType == "scroll") {
            var firstImg = (this).find('li').first().clone();
            // 放在 ul 的最后
            $(this).find('.pic ul').append(firstImg);
            var liLength = $(this).find('.pic ul li').length;
            var liWidth = $(this).find('.pic ul').find('li').eq(0).width();
            $(this).find('.pic ul').width(liLength * liWidth);
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
        var HliLength = $(this).find('.pic ul li').length;
        this.O.Hindex++;
        switch (this.O.HslideType) {
            case 'fade':
                this.O.Hindex = this.O.Hindex > HliLength - 1 ? 0 : this.O.Hindex;
                this.Hfade(this.O.Hindex);
                break;
            case 'scroll':
                if (this.O.Hindex == HliLength) {
                    this.O.Hindex = 1;
                    $(this).find('.pic ul').css({left: 0});
                }
                if (this.O.Hindex == HliLength - 1) {
                    this.Hcircle(0);
                }
                this.Hscroll(this.O.Hindex);
                break;
            case 'zoom':
                this.O.Hindex = this.O.Hindex > HliLength - 1 ? 0 : this.O.Hindex;
                this.Hzoom();
                break;
            default:
                console.log('下一张error');
        }
        this.Hcircle(this.O.Hindex);

    },


    // 上一张
    Hprev: function () {
        var HliLength = $(this).find('.pic ul li').length;
        var liWidth = $(this).find('.pic ul').find('li').eq(0).width();
        this.O.Hindex--;
        switch (this.O.HslideType) {
            case 'fade || zoom ':
                // console.log(222222);
                this.O.Hindex = this.O.Hindex < 0 ? HliLength - 1 : this.O.Hindex;
                this.Hfade(this.O.Hindex);
                break;
            case 'scroll':
                if (this.O.Hindex == -1) {
                    this.O.Hindex = HliLength - 2;
                    $(this).find('.pic ul').css({left: ($(this).find('.pic ul li').length - 1) * -liWidth});
                }
                if (this.O.Hindex == HliLength - 1) {
                    this.Hcircle(0);
                }
                this.Hscroll(this.O.Hindex);
                break;
            case 'zoom':
                this.O.Hindex = this.O.Hindex < 0 ? HliLength - 1 : this.O.Hindex;
                this.Hzoom();
                break;
            default:
                console.log('上一张error');
        }
        this.Hcircle(this.O.Hindex);
    },

    // 点击箭头切换下一张
    HnextEvent: function () {
        var _this = this;
        var next = $(this).find('.btn .next');
        next.on("click", function () {
            _this.HclearTimer();
            _this.Hnext();
        })
    },

    // 点击箭头切换上一张
    HprevEvent: function () {
        var _this = this;
        var prev = $(this).find('.btn .prev');
        prev.on("click", function () {
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
        circle.click(function () {
            _this.HclearTimer();
            _this.Hcircle($(this).index());
            _this.O.Hindex = $(this).index();
            switch (_this.O.HslideType) {
                case 'fade':
                    _this.Hfade(_this.O.Hindex);
                    break;
                case 'scroll':
                    _this.Hscroll(_this.O.Hindex);
                    break;
                case 'zoom':
                    _this.Hzoom(_this.O.Hindex);
                    break;
                default:
                    console.log('圆点error');
                    break;
            }
        });
        console.log(circle);
    },

    //淡入淡出  样式
    Hfade: function (i) {
        // console.log(222);
        // console.log(this.O.HdurationTime)
        if (this.O.HdurationTime) {
            // console.log(888888, this.O.HdurationTime instanceof Array);
            switch (this.O.HdurationTime instanceof Array) {
                case true || 'true':
                    $(this).find('.pic ul li').eq(i).fadeIn(this.O.HdurationTime[0]).siblings().fadeOut(this.O.HdurationTime[1]);
                    break;
                case false:
                    $(this).find('.pic ul li').eq(i).fadeIn(this.O.HdurationTime).siblings().fadeOut(this.O.HdurationTime);
                    break;
                default:
                    break;

            }
        }

    },

    // 无缝轮播  移动图片
    Hscroll: function (i) {
        var liWidth = $(this).find('.pic ul').find('li').eq(0).width();
        $(this).find('.pic ul').stop(true, true).animate({left: i * -liWidth}, 400);
    },

    // 消失后 露出下一张
    Hzoom: function () {
        var first = $(this).find('.pic ul').find('li').eq(0);
        first.addClass("zoom").fadeOut(700, function () {
            // $(this).removeClass("zoom").appendTo(".pic ul").fadeIn();
            $(this).removeClass("zoom").appendTo(".pic ul").show();
        })
    },

    // 自动轮播 执行定时器
    HstartTimer: function (intervalTime) {
        var _this = this;
        this.O.Htimer = setInterval(function () {
            _this.Hnext()
        }, intervalTime);
    },

    // 清除定时器
    HclearTimer: function () {
        clearInterval(this.O.Htimer);
    },

    // 鼠标移入  清除定时器
    HmouseoverEvent: function () {
        var _this = this;
        $(this).on("mouseover", function () {
            _this.HclearTimer()
        })
    },

    // 鼠标移出 重启定时器
    HmouseoutEvent: function (intervalTime) {
        var _this = this;
        $(this).on("mouseout", function () {
            _this.HstartTimer(intervalTime);
        })
    }

});