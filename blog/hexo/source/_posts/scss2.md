---
title: scss进阶
top: false
cover: false
toc: true
mathjax: true
date: 2021-02-24 13:51:39
password:
summary:
tags: [css&html,scss,sass]
categories: css&html
---

## 利用mixin样式做出模板

###  文字

```scss
/*文本格式化，超出范围，显示省略号*/
@mixin text-overflow($width:100%,$line:1) {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display:-webkit-box;
  -weblit-box-orient:vertical;
  width: $width;
  -weblit-line-clamp:$line;
}
```

### flex

```scss
/**
 *默认flex样式水平，垂直居中
 *	1、$flex-wrap: null -- 清空所有对齐样式
 *	2、$direction:... -- 水平排/垂直排
 *	3、...
 */
@mixin flex-center($direction:row,$justify:center,$align:center,$flex-wrap: null) {
  display: flex;
  @if ($flex-wrap != null) {
    flex-wrap: $flex-wrap;
  }
  @if ($direction!=null) {
    flex-direction: $direction;
  }
  @if ($justify!=null) {
    justify-content: $justify;
  }
  @if ($align!=null) {
    align-items: $align;
  }
```



## scss/sass Map

### 基本语法 map-get

```scss
//创建map
$map: (
  key: value,
  nextkey: nextvalue
);
//提取数据 并且使用
.element:before {
  content: map-get($map, key); // content: value
}
```

运用sass的时候，注意要error handle！！

```scss
$map: (
  key: value,
  nextkey: nextvalue
);

.element {
  @if map-has-key($map, key){
    content: 'Map has this key.';
  } @else {
    content: 'Map has not this key.'
  }
}
```

### 合并Maps

```scss
$colors: (
  light: #ccc,
  dark: #000
);

$brand-colors: (
  main: red,
  alternative: blue
);

// 合并maps
$merged: map-merge($colors, $brand-colors);

.element {
  content: map-get($merged, alternative);
}
```

### 基本Map函数

- 1.`map-get($map,$key)`：取出`$map`裡指定的`$key`，將value取出來。
- 2.`map-merge($map1,$map2)`：将两个`$map`合并起來。
- 3.`map-remove($map,$key)`：从Map裡面刪除一個`$key`。
- 4.`map-keys($map)`：取出所有的`$key`。
- 5.`map-values($map)`：取出所有的value。
- 6.`map-has-key($map,$key)`：浏览里面是否有`$key`值，有則回传true，沒有便回传false。

### 实践练习 - 自动生成多个

这里刚开始会觉得很神奇，这里的`$color`始会自动的匹配到`$button`中的颜色对象 

```scss
// _m-buttons.scss
$buttons: (
  error: (#d82d2d, #666),
  success: (#52bf4a, #fff),
  warning: (#c23435, #fff)
);

.m-button {
  display: inling-block;
  padding: .5em;
  background: #ccc;
  color: #666;

  @each $name, $colors in $buttons {
    $bgcolor: nth($colors, 1);
    $fontcolor: nth($colors, 2);

    &--#{$name} {
      background-color: $bgcolor;
      color: $fontcolor;
    }
  }
}
```

```css
.m-button {
  display: inline-block;
  padding: .5em;
  background: #ccc;
  color: #666;
}

.m-button--error {
  background-color: #d82d2d;
  color: #666;
}

.m-button--success {
  background-color: #52bf4a;
  color: #fff;
}

.m-button--warning {
  background-color: #c23435;
  color: #fff;
}
```

### 实践练习 - 灵活定义变量

这里的实际例子，主要是对于定量的定义需要合理的打包成对象

```scss
// Scheme of colors
$colorscheme: (
  gray: (
    base: #ccc,
    light: #f2f2f2,
    dark: #666
  ),
  brown: (
    base: #ab906b,
    light: #ecdac3,
    dark: #5e421c
  )
);

@function setcolor($scheme, $tone: base) {
  @return map-get(map-get($colorscheme, $scheme), $tone);
}
```

```css
.element {
  color: setcolor(brown);
}
.element--light {
  color: setcolor(brown, light);
}
/*编译*/
.element {
  color: #ab906b;
}
.element--light {
  color: #ecdac3;
}
```

demo2 是参照这个[教程](https://www.toptal.com/sass/theming-scss-tutorial)

## Reference

[【译】介绍Sass Maps：用法跟例子](https://aotu.io/notes/2015/12/09/an-introduction-to-sass-maps/index.html)