---
title: js es6 array 数组新操作
top: false
cover: false
toc: true
mathjax: true
date: 2021-03-06 23:00:55
password:
summary: ES6 数组
tags: [JS, es6]
categories: JS
---

## 数组创建

### Array.of(value1, value2, value3)

将参数中所有值作为元素形成数组。

```js
// 参数值可为不同类型
console.log(Array.of(1, '2', true)); // [1, '2', true]

// 参数为空时返回空数组
console.log(Array.of()); // []
```

### Array.from(array,function)

将类数组对象或可迭代对象转化为数组。

**伪数组与真数组的区别**：

伪数组的原型链中没有 Array.prototype，而真数组的原型链中有 Array.prototype。因此伪数组没有 pop、join等属性。

```js
// 参数为数组,返回与原数组一样的数组
console.log(Array.from([1, 2])); // [1, 2]

// 参数含空位
console.log(Array.from([1, , 3])); // [1, undefined, 3]
```

```js
console.log(Array.from([1, 2, 3], (n) => n * 2)); // [2, 4, 6]

let map = {
    do: function(n) {
        return n * 2;
    }
}
let arrayLike = [1, 2, 3];
console.log(Array.from(arrayLike, function (n){
    return this.do(n);
}, map)); // [2, 4, 6]
```
### 类数组对象
一个类数组对象必须含有 length 属性，且元素属性名必须是数值或者可转换为数值的字符。
```js
let arr = Array.from({
  0: '1',
  1: '2',
  2: 3,
  length: 3
});
console.log(); // ['1', '2', 3]

// 没有 length 属性,则返回空数组
let array = Array.from({
  0: '1',
  1: '2',
  2: 3,
});
console.log(array); // []

// 元素属性名不为num且无法转换为num，返回长度为 length 元素值为 undefined 的数组  
let array1 = Array.from({
  a: 1,
  b: 2,
  length: 2
});
console.log(array1); // [undefined, undefined]
```

## 转换可迭代对象
###  map =>  array
```js
let map = new Map();
map.set('key0', 'value0');
map.set('key1', 'value1');
console.log(Array.from(map)); // [['key0', 'value0'],['key1',
// 'value1']]
```

### set => array
```js
let arr = [1, 2, 3];
let set = new Set(arr);
console.log(Array.from(set)); // [1, 2, 3]
```

### string =>  array
```js
let str = 'abc';
console.log(Array.from(str)); // ["a", "b", "c"]
```
## 扩展的方法
### 查找
#### find()

查找数组中符合条件的元素,若有多个符合条件的元素，则返回第一个元素。
```js
let arr = Array.of(1, 2, 3, 4);
console.log(arr.find(item => item > 2)); // 3

// 数组空位处理为 undefined
console.log([, 1].find(n => true)); // undefined
```
#### findIndex()

查找数组中符合条件的元素索引，若有多个符合条件的元素，则返回第一个元素索引。
```js
let arr = Array.of(1, 2, 1, 3);
// 参数1：回调函数
// 参数2(可选)：指定回调函数中的 this 值
console.log(arr.findIndex(item => item = 1)); // 0

// 数组空位处理为 undefined
console.log([, 1].findIndex(n => true)); //0
```
### 填充
#### fill(value,startIndex,endIndex)

将一定范围索引的数组元素内容填充为单个指定的值。
```js
//基本用法
const array1 = [1, 2, 3, 4];
// fill with 0 from  index 2 until  4
console.log(array1.fill(0, 2, 4));// [1, 2, 0, 0]
// fill with 5 from position 1
console.log(array1.fill(5, 1));// [1, 5, 5, 5]
console.log(array1.fill(6));//  [6, 6, 6, 6]

//小于0
//start+ length = start
//end + length = end
[1, 2, 3].fill(4, -3, -2)        // [4, 2, 3]
[1, 2, 3].fill(4, NaN, NaN)      // [1, 2, 3]
[1, 2, 3].fill(4, 3, 5)          // [1, 2, 3]
Array(3).fill(4)                 // [4, 4, 4]
[].fill.call({ length: 3 }, 4)   // {0: 4, 1: 4, 2: 4, length: 3}

//obj 操作
let arr = Array(3).fill({}) // [{}, {}, {}]
arr[0].hi = "hi"            // [{ hi: "hi" }, { hi: "hi" }, { hi: "hi" }]

```
#### copyWithin(target, copy_start,copy_ end)

