---
title: hexo render skip
top: false
cover: false
toc: true
mathjax: true
date: 2020-11-15 20:12:05
password:
summary:
tags: hexo
categories: 
---

# Hexo博客跳过渲染，创建自定义网页方法



## 1.跳过渲染指令

在html文件中添加跳过渲染指令：

用编辑器打开 Hexo\source 创建的文件夹中的 index.html 文件，在开头添加如下代码即可

```html
---layout: false---
```

缺点：

1. 网页引用了 css 或 js ，这些 css 和 js 必须使用外链。
2. 引用图片，可以在网页目录下建立 img 文件夹，可以直接引用图片，不必再去创建外链。

## 2.config中设置

Hexo 目录下的_config.yml 文件，找到 skip_render

skip_render 一般有以下四种常用参数：

```yaml
#跳过source文件夹下的test.html
skip_render: test.html

#忽略source下的test文件夹下所有文件
skip_render: test/*  

#忽略 source 下的 test 文件夹下.html文件
skip_render: test/*.html 

#忽略 source 下的 test 文件夹内所有文件包括子文件夹以及子文件夹内的文件
skip_render: test/** 

#忽略多个路径的文件或目录
skip_render:
    - test.html
    - test/*
```

