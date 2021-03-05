---
title: vue-watch-routes 监听网页的URL变化 手动
top: false
cover: false
toc: true
mathjax: true
date: 2021-03-06 01:13:56
password:
summary:
tags: [Vue,router]
categories: [Vue]
---

除了Vue的 router 的导航卫士 之外，实际上有一个问题是导航卫视解决不了的 就是关于手动输入url的问题
有时候还有需要监听routes来实现实时监听页面跳转路由信息，解决menu按钮样式刷新重定向等问题

基本方法就是
```js 
watch: {//动态监听路由变化 -以便动态更改导航背景色事件效果等
            '$route' (to, from) {
                  // 对路由变化作出响应...
                  console.log('to.path----',to.path)//跳转后路由
                  console.log('from----',from)//跳转前路由
                 //do something
                 this.$router.replace('/login')
            }
          },
```

或者

```js
watch: {
        // 监听路由变化
        "$route.path": function(newVal, oldVal) {
            console.log(`new_path = ${newVal}, old_path = ${oldVal}`);
        }
    } 
```

