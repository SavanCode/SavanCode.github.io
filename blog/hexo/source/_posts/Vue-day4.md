---
title: Vue day4 v-on 事件监听
top: false
cover: false
toc: true
mathjax: true
date: 2021-02-01 16:01:59
password:
summary: v-on 事件监听
tags: Vue 
categories: Vue
---

##  v-on的基本使用 - 基本的事件传参

事件调用方法传参，有参数传参，不给参数的话，方程还是会执行，参数为空，不写参数不写括号，直接传入原生事件

```html
<div id="app"> 
        <!-- 事件没传参 可以省略()-->
        <button @click="btnClick">按钮1</button>
        <button @click="btnClick()">按钮2</button>
        <!-- 事件调用方法传参，有参数传参，不给参数的话，方程还是会执行，参数为空，不写参数不写括号，直接传入原生事件 -->
        <button @click="btnClick2(123)">按钮3</button>
        <button @click="btnClick2()"></button>按钮4</button>
        <button @click="btnClick2">按钮5</button>
        <!-- 事件调用时候需要传入本身event还需要传入其他参数 -->
        <button @click="btnClick3($event,123)">按钮6</button>
      </div>
```

```js
const app = new Vue({
      el:"#app",
      methods:{
        btnClick(){
          console.log("点击");
        },
        btnClick2(value){
          console.log("inputValue : "+value);
        },
        btnClick3(event,value){
          console.log("event : "+event+";inputValue ："+value);
        }
      }
    })
    //注意本身js也可以调用方程的
    app.btnClick()
```

##  事件修饰
### v-on 提供了事件修饰符
    .stop
    .prevent
    .capture
    .self
    .once
    .passive

>使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 v-on:click.prevent.self 会阻止所有的点击，而 v-on:click.self.prevent 只会阻止对元素自身的点击。

>不要把 .passive 和 .prevent 一起使用，因为 .prevent 将会被忽略，同时浏览器可能会向你展示一个警告。请记住，.passive 会告诉浏览器你不想阻止事件的默认行为。

### 摁键修饰符
```html
<!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->
<input v-on:keyup.enter="submit">
```
你可以直接将 KeyboardEvent.key 暴露的任意有效按键名转换为 kebab-case 来作为修饰符。
```html
<input v-on:keyup.page-down="onPageDown">
```
在上述示例中，处理函数只会在 $event.key 等于 PageDown 时被调用。

### 系统修饰键
可以用如下修饰符来实现仅在按下相应按键时才触发鼠标或键盘事件的监听器。

    .ctrl
    .alt
    .shift
    .meta

### 例子

```html
<div id="app2">
      <p>事件修饰</p>
    <!--1. .stop的使用，btn的click事件不会传播，不会冒泡到上层，调用event.stopPropagation() -->
    <div @click="divClick" style="background-color: brown;">
        <button @click.stop="btnClick">按钮1</button>
    </div>
    <!-- 2. .prevent 调用event.preeventDefault阻止默认行为  -->
    <form action="www.baidu.com">
      <button type="submit" @click.prevent="submitClick">提交</button>
    </form>
    <!--3. 监听键盘的事件 -->
    <input type="text" @click.enter="keyup">
    <!-- 阻止单击事件继续传播 -->

    <!-- 官方 -->
    <a v-on:click.stop="doThis"></a>

    <!-- 提交事件不再重载页面 -->
    <form v-on:submit.prevent="onSubmit"></form>

    <!-- 修饰符可以串联 -->
    <a v-on:click.stop.prevent="doThat"></a>

    <!-- 只有修饰符 -->
    <form v-on:submit.prevent></form>

    <!-- 添加事件监听器时使用事件捕获模式 -->
    <!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
    <div v-on:click.capture="doThis">...</div>

    <!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
    <!-- 即事件不是从内部元素触发的 -->
    <div v-on:click.self="doThat">...</div> 
  </div>
```

```js
const app2 = new Vue({
    el:"#app2",
    methods:{
    btnClick(){
        console.log("点击button");
    },
    divClick(){
        console.log("点击div");
    },
    submitClick(){
        console.log("提交被阻止了")
    },
    keyup(){
        console.log("keyup点击")
    }
    }
})
```

个人练习code: https://github.com/SavanCode/VUE/tree/main/HelloVue