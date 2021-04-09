---
title: js copy object
top: false
cover: false
toc: true
mathjax: true
date: 2020-11-25 19:13:17
password:
summary: js copy object
tags: [JS,JS object]
categories: JS
---

## 浅拷贝

### 简单拷贝

  新建一个空对象，使用for-in循环，将对象的所有属性复制到新建的空对象中

```js
function simpleClone1(obj){
    if(typeof obj != 'object'){
        return false;
    }
    var cloneObj = {};
    for(var i in obj){
        cloneObj[i] = obj[i];
    }
    return cloneObj;
}

var obj1={a:1,b:2,c:[1,2,3]};
var obj2=simpleClone1(obj1);
console.log(obj1.c); //[1,2,3]
console.log(obj2.c); //[1,2,3]
obj2.c.push(4);
console.log(obj2.c); //[1,2,3,4]
console.log(obj1.c); //[1,2,3,4]
```

### 使用...

```js
var obj1={a:1,b:2,c:[1,2,3]};
var obj2={...obj1};//{a:1,b:2,c:[1,2,3]}
var obj2={...obj1,location:'china',a:200};//添加属性+更新a属性 
```

### 使用属性描述符

  通过对象的原型，建立一个空的实例对象。通过forEach语句，获取到对象的所有属性的属性描述符，将其作为参数，设置到新建的空实例对象中

```js
function simpleClone2(orig){
    var copy = Object.create(Object.getPrototypeOf(orig));
    Object.getOwnPropertyNames(orig).forEach(function(propKey){
        var desc = Object.getOwnPropertyDescriptor(orig,propKey);
        Object.defineProperty(copy,propKey,desc);
    });
    return copy;
}

var obj1={a:1,b:2,c:[1,2,3]};
var obj2=simpleClone1(obj1);
console.log(obj1.c); //[1,2,3]
console.log(obj2.c); //[1,2,3]
obj2.c.push(4);
console.log(obj2.c); //[1,2,3,4]
console.log(obj1.c); //[1,2,3,4]
```

### 使用jquery的extend()方法

```js
var obj1={a:1,b:2,c:[1,2,3]};
var obj2=$.extend({},obj1);
console.log(obj1.c); //[1,2,3]
console.log(obj2.c); //[1,2,3]
obj2.c.push(4);
console.log(obj2.c); //[1,2,3,4]
console.log(obj1.c); //[1,2,3,4]
```

## 深拷贝

### 遍历复制

复制对象的属性时，对其进行判断，如果是数组或对象，则再次调用拷贝函数；否则，直接复制对象属性

```js
function deepClone1(obj,cloneObj){
    if(typeof obj != 'object'){
        return false;
    }
    var cloneObj = cloneObj || {};
    for(var i in obj){
        if(typeof obj[i] === 'object'){
            cloneObj[i] = (obj[i] instanceof Array) ? [] : {};
            arguments.callee(obj[i],cloneObj[i]);
        }else{
            cloneObj[i] = obj[i]; 
        }  
    }
    return cloneObj;
}

var obj1={a:1,b:2,c:[1,2,3]};
var obj2=deepClone1(obj1);
console.log(obj1.c); //[1,2,3]
console.log(obj2.c); //[1,2,3]
obj2.c.push(4);
console.log(obj2.c); //[1,2,3,4]
console.log(obj1.c); //[1,2,3]
```

### json

用JSON全局对象的parse和stringify方法来实现深复制算是一个简单讨巧的方法，它能正确处理的对象只有Number、String、Boolean、Array、扁平对象，即那些能够被json直接表示的数据结构

```js
function jsonClone(obj){
    return JSON.parse(JSON.stringify(obj));
}

var obj1={a:1,b:2,c:[1,2,3]};
var obj2=jsonClone(obj1);
console.log(obj1.c); //[1,2,3]
console.log(obj2.c); //[1,2,3]
obj2.c.push(4);
console.log(obj2.c); //[1,2,3,4]
console.log(obj1.c); //[1,2,3]
```

### 使用jquery的extend()方法

```js
var obj1={a:1,b:2,c:[1,2,3]};
var obj2=$.extend(true,{},obj1);
console.log(obj1.c); //[1,2,3]
console.log(obj2.c); //[1,2,3]
obj2.c.push(4);
console.log(obj2.c); //[1,2,3,4]
console.log(obj1.c); //[1,2,3]
```

