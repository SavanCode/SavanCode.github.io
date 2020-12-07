---
title: js this keyword
top: false
cover: false
toc: true
mathjax: true
date: 2020-11-25 20:07:12
password:
summary:
tags: JS
categories:
---

# JavaScript this 关键字

面向对象语言中 this 表示当前对象的一个引用, 它会随着执行环境的改变而改变。

> `this`绑定的四种情况：
>
> 1. new 绑定。`new`实例化
> 2. 显示绑定。`call`、`apply`、`bind`手动更改指向
> 3. 隐式绑定。由上下文对象调用，如 `obj.fn()`，`this` 指向 `obj`
> 4. 默认绑定。默认绑定全局对象（没有被上下文对象调用，也是全局对象），在严格模式下会绑定到`undefined`。
>
> 优先级new绑定最高，最后到默认绑定。 

## 在obj function中，this 表示该方法所属的对象

```js
function test() {
  console.log(this.x);
}

var obj = {};
obj.x = 1;
obj.m = test;

obj.m(); // 1 
```



## variable 定义使用，this 表示全局对象

window 就是该全局对象为 [**object Window**]

```html
<script>
var x = this;
document.getElementById("demo").innerHTML = x;
</script>
```



## 普通函数中，this 表示全局对象。

```js
function myFunction() {
  return this;
}

function sayMyName(){
	var name = "JavaScript"
	console.log(this.name);//undefined
	console.log(this.name);//Window
}
sayMyName();
window.sayMyName();

//箭头函数
var name = "windows";
var arrowFun=()=>{
	console.log(this.name);
}
arrowFun();  // 结果：windows
// 原因：箭头函数this指向取决于它定义时的父级作用域
```

**思考下面的函数作用域**

```js

var x = function () {
  console.log(a);
};

function y(f) {
  var a = 2;
  f();
}

y(x)
// ReferenceError: a is not defined

var a = 1;
var x = function () {
  console.log(a);
};

function f() {
  var a = 2;
  x();
}

f() // 1
```

函数`x`是在函数`f`的外部声明的，所以它的作用域绑定外层，内部变量`a`不会到函数`f`体内取值，所以输出`1`，而不是`2`。

总之，函数执行时所在的作用域，是定义时的作用域，而不是调用时所在的作用域

```js
function foo() {
  var x = 1;
  function bar() {
    console.log(x);
  }
  return bar;
}

var x = 2;
var f = foo();
f() // 1
```

函数体内部声明的函数，作用域绑定函数体内部。

## 构造函数中，this指向constructor

```js
var name = "windows";
function Person() {
	this.name = "constructor";
	this.fun1 = function () {
		console.log(this.name);  // 结果：constructor
	};
	this.fun2 = () =>{
		console.log(this.name);  // 结果：constructor
	};
}
var p = new Person();
p.fun1();  // 结果：constructor
p.fun2();  // 结果：constructor
// 构造函数里的普通方法this指向构造函数new后的实例
// 箭头函数的this是父级作用域，父级是Person，Person是函数有自己的作用域且内部this指向自己
// 所以箭头函数的this就是指向person的
```



## prototype函数中定义的this （箭头/一般函数）

```js
var name = "windows";
function Person() {
	this.name = "constructor";
	this.fun1 = function () {
		console.log(this.name);  // 结果：constructor
	};
	this.fun2 = () =>{
		console.log(this.name);  // 结果：constructor
	};
}
Person.prototype.fun3 = function() {
	console.log(this.name);
};
Person.prototype.fun4 = () => {
	console.log(this.name);
}
var p = new Person();
p.fun3();  // 结果：constructor
p.fun4();  // 结果：windows
// 原因：fun3()挂在到原型上的普通方法的this指向构造函数new的实例
// 原因：fun4()挂在到原型上的箭头函数this取决于上下文的作用域，
// fun4()是在全局下挂载到Person的原型上的，所以this指向window
```



## 严格模式下，this 是未定义的(undefined)。

```js
"use strict";
function myFunction() {
  return this;
}
```



## this直向上级对象（一层对象）

```js
 var book = {
        name: "JavaScript",
        getBookName: function(){
            return this.name;
        }
    }
    console.log(book.getBookName()); 
// this指的是book 所以： JavaScript

//但是对于箭头函数
var name = "windows";
var obj = {
	name: "objFun",
	arrawFun: () => {
		console.log(this.name);  // 结果：windows
	}
}
obj.arrawFun();  // 结果：windows
// 原因：箭头函数的this取决于父级作用域，父级是对象没有自己独立的作用域而是位于全局，所以向上延申，找到了window
```



