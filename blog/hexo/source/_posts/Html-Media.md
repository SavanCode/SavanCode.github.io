---
title: Html Media
top: false
cover: false
toc: true
mathjax: true
date: 2020-11-09 14:19:05
password:
summary: Html Media
tags: css&html
categories: css&html
---

## HTML Video

```html
<video style="width:320px"  poster="img.jpg" controls>
  <source src="movie.mp4"  type="video/mp4">
  <source src="movie.ogg"  type="video/ogg">
  您的浏览器不支持 HTML5 video 标签。
</video>

//attribute: control / autoplay / loop / muted / preload / //auto(default) / metadata / none

// size control=> `<video>`
```
## HTML Audio


```html
<audio src="****.mp3" type="audio/mpeg" controls="controls">Your browser does not support the audio element.</audio>
```

```js
 var audio = document.querySeletor('audio')
 //audio 自身有很多属性可以设置
 //audio.muted audio.play() audio.pause()
// audio.volum audio.currentTime 属性直接看dom元素哈~
```



`controls` attribute adds audio controls, like play, pause, and volume.

attribute ：controls / autoplay /
 loop / muted / preload