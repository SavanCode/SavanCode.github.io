---
title: react-1week Day 3
top: false
cover: false
toc: true
mathjax: true
date: 2020-12-16 23:53:01
password:
summary:
tags: React
categories: React
---

# export 和 import 基本语法 

## 几种import和export的基本语法

### 第一种导出


lib.js

```jsx
let bar = "stringBar";
let foo = "stringFoo";
let sum = 1;
let fn0 = function() {
    console.log("fn0");
}

let fn1 = function() {
    console.log("fn1");
}

let fnSum = function() {
    sum = sum + 1;
    return sum;
}

export{ bar, foo ,fn0, fn1, fnSum}
```

main.js

```jsx
import {bar,foo, fn0, fn1, fnSum} from "./lib";
import {fnSum as fnSum1} from "./lib";

console.log(bar+"_"+foo);
fn0(); //fn0
fn1(); //fn1

console.log(fnSum()); //2
console.log(fnSum()); //3
console.log(fnSum1()); //4
```

### 第二种导出

lib.js

```jsx
let fn0 = function() {
    console.log("fn0");
};

let obj0 = {}

export { fn0 as foo, obj0 as bar};
```

main.js

```jsx
import {foo, bar} from "./lib";

foo(); //fn0

bar.name = '123';
console.log(bar);//Object {name: "123"}
```

### 第三种导出的方式

lib.js

```jsx
export let foo = ()=> {console.log("fnFoo") ;return "foo"},bar = "stringBar"
```

main.js

```jsx
import {foo, bar} from "./lib";
console.log(foo());
console.log(bar);
```

### 第四种导出的方式

lib.js

```jsx
export default "string"
//export default ()=>{console.log("对于函数的返回");} 
```

main.js

```jsx
import defaultString from "./lib";
console.log(defaultString); 
```

### 第五种导出方式

lib.js

```jsx
let fn = () => "string";
export {fn as default};
```

main.js

```jsx
import defaultFn from "./lib";
console.log(defaultFn());
```

### 第六种导出方式

other.js

```jsx
export let foo = "stringFoo";
export let fnFoo = function() {console.log("fnFoo")};
```

lib.js

```jsx
export * from "./other";
```

main.js

```jsx
import {foo, fnFoo} from "./lib";
console.log(foo);
console.log(fnFoo());
```

### 第七种导出方式

```jsx
import * as obj from "./lib";
console.log(obj);
```



###  ES6导入的模块都是属于引用

lib.js

```jsx
export let counter = 3;
export function incCounter() {
    counter++;
}
export function setCounter(value) {
    counter = value;
}
```

main.js

```jsx
import { counter, incCounter ,setCounter} from './lib';

// The imported value `counter` is live
console.log(counter); // 3
incCounter();
console.log(counter); // 4
setCounter(0);
console.log(counter); // 0
```

```jsx
//对于组件
const option=()=>{.....}
export default option
export default class Option
    
//
import option....
import Option ......
```

# 引入使用react modal

[官方文档](http://reactcommunity.org/react-modal/)

[例子](https://github.com/reactjs/react-modal) & [例子2](https://github.com/PsChina/React/tree/master/components#Modal)



## react components list

| 属性         | 说明                             | 默认值          | 类型     |
| ------------ | -------------------------------- | --------------- | -------- |
| onOk         | 点击确定的回调函数               | noop            | function |
| onCancel     | 点击取消的回调函数               | noop            | function |
| conFirmText  | 确定按钮自定义文字               | '确定'          | string   |
| cancelText   | 取消按钮自定义文字               | '取消'          | string   |
| titleClass   | 对话框 title 自定义样式          | 'modal-title'   | string   |
| contentClass | 对话框内容自定义样式             | 'modal-text'    | string   |
| footerClass  | 对话框确定取消按钮容器自定义样式 | 'modal-footer   | string   |
| okClass      | 对话框确定按钮自定义样式         | 'modal-confirm' | string   |
| cancelClass  | 对话框取消按钮自定义样式         | 'modal-cancel'  | string   |
| height       | 对话框宽度                       | 'auto'          | string   |
| width        | 对话框高度                       | '400px'         | string   |
| opacity      | 对话框透明度                     | 0.6             | nunmber  |