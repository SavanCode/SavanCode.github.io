---
title: css question&solution
top: false
cover: false
toc: true
mathjax: true
date: 2020-12-01 16:10:20
password:
summary:
tags:  css&html
categories:
---

## 为什么height:100%不生效

对于`height`属性，如果父元素`height`为`auto`，只要子元素在文档流中（即`position`不等于`fixed`或者`absolute`），其百分比值完全就被忽略了。

```HTML
<head>
  <title>黑色主题</title>
  <style>
    .box {
      width: 100%; // 这是多余的
      height: 100%; // 这是无效的
      background: #000;
    }
  </style>
</head>
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
</head>
<body>
  <div class="box">
  </div>
</body>
```

