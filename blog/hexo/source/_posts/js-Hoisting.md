---
title: js Hoisting 变量提升
top: false
cover: false
toc: true
mathjax: true
date: 2021-03-06 15:44:39
password:
summary: js Hoisting 变量提升
tags: [JS,es6]
categories: JS
---

变量提升这个很需要理解好，不然基本一碰一个懵 

## 基本理解什么是变量提升

JavaScript中奇怪的一点是你可以在变量和函数声明之前使用它们
```js
sayHi() // Hi there!

function sayHi() {
    console.log('Hi there!')
}

name = 'John Doe'
console.log(name)   // John Doe
var name
```

然而JavaScript并不会移动你的代码，所以JavaScript中“变量提升”并不是物理意义上的“提升”。

JavaScript是单线程语言，所以执行肯定是按顺序执行。JS会先进行编译阶段然后才是执行阶段。

**在编译阶段阶段，JS会检测到所有的变量和函数声明，所有函数和变量声明都被添加到名为[Lexical Environment](https://blog.bitsrc.io/understanding-execution-context-and-execution-stack-in-javascript-1c9ea8642dd0)的JavaScript数据结构内的内存中。所以这些变量和函数能在它们真正被声明之前使用。**

预解析过程也就是创建 AO（Activation Object） 的过程。

创建AO过程：

-  创建 AO 对象。
-  将形参和函数内变量声明作为对象的属性名，属性值统一为 **undefined**。
-  将实参赋值给形参。
-  找函数内的函数声明作为对象的属性名，属性值为函数体。

也就是

```js
sayHi() // Hi there!

function sayHi() {
    console.log('Hi there!')
}

lexicalEnvironment = {
  sayHi: < func >
}
```

## var的变量提升

```js
console.log(kid)   // 'undefined'
var kid = 'John Doe'
console.log(kid)   // John Doe
```

这里会觉得很奇怪哦。*为什么在声明变量，同时并且赋值的条件下，第一个输出还是undefined呢？*

```js
//var kid = 'John Doe' 会分成两部分
var kid    // 声明变量
kid = 'John Doe' // 赋值操作
```

因为JS会将声明的var变量会添加到`lexicalEnvironment`中，并初始化一个值`undefined`，只有在执行的时候才把值加到`lexicalEnvironment`. 所以函数表达式不会提升

## let & const提升

```js
console.log(a)  // ReferenceError: a is not defined
let a = 3
```

function, var, let, const, class 都会被“提升”。但是只有使用`var`关键字声明的变量才会被初始化`undefined`值，而`let`和`const`声明的变量则不会被初始化值。

JavaScript引擎在声明变量之前，无法访问该变量。这就是我们所说的**Temporal Dead Zone**

除非

````js
let a
console.log(a)  // undefined
a = 5
````

## 函数提升

```js
sayHi() // Hi there!

function sayHi() {
    console.log('Hi there!')
}
```

**注意：使用匿名函数的方式不存在函数提升，因为函数名称使用变量表示的，只存在变量提升**

```js
var getName=function(){ console.log(2); }

function getName(){ console.log(1); }

getName();//结果为2
```

**函数优先，虽然函数声明和变量声明都会被提升，但是函数会首先被提升，然后才是变量**

```js
//函数、变量声明提升后
function getName(){    //函数声明提升到顶部
  console.log(1);
}

var getName;    //变量声明提升
getName = function(){    //变量赋值依然保留在原来的位置
  console.log(2); 
}

getName();    // 最终输出：2
```



## Class提升

同`let`和`const`一样，`class`在JavaScript中也是会被“提升”的，在被真正赋值之前都不会被初始化值, 同样受**Temporal Dead Zone**的影响。

```javascript
let peter = new Person('Peter', 25) // ReferenceError: Person is not defined

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

let John = new Person('John', 25); 
console.log(John) // Person { name: 'John', age: 25 }
```





