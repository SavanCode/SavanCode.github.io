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

### import -@import

```scss
@import "reset"; // 重設css
@import "variables"; // 所有變數都存放於此
@import "mixins"; // 所有mixin相關的scss
```

### extend - @extend

有很多 css 样式需要复用，就可以用继承，语法是 @extend，可以在继承的 css 前加入 **%** 符號，只有被继承的 css 会被编译，原 extend 语法不會被编译，% 表佔位符，所以套用 %继承的样式位置在文件中會往前提升， 继承同一個 css 的 class，编译出的內容会放在一起。

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

```
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

### 报错 sass-loader@11.0.1" has incorrect peer dependency "webpack@^5.0.0".

Similar to what @KostDM said, in my case it seems like sass-loader@11.0.0 doesn't work with vue@2.6.12.

I installed sass-loader@10.1.1 and it worked like a charm again.

解决: yarn add sass-loader@^10.1.1

[来源](https://stackoverflow.com/questions/66082397/typeerror-this-getoptions-is-not-a-function)

## Reference

[SCSS 15分鐘入門](https://eddychang.me/blog/others/91-scss-15-mins.html)
[從 CSS 到 SASS (SCSS) 超入門觀念引導](https://dotblogs.com.tw/leo_codespace/2018/06/25/174235)
[SCSS語法 — @import、@media、@extend](https://dotblogs.com.tw/brooke/2017/12/20/095527)
[Day23 學習 scss 時的那些大小事](https://ithelp.ithome.com.tw/articles/10208530?sc=iThelpR)