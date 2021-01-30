---
title: Relative Path 路径书写
top: false
cover: false
toc: true
mathjax: true
date: 2020-11-15 20:22:56
password:
summary: 写相对或者绝对路径的注意点
tags: css&html
categories: css&html
---

# 相对路径

## 同一个文件夹

3.2.html和3.html在同一个文件夹下， 如果2.html链接到3.html，可以在2.html中这样写:
```html
<a href="3.html">同目录下文件间互相链接</a>
```

## 上级目录文件
1.html是2.html和3.html的上级目录中的文件，如果2.html或3.html链接到1.html，可以在2.html或3.html中这样写
```html
<a href="../1.html">链接到上级目录中的文件</a>
```
../ 代表一级上级目录(间隔一个目录)
　　 ../../代表二级上级目录(间隔两个目录)
　　 比如4.html链接到1.html，可以在4.html中这样写
```html
<a href="../../1.html">链接到上级目录的上级目录中的文件</a>
```
## 下级目录文件
2.html和3.html是1.html的下级目录中的文件，如果在1.html中链接到2.html， 可以在1.html中这样写
```html
<a href="first/2.html">链接到下级目录(first)中的文件</a>
```
如果在1.html中链接到4.html，可以在1.html中这样写
```html
<a href="first/second/4.html">链接到下级目录(first/second/)中的文件</a>
```
# 根目录
使用根目录的方式表示的路径和绝对路径的表示方式相似，去掉前面的域名就可。
　　比如：
```html
<a href="/exe/1.html">链接到1.html</a>1
<a href="/exe/first/2.html">链接到2.html</a>1
```
**../表示源文件所在目录（文件夹）的上一级目录（文件夹），../../表示源文件所在目录的上上级目录，以此类推。**