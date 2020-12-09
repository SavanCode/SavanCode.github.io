---
title: js closure
top: false
cover: false
toc: true
mathjax: true
date: 2020-11-26 09:49:29
password:
summary:
tags: JS
categories:
---

# JS变量声明

JS中变量申明分显式申明和隐式申明。 

- vari=100;//显式申明 
- i=100;//隐式申明 

# JS作用域 与变量（scope）

- **全局变量 - global**：在函数外部定义的变量，可以在函数内部使用
- **局部变量 - local** ：在函数内部定义的变量，只能在函数内部使用
  - 其中，在函数内部定义的变量，如果不写var，也是全局变量。在外部使用前，需先执行这个函数（不推荐）
- 如果全局变量与局部变量有冲突，使用局部变量。（作用域近的）
- **块级作用域** Function scope/Block scope: 函数内部 或者 { } 内部
  - for while if ，块级作用域可通过新增命令 let 和 const 声明，所声明的变量在指定块的作用域外无法被访问。
  - 基本上可以用 let 来代替 var 进行变量声明，只有块级变量，没有块级函数
- **作用域链**会先从自身开始查找作用域内的变量，有就执行，没有就往上一层作用域链查找，直到顶端为止，如果顶端还是没有就抛出异常。
- **自由变量** :  当前作用域没有定义的变量

Javascript函数内部可以直接读取全局变量。

![基本作用域例子](js-closure/1606362501029.png)

最后输出的结果为 2, 4, 12

- 泡泡 1 是全局作用域，有标识符 foo；
- 泡泡 2 是作用域 foo，有标识符 a,bar,b；
- 泡泡 3 是作用域 bar，仅有标识符 c。


# 外部读取局部变量

1. 在函数的内部，再定义一个函数
2. 将内部函数值返回

```js
　function f1(){
　　　　var n=999;
　　　　function f2(){
　　　　　　alert(n); // 999
　　　　}
　　}
```

Javascript语言特有的"链式作用域"结构（chain scope），子对象会一级一级地向上寻找所有父对象的变量。所以，父对象的所有变量，对子对象都是可见的，反之则不成立。

```js
function f1(){
　　　　var n=999;
　　　　function f2(){
　　　　　　alert(n);
　　　　}
　　　　return f2;
　　}
　　var result=f1();
　　result(); // 999
```

# 函数作用域查找

## 1、定义说明

1）函数当前作用域查找不到，可以访问外层函数作用域的活动对象（参数、局部变量、定义在外层函数体里的函数）
2）外层的外层函数。。。一直到全局

## 2、原理

执行环境、作用域链、作用域、活动对象
1）调用内层函数，会创建一个执行环境，执行环境会关联一个作用域链
2）调用内层函数时，所有的外层函数都已经调用完毕或者外层函数调用中，所有只要把所用外层函数作用域（包括最外层全局）的活动对象，关联到当前内层函数的作用域链上。
3）最后创建内层函数作用域的活动对象，并且关联到作用域链的最前端。

活动对象注释：
函数参数，函数体里面定义的局部变量，函数体里面定义的函数

## 3、例子

```js
var str1 = '全局变量';
function func(arg) {
　　var str2 = '外层局部变量';
　　function funcInner1() {
　　　　console.log('外层函数的其他函数');
　　}
　　function funcInner2(argInner2) {
　　　　var str3 = '内层函数变量';
　　　　console.log(str3);
　　　　console.log(argInner2);

　　　　console.log(arg);
　　　　console.log(str2);
　　　　funcInner1();
　　　　console.log(str1);
　　}
　　return funcInner2;
}
var result = func('外层函数参数')
result('内层函数参数');
/*
执行结果：
内层函数变量
内层函数参数
外层函数参数
外层局部变量
外层函数的其他函数
全局变量*/
```

# 自测

