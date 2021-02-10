---
title: Vue day3 Vue computed  methods
top: false
cover: false
toc: true
mathjax: true
date: 2021-02-01 15:26:15
password:
summary: Vue computed methods ;computed的getter/setter & 监听器watch
tags: Vue
categories: Vue
---

## VUE基本的计算属性
```html
 <div id="app"> 
        <p>Mastache语法 {{firstName+ " " + lastName}}</p> 
        <p>methods {{getFullName()}}</p> 
        <p>computed {{fullName}}</p>
      </div>
```
```js
const app = new Vue({
      el:"#app",
      data:{
        firstName:"first",
        lastName:"last"
      },
      computed: {
        fullName:function(){
          return this.firstName + " " + this.lastName
        }
      },
      methods: {
        getFullName(){
          return this.firstName + " " + this.lastName
        }
      },
    })
```
加上数组的例子
```html
<div id="app1"> 
        <ul> 
          <li v-for="(item, index) in books" :key="index" >{{item.id + " " + item.name +"  $" + item.price}}</li>
        </ul>
        <p>methods : total price {{getSum()}}</p>
        <p>computed : total price {{sum}}</p>
    </div>
```
```js
const app1 = new Vue({
  el:"#app1",
  data:{
    books:[
      {id:110,name:"慧眼人生",price:119}, 
      {id:111,name:"慧眼人生",price:80},
      {id:112,name:"慧眼人生",price:99},
      {id:113,name:"慧眼人生",price:150},
    ]
  },
  computed: {  
    sum:function(){
      let sum=0
      this.books.map(item=>{sum+=item.price})
      return sum
    }
  },
  methods: { 
    getSum(){
      let sum=0
      this.books.map(item=>{sum+=item.price})
      return sum
    }
  },
})
```
基本这里看完会觉得没有差别,是的我也觉得, 但是注意看看下面的吧(先看完watch)


## 计算属性：computed的getter/setter & 监听器watch

这里的个人理解是这样，其实这个跟oop基本一致，但是我暂时感觉实际用起来没有辣么强大
这里的set应用，就是比如在console 输入 app2.newFullName="xing ming"
这时候其实属性就发生了改变

```html
    <div id="app2">  
        <p>newFullName : {{newFullName}}</p> 
        <p>firstName : {{firstName}}</p> 
        <p>lastName : {{lastName}}</p>
        
  </div>
```

```js
const app2 = new Vue({
  el:"#app2",
  data:{
  firstName:"first",
  lastName:"last",
  },
  computed: {
    newFullName:{
          get:function(){
              return this.firstName+" "+this.lastName
          },
          set:function(newValue){
              var names=newValue.split(' ');
              this.firstName=names[0]
              this.lastName=names[1]
          }
      }
  },
})
```

## 对比

个人理解：
computed有缓存，在this.firstName + " " + this.lastName的属性不变的情况下，methods调用了四次，
而computed才调用了一次，性能上computed明显比methods好。而且在改动firstName的情况下，计算属性只调用一次，methods依然要调用4次。

>简单地说：
>methods：即时渲染
>computed：有缓存渲染

计算属性：computed
计算属性范围在Vue实例的fullName内所管理的firstName和lastName,通常监听多个变量

侦听器：watch
监听数据变化，一般只监听一个变量或数组

使用场景 
watch(异步场景)，computed(数据联动)

```html
 <div id="app3">
    <!-- methods，即使firstName和lastName没有改变，也需要再次执行 -->
    <h2>{{getFullName}}</h2>
    <h2>{{getFullName}}</h2>
    <h2>{{getFullName}}</h2>
    <h2>{{getFullName}}</h2>
    <!-- 计算属性有缓存，只有关联属性改变才会再次计算 -->
    <h2>{{fullName}}</h2>
    <h2>{{fullName}}</h2>
    <h2>{{fullName}}</h2>
    <h2>{{fullName}}</h2> 
  </div>
```
```js
const app3 = new Vue({
      el:"#app3",
      data:{
        firstName:"first",
        lastName:"last",
      },
      computed: {
        fullName:function(){
          console.log("调用了计算属性fullName"); 
          return this.firstName + " " + this.lastName
        }
      },
      methods: {
        getFullName(){
          console.log("调用了getFullName"); 
          return this.firstName + " " + this.lastName
        }
      },
      watch:{
        firstName:function(newFirstName, oldFirstName){
            console.log("firstName触发了watch,newFirstName="+newFirstName+",oldFirstName="+oldFirstName)
            this.watchFullName = this.firstName+this.lastName+","+other
        },
        lastName:function(newLastName, oldLastName){
            console.log("lastName触发了watch,newLastName="+newLastName+",oldLastName="+oldLastName)
            this.watchFullName = this.firstName+this.lastName+","+other
        }  
    },
})
```

个人练习code: https://github.com/SavanCode/VUE/tree/main/HelloVue

###  [别人的笔记 ： 监听器watch的深入对比](https://blog.csdn.net/weixin_43837268/article/details/92769669?utm_medium=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromBaidu-1.control&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromBaidu-1.control)

### 摘抄他人总结

计算属性适合用在模板渲染中，某个值是依赖了其它的响应式对象甚至是计算属性计算而来；而侦听属性适用于观测某个值的变化去完成一段复杂的业务逻辑。

- computed能做的，watch都能做，反之则不行
- 能用computed的尽量用computed

## Reference

###  [监听器watch的深入对比](https://blog.csdn.net/weixin_43837268/article/details/92769669?utm_medium=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromBaidu-1.control&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromBaidu-1.control)
