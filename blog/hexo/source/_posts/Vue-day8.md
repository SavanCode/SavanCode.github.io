---
title: Vue day8 Vue.js 组件
top: false
cover: false
toc: true
mathjax: true
date: 2021-02-02 15:18:19
password:
summary: Vue.js 组件
tags: Vue
categories: Vue
---

## Vue.js 组件

组件（Component）是 Vue.js 最强大的功能之一。

组件可以扩展 HTML 元素，封装可重用的代码。

组件系统让我们可以用独立可复用的小组件来构建大型应用，几乎任意类型的应用的界面都可以抽象为一个组件树

## 全局组件
```html
  <div id="app">
        <!-- 这里是不能够 直接用大写的哦 如果命名用了大写 编译要用横杠链接 -->
        <simple-vue></simple-vue>
    </div> 
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
    <script>
    // 注册
    Vue.component('simpleVue', {
      template: '<h1>自定义组件!</h1>'
    })
    // 创建根实例
    new Vue({
      el: '#app'
    })
    </script>
```

## 局部组件
我们也可以在实例选项中注册局部组件，这样组件只能在这个实例中使用

```html
<div id="app">
	<component></component>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
<script>
var Child = {
  template: '<h1>自定义 组件!</h1>'
}

// 创建根实例
new Vue({
  el: '#app',
  components: {
    // <component> 将只在父模板可用
    'component': Child
  }
})
</script>
```

## 带有Prop的组件
prop 是子组件用来接受父组件传递过来的数据的一个自定义属性。

父组件的数据需要通过 props 把数据传给子组件，子组件需要显式地用 props 选项声明 "prop"
```html
<div id="app">
	<child message="hello!"></child>
</div>

<script>
// 注册
Vue.component('child', {
  // 声明 props
  props: ['message'],
  // 同样也可以在 vm 实例中像 “this.message” 这样使用
  template: '<span>{{ message }}</span>'
})
// 创建根实例
new Vue({
  el: '#app'
})
</script>
```

## 动态 Prop 父->子

类似于用 v-bind 绑定 HTML 特性到一个表达式，也可以用 v-bind 动态绑定 props 的值到父组件的数据中。每当父组件的数据变化时，该变化也会传导给子组件

### 例子1

```html
<div id="app">
	<div>
	  <input v-model="parentMsg">
	  <br>
        <!-- 这里变量要换写的方式 -->
	  <child v-bind:props-message="parentMsg"></child>
	</div>
</div>

<script>
// 注册
Vue.component('child', {
  // 声明 props
  props: ['propsMessage'],
  // 同样也可以在 vm 实例中像 “this.message” 这样使用
  template: '<span>{{ propsMessage }}</span>'
})
// 创建根实例
new Vue({
  el: '#app',
  data: {
	parentMsg: '父组件内容'
  }
})
</script>
```

### 例子2

```js
// 注册
Vue.component('child', {
  // 声明 props
  props: ['message'],
  // 同样也可以在 vm 实例中像 "this.message" 这样使用
  template: '<span>{{ message }}</span>'
})
// 创建根实例
new Vue({
  el: '#app',
  data:{
    message:"hello",
  }
})

```

### 更加复杂的 v-ind v-for 以及component一起结合的例子

```html
<div id="app">
	<ol>
    <todo-item v-for="item in sites" v-bind:propstodo="item" @click.native="alert(item.text)"></todo-item>
  	</ol>
</div>

<script>
Vue.component('todo-item', {
  props: ['propstodo'],
  template: '<li>{{ propstodo.text }}</li>'
})
new Vue({
  el: '#app',
  data: {
    sites: [
      { text: 'Runoob' },
      { text: 'Google' },
      { text: 'Taobao' }
    ]
  }
})
</script>
```

> prop 是单向绑定的：当父组件的属性变化时，将传导给子组件，但是不会反过来

## Prop 验证
组件可以为 props 指定验证要求。

为了定制 prop 的验证方式，你可以为 props 中的值提供一个带有验证需求的对象，而不是一个字符串数组

