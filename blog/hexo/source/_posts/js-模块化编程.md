---
title: js 模块化编程
top: false
cover: false
toc: true
mathjax: true
date: 2020-11-26 10:20:17
password:
summary: JS 模块写法
tags: [JS,module]
categories: JS
---

![](js-模块化编程/167b650e8d1fcc23.png)

整体的理解

- 服务器端
  	CommonJS  同步加载 NodeJS

- 浏览器(客户端)
  	异步加载
  	AMD(异步模块定义) -> require.js
  	CMD(通用模块定义) -> seajs

- 服务器端+客户端
  	UMD

原生模块定义(ES6) -> Babel(ES5)

## 模块化的基本了解

- 将一个复杂的程序依据一定的规则(规范)封装成几个块(文件), 并进行组合在一起
- 块的内部数据与实现是私有的, 只是向外部暴露一些接口(方法)与外部其它模块通信

简单的说就是当你越写越多文件，或者说越来越团队化工作会出现的互相引用变量的问题

## 一般写法-全局function

```js
　function m1(){
　　　　//...
　　}

　　function m2(){
　　　　//...
　　}
```

> 缺点："污染"了全局变量，无法保证不与其他模块发生变量名冲突，而且模块成员之间看不出直接关系。

## 对象封装写法

```js
var module1 = new Object({
	_count : 0,
    flag:false,
	m1 : function (){
 		 //...
	},
	m2 : function (){
 	 //...
	}
});
//引用变量
if(module1.flag){
   //...
}
```

> 缺点：写法会暴露所有模块成员，内部状态可以被外部改写（对象私有属性会被改）

## 立即执行函数写法-Immediately-Invoked Function Expression，IIFE（不算做严谨闭包）

达到不暴露私有成员的目的, 这样保证了数据是私有的, 外部只能通过暴露的方法操作 

是为了形成块级作用域，不污染全局。常用的写法有：

- (function(形参){函数体})(实参)
- (function(形参){函数体}(实参))
- !function(形参){函数体}(实参)

```js
var i = function(){ return 10; }();
true && function(){ /* code */ }();
0, function(){ /* code */ }();
```

甚至像下面这样写，也是可以的。

```js
!function () { /* code */ }();
~function () { /* code */ }();
-function () { /* code */ }();
+function () { /* code */ }();
```

### IIFE模式：匿名函数自调用(闭包)

```html
// index.html文件
<script type="text/javascript" src="module.js"></script>
<script type="text/javascript">
    myModule.foo()
    myModule.bar()
    console.log(myModule.data) //undefined 不能访问模块内部数据
    myModule.data = 'xxxx' //不是修改的模块内部的data
    myModule.foo() //没有改变
</script>
```
```js
// module.js文件
(function(window) {
  let data = 'www.baidu.com'
  //操作数据的函数
  function foo() {
    //用于暴露有函数
    console.log(`foo() ${data}`)
  }
  function bar() {
    //用于暴露有函数
    console.log(`bar() ${data}`)
    otherFun() //内部调用
  }
  function otherFun() {
    //内部私有的函数
    console.log('otherFun()')
  }
  //暴露行为
  window.myModule = { foo, bar } //ES6写法
})(window)
```

![](js-模块化编程/image-20210214110153534.png)


> 优点: 模块外部没有办法修改module的变量函数
>
> 缺点：功能相对较弱，封装过程增加了工作量、仍会导致命名空间污染可能、闭包是有成本的。
>
> 问题: 如果当前这个模块依赖另一个模块怎么办?

### IIFE模式增强 : 引入依赖 - 现代模块实现的基石

```js
// module.js文件
(function(window, $) {
  let data = 'www.baidu.com'
  //操作数据的函数
  function foo() {
    //用于暴露有函数
    console.log(`foo() ${data}`)
    $('body').css('background', 'red')
  }
  function bar() {
    //用于暴露有函数
    console.log(`bar() ${data}`)
    otherFun() //内部调用
  }
  function otherFun() {
    //内部私有的函数
    console.log('otherFun()')
  }
  //暴露行为
  window.myModule = { foo, bar }
})(window, jQuery)
```
```html
<!--  index.html文件 引入的js必须有一定顺序 -->
  <script type="text/javascript" src="jquery-1.10.1.js"></script>
  <script type="text/javascript" src="module.js"></script>
  <script type="text/javascript">
    myModule.foo()
  </script>
```

上例子通过jquery方法将页面的背景颜色改成红色，所以必须先引入jQuery库，就把这个库当作参数传入。

