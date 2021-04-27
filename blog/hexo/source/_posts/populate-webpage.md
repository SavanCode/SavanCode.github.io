---
title: populate webpage 浏览器渲染机制
top: false
cover: false
toc: true
mathjax: true
date: 2021-04-27 16:47:04
password:
summary: 浏览器渲染机制
tags: web
categories: web
---

## 浏览器渲染页面的过程

1. 参考文章：[从输入url到页面加载完成发生了什么详解](https://www.cnblogs.com/liutianzeng/p/10456865.html)

   这是一道经典的面试题，没有一个标准的答案，它涉及很多的知识点，面试官会通过这道题了解你对哪一方面的知识比较擅长，然后继续追问看看你的掌握程度。从前端的角度出发，以下是首先必须达到的几个基本点。

   1、浏览器的地址栏输入URL并按下回车。

   2、浏览器查找当前URL是否存在缓存，并比较缓存是否过期。

   3、DNS解析URL对应的IP。

   4、根据IP建立TCP连接。（三次握手）

   5、浏览器发出get请求。

   6、服务器处理请求，浏览器接收http响应。

   7、渲染页面，构建DOM树。

   8、关闭TCP连接（四次挥手）。

## 客户端渲染- 图很重要

![](populate-webpage/image-20210427182847368.png)

- `HTML`,`SVG`,`XHTML`，解析生成`DOM`树。 （ **解码（encoding）**+ **预解析（pre-parsing）**+ **符号化（Tokenization）**+ **构建树（tree construction）**）
- `CSS`解析生成`CSS`规则树。
- `JavaScript`用来操作`DOM API`和`CSSOM API`，生成`DOM Tree`和`CSSOM API`。

解析完成后，浏览器会通过已经解析好的`DOM Tree` 和 `CSS`规则树来构造 `Rendering` `Tree`。

- `Rendering Tree` 渲染树并不等同于`DOM`树，因为一些像`Header`或`display:none`的东西就没必要放在渲染树中了。
- `CSS` 的 `Rule Tree`主要是为了完成匹配并把`CSS Rule`附加上`Rendering`。
- `Tree`上的每个`Element`。也就是`DOM`结点，即`Frame`。然后，计算每个`Frame`（也就是每个`Element`）的位置，这又叫`layout`和`reflow`过程。
- 最后通过调用操作系统`Native GUI`的`API`绘制。

![](populate-webpage/image-20210427165022542.png)

![](populate-webpage/image-20210427171838995.png)

**两个图结合着看！！！！**

[细节的描述 如何构建tree](https://imweb.io/topic/56841c864c44bcc56092e3fa)

## **渲染阻塞**

当遇到一个`script`标签时，DOM 构建会被暂停，直至脚本完成执行，然后继续构建 DOM 树。

但如果 JS 依赖 CSS 样式，而它还没有被下载和构建时，浏览器就会延迟脚本执行，直至 CSS Rules 被构建。

所有我们知道：

- CSS 会阻塞 JS 执行
- JS 会阻塞后面的 DOM 解析

为了避免这种情况，应该以下原则：

- CSS 资源排在 JavaScript 资源前面
- JS 放在 HTML 最底部，也就是 `</body>`前

另外，如果要改变阻塞模式，可以使用 defer 与 async，详见：[这篇文章](https://github.com/xiaoyu2er/blog/issues/8)

## 渲染

渲染的流程基本上如下（黄色的四个步骤）：

> - 计算CSS样式
> - 构建Render Tree
> - Layout – 定位坐标和大小，是否换行，各种position, overflow, z-index属性 ……
> - 正式开画

![](populate-webpage/image-20210427170046323.png)

上图流程中有很多连接线，这表示了Javascript动态修改了DOM属性或是CSS属会导致重新Layout，有些改变不会，就是那些指到天上的箭头，比如，修改后的CSS rule没有被匹配到，等。

###  **回流(reflow)**， **重绘(repaint)**

- **Repaint** ——屏幕的一部分要重画，比如某个CSS的背景色变了。但是元素的几何尺寸没有变。
- **Reflow** ——意味着元件的几何尺寸变了，我们需要重新验证并计算Render Tree。是Render Tree的一部分或全部发生了变化。这就是Reflow，或是Layout。（HTML使用的是flow based layout，也就是流式布局，所以，如果某元件的几何尺寸发生了变化，需要重新布局，也就叫reflow）reflow 会从<html>这个root frame开始递归往下，依次计算所有的结点几何尺寸和位置，在reflow过程中，可能会增加一些frame，比如一个文本字符串必需被包装起来。

- **`display:none` 会触发回流，而 `visibility:hidden` 只会触发重绘。**

**Reflow的成本比Repaint的成本高得多的多。**reflow例子

- 当你增加、删除、修改DOM结点时，会导致Reflow或Repaint
- 当你移动DOM的位置，或是搞个动画的时候。
- 当你修改CSS样式的时候。
- 当你Resize窗口的时候（移动端没有这个问题），或是滚动的时候。
- 当你修改网页的默认字体时。
- 注：display:none会触发reflow，而visibility:hidden只会触发repaint，因为没有发现位置变化。

```css
var bstyle = document.body.style; // cache

bstyle.padding = "20px"; // reflow, repaint
bstyle.border = "10px solid red"; //  再一次的 reflow 和 repaint

bstyle.color = "blue"; // repaint
bstyle.backgroundColor = "#fad"; // repaint

bstyle.fontSize = "2em"; // reflow, repaint

// new DOM element - reflow, repaint
document.body.appendChild(document.createTextNode('dude!'));
```

reflow有如下的几个原因：

> - Initial。网页初始化的时候。
> - Incremental。一些Javascript在操作DOM Tree时。
> - Resize。其些元件的尺寸变了。
> - StyleChange。如果CSS的属性发生变化了。
> - Dirty。几个Incremental的reflow发生在同一个frame的子树上。

### [减少reflow / repaint](https://segmentfault.com/a/1190000016990089)

下面是一些Best Practices：

1）不要一条一条地修改DOM的样式。与其这样，还不如预先定义好css的class，然后修改DOM的className（批量处理 或者用css text） 主语DOM的节点位置，太接近root 成本高

2）批量修改多个DOM

- 隐藏元素，进行修改后，然后再显示该元素

  ```js
  let ul = document.querySelector('#mylist');
  ul.style.display = 'none';
  appendNode(ul, data);
  ul.style.display = 'block';
  ```

  这种方法造成俩次重排，分别是控制元素的显示与隐藏。对于复杂的，数量巨大的节点段落可以  考虑这种方法。为啥使用display属性呢，因为display为none的时候，元素就不在文档流了，还不熟悉的老铁，手动Google一下，display:none, opacity: 0, visibility: hidden的区别

- 使用文档片段创建一个子树，然后再拷贝到文档中

  ```js
  let fragment = document.createDocumentFragment();
  appendNode(fragment, data);
  ul.appendChild(fragment);
  ```
  文档片段是一个轻量级的document对象，它设计的目的就是用于更新，移动节点之类的任务，而且文档片段还有一个好处就是，当向一个节点添加文档片段时，添加的是文档片段的子节点群，自身不会被添加进去。不同于第一种方法，这个方法并不会使元素短暂消失造成逻辑问题。上面这个例子，只在添加文档片段的时候涉及到了一次重排

- 将原始元素拷贝到一个独立的节点中，操作这个节点，然后覆盖原始元素

  ```js
  et old = document.querySelector('#mylist');
  let clone = old.cloneNode(true);
  appendNode(clone, data);
  old.parentNode.replaceChild(clone, old);
  ```
  可以看到这种方法也是只有一次重排。总的来说，使用文档片段，可以操作更少的DOM（对比使用克隆节点），最小化重排重绘次数。


3）为动画的HTML元件使用fixed或absoult的position，那么修改他们的CSS是不会reflow的。

4）千万不要使用table布局。因为可能很小的一个小改动会造成整个table的重新布局。

5）transform替代top 用visibility 替代display：none

## Reference

[浏览器的工作原理](https://developer.mozilla.org/zh-CN/docs/Web/Performance/How_browsers_work#%E6%B8%B2%E6%9F%93)

[浏览器渲染原理](https://imweb.io/topic/56841c864c44bcc56092e3fa)

[前端性能优化之重排和重绘](https://segmentfault.com/a/1190000016990089)

[深入解析你不知道的 EventLoop 和浏览器渲染、帧动画、空闲回调（动图演示）](https://juejin.cn/post/6844904165462769678#heading-2)

## 推荐阅读

[「前端性能」避免回流和重绘的必要性](https://juejin.cn/post/6953029989306466317)