## event中，this 表示接收事件的元素。

```html
<button onclick="this.style.display='none'">
点我后我就消失了
</button>
```



## 难点*  多个对象嵌套

### 对象内嵌对象，外层对象调用函数，函数的this只指向上级对象

```js
 var book = {
            name: "JavaScript",
     		getBookName: function() {  return this.name;}
            computerBook: {
                name: "Node.js",
                getBookName: function() {  return this.name;}
            }
        }
        console.log(book.computerBook.getBookName()); 
//Node.js
//this 指向的就是 computerBook这个对象 普通函数的this谁调用就指向谁

        var book = {
            name: "JavaScript",
            getBookName: function() {  return this.name;}
            computerBook: {
                //name: "Node.js",
                getBookName: function() {  return this.name;}
            }
        }
        console.log(book.computerBook.getBookName()); 
//undifined
//this 指向的就是 computerBook这个对象

//此时this指向是什么？
        var book = {
            name: "JavaScript",
            getBookName: function() {  return this.name;}
            computerBook: {
                name: "Node.js",
                getBookName: function() {  return this.name;}
            }
        }
        // console.log(book.computerBook.getBookName());
        var temp = book.computerBook.getBookName;
        console.log(temp()); //undefined
        console.log(window.temp()); //undefined
//this只有在运行的时候，才能被确定，temp在执行这个函数的时候，默认是在全局环境下执行的。所以是Window
```

#### 箭头函数下

```js
var book = {
            name: "JavaScript", 
            computerBook: {
                //name: "Node.js",
            getBookName:()=> { console.log(this.name);}  // 结果：windows
            }
        }
        console.log(book.computerBook.getBookName()); // 结果：windows
// 原因；箭头函数的this取决于父级作用域，父级是对象没有自己独立的作用域
// 所以向上延申一层，但还是对象，所以再向上延申一层，就找到了window
```



#### 延伸一下，看下跨对象取值

```js
var book = {
            name: "JavaScript",
     		"say":function(){ console.log(this);}
            computerBook: {
                name: "Node.js",
                "sing":function(){console.log(this);}
            }
        }
   //this 指向对象本身， 但是如果我想要从computerbook 取得book的name属性怎么办？
```

解决办法：

```js
var book = {
            name: "JavaScript",
     		"say":function(){ console.log(this);}
    		var that = this; //此处命名随便
            computerBook: {
                name: "Node.js",
                "sing":function(){
                    console.log(this);
                    console.log(that.name);//再次调用
                }
            }
        }
```



### 链式使用中的this（连贯调用）

```js
var obj={
    "age":40;
    "son":{
    	"age":20,
    	"say":function(){console,log(this);}
	}
}
obj.son.say()//此时this指向的是obj 
```

### 函数嵌套中的this

函数嵌套，由于是普通函数调用，所有this都是指向window

```js
function f1(){
	console.log(this); //window
	function f2(){
		console.log(this);//window
	}
	f2();//因为没有被上下文对象call 是Window call的
}
f1();
```

对象里的方法返回普通方法 （优化就是 跨域取值）

```js
var name = "windows";
var obj = {
	name: "obj",
	fun: function () {
		return function(){
			console.log(this.name);
		}
	}
}
obj.fun();  // 结果：ƒ (){console.log(this.name);}
obj.fun()();  // 结果：windows
// 原因：obj.fun()执行后返回一个方法，所以再加一对“()”会执行
// 执行的时候这个方法相当于被全局调用，所以this指向window。

//但是对于箭头函数 就不一样了
var name = "windows";
var obj = {
	name: "obj",
	fun: function () {
		return () => {
			console.log(this.name);
		}
	}
}
obj.fun();  // 结果：() => {console.log(this.name);}
obj.fun()();  // 结果：obj
// 原因：箭头函数的this指向父级作用域，
// 箭头函数的父级是function，function会形成独立的作用域
// 而function作用域中的this指向obj，所以箭头函数的this就指向了obj
```





## 显示函数绑定，类似 call() 和 apply() 方法可以将 this 引用到任何对象。

```js
var person1 = {
  fullName: function() {
    return this.firstName + " " + this.lastName;
  }
}
var person2 = {
  firstName:"John",
  lastName: "Doe",
}
person1.fullName.call(person2);  // 返回 "John Doe"
```

`apply()`是函数的一个方法，作用是改变函数的调用对象。它的第一个参数就表示改变后的调用这个函数的对象。因此，这时`this`指的就是这第一个参数。