> 这样做除了保证模块的独立性，还使得模块之间的依赖关系变得明显.
>
> **优点：**
>
> 相比于使用一个js文件，这种多个js文件实现最简单的模块化的思想是进步的。　
>
> **缺点：**
>
> 污染全局作用域。 因为每一个模块都是暴露在全局的，简单的使用，会导致全局变量命名冲突，当然，我们也可以使用命名空间的方式来解决。
>
> 对于大型项目，各种js很多，开发人员必须手动解决模块和代码库的依赖关系，后期维护成本较高。
>
> 依赖关系不明显，不利于维护。 比如main.js需要使用jquery，但是，从上面的文件中，我们是看不出来的，如果jquery忘记了，那么就会报错。

### 放大模式

### 宽放大模式（Loose augmentation）

与"放大模式"相比，＂宽放大模式＂就是"立即执行函数"的参数可以是空对象。

##  模块化的好处

- 避免命名冲突(减少命名空间污染)
- 更好的分离, 按需加载
- 更高复用性
- 高可维护性

## 引入多个`<script>`后出现出现问题

因为现在也免得导入都是通过多个script请求

- 请求过多

首先我们要依赖多个模块，那样就会发送多个请求，导致请求过多

- 依赖模糊

我们不知道他们的具体依赖关系是什么，也就是说很容易因为不了解他们之间的依赖关系导致加载先后顺序出错。

- 难以维护

## 最流行的commonjs, AMD, CMD , ES6 规范

###  1. CommonJS的模块化 

##### CommonJS exports 本质是什么? 

是exports的对象~ 所以 module.exports =function(){} 或者 ={} 会被直接覆盖~~~~

![commonJS](js-模块化编程/image-20210425140236806.png)

#### 特点

> 1. 主要用于服务器端，不适合前端；
> 2. 在服务器端,模块的加载是运行时同步加载的；
> 3. 在浏览器端，无法直接运行在浏览器端上，需要通过工具转换成标准的 ES5 ；
> 4. 所有代码都运行在模块作用域，不会污染全局作用域。(一个文件一个模块)
> 5. 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
>
> 6. 模块加载的顺序，按照其在代码中出现的顺序

服务器端模块化的规范,Node.js 采用了这个规范

CommonJS规范规定，每个模块内部，module变量代表当前模块。这个变量是一个对象，它的exports属性（即module.exports）是对外的接口。**加载某个模块，其实是加载该模块的module.exports属性**

#### 基本语法- `module.exports` `require`

- 暴露模块：`module.exports = value`或`exports.xxx = value`
- 引入模块：`require(xxx)`,如果是第三方模块，xxx为模块名；如果是自定义模块，xxx为模块文件路径

#### 引入整个模块

```js
// example.js
var x = 5;
var addX = function (value) {
  return value + x;
};
exports.x = x;//module.exports.x=x;
exports.addX = addX;
module.exports.add=(m,n)=>console.log(m+n);
```

```js
var example = require('./example.js'); 
console.log(example.x); // 5
console.log(example.addX(1)); // 6
example.add(1,5); // 6
```

#### 引入变量

```js
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
};
```

```js
// main.js
var counter = require('./lib').counter;
var incCounter = require('./lib').incCounter;

console.log(counter);  // 3
incCounter();
console.log(counter); // 3
```

CommonJS 加载模块是同步的，所以只有加载完成才能执行后面的操作。像Node.js主要用于服务器的编程，加载的模块文件一般都已经存在本地硬盘，所以加载起来比较快，不用考虑异步加载的方式，所以CommonJS规范比较适用。但如果是浏览器环境，要从服务器加载模块，这是就必须采用异步模式。所以就有了 AMD CMD 解决方案。

#### 小总结

> Browserify工具可以把nodejs的模块编译成浏览器可用的模块
>
> **优点：**
>
> CommonJS规范在服务器端率先完成了JavaScript的模块化，解决了依赖、全局变量污染的问题，这也是js运行在服务器端的必要条件。
>
> **缺点：**
>
> CommonJS 是同步加载模块的，在服务器端，文件都是保存在硬盘上，所以同步加载没有问题，
>
>  但是对于浏览器端，需要将文件从服务器端请求过来，那么同步加载就不适用了，所以，CommonJS是不太适用于浏览器端。

### 2. AMD(Asynchromous Module Definition) 异步模块定义

![AMD](js-模块化编程/amd)

#### why RequireJS 

AMD 是 RequireJS 在推广过程中对模块定义的规范化产出

> requireJS主要解决两个问题：
>
> 1 多个js文件可能有依赖关系，被依赖的文件需要早于依赖它的文件加载到浏览器。
>
> 2 js加载的时候浏览器会停止页面渲染，加载文件愈多，页面失去响应的时间愈长。

