---
title: Vue day5 条件判断 v-if、v-eles、v-else-if & v-for遍历数组
top: false
cover: false
toc: true
mathjax: true
date: 2021-02-01 20:12:58
password:
summary: 条件判断 v-if、v-eles、v-else-if & v-for遍历数组
tags: Vue
categories: Vue
---
## 条件判断 v-if、v-eles、v-else-if

### `v-if`、`v-else`、`v-else-if` 

v-if、v-else-if、v-else联合使用相当于if、elseif、else

```html
 <div id="app">
        <p>防止组件复用，加上key 如果没有加key他不会重新渲染</p>
        <span v-if="num<5">
          <label for="username">用户账号</label>
          <input type="text" id="username" placeholder="请输入用户名" key="username">
        </span>
        <span v-else-if="num===5">
            <label for="email">用户邮箱</label>
            <input type="text" id="email" placeholder="请输入用户邮箱" key="email" >
        </span>
        <span v-else="">
            <label for="email">用户电话</label>
            <input type="text" id="phone" placeholder="请输入用户电话" key="phone">
        </span>
        <button @click="num++">切换类型</button>
      </div>
      <div id="app2">
        <h2 v-show="flag">v-show只是操作元素的style属性display，都没会被创建</h2>
        <h2 v-if="flag">v-if是新增和删除dom元素</h2>
      </div>
```
```js
 const app = new Vue({
      el:"#app",
      data:{
        num:2
      },
      watch:{
          num:function(newnum, oldnum){
            console.log("newnum,newnum="+newnum+",oldnum="+oldnum) 
        },
      }
    })
    const app2 = new Vue({
      el:"#app2",
      data:{
        flag:true
      }
    })
```

### `v-if` 和 `v-show`

v-show只是操作元素的style属性display，都没会被创建
v-if是新增和删除dom元素

`v-if`和`v-show`都是用来控制元素的渲染。
`v-if`判断是否加载，可以减轻服务器的压力，在需要时加载,但有更高的切换开销;
`v-show`调整DOM元素的CSS的dispaly属性，可以使客户端操作更加流畅，但有更高的初始渲染开销。

如果需要非常频繁地切换，则使用` v-show` 较好；
如果在运行时条件很少改变，则使用` v-if` 较好。

具体解释: https://zhuanlan.zhihu.com/p/38179618

## 遍历循环

没什么特别,看看例子就好
### 基本的循环例子

```html
 <div id="app">
        <ul>
          <li v-for="(value,key,index) in user" >{{key+"-"+value+"-"+index}}</li>
        </ul>
</div>
```
```js
  const app = new Vue({
        el:"#app",
        data:{
        user:{
            name:"zzz",
            height:188,
            age:24
        }
        }
    })
```
### v-for使用key 对array数组进行插入

```html
   <div id="app2">
        <!-- 不加key如果要插入f依次改变 -->
        <ul>
          <li v-for="item in letters">{{item}}</li>
        </ul>
        <button @click="add1">没有key</button>
        <!-- 加key如果要插入f使用diff算法高效,如果使用index做key一直变，所以item如果唯一可以使用item-->
        <ul>
            <li v-for="item in letters1" :key="item">{{item}}</li>
        </ul>
        <button @click="add2">有key</button>
      </div>
```
```js
 const app2 = new Vue({
      el:"#app2",
      data:{
        letters:['a','b','c','d','e'],
        letters1:['a','b','c','d','e']
      },
      methods: {
        add1(){
          this.letters.splice(2,0,'f')
        },
        add2(){
          this.letters1.splice(2,0,'f') //这里重复的key添加会有error
        }
      }
    })
```
>使用key可以提高效率，加key如果要插入f使用diff算法高效,如果使用index做key一直变，所以item如果唯一可以使用item。
>
>不加key如果要插入f依次替换。


### 数组的响应式方法 

```html
      <div id="app3"> 
        <ul>
          <li v-for="item in letters">{{item}}</li>
        </ul>
        <button @click="btn1">push</button><br>
        <button @click="btn2">通过索引值修改数组</button>
      </div>
```
```js
    const app3 = new Vue({
      el:"#app3",
      data:{
        letters:['a','b','c','d','e']
      },
      methods: {
        btn1(){
          //1.push
          this.letters.push('f')
          //2.pop()删除最后一个元素
          //this.letters.pop()
          //3.shift()删除第一个
          //this.letters.shift()
          //4.unshift()添加在最前面,可以添加多个
          //this.letters.unshift('aaa','bbb','ccc')
          //5.splice():删除元素/插入元素/替换元素
          //splice(1,1)再索引为1的地方删除一个元素,第二个元素不传，直接删除后面所有元素
          //splice(index,0,'aaa')再索引index后面删除0个元素，加上'aaa',
          //splice(1,1,'aaa')替换索引为1的后一个元素为'aaa'
          // this.letters.splice(2,0,'aaa')
          //6.sort()排序可以传入一个函数
          //this.letters.sort()
          //7.reverse()反转
          // this.letters.reverse()

        },
        btn2(){
          this.letters[0]='f'
        }
      }
    })
```



个人练习:

做一个动态的结账页面, 书本list , 然后根据控制界面书本的数量.计算总价,并且可以移除书本

个人练习code: https://github.com/SavanCode/VUE/tree/main/HelloVue

# Reference

https://zhuanlan.zhihu.com/p/38179618 

