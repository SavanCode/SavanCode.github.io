---
title: Vue day5 条件判断 v-if、v-eles、v-else-if & v-for遍历数组 & 过滤符 & 混合mixins
top: false
cover: false
toc: true
mathjax: true
date: 2021-02-01 20:12:58
password:
summary: 条件判断 v-if、v-eles、v-else-if & v-for遍历数组 & 过滤符 & 混合mixins
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

## 遍历循环 v-for

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

## 数组动态过滤

如果你的for loop 希望实现一个动态的变化，想加入filter函数的联动

```
v-for="(book, index) in search()"//这里search method 直接返回一个list
```

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

## 过滤符

### 私有过滤器

这里下面有一个| 管道符 就是item.ctime 要先经过dataFormat这个函数之后才可以显示

1. HTML元素：

   ```html
   <td>{{item.ctime | dataFormat('yyyy-mm-dd')}}</td>
   ```

2. 私有 `filters` 定义方式：

   ```js
   filters: { // 私有局部过滤器，只能在 当前 VM 对象所控制的 View 区域进行使用
    dataFormat(input, pattern = "") { // 在参数列表中 通过 pattern="" 来指定形参默认值，防止报错
      var dt = new Date(input);
      // 获取年月日
      var y = dt.getFullYear();
      var m = (dt.getMonth() + 1).toString().padStart(2, '0');
      var d = dt.getDate().toString().padStart(2, '0');
   
      // 如果 传递进来的字符串类型，转为小写之后，等于 yyyy-mm-dd，那么就返回 年-月-日
      // 否则，就返回  年-月-日 时：分：秒
      if (pattern.toLowerCase() === 'yyyy-mm-dd') {
        return `${y}-${m}-${d}`;
      } else {
        // 获取时分秒
        var hh = dt.getHours().toString().padStart(2, '0');
        var mm = dt.getMinutes().toString().padStart(2, '0');
        var ss = dt.getSeconds().toString().padStart(2, '0');
   
        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
      }
    }
   }
   ```

> 使用ES6中的字符串新方法 String.prototype.padStart(maxLength, fillString='') 或 String.prototype.padEnd(maxLength, fillString='')来填充字符串；

### 全局过滤器

```js
// 定义一个全局过滤器
Vue.filter('dataFormat', function (input, pattern = '') {
  var dt = new Date(input);
  // 获取年月日
  var y = dt.getFullYear();
  var m = (dt.getMonth() + 1).toString().padStart(2, '0');
  var d = dt.getDate().toString().padStart(2, '0');

  // 如果 传递进来的字符串类型，转为小写之后，等于 yyyy-mm-dd，那么就返回 年-月-日
  // 否则，就返回  年-月-日 时：分：秒
  if (pattern.toLowerCase() === 'yyyy-mm-dd') {
    return `${y}-${m}-${d}`;
  } else {
    // 获取时分秒
    var hh = dt.getHours().toString().padStart(2, '0');
    var mm = dt.getMinutes().toString().padStart(2, '0');
    var ss = dt.getSeconds().toString().padStart(2, '0');

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
  }
});
```

> 注意：当有局部和全局两个名称相同的过滤器时候，会以就近原则进行调用，即：局部过滤器优先于全局过滤器被调用！

## [混合mixins](https://cn.vuejs.org/v2/guide/mixins.html)

混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行“合并”。

也就是当你有多个组件中的某些变量或者方法会出现属性冲突的时候，可能需要的解决办法

具体还是看最后的git中写的例子

（这里的tooltip 以及popup 都是有显示以及隐藏的功能的，所以这里就需要base这样的属性，如果你对于这两个component中的某一个需要进行默认属性，直接在data中赋值就好，这个data属性会覆盖mixins的）

```html
<div id="app">
    <tooltip></tooltip>
    <popup></popup>
</div>
<script>
    var base={
    methods: {
       show: function () {
           this.visible=true;
       } ,
        hide: function () {
            this.visible=false;
        },
        toggle: function () {
            this.visible=!this.visible;
        }
},
    data: function () {
        return {
            visible:false,
        }
    }
};
Vue.component('tooltip',{
    template: `
    <div>
        <span @mouseenter="show" @mouseleave="hide">bys</span>
        <div v-if="visible">
            白岩松
        </div>
    </div>
    `,
    mixins: [base]
}) 
</script>
```

个人练习:

做一个动态的结账页面, 书本list , 然后根据控制界面书本的数量.计算总价,并且可以移除书本，增加书本

个人练习code: https://github.com/SavanCode/VUE/tree/main/HelloVue

# Reference

https://zhuanlan.zhihu.com/p/38179618 

[黑马程序员 vue.js从入门到应用](https://www.bilibili.com/video/BV1vp4y1179g?p=27)