AMD异步加载模块。它的模块支持对象 函数 构造器 字符串 JSON等各种类型的模块。

#### 特点

> - 专门用于浏览器端；
> - 模块的加载是异步的， 模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行；
> - 依赖前置。

#### AMD定义两个API

**定义暴露模块**:

```js
//定义没有依赖的模块
define(function(){
   return //模块
})
//定义有依赖的模块
define(['module1', 'module2'], function(m1, m2){
   return //模块
})
```

**引入使用模块**:

```js
require(['module1', 'module2'], function(m1, m2){
   //使用m1/m2
})
```

下面是例子

```js
//定义alter模块
define(function () {
    var alertName = function (str) {
        alert("I am " + str);
    }
    var alertAge = function (num) {
        alert("I am " + num + " years old");
    }
    return {
        alertName: alertName,
        alertAge: alertAge
    };
});
```

```js
//引入模块
require(['alert'], function (alert) {
    alert.alertName('zhangsan');
    alert.alertAge(21);
});
```

#### 小总结

> **优点：**
>
> - 可以在不赚嘛情况下直接在浏览器运行
> - 可以异步加载模块。可以并行加载多个模块。
> - 可以运行在浏览器或者Node.js
>
> **缺点：**
>
> - JS 运行环境没有原生支持 AMD，需要先导入实现了 AMD 的库后才能正常使用。
> - 开发成本高，代码的阅读和书写比较困难，模块定义方式的语义不顺畅

### 3. CMD （Common Module Definition）通用模块定义(这里暂时跳过)

### 4. [ES6模块化 - 最香的 - import export](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/export) 

![es6](js-模块化编程/image-20210425162704469.png)

> 1. 在node中使用的是exports，不要混淆了
>
> 2. 这里一定注意一个地方**有效的路径符号**. 完整的非相对路径。这样在将其传给new URL(moduleSpecifier)的时候才不会报错。
> **以 / 开头。**
> **以 ./ 开头。**
> **以 ../ 开头。**
>
> 3. 在文件中的任何位置引入 import 模块都会被提前到文件顶部

#### 基本定义例子

**ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案**

export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。

```js
/** 定义模块 math.js **/
var basicNum = 0;
var add = function (a, b) {
    return a + b;
};
export { basicNum, add };
```
```js
/** 引用模块 **/
import { basicNum, add } from './math';
function test(ele) {
    ele.textContent = add(99 + basicNum);
} 
```

#### 花式自定义export import

如上例所示，使用import命令的时候，用户需要知道所要加载的变量名或函数名，否则无法加载。为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到export default命令，为模块指定默认输出。

```js
// export-default.js
export default function () {
  console.log('foo');
}

//例子：
export let myVariable = Math.sqrt(2);
export { name1, name2, …, nameN };
export { variable1 as name1, variable2 as name2, …, nameN };
export let name1, name2, …, nameN; // also var
export let name1 = …, name2 = …, …, nameN; // also var, const
 
export default   function (…) { … } // also class, function*
export default function name1(…) { … } // also class, function*
export { name1 as default, … };
 
export * from …;
export { name1, name2, …, nameN } from …;
export { import1 as name1, import2 as name2, …, nameN } from …;
```
```js
// import-default.js
import customName from './export-default';
customName(); // 'foo'


//导入整个模块的内容，这将myModule插入当前作用域
import * as myModule from '/modules/my-module.js';
//重命名接口
import {reallyReallyLongModuleExportName as shortName} from '/modules/my-module.js';
//运行模块中的全局代码, 执行js,但实际上不导入任何值
import '/modules/my-module.js'; 

//例子：
import defaultMember from "module-name";
import * as name from "module-name";
import { member } from "module-name";
import { member as alias } from "module-name";
import { member1 , member2 } from "module-name";
import { member1 , member2 as alias2 , [...] } from "module-name";
import defaultMember, { member [ , [...] ] } from "module-name";
import defaultMember, * as name from "module-name";
import "module-name";
```

#### [动态import](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import#%E5%8A%A8%E6%80%81import)

关键字import可以像调用函数一样来动态的导入模块。以这种方式调用，将返回一个 `promise`。

```js
import('/modules/my-module.js')
  .then((module) => {
    // Do something with the module.
  });
```

这种使用方式也支持 `await` 关键字。

```js
let module = await import('/modules/my-module.js');
```

### ES6 模块与 CommonJS 模块的对比

**① CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用**。

**② CommonJS 模块是运行时加载，ES6 模块是编译时输出接口**。

## 总结