```javascript
var x = 0;
function test() {
　console.log(this.x);
}

var obj = {};
obj.x = 1;
obj.m = test;
obj.m.apply() // 0
```

`apply()`的参数为空时，默认调用全局对象。因此，这时的运行结果为`0`，证明`this`指的是全局对象。

如果把最后一行代码修改为

```javascript
obj.m.apply(obj); //1
```



## 改变 this 指向- this()  apply()  bind()

### Function.prototype.call()

+ 使用方法, 就直接连接再函数名后面使用
+ 语法:
  -> fn.call() / func.call(thisValue, arg1, arg2, ...)
  -> obj.fn.call()
+ 参数:
  -> 第一个参数, 就是函数内部的 this 指向
  -> 第二个参数开始, 依次给函数传递参数
+ 特点:
  -> 会立即执行函数(不适合用作定时器处理函数或者事件处理函数)
+ 作用:
  -> 伪数组借用数组方法

```js
var n = 123;
var obj = { n: 456, "f":functoin(){}};

function a() {
  console.log(this.n);
}

//重要的结论： a()=a.call(window) 如果是有参数的a("Hello world")=a.call(window,"Hello world")

a.call() // 123
a.call(null) // 123
a.call(undefined) // 123
a.call(window) // 123
a.call(obj) // 456

//当被对象调用的时候，指向就是对象了哦
obj.f()--> obj.f.call(obj)
person.hello("world") -->  person.hello.call(person, "world")
```

对于匿名函数

```js
(function(name) {
        //
    })("aa");
//等价于
(function(name) {
        //
    }).call(window, "aa");
```



```js
//调用原生
var obj = {};
obj.hasOwnProperty('toString') // false

// 覆盖掉继承的 hasOwnProperty 方法
obj.hasOwnProperty = function () {
  return true;
};
obj.hasOwnProperty('toString') // true

Object.prototype.hasOwnProperty.call(obj, 'toString') // false
```

`hasOwnProperty`是`obj`对象继承的方法，如果这个方法一旦被覆盖，就不会得到正确结果。`call`方法可以解决这个问题，它将`hasOwnProperty`方法的原始定义放到`obj`对象上执行，这样无论`obj`上有没有同名方法，都不会影响结果。

### apply()

+ 使用方法, 就直接连接再函数名后面使用
+ 语法:
  -> fn.apply()
  -> obj.fn.apply()
+ 参数: func.apply(thisValue, [arg1, arg2, ...])
  -> 第一个参数, 就是函数内部的 this 指向
  -> 第二个参数: 是一个**数组**, 里面的每一项依次给函数传递参数
+ 特点:
  -> 会立即执行函数
+ 作用: 可以以数组的形式给某些功能函数传参
  -> Math.max()

```js
//跟for each的差别， 会有跳过
var a = ['a', , 'b'];

function print(i) {
  console.log(i);
}

a.forEach(print)
// a
// b

Array.apply(null, a).forEach(print)
// a
// undefined
// b
```



### Function.prototype.bind()

- 使用方法, 就直接连接再函数名后面使用
- 语法:
  -> fn.apply()
  -> obj.fn.apply()
- 参数:
  -> 第一个参数. 就是函数内部的 this 指向
  -> 从第二个参数开始, 依次给函数传递参数
- 特点:
  -> 不会立即调用函数
  -> 会返回一个新的函数, 一个已经被改变好 this 指向的函数
- 作用:
  -> 改变事件处理函数或者定时器处理函数的 this 指向

```js
var counter = {
  count: 0,
  inc: function () {
    this.count++;//这里的this是windows
  }
};

var func = counter.inc.bind(counter);//重新绑定为obj
func();
counter.count // 1
```

```js
"use strict";
function fun(name){console.log("hello"+this+" "+name);}.bind("lucy");
fun("bennet");
//UncaughtSyntaxError:Unexpectedtoken'.'

"use strict";
var sayhello = function (name){console.log("hello"+this+" "+name);}.bind("lucy");
fun("bennet");
// hello bennet lucy
```



Reference：

- http://www.ruanyifeng.com/blog/2010/04/using_this_keyword_in_javascript.html
- https://javascript.ruanyifeng.com/oop/this.html#toc3
- https://blog.csdn.net/hellochenlu/article/details/52244276?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.control
- https://blog.csdn.net/kindergarten_sir/article/details/109909886?utm_medium=distribute.pc_relevant.none-task-blog-title-3&spm=1001.2101.3001.4242

