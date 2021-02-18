---
title: Vue-day14 vue必会API盘点
top: false
cover: false
toc: true
mathjax: true
date: 2021-02-18 11:08:58
password:
summary: vue必会API盘点
tags: Vue
categories: Vue
---

## **数据相关API**

### [Vue.set( target, propertyName/index, value )](https://cn.vuejs.org/v2/api/index.html#Vue-set)

向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新。

使用方法： Vue.set(target, propertyName/index, value)

**主要两个功能：1. 设置数据数组对象元素； 2.向响应式对象添加属性**
set 这个方法只能用于data 里面的子数组对象，而不能直接用于data (这个根数据)或 者vue 实例

#### 设置数据数组对象元素；

```html
<div id="div">  
<p >{{items}}</p>
</div> 
<script>
 
var vm = new Vue({
el:"#div",
  data: {
    items: ['a', 'b', 'c']
  }
});
Vue.set(vm.items,2,"ling")
</script>
```

Vue.set(vm.items,2,“ling”)这句话的意思是把vm.items数组下标为2的元素，改为"ling"，返回参数为"ling"修改后数组变成[‘a’, ‘b’, ‘ling’]

#### 向响应式对象添加属性；

```html
<div id="div">  
<p >{{person}}</p>
</div>
 
<script>
var vm = new Vue({
el:"#div",
data: {
    person:{
	name:"ling",
	job:"engineer"
	},
created:function(){
		alert(this.person.age)
  }
});
Vue.set(vm.person,"age","26")
</script> 
```

Vue.set(vm.person,“age”,“26”)这句话的意思是在vm.person对象中添加"age":"26"这个属性

### [Vue.delete( target, propertyName/index )](https://cn.vuejs.org/v2/api/index.html#Vue-delete)

删除对象的属性。如果对象是响应式的，确保删除能触发更新视图。

使用方法： Vue.delete(target, propertyName/index)

#### 数组中删除属性

**vue 数组中删除属性_delete和Vue.delete删除数组的区别**

```html
<template>
  <div class="vue-delete">
    <p class="title tag-blue">
      delete和Vue.delete删除数组的区别
    </p>
    <ul>
      <li :key="index" v-for="(item, index) in a">a---{{item}}</li>
    </ul>
    <button @click="handleA">处理a数组</button>
      <!--这里点击之后长度不变，但是有一个是undefined -->
    <ul>
      <li :key="index" v-for="(item, index) in b">b---{{item}}</li>
    </ul>
    <button @click="handleB">处理b数组</button>
	<!--这里点击之后长度减少，但是有一个是空 -->
  </div>
</template>
<script>
export default {
  name: "vueDelete",
  data() {
    return {
      a: [1,2,3,4],
      b: [1,2,3,4],
    }
  },
  methods: {
    handleA() {
      delete this.a[1]
      this.$set(this.a)
      console.log(this.a)
    },
    handleB() {
      this.$delete(this.b, 1)
      console.log(this.b)
    }
  }
}
</script>
```

#### 对象中删除属性

```js
data(){
	return{
		userinfo:{
			name:"haha",
			age:12,
			higher:"177cm"
		}
	}
}
/* delete this.userinfo.keys */
//js中删除js对象属性的方法
Vue.delete(this.userinfo,'age')//删除了age属性
//Vue中删除对象属性的方法
```

## **事件相关API**

### vm.$on(event, callback)

**参数**：

- `{string | Array<string>} event` (数组只在 2.2.0+ 中支持)
- `{Function} callback`

**用法**：`$on`事件需要两个参数，一个是监听的当前实例上的事件名，一个是事件触发的回调函数，回调函数接受的是在事件出发的时候额外传递的参数。

```js
vm.$on('test', function (msg) {
  console.log(msg)
})
vm.$emit('test', 'hi')
// => "hi"
```

### vm.$emit

## **事件总线** !重要!

通过在Vue原型上添加一个Vue实例作为事件总线，实现组件间相互通信，而且不受组件间关系的影响

```js
Vue.prototype.$bus = new Vue();
```

这样做可以在任意组件中使用 this.$bus 访问到该Vue实例

```html
<script>
// 弹窗组件 
Vue.component('message', { 
    // ... 
    // 监听关闭事件 
    mounted () { 
        this.$bus.$on('message-close', () => { 
            this.$emit('update:show', false) }); 
    }, })
</script>
<!-- 派发关闭事件 --> 
    <div class="toolbar"> <button @click="$bus.$emit('message-close')">清空提示框</button> </div>
```

### vm.$once

监听一个自定义事件，但是只触发一次。一旦触发之后，监听器就会被移除。

`$once`事件整体上来说和`$on`事件的使用方式差不多，但是event只支持字符串也就是说只支持单个事件。并且该事件再触发一次后就移除了监听器。

```js
vm.$once('testonce', function (msg) {
  console.log(msg)
})
```

### vm.$off

移除自定义事件监听器。

如果没有提供参数，则移除所有的事件监听器；

如果只提供了事件，则移除该事件所有的监听器；

如果同时提供了事件与回调，则只移除这个回调的监听器。

```js
vm.$off() // 移除所有的事件监听器 
vm.$off('test') // 移除该事件所有的监听器 
vm.$off('test', callback) // 只移除这个回调的监听器
```

## 组件或元素引用

### ref和vm.$refs

ref 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上。如果**在普通的 DOM 元素上使用，引用指向的就是 **DOM 元素**；如果**用在子组件上，引用就指向组件

范例：设置输入框焦点

```html
<input type="text" ... ref="inp"> 
<script>
mounted(){ 
    // mounted之后才能访问到inp 
    this.$refs.inp.focus() 
}
</script>
```

注意：

- ref 是作为渲染结果被创建的，在初始渲染时不能访问它们
- $refs 不是响应式的，不要试图用它在模板中做数据绑定
- 当 v-for 用于元素或组件时，引用信息将是包含 DOM 节点或组件实例的数组。



## 拓展

- [Vue3 了解这 20 个响应式 API，写码如有神](https://mp.weixin.qq.com/s/F22RfaszHewncKKZ-X5umg)

## Reference

