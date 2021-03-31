---
title: css 实操小总结
top: false
cover: false
toc: true
mathjax: true
date: 2020-12-01 16:10:20
password:
summary: css 实操小总结
tags:  css&html
categories: css&html
---

## 为什么height:100%不生效

对于`height`属性，如果父元素`height`为`auto`，只要子元素在文档流中（即`position`不等于`fixed`或者`absolute`），其百分比值完全就被忽略了。

```html
<style>
    .box {
      width: 100%; // 这是多余的
      height: 100%; // 这是无效的
      background: #000;
    }
  </style> 
<body>
  <div class="box"></div>
</body>
```

### solution

1.设定显式的高度值。

```CSS
html, body {
 height: 100%;
}
```

2，使用绝对定位

```html
  <style>
    body {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }

    .box {
      width: 100%;
      height: 100%;
      background: #000;
    }
  </style>

<body>
  <div class="box">
  </div>
</body>
```



## ul高度显示为0（内容撑不开）

![](css-question-solution/1606914092190.png)

### 推荐方法一

```html
<div class="fuqin">
    <ul>
        <li>内容1</li>
        <li>内容1</li>
         <div class="clearfloat"></div>
    </ul>
</div> 
<style>
.clearfloat{
    clear:both;
    height:0;
    font-size: 1px;
    line-height: 0px;} 
</style>
```

### 推荐方法二

利用伪元素:after,给ul清除浮动

```css
#box>ul:after{
    content: "";
    display: block;
    clear: both;
}
```

在:after为元素里面用到了content属性，这样这条样式的意思是在ul元素后面生成指定的内容，这里生成的内容是一个空字符串，因为只是让它来消除ul标签的高度折叠，并不让它显示出来。还有，这条样式里有display属性，要将他设置成block，这样clear属性才会起作用，因为清除操作只作用于块级元素，它的原理是为要执行清除操作的元素添加上边距，以此让元素降到浮动元素的下面，而操作行内元素的上边距不起作用。

### 方法三

 利用overflow属性 
可以包含元素设置overflow属性，并设置属性值为auto或者hidden。

```css
ul { 
list-style-type: none; 
width: 800px; background: blue; 
overflow: hidden; /*添加overflow属性，可以设置为auto或者hidden*/ }
```

## 元素对齐

![](css-question-solution/1606991751651.png)

- vertical-align ： 设置元素的垂直对齐方式。

- vertical-align注意点:

- - text-align是设置给需要对齐元素的父元素
  - vertical -align是设置给需要对齐的那个元素本身
  - vertical -align只对行内元素和单元格元素垂直居中生效

- 默认情况下图片和一行文字的基线对齐
- 基线就是一行文字中最短那个文字的底部

有宽度的块级元素居中对齐，是margin: 0 auto;

让文字居中对齐，是 text-align: center;

设置元素内容的垂直方式(只对行内元素,单元格元素生效,块级元素不生效).

特别是行内块元素， **通常用来控制图片/表单与文字的对齐;**

## 选择器

### 相邻兄弟选择器 （有识别器紧跟的一个）

 给指定选择器后面紧跟的那个选择器选中的标签设置属性.

```css
check1+check2{ //目的是设置check1后面紧跟屁股的check2 
    attr: value;
}
```

- 相邻兄弟选择器必须通过+连接;
- 相邻兄弟选择器只能选中紧跟其后的那个标签, 不能选中被隔开的标签.

### 通用兄弟选择器

 给指定选择器后面的所有选择器选中的所有标签设置属性.

```css
选择器1~选择器2{ //设置选择器1后面的全部选择器2
    属性:值;
}
```

- 通用兄弟选择器必须用~连接;
- 通用兄弟选择器选中的是指定选择器后面某个选择器选中的所有标签, 无论有没有被隔开都可以选中;

```html
<style>
    h1~p{
        color: chocolate;
    }
</style>

<h1>我是标题1</h1>
<a href="#">我是一个超链接</a>
<p>我是一个段落</p>
<p>我是一个段落</p>
<p>我是一个段落</p>
<h1>我是标题1</h1>
```

### 序选择器

- **同级别的第几个**

- 注意点：不区分类型;

```css
:first-child 选中同级别中的第一个标签
:last-child 选中同级别中的最后一个标签
:nth-child(n) 选中同级别中的第n个标签
:nth-last-child(n) 选中同级别中的倒数第n个标签
:only-child 选中父元素中唯一的标签
```

- **同类型的第几个**

```css
:first-of-type 选中同级别中同类型的第一个标签
:last-of-type  选中同级别中同类型的最后一个标签
:nth-of-type(n) 选中同级别中同类型的第n个标签
:nth-last-of-type(n)  选中同级别中同类型的倒数第n个标签
:only-of-type 选中父元素中唯一类型的某个标签
```

- ## **同级别同类型的奇偶个**

```css
:nth-child(odd) 同级别奇数
:nth-child(even)同级别偶数
:nth-of-type(odd)同类型奇数
:nth-of-type(even)同类型偶数
```



## a标签的伪类选择器

 a标签的伪类选择器是专门用来修改a标签不同状态的样式的.

