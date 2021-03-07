---
title: js es6 class
top: false
cover: false
toc: true
mathjax: true
date: 2021-03-07 18:26:22
password:
summary: ES6 Class 类的小笔记
tags: [JS,es6]
categories: JS
---

## 基本声明

```js
// 匿名类
let Example = class {
    constructor(a) {
        this.a = a;
    }
}
// 命名类
let Example = class Example {
    constructor(a) {
        this.a = a;
    }
}

class Example {
    constructor(a) {
        this.a = a;
    }
}
```

## class 属性 

### prototype

```js
//定义方法
Example.prototype={
    //methods
}

//添加方法
Object.assign(Example.prototype,{
    //methods
})
```

### 静态属性

ES6 中规定，Class 内部只有静态方法，没有静态属性。

```js
class Example {
// 新提案
    static a = 2;
}
// 目前可行写法
Example.b = 2;
```

### 公共属性

```js
class Example{}
Example.prototype.a = 2;

```

### 实例属性

```js
class Example {
    a = 2;
    constructor () {
        console.log(this.a);
    }
}
```

### name 属性

返回跟在 class 后的类名(存在时)。

```js
let Example=class Exam {
    constructor(a) {
        this.a = a;
    }
}
console.log(Example.name); // Exam
 
let Example=class {
    constructor(a) {
        this.a = a;
    }
}
console.log(Example.name); // Example
```

## 方法

### constructor

```js
class Example{
    constructor(){
      console.log('我是constructor');
    }
}
new Example(); // 我是constructor
```

### 返回对象

```js
class Test {
    constructor(){
        // 默认返回实例对象 this
    }
}
console.log(new Test() instanceof Test); // true
 
class Example {
    constructor(){
        // 指定返回对象
        return new Test();
    }
}
console.log(new Example() instanceof Example); // false
```

### 静态方法
```js
class Example{    
	static sum(a, b) {        
		console.log(a+b);    
	} 
} 
Example.sum(1, 2); // 3
```
### 原型方法
```js
class Example {    
	sum(a, b) {        
		console.log(a + b);    
		} 
	} 
let exam = new Example(); exam.sum(1, 2); // 3
```

### 实例方法
```js
class Example {    
	constructor() {        
		this.sum = (a, b) => {            
			console.log(a + b);        
		}    
	} 
}
```

## 类的实例化

### new

class 的实例化必须通过 new 关键字。

 ```js
class Example {}
 
let exam1 = Example(); 
// Class constructor Example cannot be invoked without 'new'
 ```

### 实例化对象

共享原型对象

 ```js
class Example {
    constructor(a, b) {
        this.a = a;
        this.b = b;
        console.log('Example');
    }
    sum() {
        return this.a + this.b;
    }
}
let exam1 = new Example(2, 1);
let exam2 = new Example(3, 1);
console.log(exam1._proto_ == exam2._proto_); // true
 
exam1._proto_.sub = function() {
    return this.a - this.b;
}
console.log(exam1.sub()); // 1
console.log(exam2.sub()); // 2
 ```

## decorator

decorator 是一个函数，用来修改类的行为，在代码编译时产生作用。

### 类修饰

#### 一个参数

第一个参数 target，指向类本身。

 ```js
function testable(target) {
    target.isTestable = true;
}
@testable
class Example {}
Example.isTestable; // true
 ```

#### 多个参数——嵌套实现

```js
function testable(isTestable) {
    return function(target) {
        target.isTestable=isTestable;
    }
}
@testable(true)
class Example {}
Example.isTestable; // true
```

#### 实例属性

上面两个例子添加的是静态属性，若要添加实例属性，在类的 prototype 上操作即可。

```js
function testable(isTestable) {
    return function(target) {
        target.isTestable=isTestable;
    }
}
@testable(true)
class Example {}
Example.isTestable; // true
```

### 方法修饰

3个参数：target（类的原型对象）、name（修饰的属性名）、descriptor（该属性的描述对象）。

 ```js
class Example {
    @writable
    sum(a, b) {
        return a + b;
    }
}
function writable(target, name, descriptor) {
    descriptor.writable = false;
    return descriptor; // 必须返回
}
 ```

修饰器执行顺序

由外向内进入，由内向外执行。

```js
class Example {
    @logMethod(1)
    @logMethod(2)
    sum(a, b){
        return a + b;
    }
}
function logMethod(id) {
    console.log('evaluated logMethod'+id);
    return (target, name, desctiptor) => console.log('excuted         logMethod '+id);
}
// evaluated logMethod 1
// evaluated logMethod 2
// excuted logMethod 2
// excuted logMethod 1
```

## 封装与继承

### getter / setter

getter 与 setter 必须**同级**出现, 不可以单独出现

```js
class Example1{
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }
    get a(){
        console.log('getter');
        return this._a;//注意这里
    }
    set a(a){
        console.log('setter');
        this._a = a;//注意这里 如果用this.a=a 这里会出现自身递归不断被调用 最终导致 RangeError
    }
}
let exam1 = new Example1(1,2); // 只输出 setter , 不会调用 getter 方法
console.log(exam1._a); // 1, 可以直接访问
```

### extends

通过 extends 实现类的继承。

```js
class Child extends Father { ... }
```

### super

子类 constructor 方法中必须有 super ，且必须出现在 this 之前，调用父类构造函数,只能出现在子类的构造函数。

```js
class Father {
    constructor() {}
}
class Child extends Father {
    constructor() {}
    // or 
    // constructor(a) {
    	// super();//必须在构造函数 
        // this.a = a;
        // super(); 这里不能放在后面~~~~
    // }
}

```

调用父类方法, super 作为对象，在普通方法中，指向父类的原型对象，在静态方法中，指向父类

```js
class Father {
    test(){
        return 0;
    }
    static test1(){
        return 1;
    }
}
class Child2 extends Father {
    constructor(){
        super();
        // 调用父类普通方法
        console.log(super.test()); // 0
    }
    static test3(){
        // 调用父类静态方法
        return super.test1+2;
    }
}
Child2.test3(); // 3
```

## Reference

[ECMAScript 6 入门](https://es6.ruanyifeng.com/) 