```js
var n=999;
function f1(){
　　alert(n); 
　　}
f1(); // 999 

//外部函数之间的作用域是分开的
function loo(){
	vargoo=1;moo();}
function moo(){
	console.log(goo);}
loo();
//UncaughtReferrenceError:goo is not defined

//注意下面的区别
(function(){
　　var n=999;
　　})();
console.log(n);//undefined

var n=999;
(function f1(){
　　alert(n); //999
　　})();


var salary="653.582";
(function(){
    console.log("original salary"+salary);// undefined
    var salary="789";//如果这里没有，那么上面不是undefined；但是内部有的 先看内部
})();


{
  const hello = 'Hello CSS-Tricks Reader!'
  console.log(hello) // 'Hello CSS-Tricks Reader!'
  function f1(){ console.log("this is inside")} //这个全局函数
   let f= function(){};//块级变量
}

console.log(hello) // Error, hello is not defined
f1();//"this is inside"
```

另一方面，在函数外部自然无法读取函数内的局部变量。

```js
　function f1(){
　　　　var n=999;
　　}
　　alert(n); // error
```

这里有一个地方需要注意，函数内部声明变量的时候，一定要使用var命令。**如果不用的话，你实际上声明了一个全局变量！**

```js
function f1(){
　　　　n=999;
　　}
　　f1();
　　alert(n); // 999
```

关于自由变量取值

```js
var x = 10;
function fn() {
    console.log(x);
}
function show(f) {
    var x = 20(function() {
        f(); //10，而不是20
    })();
}
show(fn);
```

> 在 fn 函数中，取自由变量 x 的值时，要到哪个作用域中取？——**要到创建这个函数的那个域”。—其实这就是所谓的”静态作用域”**

```js
var a = 10;
function fn() {
    var b = 20;
    function bar() {
        console.log(a + b); //30
    }
    return bar;
}
var x = fn(),
    b = 200;
x(); //bar()
```

> fn()返回的是 bar 函数，赋值给 x。执行 x()，即执行 bar 函数代码。取 b 的值时，直接在 fn 作用域取出。取 a 的值时，试图在 fn 作用域取，但是取不到，只能转向创建 fn 的那个作用域中去查找，结果找到了,所以最后的结果是 30



# 闭包实际概念

一个函数和对其周围状态（**lexical environment，词法环境**）的引用捆绑在一起（或者说函数被引用包围），这样的组合就是**闭包**（**closure**）。

> 闭包就是能够读取其他函数内部变量的函数。
>
> 由于在Javascript语言中，只有函数内部的子函数才能读取局部变量，因此可以把闭包简单理解成"定义在一个函数内部的函数"。
>
> 所以，在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。

闭包可以用在许多地方。它的最大用处有两个，一个是前面提到的可以**读取函数内部的变量**，另一个就是**让这些变量的值始终保持在内存中**。使用闭包十分容易造成浏览器的内存泄露，严重情况下会是浏览器挂死

## 基本例子

```js
function fn(){
    var num=100;
    console.log(num);
    num++
}
fn();//100
fn();//100


function aa(){
    var n =1;//常驻变量 不会被销毁
    return function(){return n++;}
}
var a1=aa(),
var a2=aa();
    console.log(a1());//1 n=2
    console.log(a1());//2 n=3
	console.log(a2());//1 n=2
```

a1、a2中的变量n是独立的，存储在各自的作用域里，互不干涉



## 匿名函数 - IIFE - immediately Invoked Function Expression

匿名函数最大的用途是创建闭包（这是JavaScript语言的特性之一），并且还可以构建命名空间，以减少全局变量的使用

```js
var oEvent = {}; 

(function(){ 
    var addEvent = function(){ /*代码的实现省略了*/ }; 
    function removeEvent(){} 
    oEvent.addEvent = addEvent; 
    oEvent.removeEvent = removeEvent; 
})();
```

在这段代码中函数addEvent和removeEvent都是局部变量，但我们可以通过全局变量oEvent使用它，这就大大减少了全局变量的使用，增强了网页的安全性。

