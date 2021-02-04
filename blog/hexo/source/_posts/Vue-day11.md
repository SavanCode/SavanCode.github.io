---
title: Vue day11 Vue过渡&动画
top: false
cover: false
toc: true
mathjax: true
date: 2021-02-02 22:50:56
password:
summary: Vue过渡&动画
tags: Vue
categories: Vue
---

## 过渡&动画

### vue 动画的理解

1. 操作css 的trasition 或animation

2. vue 会给目标元素添加/移除特定的class

3. 过渡的相关类名
   xxx-enter-active: 指定显示的transition
   xxx-leave-active: 指定隐藏的transition
   xxx-enter/xxx-leave-to: 指定隐藏时的样式

![image-20210203130902220](Vue-day11/image-20210203130902220.png)

### 基本过渡动画的编码

1. 在目标元素外包裹`<transition name="xxx">`
2. 定义class 样式
   指定过渡样式: transition
   指定隐藏时的样式: opacity/其它

```html
<style>
/* 定义进入和离开时候的过渡状态 */
.fade-enter-active, .fade-leave-active {
    /*transition: opacity 2s*/
 	transition: all 0.2s ease;
   position: absolute;
}
/* 定义进入过渡的开始状态 和 离开过渡的结束状态 */
.fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
   /* opacity: 0*/
	opacity: 0;
   transform: translateX(100px);
}
</style>

<div id = "databinding">
<button v-on:click = "show = !show">点我</button>
<transition name = "fade">
    <p v-show = "show" v-bind:style = "styleobj">动画实例</p>
</transition>
</div>
<script type = "text/javascript">
var vm = new Vue({
el: '#databinding',
    data: {
        show:true,
        styleobj :{
            fontSize:'30px',
            color:'red'
        }
    },
    methods : {
    }
});
</script>
```

### [使用第三方 CSS 动画库](https://animate.style/#migration) 

https://animate.style/

https://cn.vuejs.org/v2/guide/transitions.html 自定义过渡类名

1. 导入动画类库：
- npm安装npm install animate.css --save
```js
// in main.js
import animated from 'animate.css' 
Vue.use(animated)
```

- 使用cdn引入
```html
// in index.html 
<link href="https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.0/animate.min.css" rel="stylesheet">
```

2. 定义 transition 及属性：

   ```html
   <div id = "test2">
           <input type="button" value="戳我进入" @click="flag=!flag">
           <!--duration表示进出场时间,可以分别设置和独立设计-->
           <transition enter-active-class="animate__animated animate__backInDown" leave-active-class="animate__animated animate__backOutUp" :duration="{ enter: 500, leave: 800 }"
           >
               <!--需求：点击按钮，让p显示，再点击，让p隐藏-->
               <p v-if="flag">{{msg}}</p>
           </transition>
       </div>
   <script>
   var app = new Vue({
           el: '#test2',
           data: {
               msg: 'hellfo  vue.js.',
               flag: false
           }
   </script>
   ```

> ### 注意事项
>
> 1. 不要在对行内元素使用`dispplay:inline`需要的话你可以设置该元素为行内块元素`display: inline-block`
> 2. Animate.css v4的升级带来了破坏性的影响(这样翻译怪),所有类要加前缀`animate__`

### 使用动画钩子函数 

1. 定义 transition 组件以及三个钩子函数：

   ```html
   <div id="test3">
               <!-- 钩子函数 -->
               <input type="button" value="切换动画" @click="isshow = !isshow">
               <transition
               @before-enter="beforeEnter"
               @enter="enter"
               @after-enter="afterEnter">
                 <div v-if="isshow" class="show">OK</div>
               </transition>
       </div>
   ```

2. 定义三个 methods 钩子方法：

   ```js
   var app2 = new Vue({
           el: '#test3',
           data: { 
               isshow: false
           },
           methods: {
               beforeEnter(el) { // 动画进入之前的回调
               el.style.transform = 'translateX(100px)';
               },
               enter(el, done) { // 定义了动画的终止状态 这里的done其实等于下面的afterEnter函数
               el.offsetWidth;
               el.style.transform = 'translateX(600px)';
               done();//函数结束调用下面afterEnter函数 直接comment掉的话，就不执行afterEnter
               },
               afterEnter(el) { // 定义了动画完成之后的回调函数
               this.isshow = !this.isshow;
               }
           }
   })
   ```

3. 定义动画过渡时长和样式：

   ```css
   .show{
      transition: all 4s ease;
    }
   ```

### v-for 的列表过渡

https://cn.vuejs.org/v2/guide/transitions.html#列表的进入和离开过渡

1. 定义过渡样式：

   ```css
   <style>
    /* 列表过渡 */
       .list-enter,
       .list-leave-to {
       	opacity: 0;
       	transform: translateY(10px);
       }
   
       .list-enter-active,
       .list-leave-active {
       	transition: all 0.3s ease;
           position:absolute/*为了保持位置的相对稳定*/
       }
   
       /* 元素改变定位的缓动效果 */
       .list-move{
       	transition: all 0.3s ease;
       } 
   </style>
   ```

2. 定义DOM结构，其中，需要使用 transition-group 组件把v-for循环的列表包裹起来：

   ```html
   <div id="test4"> 
           <!-- 这里的transition-group会被渲染成为span 所以要用tag 让浏览器知道它要被渲染成为ul -->
           <input type="text" v-model="txt" @keyup.enter="add">​ 
           <transition-group tag="ul" name="list">   
               <li v-for="(item, i) in list" :key="i">{{item}}</li> 
           </transition-group>
           <button v-on:click="remove">Remove</button>
       </div>
   ```

3. 定义 VM中的结构：

   ```js
    // 创建 Vue 实例，得到 ViewModel
     var app3 = new Vue({
      el: '#test4',
      data: {
        txt: '',
        list: [1, 2, 3, 4]
      },
      methods: {
        add() {
          this.list.push(this.txt);
          this.txt = '';
        },
        randomIndex: function () {
         return Math.floor(Math.random() * this.list.length)
       },
        remove: function () {
         this.list.splice(this.randomIndex(), 1)
       },
      }
    });
   ```

### [列表的排序过渡](https://cn.vuejs.org/v2/guide/transitions.html#列表的排序过渡)

​	没练习 看官网吧~

















# Reference

1. https://cn.vuejs.org/v2/guide/transitions.html

2. [贝塞尔在线生成器](http://cubic-bezier.com/#.4,-0.3,1,.33)

3. [Vue 动画：CSS 动画原理 & animate.css 库的使用 & 同时使用过渡和动画 & Js 动画与 Velocity.js 的结合 & 多个元素或组件的过渡 & 动画封装](https://blog.csdn.net/Bule_daze/article/details/106074385)