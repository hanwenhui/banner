/**
 * Created by hy on 2018/4/9.
 */
function Slide(option){
    var _this=this;
    this.oUl = option.oLi.parent(); //ul
    this.oLi = option.oLi;  //li  要动的图片
    this.oLiLength = option.oLi.length;  //li  的长度
    this.circleDom = option.circleDom;  //下方的小圆点
    this.btn = option.btn;  //是否显示左右按钮
    this.prevBtn = option.prevBtn;  //上一张 左箭头
    this.nextBtn = option.nextBtn;  //下一张 右箭头
    this.domEvent = option.domEvent;  //事件类型
    this.intervalTime = option.intervalTime;  //定时器时间
    this.i = 0;
    if( this.btn == true || this.btn == "true"){
        //下一张 右箭头
        this.nextBtn.click(function(){
            _this.nextImg(this);
        });
        //上一张 左箭头
        this.prevBtn.click(function(){
            _this.prevImg(this);
        });
    }
//        点击小圆点  事件
    this.circleDom.click(function(){
        clearInterval(_this.timer);
        $(this).addClass("current").siblings().removeClass("current");
        _this.i = $(this).index();
        _this.oLi.eq(_this.i).fadeIn(500).siblings().fadeOut(500);

    });
    //鼠标移入
    this.oUl[this.domEvent[0]](function(){
        _this.hoverEvent();
    });
    //鼠标移出
    this.oUl[this.domEvent[1]](function(){
        _this.outEvent();
    })
}
//下一张
Slide.prototype.nextImg = function(){
    clearInterval(this.timer);
    this.i++;
    this.i = this.i > this.oLiLength - 1 ? 0 : this.i;
    this.circleDom.eq(this.i).addClass('current').siblings().removeClass("current");
    this.oLi.eq(this.i).fadeIn(500).siblings().fadeOut(500);
};
//上一张
Slide.prototype.prevImg = function(){
    clearInterval(this.timer);
    this.i--;
    this.i = this.i < 0? this.oLiLength - 1 : this.i;
    this.circleDom.eq(this.i).addClass('current').siblings().removeClass("current");
    this.oLi.eq(this.i).fadeIn(500).siblings().fadeOut(500);
};

//自动轮播
Slide.prototype.autoPlay = function(){
    var _this=this;
    _this.timer=setInterval(function(){
        _this.i++;
        _this.i = _this.i > _this.oLiLength - 1 ? 0 : _this.i;
        _this.circleDom.eq(_this.i).addClass('current').siblings().removeClass("current");
        _this.oLi.eq(_this.i).fadeIn(500).siblings().fadeOut(500);
    },_this.intervalTime)
};
//移入停止定时器
Slide.prototype.hoverEvent = function(){
    clearInterval(this.timer)
};
//移出开始定时器
Slide.prototype.outEvent = function(){
    this.autoPlay();
};