```js
oEvent.addEvent(document.getElementById('box') , 'click' , function(){});
var rainman = (function(x , y){ 
return x + y; 
})(2 , 3); 
/** 
* 也可以写成下面的形式，因为第一个括号只是帮助我们阅读，但是不推荐使用下面这种书写格式。 
* var rainman = function(x , y){ 
* return x + y; 
* }(2 , 3);
**/
```

## 闭包中的匿名函数

下面的情况是很熟悉的

```js
"use strict";
var a=[];
for(var i=0;i<10;i++){
        a[i]=function(){
            return i;
        }
}
console.log(a[0]());
console.log(a[1]());
console.log(a[2]());
```

如果使用闭包能改变吗？

```js
"use strict";
var a=[];
for(var i=0;i<10;i++){
    (function(){
        a[i]=function(){
            return i;
        }
    })()
}
console.log(a[0]());//10
console.log(a[1]());//10
console.log(a[2]());//10
```

实际上闭包是不能的，一定注意先循环后面函数被call时候，函数才被运行，实际解决办法

```js
"use strict";
var a=[];
for(var i=0;i<10;i++){
    console.log(i);
        a[i]=(function(){
            console.log(i);
            return i;
        })();

}

//或者
"use strict";
var a=[];
for(var i=0;i<10;i++){
    (function(){
        var y=i;//只有这样下层return才能知道i是多少
        a[i]=function(){
            return y;
        }
    })()
}
console.log(a[0]());
console.log(a[1]());
console.log(a[2]());

//实际上面的写法 按照匿名函数，最好的写法是：
"use strict";
var a=[];
for(var i=0;i<10;i++){
    (function(y){
        console.log("this is y : "+y);
        a[y]=function(){
            return y;
        }
    })(i)
}
```



## 实际应用中经典例子

```js
/** 
* <body> 
* <ul> 
* <li>one</li> 
* <li>two</li> 
* <li>three</li> 
* <li>one</li> 
* </ul> 
*/
var lists = document.getElementsByTagName('li'); 
for(var i = 0 , len = lists.length ; i < len ; i++){ 
    lists[ i ].onmouseover = function(){ 
    	alert(i); 
    }; 
}
```

当mouseover事件调用监听函数时，首先在匿名函数（ function(){ alert(i); }）内部查找是否定义了 i，结果是没有定义；因此它会向上查找，查找结果是已经定义了，并且i的值是4（循环后的i值）；所以，最终每次弹出的都是4。

解决方法一：

```javascript
var lists = document.getElementsByTagName('li'); 
for(var i = 0 , len = lists.length ; i < len ; i++){     
    (function(index){         
        lists[ index ].onmouseover = function(){             
            alert(index);         
        };     
    })(i); //这是一种自执行函数的格式，前一个括号是匿名函数，解析器执行后返回一个函数对象然后调用后面一个括号(i)，所以后面一个括号就是函数参数}
```

解决办法二：

```js
function eventListener(list, index){ 
    list.onmouseover = function(){ 
    	alert(index); 
    }; 
} 
var lists = document.getElementsByTagName('li'); 
for(var i = 0 , len = lists.length ; i < len ; i++){ 
eventListener(lists[ i ] , i); 
}
```

# 自测

注意构造函数中的this，主要看是哪个obj调用这个function

![](js-closure/1607174318636.png)

```js
　　var name = "The Window";
　　var object = {
　　　　name : "My Object",
　　　　getNameFunc : function(){
　　　　　　return function(){
　　　　　　　　return this.name;
　　　　　　};
　　　　}
　　};
　　alert(object.getNameFunc()());
```

```js
　var name = "The Window";
　　var object = {
　　　　name : "My Object",
　　　　getNameFunc : function(){
　　　　　　var that = this;
　　　　　　return function(){
　　　　　　　　return that.name;
　　　　　　};
　　　　}
　　};
　　alert(object.getNameFunc()());
```





Reference：

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures

http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html