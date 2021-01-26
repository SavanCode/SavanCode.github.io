---
title: Text css
top: false
cover: false
toc: true
mathjax: true
date: 2020-11-12 20:49:36
password:
summary:
tags:  css&html
categories:  Front-end
---

## 文字变化 

###  文字阴影：text-shadow

### 文字模糊： transition: 1s ; + text-shadow

transition的用法很多 只要是变更原先位置的基本都有关

### 文字方向： direction & unicode-bidi 

### word-spacing属性

- 设置元素内单词(以空格为判断是否为单词)之间的间距.
- 取值: px和em(正负值都可以).

### letter-spacing属性

- 设置元素内字母之间的间距.
- 取值: px和em(正负值都可以).

### text-transform属性

 设置元素内文本的大小写.

```
text-transform: capitalize(首字母大写)| uppercase(大写)| lowercase(小写) | none(默认效果);
```

### text-decoration属性

设置元素内文本的装饰

```
text-decoration: underline(下划线) overline(上划线) line-through(类似删除线)  none(默认效果).
```

### text-indent属性

text-indent 属性规定文本块中首行文本的缩进:

### 溢出的文字省略号显示

> 注意： display要是block

#### white-space强制一行显示

  设置或检索对象内文本显示方式。通常我们使用于强制一行显示内容.

```
/*默认处理方式*/
white-space:normal ；

white-space:nowrap ；
/*强制在同一行内显示所有文本，直到文本结束或者遭遇br标签对象才换行。*/
```

#### text-overflow 文字溢出

- 设置或检索是否使用一个省略标记（…）**表示对象内文本的溢出.**
- 首先强制一行内显示，再次和overflow属性 搭配使用.

```
/*不显示省略标记（...），而是简单的裁切 */
text-overflow : clip ；

/* 当对象内文本溢出时显示省略标记（...）*/
text-overflow：ellipsis ；
```
#### 文字显示三行

```css
.note_item text{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp:3;
    overflow: hidden;
    text-overflow:ellipsis;/*这行以上必要*/
    font-size:28rpx;
    color:#000000;
    line-height: 40rpx;
    word-break: break-all;/*选择*/
    word-wrap: break-word; 
	white-space: normal !important;
}
```

#### 文字显示单行

```css
.note2_item text{
    display: block;/*重要的*/
    overflow: hidden;
    white-space: nowrap;/* 换行不显示*/
    text-overflow:ellipsis;/*这行以上必要*/
    font-size:28rpx;
    color:#000000;
    line-height: 40rpx;
    height: 120rpx;
}
```

##### 其他例子

```css
text{
  display: inline-block; 
  width: 400rpx;
  border: 1rpx solid gray;
  margin: 30rpx 60rpx;
  display: -webkit-box ;
  overflow: hidden; /*隐藏溢出的文本  */
  text-overflow: ellipsis;
  word-break: break-all;/*自动换行*/
  -moz-box-orient: vertical; /*从上到下自动排列子元素*/
  -webkit-box-orient: vertical; 
  -webkit-line-clamp:2; /*显示的行数*/
}
```

> 将height设置为line-height的整数倍，防止超出的文字露出


## 文字居中-垂直

### `vertical-align: middle`

```
<style>
.va{vertical-align: middle;}
div{font-size: 12px;//更改了大小
margin: 20px auto;border: 1px dashed #000;text-align: center;}
.inline{display: inline;
font-size: 36px;//更改了大小
border: 1px dashed #000;}
</style>

<div>         
<span class="va inline">inline垂直居中</span>
    inline垂直居中
</div>
```

### line-height + height - 单行好用

当line-height等于height时，可以实现字体垂直居中

```
<style>
* { margin: 0;padding: 0;}
div{width: 300px;
height: 100px;//父类元素高度
margin: 20px auto;border: 1px dashed #000;text-align: center;}
.lh{font-size:24px;
line-height:100px; //目标垂直字体的行高
}
</style>

<div>         
 <span class="lh">inline垂直居中</span>
</div>
```

### 行内块级元素垂直居中+vertical-align：top

要求知道div width height大小

```
<style>
* { margin: 0;padding: 0;}
 div{width: 300px;height: 100px;margin: 20px auto;border: 1px dashed #000;text-align: center;}
.middle{display: inline-block;position:relative;
font-size:24px;line-height:24px;
top:50%;margin-top:-12px;
vertical-align:top; }
</style>

<div>         
<span class="middle">inline垂直居中</span>
</div>
```

拓展的多行文字居中垂直思路 ：https://blog.csdn.net/u014607184/article/details/51820508?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-1.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-1.control

## Reference

[官方文档](https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow)

[字体垂直居中的几种实现方法](https://blog.csdn.net/maomaolaoshi/article/details/77949617)

[css 文本和div垂直居中方法汇总](https://blog.csdn.net/u014607184/article/details/51820508?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-1.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-1.control)