从array的start到end，复制到target_index
```js
[1, 2, 3, 4].copyWithin(0,2,4); // [3, 4, 3, 4]

// 参数1为负数表示倒数
[1, 2, 3, 4].copyWithin(-2, 0); // [1, 2, 1, 2]
[1, 2, ,4].copyWithin(0, 2, 4); // [, 4, , 4]

[1, 2, 3, 4, 5].copyWithin(-2)// [1, 2, 3, 1, 2]
[1, 2, 3, 4, 5].copyWithin(0, 3)// [4, 5, 3, 4, 5]
[1, 2, 3, 4, 5].copyWithin(-2, -3, -1)// [1, 2, 3, 3, 4]
```

### 遍历
#### entries()

遍历键值对。
```js
for(let [key, value] of ['a', 'b'].entries()){
    console.log(key, value);
}
// 0 "a"
// 1 "b"

// 不使用 for... of 循环
let entries = ['a', 'b'].entries();
console.log(entries.next().value); // [0, "a"]
console.log(entries.next().value); // [1, "b"]

// 数组含空位
console.log([...[,'a'].entries()]); // [[0, undefined], [1, "a"]]
```

####  keys()

遍历键名。
```js
for(let key of ['a', 'b'].keys()){
    console.log(key);
}
// 0
// 1

// 数组含空位
console.log([...[,'a'].keys()]); // [0, 1]
```
#### values()

遍历键值。
```js
for(let value of ['a', 'b'].values()){
    console.log(value);
}
// "a"
// "b"

// 数组含空位
console.log([...[,'a'].values()]); // [undefined, "a"]
```
### 包含
#### includes()

数组是否包含指定值。

注意：与 Set 和 Map 的 has 方法区分；Set 的 has 方法用于查找值；Map 的 has 方法用于查找键名。
```js
// 参数1：包含的指定值
[1, 2, 3].includes(1);    // true

// 参数2：可选，搜索的起始索引，默认为0
[1, 2, 3].includes(1, 2); // false

// NaN 的包含判断
[1, NaN, 3].includes(NaN); // true
```

### 嵌套数组转一维数组
#### flat()
```js
console.log([1 ,[2, 3]].flat()); // [1, 2, 3]

// 指定转换的嵌套层数
console.log([1, [2, [3, [4, 5]]]].flat(2)); // [1, 2, 3, [4, 5]]

// 不管嵌套多少层
console.log([1, [2, [3, [4, 5]]]].flat(Infinity)); // [1, 2, 3, 4, 5]

// 自动跳过空位
console.log([1, [2, , 3]].flat());<p> // [1, 2, 3]
```

#### flatMap()
先对数组中每个元素进行了的处理，再对数组执行 flat() 方法。
```js
// 参数1：遍历函数，该遍历函数可接受3个参数：当前元素、当前元素索引、原数组
// 参数2：指定遍历函数中 this 的指向
console.log([1, 2, 3].flatMap(n => [n * 2])); // [2, 4, 6]
```
## 数组缓冲区
数组缓冲区是内存中的一段地址。

定型数组的基础。

实际字节数在创建时确定，之后只可修改其中的数据，不可修改大小。

创建数组缓冲区
通过构造函数创建:
```js
let buffer = new ArrayBuffer(10);
console.log(buffer.byteLength); // 10
分割已有数组缓冲区
let buffer = new ArrayBuffer(10);
let buffer1 = buffer.slice(1, 3);
console.log(buffer1.byteLength); // 2
```
## 视图
视图是用来操作内存的接口。

视图可以操作数组缓冲区或缓冲区字节的子集,并按照其中一种数值数据类型来读取和写入数据。

DataView 类型是一种通用的数组缓冲区视图,其支持所有8种数值型数据类型。

