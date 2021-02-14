---
title: js copy array
top: false
cover: false
toc: true
mathjax: true
date: 2020-11-25 15:08:32
password:
summary: array复制的方式总结
tags: JS
categories: JS
---

## PUSH

```js
function copyArray(arr){
    var result = [];
    for(var i = 0; i < arr.length; i++){
        result.push(arr[i]);
    }
    return result;
}

var obj1=[1,2,3];
var obj2=copyArray(obj1);
console.log(obj1); //[1,2,3]
console.log(obj2); //[1,2,3]
obj2.push(4);
console.log(obj1); //[1,2,3]
console.log(obj2); //[1,2,3,4]
```

## JOIN

使用该方法的缺点是数组中的项全部变成了字符串形式

```js
function copyArray(arr){
    var result = [];
    result = arr.join().split(',');
    return result;
}

var obj1=[1,2,3];
var obj2=copyArray(obj1);
console.log(obj1); //[1,2,3]
console.log(obj2); //['1','2','3']
obj2.push(4);
console.log(obj1); //[1,2,3]
console.log(obj2); //['1','2','3',4]
```

## CONCAT

```js
function copyArray(arr){
    var result = [];
    result = arr.concat();
    return result;
}

var obj1=[1,2,3];
var obj2=copyArray(obj1);
console.log(obj1); //[1,2,3]
console.log(obj2); //[1,2,3]
obj2.push(4);
console.log(obj1); //[1,2,3]
console.log(obj2); //[1,2,3,4]
```

## SLICE

```js
function copyArray(arr){
    var result = [];
    result = arr.slice();
    return result;
}

var obj1=[1,2,3];
var obj2=copyArray(obj1);
console.log(obj1); //[1,2,3]
console.log(obj2); //[1,2,3]
obj2.push(4);
console.log(obj1); //[1,2,3]
console.log(obj2); //[1,2,3,4]
```

## 深拷贝

  以上方法实现的仅是数组的浅拷贝，如果要实现数组的深拷贝，需要使用递归方法

```js
function copyArray(arr,result){
    var result = result || [];
    for(var i = 0; i < arr.length; i++){
        if(arr[i] instanceof Array){
            result[i] = [];
            copyArray(arr[i],result[i]);
        }else{
            result[i] = arr[i];
        }           
    }
    return result;
}

var obj1=[1,2,[3,4]];
var obj2=copyArray(obj1);
console.log(obj1[2]); //[3,4]
console.log(obj2[2]); //[3,4]
obj2[2].push(5);
console.log(obj1[2]); //[3,4]
console.log(obj2[2]); //[3,4,5]
```

## 数据解构

```js
var obj1=[1,2,3];
var newObj=[...obj1]
var newObj1=['newElement',...obj1,'newElement']//此处与concat一样
console.log(obj1,newObj,newObj1)//[1,2,3] [1,2,3] ['newElement',1,2,3,'newElement']
```

