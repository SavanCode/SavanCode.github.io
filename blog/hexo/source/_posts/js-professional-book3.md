---
title: JS 高级程序设计 重点摘抄以及解读3
top: false
cover: false
toc: true
mathjax: true
date: 2021-04-09 16:32:59
password:
summary: JS 高级程序设计 中 对象 继承 原型链
tags: [JS,book,JS object]
categories: JS
---
>  这里是阅读完 js高级程序设计中的第8章 做出的总结

## 重点部分的摘抄

### 1. 描述对象，构造函数，原型三者的关系

### 2. 描述原型链 -原型继承多个引用类型的属性和方法

### 3. 实现继承的方法

## 知识细节摘抄以及理解

> 对象是很重要的一部分，内容细节很多，所以下面的顺序还是按照书本来

### 对象是什么

对象定义为一组**属性的无序集合**（对象的每个属性与方法有一个名称，并且名称应到到一个值）。 简单地说，可以解为**有很多 名&值对的 散列表**

### 对象属性类型 - Types of Properties 有哪些

| 数据属性(Data Properties)                                    | 访问器属性                                                   |      |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ---- |
| [[Configurable]]（true）<br />[[Enumerable]] （true）<br />[[Writable]]（true）<br />[[Value]]（undefined）<br /> | [[Configurable]] （true）<br /> [[Enumerable]]（true）<br /> [[Get]]（undefined）<br /> [[Set]]（undefined）<br /> |      |

### object 基本函数

- 查看
  - [Object.defineProperty()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
  
  - [Object.defineProperties(obj, props)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties) - 同时定义多个属性（但是对于数据属性默认为false）
  
  - [Object. getOwnPropertyDescriptor(obj, propertyName)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor) - 查看属性描述符
  
  - [Object.getOwnPropertyDescriptors(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors)
  
  - 利用for in 查看属性存在 - 检查原型链上属性
  
    ```js
    console.log("name" in person1)
    ```
  
  - obj.hasOwnProperty(prop) - 检查实例对象属性
  
  - Object.keys(obj) - 获取所有可枚举属性
  
- 合并 merge

  - [Object.assign(target, ...sources)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  	**只拷贝源对象的自身属性；不拷贝继承属性，不可枚举的属性**

- 对象相等判断

  - [Object.is(value1, value2);](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)  

  **`Object.is()` and `===` is in their treatment of signed zeroes and NaNs**

### obj的计算型属性值

```js
const nameKey = 'name'; 
const ageKey = 'age'; 
const jobKey = 'job'; 
let uniqueToken = 0;
function getUniqueKey(key) {
  return '${key}_${uniqueToken++}';
}
let person = {
  [getUniqueKey(nameKey)]: 'Matt', 
  [getUniqueKey(ageKey)]: 27, 
  [getUniqueKey(jobKey)]: 'Software engineer'
};
console.log(person); // { name_0: 'Matt', age_1: 27, job_2: 'Software engineer' }
```

### 对象解构 - 简单& 嵌套解构