创建:
```js
// 默认 DataView 可操作数组缓冲区全部内容
let buffer = new ArrayBuffer(10);
    dataView = new DataView(buffer); 
dataView.setInt8(0,1);
console.log(dataView.getInt8(0)); // 1

// 通过设定偏移量(参数2)与长度(参数3)指定 DataView 可操作的字节范围
let buffer1 = new ArrayBuffer(10);
    dataView1 = new DataView(buffer1, 0, 3);
dataView1.setInt8(5,1); // RangeError
```
## 定型数组
数组缓冲区的特定类型的视图。

可以强制使用特定的数据类型，而不是使用通用的 DataView 对象来操作数组缓冲区。

创建
通过数组缓冲区生成
```js
let buffer = new ArrayBuffer(10),
    view = new Int8Array(buffer);
console.log(view.byteLength); // 10
通过构造函数

let view = new Int32Array(10);
console.log(view.byteLength); // 40
console.log(view.length);     // 10

// 不传参则默认长度为0
// 在这种情况下数组缓冲区分配不到空间，创建的定型数组不能用来保存数据
let view1 = new Int32Array();
console.log(view1.byteLength); // 0
console.log(view1.length);     // 0

// 可接受参数包括定型数组、可迭代对象、数组、类数组对象
let arr = Array.from({
  0: '1',
  1: '2',
  2: 3,
  length: 3
});
let view2 = new Int16Array([1, 2]),
    view3 = new Int32Array(view2),
    view4 = new Int16Array(new Set([1, 2, 3])),
    view5 = new Int16Array([1, 2, 3]),
    view6 = new Int16Array(arr);
console.log(view2 .buffer === view3.buffer); // false
console.log(view4.byteLength); // 6
console.log(view5.byteLength); // 6
console.log(view6.byteLength); // 6
```
> 注意要点
> length 属性不可写，如果尝试修改这个值，在非严格模式下会直接忽略该操作，在严格模式下会抛出错误。

```js
let view = new Int16Array([1, 2]);
view.length = 3;
console.log(view.length); // 2
```
定型数组可使用 entries()、keys()、values()进行迭代。
```js
let view = new Int16Array([1, 2]);
for(let [k, v] of view.entries()){
    console.log(k, v);
}
// 0 1
// 1 2
```
find() 等方法也可用于定型数组，但是定型数组中的方法会额外检查数值类型是否安全,也会通过 Symbol.species 确认方法的返回值是定型数组而非普通数组。concat() 方法由于两个定型数组合并结果不确定，故不能用于定型数组；另外，由于定型数组的尺寸不可更改,可以改变数组的尺寸的方法，例如 splice() ，不适用于定型数组。
```js
let view = new Int16Array([1, 2]);
view.find((n) > 1); // 2
```
所有定型数组都含有静态 of() 方法和 from() 方法,运行效果分别与 Array.of() 方法和 Array.from() 方法相似,区别是定型数组的方法返回定型数组,而普通数组的方法返回普通数组。
```js
let view = Int16Array.of(1, 2);
console.log(view instanceof Int16Array); // true
```
定型数组不是普通数组，不继承自 Array 。
```js
let view = new Int16Array([1, 2]);
console.log(Array.isArray(view)); // false
定型数组中增加了 set() 与 subarray() 方法。 set() 方法用于将其他数组复制到已有定型数组, subarray() 用于提取已有定型数组的一部分形成新的定型数组。

// set 方法
// 参数1：一个定型数组或普通数组
// 参数2：可选，偏移量，开始插入数据的位置，默认为0
let view= new Int16Array(4);
view.set([1, 2]);
view.set([3, 4], 2);
console.log(view); // [1, 2, 3, 4]

// subarray 方法
// 参数1：可选，开始位置
// 参数2：可选，结束位置(不包含结束位置)
let view= new Int16Array([1, 2, 3, 4]), 
    subview1 = view.subarray(), 
    subview2 = view.subarray(1), 
    subview3 = view.subarray(1, 3);
console.log(subview1); // [1, 2, 3, 4]
console.log(subview2); // [2, 3, 4]
console.log(subview3); // [2, 3]
扩展运算符
复制数组
let arr = [1, 2],
    arr1 = [...arr];
console.log(arr1); // [1, 2]

// 数组含空位
let arr2 = [1, , 3],
    arr3 = [...arr2];
console.log(arr3); [1, undefined, 3]
//合并数组
console.log([...[1, 2],...[3, 4]]); // [1, 2, 3, 4]
```