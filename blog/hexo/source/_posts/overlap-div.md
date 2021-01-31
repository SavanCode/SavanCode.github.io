---
title: overlap div - Overlap Element
top: false
cover: false
toc: true
mathjax: true
date: 2020-11-21 20:44:49
password:
summary: Overlap Element
tags:  css&html
categories: Front-end
---

## 1. Position Property

```css
.child { 
  position: absolute;
  top: 0;
  left: 0;
}
```

![](overlap-div/1605966338959.png)

```css
.child { 
  position: absolute;
  top: 0; 
}

.child-1 {
  left: 0;
}

.child-2 {
  left: 150px;
}

.parent {
  position: relative;
}
```



![](overlap-div/1605967027232.png)



## 2. Using CSS Grid

```css
.parent {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 150px 1fr;
}

.child {
  grid-area: 1 / 1 / 2 / 2;
}
```



![](overlap-div/1605966839123.png)



```css
.parent {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 150px 1fr;
}

.child {
  grid-area: 1 / 1 / 2 / 2;
}
 
.child-2 {
  margin-left: 200px;
}
```

![](overlap-div/1605966795562.png)