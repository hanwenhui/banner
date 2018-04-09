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
    Hslide: function (option) {

        var _this = this;
        this.circle(0);
        let DOM = $(_this);
        let _option = option;
        switch (_option.slideType) {
            case "fade":
                let circleDom = _option.circleDom;
                var i = 0;
                // circleDom.eq(i).addClass('current');

                // 下一张
            function nextImg() {
                i++;
                i = i > DOM.length - 1 ? 0 : i;
                _this.circle(i);
//                    console.log("img:", i);
                DOM.eq(i).fadeIn(500).siblings().fadeOut(500);
            }

                //上一张
            function prevImg() {
                i--;
                i = i < 0 ? DOM.length - 1 : i;
                _this.circle(i);
                DOM.eq(i).fadeIn(500).siblings().fadeOut(500);
            }

                //判断左右按钮是否显示
                if (_option.btn == false || _option.btn == "false") {
                    $(".btn").hide();
                } else {
                    _option.nextBtn.click(function () {
                        clearInterval(timer);
                        nextImg()
                    });
                    _option.prevBtn.click(function () {
                        clearInterval(timer);
                        prevImg()
                    });
                }
                //判断下方小圆点是否显示
                if (_option.circle == false || _option.circle == "false") {
                    circleDom.hide();
                } else {
                    circleDom.click(function () {
                        clearInterval(timer);
                        $(this).addClass("current").siblings().removeClass("current");
                        i = $(this).index()
                        DOM.eq(i).fadeIn(500).siblings().fadeOut(500);
                        console.log("circle:", i);

                    });
                }
                clearInterval(timer);
                var timer = setInterval(nextImg, _option.intervalTime);

                DOM[option.domEvent[0]](function () {
                    clearInterval(timer);
                });
                DOM[option.domEvent[1]](function () {
                    timer = setInterval(nextImg, _option.intervalTime);
                })
                break;
            case "scroll":
                if (_option.btn == false || _option.btn == "false") {
                    $(".btn").hide();
                }
                if (_option.circle == false || _option.circle == "false") {
                    _option.circleDom.hide();
                }
                var oUl = DOM.parent();
                var ulHtml = oUl.html();
                oUl.html(ulHtml + ulHtml);
                var oUlWidth = oUl.children(0).width() * oUl.children().length;
                oUl.width(oUlWidth);
                var speed = -2;

            function slider() {
                if (speed > 0) {
                    if (oUl.css('left') == '0px') {
                        oUl.css('left', -oUlWidth / 2 + 'px');
                    }
                    oUl.css('left', '+=' + speed + 'px');
                }
                if (speed < 0) {
                    if (oUl.css('left') == -oUlWidth / 2 + 'px') {
                        oUl.css('left', 0);
                    }
                    oUl.css('left', '+=' + speed + 'px');
                }
            }

                clearInterval(timer1);
                var timer1 = setInterval(slider, _option.intervalTime);
                DOM[option.domEvent[0]](function () {
                    clearInterval(timer1);
                });
                DOM[option.domEvent[1]](function () {
                    timer1 = setInterval(slider, _option.intervalTime);
                })
                break;
            default:
                console.log(error);
        }
    },
    circle: function (i) {
        $(this).closest('#wrap').find('.circle ul li').eq(i).addClass('current').siblings().removeClass("current");
        console.log('我是test', i);
    }
});