```html 
<div id="app">
  <example
   :propa="'asda'"
   :propb = "'aasasa'"
   :propc="'sdf'"
   :prope="{a:'a'}"
   :propf="100"
  ></example>
</div>
<script type="text/javascript">
Vue.component('example', {
 props: {
  // 基础类型检测 (`null` 意思是任何类型都可以)
  propa: Number,
  // 多种类型
  propb: [String, Number],
  // 必传且是字符串
  propc: {
   type: String,
   required: true
  },
  // 数字，有默认值
  propd: {
   type: Number,
   default: 1000
  },
  // 数组/对象的默认值应当由一个工厂函数返回
  prope: {
   type: Object,
   default: function () {
   return { message: 'hello' }
   }
  },
  // 自定义验证函数
  propf: {
   type: Number,
    validator: function (value) {
      // 这个值必须匹配下列字符串中的一个
      return value>0? -1:1
    },
    defalut:12
  }
 },
 template:'
  <table border="1px">
    <tr>
             <th>propA</th>
             <th>propB</th>
             <th>propC</th>
             <th>propD</th>
        <th>propE</th>
             <th>propF</th>
    </tr>
    <tr>
             <td>{{ propa }}</td>
             <td>{{ propb }}</td>
             <td>{{ propc }}</td>
             <td>{{ propd }}</td>
        <td>{{ prope }}</td>
             <td>{{ propf }}</td>
    </tr>
  </table>'
})
new Vue({
 el: "#app"
});
</script>
```

## Vue.js 组件 - 自定义事件  传递参数  子->父

父组件是使用 props 传递数据给子组件，但如果子组件要把数据传递回去，就需要使用自定义事件！

我们可以使用 v-on 绑定自定义事件, 每个 Vue 实例都实现了事件接口(Events interface)，即：

- 使用 `$on(eventName)` 监听事件
- 使用 `$emit(eventName)` 触发事件

另外，父组件可以在使用子组件的地方直接用 v-on 来监听子组件触发的事件。

### Vue $emit 

这里涉及了自定义事件

```html
<div id="app">
    <div id="counter-event-example">
      <p>{{ total }}</p>
      <button-counter v-on:increment="incrementTotal"></button-counter><br/>
      <button-counter v-on:increment="incrementTotal"></button-counter>
    </div>
</div>
<script>
Vue.component('button-counter', {
  template: '<div><button v-on:click="incrementHandler(1)">-</button>{{ counter }}<button v-on:click="incrementHandler(2)">+</button></div>',
  data: function () { //这里一定要是函数
    return {
      counter: 0
    }
  },
  methods: {
    incrementHandler: function (v) {
        if(v==1){
            this.counter -= 1
              this.$emit('increment',1)
        }else{ 
            this.counter += 1
              this.$emit('increment',2)
        }
      
    }
  },
})
new Vue({
  el: '#counter-event-example',
  data: {
    total: 0
  },
  methods: {
    incrementTotal: function (d) {
        if(d==1){
            this.total -= 1
        }else{
            this.total += 1
        }
      
    }
  }
})
</script>
```

如果你想在某个组件的根元素上监听一个原生事件。可以使用 .native 修饰 v-on 。例如：

```html
<my-component v-on:click.native="doTheThing"></my-component>
```

## 自定义组件的 v-model

组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件。

```html
<input v-model="parentData">
```

等价于：

```html
<input 
    :value="parentData"
    @input="parentData = $event.target.value"
>
```

### 例子 checkbox

```html
<div id="app">
    <runoob-input v-model="num"></runoob-input>
    <p>输入的数字为:{{num}}</p>
</div>
<script>
Vue.component('runoob-input', {
    template: `
    <p>   <!-- 包含了名为 input 的事件 -->
      <input
       ref="input"
       :value="value" 
       @input="$emit('input', $event.target.value)"
      >
    </p>
    `,
    props: ['value'], // 名为 value 的 prop
})
   
new Vue({
    el: '#app',
    data: {
        num: 100,
    }
})
</script>
```


### 例子 input
```html
<div id="app">
    <base-checkbox v-model="lovingVue"></base-checkbox> 
     <div v-show="lovingVue"> 
        如果选择框打勾我就会显示。 
    </div>
</div> 
<script>
// 注册
Vue.component('base-checkbox', {
 
  model: {
    prop: 'checked',
    event: 'change'  // onchange 事件
  },
  props: {
    checked: Boolean
  },
   
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >
  `
})
// 创建根实例
new Vue({
  el: '#app',
  data: {
    lovingVue: true
  }
})
</script>
```

# Reference
https://www.runoob.com/vue2/vue-component-custom-event.html