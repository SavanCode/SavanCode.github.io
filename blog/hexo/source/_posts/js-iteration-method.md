---
title: js iteration method
top: false
cover: false
toc: true
mathjax: true
date: 2020-12-04 16:31:11
password:
summary:
tags: JS
categories: JS
---

# Javascript中常见的数组遍历方法总结



## 1、for循环的使用

- 优化后的for循环，是用临时变量将长度缓存起来，避免了重复获取数组长度，当遍历的数组较长时，优化效果会比较明显。

```javascript
    	var arr=[1,2,3,6,4,85]
        for (j = 0, len = arr.length; j < len; j++) {
            console.log(j)
        }
```

## 2、forEach循环的使用

- `forEach(function(currentValue, index, arr))`方法是用来遍历数组，参数是一个回调函数，无返回值，对原数组无影响，不能使用break

```javascript
function log(element, index, array) {
  console.log('[' + index + '] = ' + element);
}

[2, 5, 9].forEach(log);
// [0] = 2
// [1] = 5
// [2] = 9


var out = [];

[1, 2, 3].forEach(function(elem) {// (function(){} ,out)
  this.push(elem * elem);
}, out);

out // [1, 4, 9]
```

正确使用for循环和forEach循环

- forEach循环是for循环的简化版
- 1.在数据长度固定且不需要计算的情况下，for循环的计算效率高于
  forEach
- 2.在数据比较复杂，且数组长度不固定的情况下，用forEach则更为好
- 3.forEach是函数，那么就存在函数作用域，而for循环则不存在函数作用域问题，因此在某些情况下则要自己权衡利弊了

## 3、map的使用（常用）

- `map(function(currentValue, index, arr))`方法是用来遍历数组，参数是一个回调函数，`有返回值，返回值是一个利用回调函数处理之后的新数组`，对原数组无影响，

### 单参数

```javascript
arr.map((value, index, array) => {//这里的参数为map里面方程的参数
            //处理数据
            return '处理之后的数据'
        })

let numbers = [1, 4, 9]
let doubles = numbers.map(function(num) {
  return num * 2
})

// doubles is now   [2, 8, 18]
// numbers is still [1, 4, 9]

```

### 两个参数使用

map方法还可以接受第二个参数，用来绑定回调函数内部的this变量(与forEach相视)。

```js
var arr = ['a', 'b', 'c'];

[1, 2].map(function (e) {
  return this[e];
}, arr)
// ['b', 'c']
```



## 4、filter的使用（常用）

### 单参数

- 循环数组，有返回值，返回一个新的过滤之后的数组

```javascript
//多parameter
[1, 2, 3, 4, 5].filter(function (elem, index, arr) {
  return index % 2 === 0;
});
// [1, 3, 5]

//单parameter
[1, 2, 3, 4, 5].filter(function (elem) {
  return (elem > 3);
})
// [4, 5]

```

### 两个参数使用

`filter`方法还可以接受第二个参数，用来绑定参数函数内部的`this`变量。

```js
var obj = { MAX: 3 };
var myFilter = function (item) {
  if (item > this.MAX) return true;
};

var arr = [2, 8, 3, 4, 1, 3, 2, 9];
arr.filter(myFilter, obj) // [8, 4, 9]
```



## 5、some()循环的使用（常用）

- 循环数组，检测到`是否有某个值满足条件`，有返回值true，否则返回false

```javascript
var arr = [1, 2, 3, 4, 5];
arr.some(function (elem, index, arr) {
  return elem >= 3;
});
// true
```

## 6、every() 循环的使用

- 循环数组，`检测所有值是否都大于某个值`。如果是就返回true,否则false

```javascript
var arr = [1, 2, 3, 4, 5];
arr.every(function (elem, index, arr) {
  return elem >= 3;
});
// false
```

- some和every的区别
- some循环，检测数据中是否有某个值满足这个条件，如果有，则返回true，如果都不满足否则返回false
- every循环，检测数组中是否每个值都满足这个条件，如果都满足，才返回true，否则任何一个不满足，就会返回false

## 7、find() 循环的使用

### 单参数

- find()方法返回数组中符合测试函数条件的第一个元素。否则返回undefined

**基本数组**

