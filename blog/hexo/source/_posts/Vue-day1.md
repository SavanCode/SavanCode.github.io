---
title: Vue day1 vue基础介绍
top: false
cover: false
toc: true
mathjax: true
date: 2021-02-01 14:31:31
password:
summary: vue基础介绍
tags: Vue
categories: Vue
---

## Vue

vue.js是目前前端web开发最流行的工具库，由尤雨溪在2014年2月发布的。

另外几个常见的工具库：react.js /angular.js/jQuery

官方网站：

 中文：[https://cn.vuejs.org/](https://link.zhihu.com/?target=https%3A//cn.vuejs.org/)

 英文：[https://vuejs.org/](https://link.zhihu.com/?target=https%3A//vuejs.org/)

官方文档：[https://cn.vuejs.org/v2/guide/](https://link.zhihu.com/?target=https%3A//cn.vuejs.org/v2/guide/)

## 使用vue

```html
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
```

## 简单的暂时Vue

```html
<div id="app">
        <h2>{{message}}</h2>
        <p>{{name}}</p>
</div>
```

```js 
const app1= new Vue({
    el:"#app",
    data:{
        message:"hello vueJs",
        name:"nameing"
    }
}) 
```

## for loop

```html
<div id="forLopp"> 
        <p>{{name}}</p>
        <ul>
            <li v-for="(item, index) in message" :key="index">{{item}}</li>
          </ul>
    </div>
```
```js
    const app2= new Vue({
        el:"#forLopp",
        data:{
            message:["hello vueJs", "hello vueJs","hello vueJs","hello vueJs","hello vueJs"],
            name:"forLopp"
        }
    })
```
## 实现一个简单的计数器 逻辑
```html
 <div id="counter"> 
        <p>{{name}}</p> 
        <p>{{count}}</p>
         <button @click="add">+1</button>
         <button @click="count=0">reset</button>
         <button v-on:click="minus">-1</button> 
```
```js
 const app3= new Vue({
        el:"#counter",
        data:{
            name:"counter",
            count:99, 
        },
        computed: { //立即执行
            newMessage: function () { 
                console.log("calling computed")
                return this.name.split('').reverse().join('')
            }
        },
        methods: {
            add:function(){
                console.log(this,this.count)
                console.log(app3,app3.count)
                this.count++;
            },
            minus(){
                this.count--;
            }
        },
    });
```

## computed methods 以及watch函数 的简单例子

这个例子 不小心跟上面的写一起了 懒得改正了
直接去看页面效果直观

> 在vue解析前，div中有一个属性cloak
> 在vue解析之后，div中没有一个属性v-cloak

这里实际上使用这个timeout,是为了模拟网络延迟，可以清晰看到犹豫链接没有加载出来 而会需要用到cloak

如果不要display为none，则会清晰地看到 连接百度一下的弹出
使用 v-cloak 解決 Vue Instance 完成编译前显示变数的问题。

```html
<div id="counter"> 
        <p>{{name}}</p> 
         <p>use compute</p>
         <p>after computed {{newMessage}}</p>
         <button @click="reverse">点击改变name属性并且调用computed函数</button>
        <p>computed 中getter setter</p>
        <p>{{fullname}}</p>  
    </div>
```
```js
    const app3= new Vue({
        el:"#counter",
        data:{
            name:"counter",
            count:99,
            firstName:"FirstName",
            lastName:"LastName"
        },
        computed: { //立即执行
            newMessage: function () { 
                console.log("calling computed")
                return this.name.split('').reverse().join('')
            },
            //getter
            fullname:function(){
                console.log("getting fullname ing")
                return this.firstName+" "+this.lastName
            },
             // setter
            setName: function (newValue) { 
                var names = newValue.split(' ')
                this.firstName = names[0]
                this.lastName = names[names.length - 1]
            }
        },
        methods: { 
            reverse(){
                this.name="newname"
              console.log(this.newMessage) //这里直接返回结果的哟 不用执行？
            }
        },
    });
```

## html文本内 标签显示 text 

`v-pre`标签 文本不解析
`v-html`直接插入html
`v-text`以文本形式显示,会覆盖

```html
 <div id="html" v-cloak>
        <h2>使用v-html，直接插入html</h2>
        <h2 v-html="href"></h2>
        <h2>使用v-text，以文本形式显示,会覆盖</h2>
        <h2 v-text="message">你看不到我</h2>
        <h2>使用v-pre,不会解析</h2>
        <h2 v-pre>{{message}}</h2> <p>这是解析的我： {{message}}</p>
    </div>
```
```js
   setTimeout(() => {
        const app4=new Vue({
        el:"#html",
        data:{
            href:"<a href='http://www.baidu.com'>百度一下</a>",
            message:"你只能看到我"
        }
    })
    }, 1000); 
```

## cloak属性

在vue解析前，div中有一个属性cloak
在vue解析之后，div中没有一个属性v-cloak

这里实际上,这个timeout是为了可以清晰看到链接没有加载出来,而会需要用到cloak的场景模拟
如果不要display为none，则会清晰地看到 连接百度一下的弹出
使用 v-cloak 解決 Vue Instance 完成编译前显示变数的问题。

```html
  <div id="watch-example">
  <p>
    Ask a yes/no question:
    <input v-model="question">
  </p>
  <p>{{ answer }}</p>
</div>
```
下面代码是不能执行的 只能理解(官网直接抄的)
```js 
0    var watchExampleVM = new Vue({
        el: '#watch-example',
        data: {
            question: '',
            answer: 'I cannot give you an answer until you ask a question!'
        },
        watch: {
            // 如果 `question` 发生改变，这个函数就会运行
            question: function (newQuestion, oldQuestion) {
            this.answer = 'Waiting for you to stop typing...'
            this.debouncedGetAnswer()
            }
        },
        created: function () {
            // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
            // 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率
            // AJAX 请求直到用户输入完毕才会发出。想要了解更多关于
            // `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，
            // 请参考：https://lodash.com/docs#debounce
            this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
        },
        methods: {
            getAnswer: function () {
            if (this.question.indexOf('?') === -1) {
                this.answer = 'Questions usually contain a question mark. ;-)'
                return
            }
            this.answer = 'Thinking...'
            var vm = this
            axios.get('https://yesno.wtf/api')
                .then(function (response) {
                vm.answer = _.capitalize(response.data.answer)
                })
                .catch(function (error) {
                vm.answer = 'Error! Could not reach the API. ' + error
                })
            }
        }0
    }); 
```

> 这里主要是提到Axios,其实后面会讲 day 7
> 可参照
>
>  [Vue笔记：axios](https://www.cnblogs.com/-wenli/p/13813246.html)
>
> [axios教程](https://zhuanlan.zhihu.com/p/149300921)

个人练习code: https://github.com/SavanCode/VUE/tree/main/HelloVue