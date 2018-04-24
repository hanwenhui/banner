# banner
练习代码的提取和面向对象思路的写法

使用方法：

html写法：

只需添加自己的图片，其他都是写好的
```
<div class="wrap">
    <div class="pic">
        <ul>
            <li>
                <img src="image/1.jpg" alt=""/>
            </li>
        </ul>
    </div>
    <div class="circle"></div>
    <div class="btn"></div>
</div>
```

js写法：

如果想要使用默认方法，只需写自己想要的轮播方式即可

```
var picJson = {
     是否显示左右箭头按钮
     "btn": "false",
 
     是否自动轮播
     "autoPlay":"false",
 
     轮播时间
     "intervalTime": 2000,
 
     轮播方式---淡入淡出
     "slideType": "fade",
 
     轮播方式---无缝
     "slideType": "scroll",
 
     轮播方式---飘出(移走上一张露出下一张)
     "slideType": "zoom"
};
     $(".wrap").Hbanner(picJson);
   ```


