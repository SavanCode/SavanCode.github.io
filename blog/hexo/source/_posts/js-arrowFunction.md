---
title: js arrowFunction 箭头函数
top: false
cover: false
toc: true
mathjax: true
date: 2020-11-26 13:05:55
password:
summary:
tags: JS
categories:
---

# 箭头函数

## 1. 代码块只有一条语句时，不使用大括号

```js
var sum = (num1, num2) => num1 + num2 
```

- 同样的写法

```js
var sum = (num1, num2) => { return num1 + num2 }
```

- 等同于

```js
var sum = function(num1, num2) {
  return num1 + num2;
};
```

简化判断

```

```



## 2. 如果有多条语句，使用大括号，同时使用return(否则没有返回值)

```js
var sum = (n1, n2) => {
  console.log(n1);
  return n1 + n2
}
```



## 3. 使用箭头函数返回对象

必须在对象外面加上括号，否则就只是个代码块，从而就不会返回对象

```js
var sum = () => ({name: 'a'})
```

- 等同于

```js
var sum = function sum() {
  return { name: 'a' };
};
```

##  4.箭头函数和普通函数明显的区别

箭头函数内部的`this`是词法作用域，由上下文确定。

```js
var obj = {
    birth: 1990,
    getAge: function () {
        var b = this.birth; // 1990
        var fn = function () {
            return new Date().getFullYear() - this.birth; // this指向window或undefined
        };
        return fn();//因为这里call
    }
};

var obj1 = {
    birth: 1990,
    getAge: function () {
        var b = this.birth; //这里是obj
        var fn = () => new Date().getFullYear() - this.birth; // this指向obj对象，跟上面的一样
        return fn();
    }
};
obj1.getAge(); // 26，箭头函数完全修复了this的指向，this总是指向词法作用域，也就是外层调用者obj1
```

> 不能用arguments，但是可以用参数以及参数解构

## 5.创建立即执行函数表达式

```js
let person = ((name) => {
  return {
    getName: function( ) {
      return name;
    }
  };
})('Nicholas');

console.log(person.getName()); // "Nicholas"

// 实际上相当于：
let person = function(name) {
  return {
    getName: function( ) {
      return name;
    }
  };
}('Nicholas');

console.log(person.getName()); // "Nicholas"
```

## 6.不能与new一起用

箭头函数缺少正常函数所以拥有的 `prototype` 属性，它的设计初衷是“即用即弃”，所有不能用它定义新的类型。如果尝试通过 `new` 关键字调用箭头函数，会报错，就像这样：

```js
var MyType = () => {},
  object = new MyType(); // 错误，不可以通过 new 关键字抵用箭头函数
```



## 7.什么时候不要用箭头函数

- 不能作为构造函数，不可以实例化

[详细解释](https://segmentfault.com/a/1190000007074846)





Reference：

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions