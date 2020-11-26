---
title: js OOP
top: false
cover: false
toc: true
mathjax: true
date: 2020-11-26 17:03:20
password:
summary:
tags: JS
categories:
---

# 对象基础

object ：propert + method

## 构造函数

特点：

- 函数体内部使用了`this`关键字，代表了所要生成的对象实例。
- 生成对象的时候，必须使用`new`命令

```js
var Vehicle = function () {
  this.price = 1000;
};
```

## new命令

1. 创建一个空对象，作为将要返回的对象实例。
2. 将这个空对象的原型，指向构造函数的`prototype`属性。
3. 将这个空对象赋值给函数内部的`this`关键字。
4. 开始执行构造函数内部的代码。

```js
var Vehicle = function () {
  this.price = 1000;
};

var v = new Vehicle();
v.price // 1000
```

```js
var Vehicle = function (p) {
  this.price = p;
};

var v = new Vehicle(500);
```

 推荐的写法     var v = new Vehicle();
		不推荐的写法   var v = new Vehicle;

## Object.create() 创建实例对象

```js
ar person1 = {
  name: '张三',
  age: 38,
  greeting: function() {
    console.log('Hi! I\'m ' + this.name + '.');
  }
};

var person2 = Object.create(person1);

person2.name // 张三
person2.greeting() // Hi! I'm 张三.
```

对象`person1`是`person2`的模板，后者继承了前者的属性和方法

# 对象继承

## 基本继承

```js
function Cat (name, color) {
  this.name = name;
  this.color = color;
}

var cat1 = new Cat('大毛', '白色');

cat1.name // '大毛'
cat1.color // '白色'
```

同一个构造函数的多个实例之间，无法共享属性，从而造成对系统资源的浪费。

## prototype 属性的作用

对于构造函数来说，生成实例的时候，该属性会自动成为实例对象的原型。

```js
function Animal(name) {
  this.name = name;
}
Animal.prototype.color = 'white';

var cat1 = new Animal('大毛');
var cat2 = new Animal('二毛');

cat1.color // 'white'
cat2.color // 'white'
```

