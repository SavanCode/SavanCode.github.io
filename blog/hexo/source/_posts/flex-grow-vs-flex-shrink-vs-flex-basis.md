---
title: flex-grow vs flex-shrink vs flex-basis
top: false
cover: false
toc: true
mathjax: true
date: 2020-11-13 18:59:40
password:
summary:
tags:  css&html
categories:
---

 **flex-basis**  ，主要成分，所以他和width放在一起时,肯定把width干掉，basis遇到width时就会说我才是最主要的成分，你是次要成分，所以见到我的时候你要靠边站。

其次是   **flex-grow**，扩大，扩展，增加,这就代表当父元素的宽度大于子元素宽度之和时，并且父元素有剩余，这时，flex-grow就会说我要成长，我要长大，怎么样才能成长呢，当然是分享父元素的空间了。

最后是   **flex-shrink**， 收缩，这就代表当父元素的宽度小于子元素宽度之和时，并且超出了父元素的宽度，这时，flex-shrink就会说外面的世界太苦了，我还是回到父亲的怀抱中去吧！因此，flex-shrink就会按照一定的比例进行收缩。

![](flex-grow-vs-flex-shrink-vs-flex-basis/1605267508063.png)



![](flex-grow-vs-flex-shrink-vs-flex-basis/1605267618433.png)



![](flex-grow-vs-flex-shrink-vs-flex-basis/1605267974102.png)

```c
flex-basis（默认值为auto）
flex-grow（默认值为0）
	可用空间 = (容器大小 - 所有相邻项目flex-basis的总和)
	可扩展空间 = (可用空间/所有相邻项目flex-grow的总和)
	每项伸缩大小 = (伸缩基准值flex-basis + (可扩展空间 x flex-grow值))
flex-shrink（默认值为1）
	--.计算收缩因子与基准值乘的总和  
	  var a = 每一项flex-shrink*flex-basis之和
	 --.计算收缩因数
	  收缩因数=（项目的收缩因子*项目基准值）/第一步计算总和   
	   var b =  (flex-shrink*flex-basis)/a
	 --.移除空间的计算
	   移除空间= 项目收缩因数 x 负溢出的空间 
	    var c =  b * 溢出的空间    
```

当元素的排列方向为**横**向：

​	元素的总宽度小于容器的宽度，使用flex-grow属性；

​	元素的总宽度大于容器的宽度，使用flex-shrink属性；

当元素排列的方向为**纵**向：

​	元素的总高度小于容器的高度，使用flex-grow属性；

​	元素的总高度小于容器的高度，使用flex-shrink属性；