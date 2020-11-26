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
> 4. 默认绑定。默认绑定全局对象，在严格模式下会绑定到`undefined`
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



## 在函数中，this 表示全局对象。

```js
function myFunction() {
  return this;
}

```

思考下面的函数作用域

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

## 在函数中，在严格模式下，this 是未定义的(undefined)。

```js
"use strict";
function myFunction() {
  return this;
}
```

## 在事件中，this 表示接收事件的元素。

```html
<button onclick="this.style.display='none'">
点我后我就消失了
</button>
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



## 改变 this 指向- this apply bind

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
var obj = { n: 456 };

function a() {
  console.log(this.n);
}

a.call() // 123
a.call(null) // 123
a.call(undefined) // 123
a.call(window) // 123
a.call(obj) // 456
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

Reference：

- http://www.ruanyifeng.com/blog/2010/04/using_this_keyword_in_javascript.html
- https://javascript.ruanyifeng.com/oop/this.html#toc3

