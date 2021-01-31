---
title: Review HTML& CSS 2
date: 2020-11-08 10:20:47
top: false
cover: false
toc: true
mathjax: true
tags: css&html
categories: Front-end
---

## 基本tag

```html
<hgroup></hgroup>
<header></header>
<nav></nav>
<section></section>
<footer></footer>
<article></article>
<aside></aside>
```

## hgroup元素

hgroup = header group (not supported by H5)

## section,article元素

section元素代表文档中的 节 或 段，段可以是指一篇文章里按照主题的分段；节可以是指一个页面里的分组。

```html
<section>
	<h1>section是啥？</h1>
	<article>
		<h2>关于section</h1>
		<p>section的介绍</p>
		<section>
			<h3>关于其他</h3>
			<p>关于其他section的介绍</p>
		</section>
	</article>
</section>
```

section使用注意：

- section不是一般意义上的容器元素，如果想作为样式展示和脚本的便利，可以用div。
- article、nav、aside可以理解为特殊的section，
  所以如果可以用article、nav、aside就不要用section，没实际意义的就用div	

article使用注意：
		独立文章：用article
		单独的模块：用section
		没有语义的：用div

## aside元素

aside使用总结：

- asie在article内表示主要内容的附属信息	
- 在article之外则可做侧边栏	
- 如果是广告，其他日志链接或者其他分类导航也可以用

```html
<article>
	<p>内容</p>
	   <aside>
	       <h1>作者简介</h1>
	       <p>前端一枚</p>
	  </aside>
</article>
```

