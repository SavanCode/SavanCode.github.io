---
title: Layout difference-css
top: false
cover: false
toc: true
mathjax: true
date: 2020-11-14 14:00:40
password:
summary:
tags:  css&html
categories: Front-end
---

# 各类的布局优缺点：



## 使用display/float或position属性进行页面布局的缺点

专门写了一篇

## 多栏布局

  使用多栏布局可以将**一个元素中的内容分为两栏或多栏显示**，并且**确保各栏中内容底部对齐**

以上的各个属性，在**Firefox**浏览器中要添加前缀 “**-moz-**”;；在**Safair、chrome或Opera**浏览器中需要添加前缀 “**-webkit-**”; 在**IE**浏览器中，不需要添加浏览器供应商前缀；

## 盒布局

同样可以解决页面布局时底面不对齐的问题；

通过**box属性**来使用盒布局，在Firefox浏览器中，需要书写成：“**-moz-box**”，在Safari、Chrome、Opera浏览器中需要书写成：“**-webkit-box**”；

## **盒布局与多栏布局的区别：**

1. 使用多栏布局时，各个栏宽度必须是相等的，在指定每栏宽度时，只能为所有的栏指定一个统一的宽度，栏与栏之间的宽度不可能是不一样的；

2. 使用多栏布局，不可能具体指定什么栏中显示什么内容；

    因此，多栏布局适合用于在显示文章内容的时候，不适合安排整个网页中各个元素组成的网页结构。

## 弹性盒布局

只要使用**flex属性**就可以使盒布局变为弹性布局了，即，元素的高度与宽度具有自适应性；

**使用盒布局的时候，元素的高度与宽度具有自适应**；即，元素的高度与宽度根据排列方向的改变而改变；

当为**横向**时：宽度与元素中的内容相等，**高度等于容器高度**；

当为**纵向**时：高度为元素内容的高度，**宽度为容器的宽度**；

## 对多个元素使用flex属性

```css
#container{
	/* flex属性 变成弹性盒布局 */
    display: flex;
    border: solid 5px blue;
    /* 排列方向 */
    flex-direction:column;
    /* flex-direction:row; */
    width: 400px;
    height: 200px;
}
#text-a{
	/* 显示顺序 */
	order: 2;
	flex: 1;
	background-color: orange;
}
#text-b{
	order: 3;
	background-color: yellow;
	flex: 1;
}
#text-c{
	order: 1;
	flex: 2;
	background-color: limegreen;
}
#text-a, #text-b, #text-c{
	box-sizing: border-box;
	font-size: 1.5em;
	font-weight: bold;
}
```

**a、b、c三个div中的flex值分别为1,1,2，其实就是相当于把空白部分分成4份，a、b各占1份，c占2份；**