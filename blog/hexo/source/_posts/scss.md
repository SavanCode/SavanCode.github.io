---
title: scss使用以及踩坑
top: false
cover: false
toc: true
mathjax: true
date: 2021-02-20 11:37:25
password:
summary: scss
tags: scss
categories: scss
---

## 基本了解

SASS是成熟，稳定，强大的 **CSS预处理器** ，而 **SCSS** 是SASS3版本当中引入的新语法特性，完全兼容CSS3的同时继承了CSS强大的动态功能。(官网说了很多..um...总之**SCSS 是 Sass 的其中一种语法规则而已，即 SCSS 是 Sass 的子集**)

之前的笔记也写过另外一个css预处理器 -Less - 看这里 :arrow_forward:

## 安装

### 基于webpack (Vue)

如果是在 vue-cli 项目中，可以使用以下命令安装

```sh
npm install node-sass --save-dev
npm install sass-loader --save-dev
或者
yarn add sass-loader node-sass --dev
```

vue-cli生成的项目，已经默认加入了处理sass的loader
只需要在需要的地方加入`lang=scss`即可

```
<style lang='scss' scope>
...
</style>
```

### 是基于webpack

按照[官网教程](https://sass-lang.com/install)，手动把 `scss` 编译成 `css` 文件，然后自己引入。

## 文件生成

在屏幕上显示.scss文件转化的css代码。（假设文件名为test。）

```bash
sass test.scss
```

如果要将显示结果保存成文件，后面再跟一个.css文件名。

```bash
sass test.scss test.css
```

## SASS监听文件/目录

生产环境当中，一般使用最后一个选项。

```bash
sass --style compressed test.sass test.css
```

你也可以让SASS监听某个文件或目录，一旦源文件有变动，就自动生成编译后的版本 - 监听 `app/sass` 目录下所有文件的变动，并 编译 CSS 到 `public/stylesheets` 目录下。

```bash
// watch a file
sass --watch input.scss:output.css
// watch a directory
sass --watch app/sass:public/stylesheets
```

## 语法

### 变量- **$**

```scss
// _variables.scss
$basic-font-size: 16px;
$primary-color:#fa0;

// layout.scss
body{
    font-size:$basic-font-size;
}

// layout.css
body {
  font-size: 16px;
}
```

### 计算

```scss
div {
    margin: 12px * 2;
    top: 50px + 100px;
    right: $var * 10%;
}

article[role="main"] {
  float: left;
  width: 600px / 960px * 100%;
}

aside[role="complementary"] {
  float: right;
  width: 300px / 960px * 100%;
}
```

### 条件判断

```scss
@if lightness($color) > 30% {
　　background-color: #000;
} @else {
　　background-color: #fff;
}
```

### 遍历写法

```scss
// 生成 .f12 {font-size: 12px} .... .f30 {font-size: 30px}
@for $i from 12 through 30 {
  .f#{$i} {
    font-size: #{$i}px;
  }
}

@each $member in a, b, c, d {
　　.#{$member} {
　　　　background-image: url("/image/#{$member}.jpg");
　　}
}
// 在列表里面用下标取数据
$colors: #7FA0FF, #98BDFF, #A1D2B6, #FFDB46, #FFB63E, #F77C7A, #696CC9, #787EF3;
@for $i from 1 through 8 {
  .label:nth-child(#{$i}):before {
      background: nth($pieColors, $i);
  }
}
```

### 嵌套

```scss
div {
　　h1 {
　　　　color:red;
　　}
}
//属性也可嵌套(用的较少)
div {
　　border: {
　　　　color: red;
　　}
}
//在嵌套的代码块内，可以使用&引用父元素。比如a:hover伪类，可以写成：
a {
　　&:hover { color: #f00; }
}
```

### import  引入-@import

```scss
@import "reset"; // 重設css
@import "variables"; // 所有變數都存放於此
@import "mixins"; // 所有mixin相關的scss

// 本地文件
@import "filepath";
// 第三方文件
@import url("file's url")
```

### extend  继承- @extend

有很多 css 样式需要复用，就可以用继承，语法是 @extend，可以在继承的 css 前加入 **%** 符號，只有被继承的 css 会被编译，原 extend 语法不會被编译，% 表佔位符，所以套用 %继承的样式位置在文件中會往前提升， 继承同一個 css 的 class，编译出的內容会放在一起。

```scss
.super {
    color: red;
}
.sub {
    @extend .super;
    font-size: 12px;
}
```

```scss
%clearfix{ // 用%(佔位符)不會被scss编译 class的(.)不用写 但@extend时也要加上% 
    &:after{
        content: '';
        display: table;
        clear: both;
    }
}

// 垂直居中
%vertical-center{
    position: relative;
    top:50%; // 外层空間向下移50%
    transform: translateY(-50%);//内层空間往上移50%
}

%_d-b{
    display: block;
}

.box{
    @extend %clearfix; // class的(.)不用写
}

._rwdimg{
    @extend %_d-b;
    max-width:100%;
    height:auto;
    margin:0 auto;
}
```

#### 辅助extend的!optional

如果故意 extend 不存在的样式名称，则会编译出错， 加上「!optional」修饰词，以表示当 extend 不存在样式名称时候，就不会做 render。

```scss
.notice {
    color: blue;
    font-weight: bold;
    font-size: 2em;
}

.important {
    @extend .notice2 !optional;
}
```

####  @extend in @media

在 @media 范围里面使用  @extend 呼叫指定样式名称时候，该样式名称不能放在 @media 范围之外，否则会出错， 应该把样式名称放在 @media 范围里面才行。

```scss
// layout.scss
@media screen and (max-width:960px){
    // 用 % 版本會出錯 因為本身不會被編譯
    //  %vertical-center{
    //     position: relative;
    //     top:50%;
    //     transform: translateY(-50%);/
    // }
    .vertical-center{
        position: relative;
        top:50%; 
        transform: translateY(-50%);
    }
    .box{
        @extend .vertical-center;
    }
}

// layout.css
@media screen and (max-width: 960px) {
  .vertical-center, .box {
    position: relative;
    top: 50%;
    -webkit-transform: translateY(-50%);
            transform: translateY(-50%);
  }
}
```

### 内置函数

```scss
// 如颜色的
lighten(#cc3, 10%) // #d6d65c
darken(#cc3, 10%) // #a3a329
grayscale(#cc3) // #808080
complement(#cc3) // #33c
```

### 内建函数- @function

```scss
// _variables.scss
$basic-font-size:16px;
$primary-color:#fa0;

// _function.scss 或是 _mixins.scss
@function toRem($px){
    @return ($px / basic-font-size) * 1rem;
}

// layout.scss
@import "helpers/variables";
@import "mixins/mixins";

h1{
    font-size : toRem(32px); 
}
.btn{
    background-color: $primary-color;
    &:hover{
        background-color: darken($primary-color, 15%); 
    }
}
s
//layout.css
h1{
    font-size : 2rem;// 转换单位px->rem
}
.btn {
    background-color: #fa0;
}
.btn:hover {
    background-color: #b37700; // hover颜色加深15%
}
```



### 混用 (Mixin) -@mixin

混用-总是混的( ╯□╰ )

> **Mixin 跟 extend 最大的不同** →
> Mixin 是产生多个样式；extend 是将样式全部集中管理。

```scss
// _mixins.scss
@mixin svg-icon($icon, $width, $height){
    background: url("images/#{$icon}.png");
    background:none, url("images/#{$icon}.svg");
    // ie8以下不支持 會跑上面的，新浏览器都可以支持高像素的svg
    width: $width;
    height: $height;
}

// _layout.scss
.icon-youtube{
    @include svg-icon('icon',120px,120px)
}

// _layout.css
.icon-youtube {
    background: url("images/icon.png");
    background: none, url("images/icon.svg");
    width: 120px;
    height: 120px;
}
```

#### 搭配 media

```scss
// mixins.scss
// content
@mixin mobile{
    @media screen and (max-width:767px) {
        @content;
    }
}

// layout.scss
.container{
    @include mobile{
        background: #fff;
    }
}

//layout.css
@media screen and (max-width: 767px) {
    .container {
        background: #fff;
    }
}
```

## 推荐工具

vscode 中 [Live Sass Compiler](https://github.com/ritwickdey/vscode-live-sass-compiler)

!!写完scss 直接回生成css 但是记得点击右下方的**watch**!!!

![](scss/image-20210223202607881.png)

## Vue scss 踩坑

 这里实践写的是 vue+element的admin

### 报错1 TypeError

```
TypeError [ERR_INVALID_ARG_TYPE]: The "path" argument must be of type string.
```

### 报错2   UnhandledPromiseRejectionWarning

```
UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict`
```

版本问题！！！这真的是 /(ㄒoㄒ)/~~ （下面是7.3.1 练习的时候用的是7.3.0）

```sh
npm install sass-loader@7.3.1 --save-dev
npm install --save-dev node-sass
```



### 报错 sass-loader@11.0.1" has incorrect peer dependency "webpack@^5.0.0".

Similar to what @KostDM said, in my case it seems like sass-loader@11.0.0 doesn't work with vue@2.6.12.

I installed sass-loader@10.1.1 and it worked like a charm again.

解决: yarn add sass-loader@^10.1.1

[来源](https://stackoverflow.com/questions/66082397/typeerror-this-getoptions-is-not-a-function)

## Reference

[sass的官方文档](https://www.sasscss.com/documentation)

[Sass Basics](https://www.sasscss.com/guide)

[sass W3School](https://www.w3schools.com/sass/)