```js
var a = [1, 5, 10, 15].find(function(value, index, arr) {
  return value > 9;
})
console.log(a)  // 10

var a = [1, 4, -5, 10].find((n) => n < 0)
var b = [1, 4, -5, 10].find((n) => n < -5)

console.log(a) // -5
console.log(b)  // undefined
```

**对象**

```javascript
         let array = [{
                name: '张三',
                gender: '男',
                age: 20
            },
            {
                name: '李四',
                gender: '男',
                age: 20
            }
        ]
        let flag = array.find(item => {
            return item.name === "张三"
        })
        console.log(flag) // {name: "张三", gender: "男", age: 20}
```

### 多参数

可以接受第二个参数，用来绑定回调函数的`this`对象。

```js
function f(v){
  return v > this.age;
}
let person = {name: 'John', age: 20};
var a = [10, 12, 26, 15].find(f, person);    

console.log(a) // 26
```

 

## 8、findIndex() 的使用

- 对于数组中的每一个元素，findIndex 方法都会执行一次回调函数（利用升序索引），直到操作某个元素并且回调函数的返回值为true时。findIndex 方法将立即返回该回调函数返回 true 的元素的索引值。如果数组中没有任何元素返回 true，则 findIndex 返回 -1。

findIndex 不会改变数组对象。

```javascript
    	let array = [1, 5, 6, 9, 8]
        let flag = array.findIndex(item => {
            return item == 9
        })
        console.log(flag) // 打印结果为3 也即是9的索引值 
```

## 9、for of的使用

- for of 可以正确使用break、continue和return语句

```javascript
        //默认遍历元素
        for (var value of ['a', 'b']) {
                console.log(value);
        }
        // 还可以借助es6新增方法使用 entries()，keys()和values()
        for (let index of ['a', 'b'].keys()) {
            console.log(index);
        }
        // 0
        // 1
        for (let elem of ['a', 'b'].values()) {
            console.log(elem);
        }
        // 'a'
        // 'b'

        for (let [index, elem] of ['a', 'b'].entries()) {
            console.log(index, elem);
        }
        // 0 "a"
        // 1 "b" 
```

## 10、reduce方法和reduceRight方法 

但是作为累加器，不是单个能自定义处理

```js
//单个数组
[1,2,3,5,3].reduce((pre,next)=>{return pre+next})  //14
[1,2,3,4].reduce((total,num)=>{return total*num})  // 24
//多个数组
[[1,2],[3,4],[5,6,7]].reduce((total,num)=>{return total.concat(num)})
```

# 对象的遍历方法



| 方式                             | 查找原型链属性 | 查找自定义属性 | 查找不可枚举属性 |
| :------------------------------- | :------------- | :------------- | :--------------- |
| `for-in`                         | ✅              | ✅              | ✅                |
| `Object.keys(..)`                | ❌              | ✅              | ❌                |
| `Object.getOwnpropertyNames(..)` | ❌              | ✅              | ✅                |



## for...in 方法

```js
let obj = {  
name: '小郭',  
age: 20  
}  
for(var i in obj) { // 遍历对象  
console.log(i,":",obj[i]);
}  
//name :'小郭'
//age : 20
```



## Object.keys(obj)

遍历返回一个数组,包括对象自身的(不含继承的)所有可枚举属性(不含Symbol属性).

```js
let obj = {
    a:1,
    b:true,
    c:"hello"
}

Object.keys(obj).forEach(function(key){
    console.log(key,obj[key]); 
})
//a 1
//b true
//c hello
```

## Object.getOwnPropertyNames(obj)

遍历返回一个数组,包含对象自身的所有属性(不含Symbol属性,但是包括不可枚举属性).

```js
let obj = {
    a:1,
    b:true,
    c:"hello"
}

Object.getOwnPropertyNames(obj).forEach( key => {
    console.log(key,obj[key]);
})
//a 1
//b true
//c hello
```

## Reflect.ownKeys()

遍历返回一个数组,包含对象自身的所有属性,不管属性名是Symbol或字符串,也不管是否可枚举.

```js
let obj = {
    a:1,
    b:true,
    c:"hello"
}

Object.getOwnPropertyNames(obj).forEach( key => {
    console.log(key,obj[key]);
})
//a 1
//b true
//c hello
```

