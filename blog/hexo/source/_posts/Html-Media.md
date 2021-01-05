---
title: Html Media
top: false
cover: false
toc: true
mathjax: true
date: 2020-11-09 14:19:05
password:
summary:
tags: css&html
categories: Front-end
---

# HTML Video

<video width="320" height="240" controls>  <source src="*****" type="video/mp4">  <source src="*8**" type="video/ogg">Your browser does not support the video tag.</video>
``<video width="320" height="240" controls> ``

`` <source src="*****" type="video/mp4">  `` 

``<source src="*8**" type="video/ogg">Your browser does not support the video tag.</video>``

attribute: control / autoplay / loop / muted / preload / auto(default) / metadata / none

size control=> `<video>`

# HTML Audio


```html
<audio controls>  
<source src="****" type="audio/ogg">  
<source src="****" type="audio/mpeg">Your browser does not support the audio element.</audio>
```

```jsx
const BEEP =new Audio("https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3");

BEEP.play();
BEEP.pause();
```

```jsx
//有问题
this.audio = document.getElementById("beep");
return(
 <audio id="beep" src={BEEP} />
 )
this.audio.pause()
this.audio.play()
```



`controls` attribute adds audio controls, like play, pause, and volume.

attribute ：controls / autoplay /
 loop / muted / preload