```css
:link 修改从未被访问过状态下的样式
:visited 修改被访问过的状态下的样式
:hover 修改鼠标悬停在a标签上状态下的样式
:active 修改鼠标长按状态下的样式
```

### Layout Skill

##### 使用vw定制rem自适应布局

- 要点：移动端使用`rem布局`需要通过JS设置不同屏幕宽高比的`font-size`，结合`vw`单位和`calc()`可脱离JS的控制
- 场景：**rem页面布局**(不兼容低版本移动端系统)
- 兼容：[vw](https://caniuse.com/#search=vw)、[calc()](https://caniuse.com/#search=calc())

```
/* 基于UI width=750px DPR=2的页面 */
html {
    font-size: calc(100vw / 7.5);
}
复制代码
```

##### 使用:nth-child()选择指定元素

- 要点：通过`:nth-child()`筛选指定的元素设置样式
- 场景：**表格着色**、**边界元素排版**(首元素、尾元素、左右两边元素)
- 兼容：[:nth-child()](https://caniuse.com/#search=%3Anth-child())
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/voRzNP)

![在线演示](https://yangzw.vip/static/article/css-skill/%E4%BD%BF%E7%94%A8nth-child%E9%80%89%E6%8B%A9%E6%8C%87%E5%AE%9A%E5%85%83%E7%B4%A0.png)

##### 使用writing-mode排版竖文

- 要点：通过`writing-mode`调整文本排版方向
- 场景：**竖行文字**、**文言文**、**诗词**
- 兼容：[writing-mode](https://caniuse.com/#search=writing-mode)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/XvExJO)

![在线演示](https://yangzw.vip/static/article/css-skill/%E4%BD%BF%E7%94%A8writing-mode%E6%8E%92%E7%89%88%E7%AB%96%E6%96%87.png)

##### 使用text-align-last对齐两端文本

- 要点：通过`text-align-last:justify`设置文本两端对齐
- 场景：**未知字数中文对齐**
- 兼容：[text-align-last](https://caniuse.com/#search=text-align-last)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/ZgxZJa)

![在线演示](https://yangzw.vip/static/article/css-skill/%E4%BD%BF%E7%94%A8text-align-last%E5%AF%B9%E9%BD%90%E4%B8%A4%E7%AB%AF%E6%96%87%E6%9C%AC.png)

##### 使用:not()去除无用属性

- 要点：通过`:not()`排除指定元素不使用设置样式
- 场景：**符号分割文字**、**边界元素排版**(首元素、尾元素、左右两边元素)
- 兼容：[:not()](https://caniuse.com/#search=%3Anot())
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/gVeyqr)

![在线演示](https://yangzw.vip/static/article/css-skill/%E4%BD%BF%E7%94%A8not%E5%8E%BB%E9%99%A4%E6%97%A0%E7%94%A8%E5%B1%9E%E6%80%A7.png)

##### 使用object-fit规定图像尺寸

- 要点：通过`object-fit`使图像脱离`background-size`的约束，使用`<img>`来标记图像背景尺寸
- 场景：**图片尺寸自适应**
- 兼容：[object-fit](https://caniuse.com/#search=object-fit)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/LwBKLV)

![在线演示](https://yangzw.vip/static/article/css-skill/%E4%BD%BF%E7%94%A8object-fit%E8%A7%84%E5%AE%9A%E5%9B%BE%E5%83%8F%E5%B0%BA%E5%AF%B8.png)

##### 使用overflow-x排版横向列表

- 要点：通过`flexbox`或`inline-block`的形式横向排列元素，对父元素设置`overflow-x:auto`横向滚动查看
- 场景：**横向滚动列表**、**元素过多但位置有限的导航栏**
- 兼容：[overflow-x](https://caniuse.com/#search=overflow-x)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/jONqyVd)

![在线演示](https://yangzw.vip/static/article/css-skill/%E4%BD%BF%E7%94%A8overflow-x%E6%8E%92%E7%89%88%E6%A8%AA%E5%90%91%E5%88%97%E8%A1%A8.gif)

##### 使用text-overflow控制文本溢出

- 要点：通过`text-overflow:ellipsis`对溢出的文本在末端添加`...`
- 场景：**单行文字溢出**、**多行文字溢出**
- 兼容：[text-overflow](https://caniuse.com/#search=text-overflow)、[line-clamp](https://caniuse.com/#search=line-clamp)、[box-orient](https://www.w3school.com.cn/cssref/pr_box-orient.asp)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/mdbPmyy)

![在线演示](https://yangzw.vip/static/article/css-skill/%E4%BD%BF%E7%94%A8text-overflow%E6%8E%A7%E5%88%B6%E6%96%87%E6%9C%AC%E6%BA%A2%E5%87%BA.png)

##### 使用transform描绘1px边框

- 要点：分辨率比较低的屏幕下显示1px的边框会显得模糊，通过`::before`或`::after`和`transform`模拟细腻的1px边框
- 场景：**容器1px边框**
- 兼容：[transform](https://caniuse.com/#search=transform)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/YzKqMVO)

![在线演示](https://yangzw.vip/static/article/css-skill/%E4%BD%BF%E7%94%A8transform%E6%8F%8F%E7%BB%981px%E8%BE%B9%E6%A1%86.png)

##### 使用transform翻转内容

- 要点：通过`transform:scale3d()`对内容进行翻转(水平翻转、垂直翻转、倒序翻转)
- 场景：**内容翻转**
- 兼容：[transform](https://caniuse.com/#search=transform)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/NWKNZwO)

![在线演示](https://yangzw.vip/static/article/css-skill/%E4%BD%BF%E7%94%A8transform%E7%BF%BB%E8%BD%AC%E5%86%85%E5%AE%B9.png)

##### 使用letter-spacing排版倒序文本

- 要点：通过`letter-spacing`设置负值字体间距将文本倒序
- 场景：**文言文**、**诗词**
- 兼容：[letter-spacing](https://caniuse.com/#search=letter-spacing)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/zYOBgqB)

![在线演示](https://yangzw.vip/static/article/css-skill/%E4%BD%BF%E7%94%A8letter-spacing%E6%8E%92%E7%89%88%E5%80%92%E5%BA%8F%E6%96%87%E6%9C%AC.png)

##### 使用margin-left排版左重右轻列表

- 要点：使用`flexbox横向布局`时，最后一个元素通过`margin-left:auto`实现向右对齐
- 场景：**右侧带图标的导航栏**
- 兼容：[margin](https://caniuse.com/#search=margin)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/PoYpROw)

![在线演示](https://yangzw.vip/static/article/css-skill/%E4%BD%BF%E7%94%A8margin-left%E6%8E%92%E7%89%88%E5%B7%A6%E9%87%8D%E5%8F%B3%E8%BD%BB%E5%88%97%E8%A1%A8.png)

### Behavior Skill

##### 使用overflow-scrolling支持弹性滚动

- 要点：iOS页面`非body元素`的滚动操作会非常卡(Android不会出现此情况)，通过`overflow-scrolling:touch`调用Safari原生滚动来支持弹性滚动，增加页面滚动的流畅度
- 场景：**iOS页面滚动**
- 兼容：iOS自带`-webkit-overflow-scrolling`

```
body {
    -webkit-overflow-scrolling: touch;
}
.elem {
    overflow: auto;
}
复制代码
```

##### 使用transform启动GPU硬件加速

- 要点：有时执行动画可能会导致页面卡顿，可在特定元素中使用硬件加速来避免这个问题
- 场景：**动画元素**(绝对定位、同级中超过6个以上使用动画)
- 兼容：[transform](https://caniuse.com/#search=transform)

```
.elem {
    transform: translate3d(0, 0, 0); /* translateZ(0)亦可 */
}
复制代码
```

##### 使用attr()抓取data-*

- 要点：在标签上自定义属性`data-*`，通过`attr()`获取其内容赋值到`content`上
- 场景：**提示框**
- 兼容：[data-*](https://caniuse.com/#search=data-)、[attr()](https://caniuse.com/#search=attr())
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/voRdKX)

![在线演示](https://yangzw.vip/static/article/css-skill/%E4%BD%BF%E7%94%A8attr%E6%8A%93%E5%8F%96data-.gif)

##### 使用:valid和:invalid校验表单

- 要点：`<input>`使用伪类`:valid`和`:invalid`配合`pattern`校验表单输入的内容
- 场景：**表单校验**
- 兼容：[pattern](https://caniuse.com/#search=pattern)、[:valid](https://caniuse.com/#search=%3Avalid)、[:invalid](https://caniuse.com/#search=%3Ainvalid)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/QemxKr)

![在线演示](https://yangzw.vip/static/article/css-skill/%E4%BD%BF%E7%94%A8valid%E5%92%8Cinvalid%E6%A0%A1%E9%AA%8C%E8%A1%A8%E5%8D%95.gif)

##### 使用pointer-events禁用事件触发

- 要点：通过`pointer-events:none`禁用事件触发(默认事件、冒泡事件、鼠标事件、键盘事件等)，相当于`<button>`的`disabled`
- 场景：**限时点击按钮**(发送验证码倒计时)、**事件冒泡禁用**(多个元素重叠且自带事件、a标签跳转)
- 兼容：[pointer-events](https://caniuse.com/#search=pointer-events)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/dxmrLj)

![在线演示](https://yangzw.vip/static/article/css-skill/%E4%BD%BF%E7%94%A8pointer-events%E7%A6%81%E7%94%A8%E4%BA%8B%E4%BB%B6%E8%A7%A6%E5%8F%91.gif)

##### 使用+或~美化选项框

- 要点：`<label>`使用`+`或`~`配合`for`绑定`radio`或`checkbox`的选择行为
- 场景：**选项框美化**、**选中项增加选中样式**
- 兼容：[+](https://caniuse.com/#search=+)、[~](https://caniuse.com/#search=~)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/rXdbgZ)

![在线演示](https://yangzw.vip/static/article/css-skill/%E4%BD%BF%E7%94%A8+%E6%88%96~%E7%BE%8E%E5%8C%96%E9%80%89%E9%A1%B9%E6%A1%86.gif)

##### 使用:focus-within分发冒泡响应

- 要点：表单控件触发`focus`和`blur`事件后往父元素进行冒泡，在父元素上通过`:focus-within`捕获该冒泡事件来设置样式
- 场景：**登录注册弹框**、**表单校验**、[**离屏导航**](https://codepen.io/dannievinther/pen/NvZjvz)、[**导航切换**](https://codepen.io/Chokcoco/pen/RJEpaP)
- 兼容：[:focus-within](https://www.caniuse.com/#search=%3Afocus-within)、[:placeholder-shown](https://www.caniuse.com/#search=%3Aplaceholder-shown)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/BaBjaBP)

![在线演示](https://yangzw.vip/static/article/css-skill/%E4%BD%BF%E7%94%A8focus-within%E5%88%86%E5%8F%91%E5%86%92%E6%B3%A1%E5%93%8D%E5%BA%94.gif)

##### 使用:hover描绘鼠标跟随

- 要点：将整个页面等比划分成小的单元格，每个单元格监听`:hover`，通过`:hover`触发单元格的样式变化来描绘鼠标运动轨迹
- 场景：**鼠标跟随轨迹**、[**水波纹**](https://codepen.io/YusukeNakaya/pen/vvEqVx)、[**怪圈**](https://codepen.io/Chokcoco/pen/zyyYqN)
- 兼容：[:hover](https://www.caniuse.com/#search=%3Ahover)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/wvwMLJY)

![在线演示](https://yangzw.vip/static/article/css-skill/%E4%BD%BF%E7%94%A8hover%E6%8F%8F%E7%BB%98%E9%BC%A0%E6%A0%87%E8%B7%9F%E9%9A%8F.gif)

##### 使用max-height切换自动高度

- 要点：通过`max-height`定义收起的最小高度和展开的最大高度，设置两者间的过渡切换
- 场景：**隐藏式子导航栏**、**悬浮式折叠面板**
- 兼容：[max-height](https://caniuse.com/#search=max-height)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/NQYJpm)

![在线演示](https://yangzw.vip/static/article/css-skill/%E4%BD%BF%E7%94%A8max-height%E5%88%87%E6%8D%A2%E8%87%AA%E5%8A%A8%E9%AB%98%E5%BA%A6.gif)

##### 使用transform模拟视差滚动

- 要点：通过`background-attachment:fixed`或`transform`让多层背景以不同的速度移动，形成立体的运动效果
- 场景：[**页面滚动**](https://codepen.io/Chokcoco/pen/JBaQoY)、[**视差滚动文字阴影**](https://codepen.io/Chokcoco/pen/XBgBBp)、[**视差滚动文字虚影**](https://codepen.io/Chokcoco/pen/PBXwdX)
- 兼容：[background-attachment](https://www.caniuse.com/#search=background-attachment)、[transform](https://www.caniuse.com/#search=transform)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/MWgaBoK)

![在线演示](https://yangzw.vip/static/article/css-skill/%E4%BD%BF%E7%94%A8transform%E6%A8%A1%E6%8B%9F%E8%A7%86%E5%B7%AE%E6%BB%9A%E5%8A%A8.gif)

##### 使用animation-delay保留动画起始帧

- 要点：通过`transform-delay`或`animation-delay`设置负值时延保留动画起始帧，让动画进入页面不用等待即可运行
- 场景：**开场动画**
- 兼容：[transform](https://www.caniuse.com/#search=transform)、[animation](https://www.caniuse.com/#search=animation)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/WNexVoB)

![在线演示](https://yangzw.vip/static/article/css-skill/%E4%BD%BF%E7%94%A8animation-delay%E4%BF%9D%E7%95%99%E5%8A%A8%E7%94%BB%E8%B5%B7%E5%A7%8B%E5%B8%A7.gif)

##### 使用resize拉伸分栏

- 要点：通过`resize`设置横向自由拉伸来调整目标元素的宽度
- 场景：**富文本编辑器**、**分栏阅读**
- 兼容：[resize](https://caniuse.com/#search=resize)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/JjPEdWO)

![在线演示](https://yangzw.vip/static/article/css-skill/%E4%BD%BF%E7%94%A8resize%E6%8B%89%E4%BC%B8%E5%88%86%E6%A0%8F.gif)

### Color Skill

##### 使用color改变边框颜色

- 要点：`border`没有定义`border-color`时，设置`color`后，`border-color`会被定义成`color`
- 场景：**边框颜色与文字颜色相同**
- 兼容：[color](https://caniuse.com/#search=color)

```
.elem {
    border: 1px solid;
    color: #f66;
}
复制代码
```

![在线演示](https://yangzw.vip/static/article/css-skill/%E4%BD%BF%E7%94%A8color%E6%94%B9%E5%8F%98%E8%BE%B9%E6%A1%86%E9%A2%9C%E8%89%B2.gif)

##### 使用filter开启悼念模式

- 要点：通过`filter:grayscale()`设置灰度模式来悼念某位去世的仁兄或悼念因灾难而去世的人们
- 场景：**网站悼念**
- 兼容：[filter](https://caniuse.com/#search=filter)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/vYBKqwe)

![在线演示](https://yangzw.vip/static/article/css-skill/%E4%BD%BF%E7%94%A8filter%E5%BC%80%E5%90%AF%E6%82%BC%E5%BF%B5%E6%A8%A1%E5%BC%8F.png)

##### 使用::selection改变文本选择颜色

- 要点：通过`::selection`根据主题颜色自定义文本选择颜色
- 场景：**主题化**
- 兼容：[::selection](https://caniuse.com/#search=%3A%3Aselection)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/jONrjXX)

![在线演示](https://yangzw.vip/static/article/css-skill/%E4%BD%BF%E7%94%A8selection%E6%94%B9%E5%8F%98%E6%96%87%E6%9C%AC%E9%80%89%E6%8B%A9%E9%A2%9C%E8%89%B2.gif)

##### 使用linear-gradient控制背景渐变

- 要点：通过`linear-gradient`设置背景渐变色并放大背景尺寸，添加背景移动效果
- 场景：**主题化**、**彩虹背景墙**
- 兼容：[gradient](https://caniuse.com/#search=gradient)、[animation](https://www.caniuse.com/#search=animation)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/oNvbRwN)

![在线演示](https://yangzw.vip/static/article/css-skill/%E4%BD%BF%E7%94%A8linear-gradient%E6%8E%A7%E5%88%B6%E8%83%8C%E6%99%AF%E6%B8%90%E5%8F%98.gif)

##### 使用linear-gradient控制文本渐变

- 要点：通过`linear-gradient`设置背景渐变色，配合`background-clip:text`对背景进行文本裁剪，添加滤镜动画
- 场景：**主题化**、**特色标题**
- 兼容：[gradient](https://caniuse.com/#search=gradient)、[background-clip](https://www.caniuse.com/#search=background-clip)、[filter](https://caniuse.com/#search=filter)、[animation](https://www.caniuse.com/#search=animation)、[text-fill-color](https://www.caniuse.com/#search=text-fill-color)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/pozgQVo)

![在线演示](https://yangzw.vip/static/article/css-skill/%E4%BD%BF%E7%94%A8linear-gradient%E6%8E%A7%E5%88%B6%E6%96%87%E6%9C%AC%E6%B8%90%E5%8F%98.gif)

##### 使用caret-color改变光标颜色

- 要点：通过`caret-color`根据主题颜色自定义光标颜色
- 场景：**主题化**
- 兼容：[caret-color](https://caniuse.com/#search=caret-color)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/QemxKr)

![在线演示](https://yangzw.vip/static/article/css-skill/%E4%BD%BF%E7%94%A8caret-color%E6%94%B9%E5%8F%98%E5%85%89%E6%A0%87%E9%A2%9C%E8%89%B2.gif)

##### 使用::scrollbar改变滚动条样式

- 要点：通过`scrollbar`的`scrollbar-track`和`scrollbar-thumb`等属性来自定义滚动条样式
- 场景：**主题化**、**页面滚动**
- 兼容：[::scrollbar](https://www.caniuse.com/#search=scrollbar)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/ExYPMog)

![在线演示](https://yangzw.vip/static/article/css-skill/%E4%BD%BF%E7%94%A8scrollbar%E6%94%B9%E5%8F%98%E6%BB%9A%E5%8A%A8%E6%9D%A1%E6%A0%B7%E5%BC%8F.gif)

##### 使用filter模拟Instagram滤镜

- 要点：通过`filter`的滤镜组合起来模拟`Instagram滤镜`
- 场景：**图片滤镜**
- 兼容：[filter](https://caniuse.com/#search=filter)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/NWKbVNQ)、[css-gram](https://github.com/una/CSSgram/blob/master/README-CN.md)

![在线演示](https://yangzw.vip/static/article/css-skill/%E4%BD%BF%E7%94%A8filter%E6%A8%A1%E6%8B%9FInstagram%E6%BB%A4%E9%95%9C.png)

### Figure Skill

##### 使用div描绘各种图形

- 要点：`<div>`配合其伪元素(`::before`、`::after`)通过`clip`、`transform`等方式绘制各种图形
- 场景：各种图形容器
- 兼容：[clip](https://caniuse.com/#search=clip)、[transform](https://caniuse.com/#search=transform)
- 代码：[在线演示](https://css-tricks.com/the-shapes-of-css/)

##### 使用mask雕刻镂空背景

- 要点：通过`mask`为图像背景生成蒙层提供遮罩效果
- 场景：**高斯模糊蒙层**、[**票劵**(电影票、购物卡)](https://codepen.io/HelKyle/pen/XxZPmY/)、[**遮罩动画**](https://codepen.io/banik/pen/aRpvdW)
- 兼容：[mask](https://www.caniuse.com/#search=mask)、[perspective](https://caniuse.com/#search=perspective)、[transform-style](https://caniuse.com/#search=transform-style)、[animation](https://www.caniuse.com/#search=animation)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/xxKZdZN)

![在线演示](https://yangzw.vip/static/article/css-skill/%E4%BD%BF%E7%94%A8mask%E9%9B%95%E5%88%BB%E9%95%82%E7%A9%BA%E8%83%8C%E6%99%AF.gif)

##### 使用linear-gradient描绘波浪线

- 要点：通过`linear-gradient`绘制波浪线
- 场景：**文字强化显示**、**文字下划线**、**内容分割线**
- 兼容：[gradient](https://caniuse.com/#search=gradient)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/EqEzwq)

![在线演示](https://yangzw.vip/static/article/css-skill/%E4%BD%BF%E7%94%A8linear-gradient%E6%8F%8F%E7%BB%98%E6%B3%A2%E6%B5%AA%E7%BA%BF.png)

##### 使用linear-gradient描绘彩带

- 要点：通过`linear-gradient`绘制间断颜色的彩带
- 场景：**主题化**
- 兼容：[gradient](https://caniuse.com/#search=gradient)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/bGbeXZG)

![在线演示](https://yangzw.vip/static/article/css-skill/%E4%BD%BF%E7%94%A8linear-gradient%E6%8F%8F%E7%BB%98%E5%BD%A9%E5%B8%A6.png)

##### 使用conic-gradient描绘饼图

- 要点：通过`conic-gradient`绘制多种色彩的饼图
- 场景：**项占比饼图**
- 兼容：[gradient](https://caniuse.com/#search=gradient)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/XWrjrgE)

![在线演示](https://yangzw.vip/static/article/css-skill/%E4%BD%BF%E7%94%A8conic-gradient%E6%8F%8F%E7%BB%98%E9%A5%BC%E5%9B%BE.png)

##### 使用linear-gradient描绘方格背景

- 要点：使用`linear-gradient`绘制间断颜色的彩带进行交互生成方格
- 场景：**格子背景**、**占位图**
- 兼容：[gradient](https://caniuse.com/#search=gradient)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/RwboXoV)

![在线演示](https://yangzw.vip/static/article/css-skill/%E4%BD%BF%E7%94%A8linear-gradient%E6%8F%8F%E7%BB%98%E6%96%B9%E6%A0%BC%E8%83%8C%E6%99%AF.png)

##### 使用box-shadow描绘单侧投影

- 要点：通过`box-shadow`生成投影，且模糊半径和负的扩张半径一致，使投影偏向一侧
- 场景：**容器投影**、[**背景补间动画1**](https://codepen.io/Chokcoco/pen/WaBYZL)、[**背景补间动画2**](https://codepen.io/davidkpiano/pen/LVzxPV)、[**立体投影**](https://codepen.io/Chokcoco/pen/LgdRKE)、[**文字立体投影**](https://codepen.io/Chokcoco/pen/JmgNNa)、[**文字渐变立体投影**](https://codepen.io/Chokcoco/pen/XxQJEB)、[**长投影**](https://codepen.io/Chokcoco/pen/qJvVGy)、[**霓虹灯**](https://codepen.io/Chokcoco/pen/WaLdwX)、[**灯光阴影**](https://codepen.io/Chokcoco/pen/ReOgvq)
- 兼容：[box-shadow](https://caniuse.com/#search=box-shadow)、[filter](https://caniuse.com/#search=filter)、[text-shadow](https://caniuse.com/#search=text-shadow)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/BaBLqYo)

![在线演示](https://yangzw.vip/static/article/css-skill/%E4%BD%BF%E7%94%A8box-shadow%E6%8F%8F%E7%BB%98%E5%8D%95%E4%BE%A7%E6%8A%95%E5%BD%B1.png)

##### 使用filter描绘头像彩色阴影

- 要点：通过`filter:blur() brightness() opacity()`模拟阴影效果
- 场景：**头像阴影**
- 兼容：[filter](https://caniuse.com/#search=filter)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/GRKjYap)

![在线演示](https://yangzw.vip/static/article/css-skill/%E4%BD%BF%E7%94%A8filter%E6%8F%8F%E7%BB%98%E5%A4%B4%E5%83%8F%E5%BD%A9%E8%89%B2%E9%98%B4%E5%BD%B1.png)

##### 使用box-shadow裁剪图像

- 要点：通过`box-shadow`模拟蒙层实现中间镂空
- 场景：**图片裁剪**、**新手引导**、**背景镂空**、**投射定位**
- 兼容：[box-shadow](https://caniuse.com/#search=box-shadow)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/zYONxRG)

![在线演示](https://yangzw.vip/static/article/css-skill/%E4%BD%BF%E7%94%A8box-shadow%E8%A3%81%E5%89%AA%E5%9B%BE%E5%83%8F.png)

##### 使用outline描绘内边框

- 要点：通过`outline`设置轮廓进行描边，可设置`outline-offset`设置内描边
- 场景：**内描边**、**外描边**
- 兼容：[outline](https://caniuse.com/#search=outline)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/pozeVyL)

![在线演示](https://yangzw.vip/static/article/css-skill/%E4%BD%BF%E7%94%A8outline%E6%8F%8F%E7%BB%98%E5%86%85%E8%BE%B9%E6%A1%86.png)

### Component Skill

##### 迭代计数器

- 要点：累加选项单位的计数器
- 场景：**章节目录**、**选项计数器**、[**加法计数器**](https://codepen.io/CSSKing/pen/vEeMey)
- 兼容：[counters](https://caniuse.com/#search=counters)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/rXqRPo)

![在线演示](https://yangzw.vip/static/article/css-skill/%E8%BF%AD%E4%BB%A3%E8%AE%A1%E6%95%B0%E5%99%A8.gif)

##### 下划线跟随导航栏

- 要点：下划线跟随鼠标移动的导航栏
- 场景：**动态导航栏**
- 兼容：[+](https://caniuse.com/#search=+)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/eYOJbNv)

![在线演示](https://yangzw.vip/static/article/css-skill/%E4%B8%8B%E5%88%92%E7%BA%BF%E8%B7%9F%E9%9A%8F%E5%AF%BC%E8%88%AA%E6%A0%8F.gif)

##### 气泡背景墙

- 要点：不间断冒出气泡的背景墙
- 场景：**动态背景**
- 兼容：[animation](https://www.caniuse.com/#search=animation)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/GRKoPdK)

![在线演示](https://yangzw.vip/static/article/css-skill/%E6%B0%94%E6%B3%A1%E8%83%8C%E6%99%AF%E5%A2%99.gif)

##### 滚动指示器

- 要点：提示滚动进度的指示器
- 场景：[**阅读进度**](https://codepen.io/MadeByMike/pen/ZOrEmr)
- 兼容：[calc()](https://caniuse.com/#search=calc())、[gradient](https://caniuse.com/#search=gradient)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/ExYPMog)

![在线演示](https://yangzw.vip/static/article/css-skill/%E6%BB%9A%E5%8A%A8%E6%8C%87%E7%A4%BA%E5%99%A8.gif)

##### 故障文本

- 要点：显示器故障形式的文本
- 场景：**错误提示**
- 兼容：[data-*](https://caniuse.com/#search=data-)、[attr()](https://caniuse.com/#search=attr())、[animation](https://www.caniuse.com/#search=animation)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/xxKZNYv)

![在线演示](https://yangzw.vip/static/article/css-skill/%E6%95%85%E9%9A%9C%E6%96%87%E6%9C%AC.gif)

##### 换色器

- 要点：通过拾色器改变图像色相的换色器
- 场景：**图片色彩变换**
- 兼容：[mix-blend-mode](https://www.caniuse.com/#search=mix-blend-mode)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/vYBLqBm)

![在线演示](https://yangzw.vip/static/article/css-skill/%E6%8D%A2%E8%89%B2%E5%99%A8.gif)

##### 状态悬浮球

- 要点：展示当前状态的悬浮球
- 场景：**状态动态显示**、**波浪动画**
- 兼容：[gradient](https://caniuse.com/#search=gradient)、[animation](https://www.caniuse.com/#search=animation)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/WNewOxa)

![在线演示](https://yangzw.vip/static/article/css-skill/%E7%8A%B6%E6%80%81%E6%82%AC%E6%B5%AE%E7%90%83.gif)

##### 粘粘球

- 要点：相交粘粘效果的双球回弹运动
- 场景：[**粘粘动画**](https://codepen.io/Chokcoco/pen/QqWBqV)
- 兼容：[filter](https://caniuse.com/#search=filter)、[animation](https://www.caniuse.com/#search=animation)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/zYOqdBz)

![在线演示](https://yangzw.vip/static/article/css-skill/%E7%B2%98%E7%B2%98%E7%90%83.gif)

##### 商城票券

- 要点：边缘带孔和中间折痕的票劵
- 场景：**电影票**、**代金券**、**消费卡**
- 兼容：[gradient](https://caniuse.com/#search=gradient)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/rNBeYza)

![在线演示](https://yangzw.vip/static/article/css-skill/%E5%95%86%E5%9F%8E%E7%A5%A8%E5%88%B8.png)

##### 倒影加载条

- 要点：带有渐变倒影的加载条
- 场景：**加载提示**
- 兼容：[box-reflect](https://caniuse.com/#search=box-reflect)、[animation](https://www.caniuse.com/#search=animation)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/GRKZzpg)

![在线演示](https://yangzw.vip/static/article/css-skill/%E5%80%92%E5%BD%B1%E5%8A%A0%E8%BD%BD%E6%9D%A1.gif)

##### 三维立方体

- 要点：三维建模的立方体
- 场景：**三维建模**
- 兼容：[transform](https://caniuse.com/#search=transform)、[perspective](https://caniuse.com/#search=perspective)、[transform-style](https://caniuse.com/#search=transform-style)、[animation](https://www.caniuse.com/#search=animation)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/PoYNgXY)

![在线演示](https://yangzw.vip/static/article/css-skill/%E4%B8%89%E7%BB%B4%E7%AB%8B%E6%96%B9%E4%BD%93.gif)

##### 动态边框

- 要点：鼠标悬浮时动态渐变显示的边框
- 场景：**悬浮按钮**、**边框动画**
- 兼容：[gradient](https://caniuse.com/#search=gradient)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/qBWZPvE)

![在线演示](https://yangzw.vip/static/article/css-skill/%E5%8A%A8%E6%80%81%E8%BE%B9%E6%A1%86.gif)

##### 标签页

- 要点：可切换内容的标签页
- 场景：**内容切换**
- 兼容：[scroll-behavior](https://caniuse.com/#search=scroll-behavior)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/JjPRjMd)

![在线演示](https://yangzw.vip/static/article/css-skill/%E6%A0%87%E7%AD%BE%E9%A1%B5.gif)

##### 标签导航栏

- 要点：可切换内容的导航栏
- 场景：**页面切换**
- 兼容：[~](https://caniuse.com/#search=~)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/oNvzoZg)

![在线演示](https://yangzw.vip/static/article/css-skill/%E6%A0%87%E7%AD%BE%E5%AF%BC%E8%88%AA%E6%A0%8F.gif)

##### 折叠面板

- 要点：可折叠内容的面板
- 场景：**隐藏式子导航栏**
- 兼容：[~](https://caniuse.com/#search=~)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/NWKRMjo)

![在线演示](https://yangzw.vip/static/article/css-skill/%E6%8A%98%E5%8F%A0%E9%9D%A2%E6%9D%BF.gif)

##### 星级评分

- 要点：点击星星进行评分的按钮
- 场景：**评分**
- 兼容：[~](https://caniuse.com/#search=~)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/MWgjGMj)

![在线演示](https://yangzw.vip/static/article/css-skill/%E6%98%9F%E7%BA%A7%E8%AF%84%E5%88%86.gif)

##### 加载指示器

- 要点：变换`...`长度的加载提示
- 场景：**加载提示**
- 兼容：[animation](https://www.caniuse.com/#search=animation)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/wvwoRbN)

![在线演示](https://yangzw.vip/static/article/css-skill/%E5%8A%A0%E8%BD%BD%E6%8C%87%E7%A4%BA%E5%99%A8.gif)

##### 自适应相册

- 要点：自适应照片数量的相册
- 场景：**九宫格相册**、**微信相册**、**图集**
- 兼容：[:only-child](https://caniuse.com/#search=%3Aonly-child)、[:first-child](https://caniuse.com/#search=%3Afirst-child)、[:nth-child()](https://caniuse.com/#search=%3Anth-child())、[:nth-last-child()](https://caniuse.com/#search=%3Anth-last-child())、[~](https://caniuse.com/#search=~)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/pozNGyj)

![在线演示](https://yangzw.vip/static/article/css-skill/%E8%87%AA%E9%80%82%E5%BA%94%E7%9B%B8%E5%86%8C.gif)

##### 圆角进度条

- 要点：单一颜色的圆角进度条
- 场景：**进度条**
- 兼容：[gradient](https://caniuse.com/#search=gradient)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/jONBxaK)

![在线演示](https://yangzw.vip/static/article/css-skill/%E5%9C%86%E8%A7%92%E8%BF%9B%E5%BA%A6%E6%9D%A1.png)

##### 螺纹进度条

- 要点：渐变螺纹的进度条
- 场景：**进度条**、**加载动画**
- 兼容：[gradient](https://caniuse.com/#search=gradient)、[animation](https://www.caniuse.com/#search=animation)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/GRKrJJX)

![在线演示](https://yangzw.vip/static/article/css-skill/%E8%9E%BA%E7%BA%B9%E8%BF%9B%E5%BA%A6%E6%9D%A1.gif)

##### 立体按钮

- 要点：点击呈现按下状态的按钮
- 场景：**按钮点击**
- 兼容：[box-shadow](https://caniuse.com/#search=box-shadow)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/PoYpaLL)

![在线演示](https://yangzw.vip/static/article/css-skill/%E7%AB%8B%E4%BD%93%E6%8C%89%E9%92%AE.gif)

##### 混沌加载圈

- 要点：带混沌虚影的加载圈
- 场景：**加载提示**
- 兼容：[filter](https://caniuse.com/#search=filter)、[animation](https://www.caniuse.com/#search=animation)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/aboWbqG)

![在线演示](https://yangzw.vip/static/article/css-skill/%E6%B7%B7%E6%B2%8C%E5%8A%A0%E8%BD%BD%E5%9C%88.gif)

##### 蛇形边框

- 要点：蛇形运动的边框
- 场景：**蛇形动画**
- 兼容：[clip](https://caniuse.com/#search=clip)、[animation](https://www.caniuse.com/#search=animation)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/GRKmgZZ)

![在线演示](https://yangzw.vip/static/article/css-skill/%E8%9B%87%E5%BD%A2%E8%BE%B9%E6%A1%86.gif)

##### 自动打字

- 要点：逐个字符自动打印出来的文字
- 场景：**代码演示**、**文字输入动画**
- 兼容：[ch](https://caniuse.com/#search=ch)、[animation](https://www.caniuse.com/#search=animation)
- 代码：[在线演示](https://codepen.io/JowayYoung/pen/ZEzKQEx)

![在线演示](https://yangzw.vip/static/article/css-skill/%E8%87%AA%E5%8A%A8%E6%89%93%E5%AD%97.gif)

###  

## Reference

https://yangzw.vip/blog