- CommonJS规范主要用于服务端编程，加载模块是同步的，这并不适合在浏览器环境，因为同步意味着阻塞加载，浏览器资源是异步加载的，因此有了AMD CMD解决方案。
- AMD规范在浏览器环境中异步加载模块，而且可以并行加载多个模块。不过，AMD规范开发成本高，代码的阅读和书写比较困难，模块定义方式的语义不顺畅。
- CMD规范与AMD规范很相似，都用于浏览器编程，依赖就近，延迟执行，可以很容易在Node.js中运行。不过，依赖SPM 打包，模块的加载逻辑偏重
- **ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案**。

## 重点易错点

###  ES6 模块和 CommonJS 模块的不同点

#### 模块中的值变化(Commonjs vs ES6)

```js
// a.js
var b = require('./b');
console.log(b.foo);
setTimeout(() => {
  console.log(b.foo);
  console.log(require('./b').foo);
}, 1000);

// b.js
let foo = 1;
setTimeout(() => {
  foo = 2;
}, 500);
module.exports = {
  foo: foo,
};
// 执行：node a.js
// 执行结果：
// 1
// 1
// 1
```

```js
  console.log(b.foo());
  console.log(require('./b').foo());
}, 1000);

// b.js
let foo = 1;
setTimeout(() => {
  foo = 2;
}, 500);
module.exports = {
  foo: () => {
    return foo;
  },
};
// 执行：node a.js
// 执行结果：
// 1
// 2
// 2
```

或者 更新数据的时候每次都要去更新 module.exports 上的值

```js
// a.js
var b = require('./b');
console.log(b.foo);
setTimeout(() => {
  console.log(b.foo);
  console.log(require('./b').foo);
}, 1000);

// b.js
module.exports.foo = 1;   // 同 exports.foo = 1 
setTimeout(() => {
  module.exports.foo = 2;
}, 500);

// 执行：node a.js
// 执行结果：
// 1
// 2
// 2
```

所以对于CommonJS 

- CommonJS 模块输出的是值的拷贝(原始值的拷贝)，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。
- CommonJS 模块重复引入的模块并不会重复执行，再次获取模块直接获得暴露的 module.exports 对象
- 如果你要处处获取到模块内的最新值的话，也可以你每次更新数据的时候每次都要去更新 module.exports 上的值; 如果你暴露的 module.exports 的属性是个对象，那就不存在这个问题了

但是对于ES6 不再是生成输出对象的拷贝，而是动态关联模块中的值.所以不会有这个问题

#### 编译区别

对于es6

export 命令会有变量声明提前的效果。
import 优先执行:

```js
// a.js
console.log('a.js')
import { foo } from './b';

// b.js
export let foo = 1;
console.log('b.js 先执行');

// 执行结果:
// b.js 先执行
// a.js
```

```js
// a.js
import { foo } from './b';
console.log('a.js');
export const bar = 1;
export const bar2 = () => {
  console.log('bar2');
}
export function bar3() {
  console.log('bar3');
}

// b.js
export let foo = 1;
import * as a from './a';
console.log(a);

// 执行结果:
// { bar: undefined, bar2: undefined, bar3: [Function: bar3] }
// a.js
```



###  ES6 模块和 CommonJS 模块的相同点

#### 1. 模块不会重复执行

CommonJS 模块循环依赖

```js
//这里是commonjs
// a.js
console.log('a starting');
exports.done = false;
const b = require('./b');
console.log('in a, b.done =', b.done);
exports.done = true;
console.log('a done');

// b.js
console.log('b starting');
exports.done = false;
const a = require('./a');
console.log('in b, a.done =', a.done);
exports.done = true;
console.log('b done');

// node a.js
// 执行结果：
// a starting
// b starting
// in b, a.done = false
// b done
// in a, b.done = true
// a done
```

结合之前讲的特性很好理解，当你从 b 中想引入 a 模块的时候，因为 node 之前已经加载过 a 模块了，所以它不会再去重复执行 a 模块，而是直接去生成当前 a 模块吐出的 module.exports 对象，因为 a 模块引入 b 模块先于给 done 重新赋值，所以当前 a 模块中输出的 module.exports 中 done 的值仍为 false。而当 a 模块中输出 b 模块的 done 值的时候 b 模块已经执行完毕，所以 b 模块中的 done 值为 true。







## Reference

[前端模块化详解(完整版)](https://juejin.cn/post/6844903744518389768#heading-7)

[彻底搞清楚javascript中的require、import和export](https://www.cnblogs.com/libin-1/p/7127481.html)

[import export 官方解释](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import)

尚硅谷模块化讲解