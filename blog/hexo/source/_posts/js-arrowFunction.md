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

## 1. 一般使用箭头函数时，代码块部分只有一条语句时，不使用大括号

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

## 2. 如果有多条语句，使用大括号，同时使用return(否则没有返回值)

```js
var sum = (n1, n2) => {
  console.log(n1);
  return n1 + n2
}
```



## 3. 使用箭头函数返回对象：必须在对象外面加上括号，否则就只是个代码块，从而就不会返回对象

```js
var sum = () => ({name: 'a'})
```

- 等同于

```js
var sum = function sum() {
  return { name: 'a' };
};
```

##  4.当遇到this

箭头函数和匿名函数有个明显的区别：箭头函数内部的`this`是词法作用域，由上下文确定。

```js
var obj = {
    birth: 1990,
    getAge: function () {
        var b = this.birth; // 1990
        var fn = function () {
            return new Date().getFullYear() - this.birth; // this指向window或undefined
        };
        return fn();
    }
};

var obj1 = {
    birth: 1990,
    getAge: function () {
        var b = this.birth; // 1990
        var fn = () => new Date().getFullYear() - this.birth; // this指向obj对象
        return fn();
    }
};
obj1.getAge(); // 26，箭头函数完全修复了this的指向，this总是指向词法作用域，也就是外层调用者obj1
```

## 5.什么时候不要用箭头函数

[详细解释](https://segmentfault.com/a/1190000007074846)





Reference：

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions