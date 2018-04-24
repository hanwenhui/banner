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
        "HUl": "",
        "HLi": "",
        "HLiLength": "",
        // 定时器
        "Htimer": null,
        // 动画方式
        "HslideType": '',
        //动画时间
        "HdurationTime": '1'
    },

    // 初始 调用方法
    Hbanner: function (option) {
        this.O.HUl = $(this).find(".pic ul");
        this.O.HLi = this.O.HUl.find("li");
        this.O.HLiLength = this.O.HLi.length;

        // 默认配置
        var Hoption = $.extend({
            "btn": "true",
            "autoPlay": "true",
            "slideType": "fade",
            "intervalTime": 2000,
            "HdurationTime": [122, 344]
        }, option || {});

        // 修改O.HslideType 目前是scroll(无缝)  fade(淡入淡出)     Hzoom(移走上一张露出下一张)
        this.O.HslideType = Hoption.slideType;
        //动画时间
        this.O.HdurationTime = Hoption.HdurationTime;

        // 生成圆点的dom结构

        $(".circle").append("<ul></ul>");
        for (var i = 0; i < this.O.HLiLength; i++) {
            $('.circle ul').append('<li></li>')
        }

        // 生成左右箭头的dom结构
        var btnDom = "<div class='prev'><</div><div class='next'>></div>";
        $(".btn").append(btnDom);


        // 判断如果是zoom模式   修改ul的布局
        if (this.O.HslideType == "zoom") {
            this.O.HUl.addClass('ulNoRelative');
            this.O.HLi.eq(0).addClass('topZindex');
            this.O.HLi.eq(1).addClass('secondZindex');
        } else {
            this.O.HUl.removeClass('ulNoRelative').addClass('ulRelative');
        }

        // 判断如果是无缝模式 就进行li的复制  （把第一个复制到最后一个）
        if (this.O.HslideType == "scroll") {
            var firstImg = (this).find('li').first().clone();
            // 放在 ul 的最后
            this.O.HUl.append(firstImg);
            var liWidth = this.O.HLi.eq(0).width();
            this.O.HLiLength = $(this).find(".pic ul li").length;
            this.O.HUl.width(this.O.HLiLength * liWidth);
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

    // 事件 点击箭头切换上一张
    HprevEvent: function () {
        var _this = this;
        var prev = $(this).find('.btn .prev');
        prev.on("click", function () {
            _this.HclearTimer();
            _this.Hprev();

        })
    },

    // 事件 点击箭头切换下一张
    HnextEvent: function () {
        var _this = this;
        var next = $(this).find('.btn .next');
        next.on("click", function () {
            _this.HclearTimer();
            _this.Hnext();
        })
    },

    // 上一张
    Hprev: function () {
        // var HLiLength = $(this).find('.pic ul li').length;
        var liWidth = this.O.HLi.eq(0).width();
        this.O.Hindex--;
        switch (this.O.HslideType) {
            case 'fade':
                this.O.Hindex = this.O.Hindex < 0 ? this.O.HLiLength - 1 : this.O.Hindex;
                this.Hfade(this.O.Hindex);
                break;
            case 'scroll':
                if (this.O.Hindex == -1) {
                    this.O.Hindex = this.O.HLiLength - 2;
                    this.O.HUl.css({left: (this.O.HLiLength - 1) * -liWidth});
                }
                if (this.O.Hindex == this.O.HLiLength - 1) {
                    this.Hcircle(0);
                }
                this.Hscroll(this.O.Hindex);
                break;
            case 'zoom':
                // console.log('-----------', this.O.Hindex);
                var zoomIndex = (this.O.Hindex) % 4;
                this.O.Hindex = zoomIndex;

                if (zoomIndex === -1) {
                    this.O.Hindex = this.O.HLiLength - 1;
                    this.Hzoom(0, this.O.HLiLength - 1, this.O.HLiLength - 2);
                    break;
                }
                if (zoomIndex === 0) {
                    console.log('上一张等于0的情况',zoomIndex + 1, zoomIndex, this.O.HLiLength - 1);
                    this.Hzoom(zoomIndex + 1, zoomIndex, this.O.HLiLength - 1);
                    break;
                }
                this.Hzoom(zoomIndex + 1, zoomIndex, zoomIndex - 1);
                console.log("上一张  this.O.Hindex", this.O.Hindex);
                console.log("上一张  zoomIndex", zoomIndex);
                break;
            default:
                console.log('上一张error');
        }

        this.Hcircle(this.O.Hindex);
    },

    // 下一张
    Hnext: function () {
        var HLiLength = $(this).find('.pic ul li').length;
        this.O.Hindex++;
        switch (this.O.HslideType) {
            case 'fade':
                this.O.Hindex = this.O.Hindex > this.O.HLiLength - 1 ? 0 : this.O.Hindex;
                this.Hfade(this.O.Hindex);
                break;
            case 'scroll':
                if (this.O.Hindex == this.O.HLiLength) {
                    this.O.Hindex = 1;
                    this.O.HUl.css({left: 0});
                }
                if (this.O.Hindex == this.O.HLiLength - 1) {
                    this.Hcircle(0);
                }
                this.Hscroll(this.O.Hindex);
                break;
            case 'zoom':
                var zoomIndex = (this.O.Hindex) % this.O.HLiLength;
                this.O.Hindex = zoomIndex;
                if (zoomIndex === this.O.HLiLength - 1) {
                    // debugger
                    this.Hzoom(zoomIndex - 1, zoomIndex, 0);
                    break
                }
                if (zoomIndex === 0) {
                    this.Hzoom(this.O.HLiLength - 1, zoomIndex, zoomIndex + 1);
                    break
                }
                this.Hzoom(zoomIndex - 1, zoomIndex, zoomIndex + 1);
                console.log("aaaa", this.O.Hindex);
                console.log("bbbb", zoomIndex);
                break;
            default:
                console.log('下一张error');
        }

        this.Hcircle(this.O.Hindex);

    },


    // 改变样式  圆点
    Hcircle: function (i) {
        $(this).find(".circle ul li").eq(i).addClass('current').siblings().removeClass("current");
        console.log('样式圆点', i);
    },

    // 点击切换圆点
    HcircleEvent: function () {
        var _this = this;
        var circle = $(this).find('.circle li');
        var B = this.O.Hindex;
        console.log(99999999999,B)
        circle.click(function () {
            _this.HclearTimer();
            // _this.Hcircle($(this).index());
            _this.O.Hindex = $(this).index();
            // 获取有topZindex的li的索引
            B = $('.pic ul li.topZindex').index();
            console.log('CCCCCCCCCCCC',B);
            switch (_this.O.HslideType) {
                case 'fade':
                    _this.Hfade(_this.O.Hindex);
                    break;
                case 'scroll':
                    _this.Hscroll(_this.O.Hindex);
                    break;
                case 'zoom':
                    //如果当前点击与之前记录相等  代表连续

                    console.log('BBBBBBBBBBBBB',B);
                    if (_this.O.Hindex - 1 === B) {
                        console.log('连续');
                        // 最后一个
                        if (_this.O.Hindex >= _this.O.HLiLength - 1) {
                            _this.Hzoom(_this.O.Hindex - 1, _this.O.Hindex, 0);
                            break
                        }
                        //第一个
                        if (_this.O.Hindex <= 0) {
                            _this.Hzoom(_this.O.HLiLength - 1, _this.O.Hindex, _this.O.Hindex + 1);
                            break
                        }
                        //其他所有
                        _this.Hzoom(_this.O.Hindex - 1, _this.O.Hindex, _this.O.Hindex + 1);
// debugger
                    } else {
                        console.log('不连续');
                        // 最后一个
                        if (_this.O.Hindex >= _this.O.HLiLength - 1) {
                            _this.Hzoom(B, _this.O.Hindex, 0);
                            break
                        }
                        // 第一个
                        if (_this.O.Hindex <= 0) {
                            _this.Hzoom(B, _this.O.Hindex, _this.O.Hindex + 1);
                            break
                        }
                        //现在点击的比之前记录值大
                        if(_this.O.Hindex > B){
                            _this.Hzoom(B, _this.O.Hindex, _this.O.Hindex + 1);
                            // debugger
                            break
                        }
                        //其他所有
                        _this.Hzoom(B, _this.O.Hindex, _this.O.Hindex - 1);
                        // debugger
                    }



                    break;
                default:
                    console.log('圆点error');
                    break;
            }
            _this.Hcircle($(this).index())


        });

    },

    //淡入淡出  样式
    Hfade: function (i) {
        // console.log(222);
        // console.log(this.O.HdurationTime)
        if (this.O.HdurationTime) {
            // console.log(888888, this.O.HdurationTime instanceof Array);
            // 判断传入的是不是数组
            switch (this.O.HdurationTime instanceof Array) {
                case true || 'true':
                    this.O.HLi.eq(i).fadeIn(this.O.HdurationTime[0]).siblings().fadeOut(this.O.HdurationTime[1]);
                    break;
                case false:
                    this.O.HLi.eq(i).fadeIn(this.O.HdurationTime).siblings().fadeOut(this.O.HdurationTime);
                    break;
                default:
                    break;

            }
        }

    },

    // 无缝轮播  移动图片
    Hscroll: function (i) {
        var liWidth = this.O.HLi.eq(0).width();
        this.O.HUl.stop(true, true).animate({left: i * -liWidth}, 400);
    },

    // 消失后 露出下一张
    Hzoom: function (i, j, k) {
        /* var first = $(this).find('.pic ul').find('li').eq(0);
         first.addClass("zoom").fadeOut(700, function () {
         // $(this).removeClass("zoom").appendTo(".pic ul").fadeIn();
         $(this).removeClass("zoom").appendTo(".pic ul").show();
         });*/

        console.log(i, j, k);
        var _this = this;
        this.O.HLi.eq(i).addClass("zoom").stop(true, true).fadeOut(700, function () {
            // console.log(1111, $(this));
            // console.log(1111,_this.O.HLi.eq(2).css('z-index'));
            _this.O.HLi.removeClass().show();
            _this.O.HLi.eq(j).addClass("topZindex").show();
            _this.O.HLi.eq(k).addClass("secondZindex").show();
            // console.log(2222,_this.O.HLi.eq(2).css('z-index'));
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