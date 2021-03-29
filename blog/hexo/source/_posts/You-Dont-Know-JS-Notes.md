---
title: 你不知道的 javascript 读书笔记
top: false
cover: false
toc: true
mathjax: true
date: 2021-03-28 15:58:49
password:
summary: 你不知道的 javascript 读书笔记
tags: JS
categories: JS
---

## 第一部分 新手入门

### JavaScript的类型

- `string`
- `number`
- `boolean`
- `null` 和 `undefined`
- `object`
- `symbol` (ES6中新引入)

```
a = null;
typeof a;                // "object" -- weird, bug

var arr = [
    "hello world",
    42,
    true
];

typeof arr;        // "object"
```

### 对象

```js
var obj = {
    a: "hello world",
    b: "a",
};

obj.a;        // "hello world"
obj["a"];    // "hello world"
obj[obj.b];        // "hello world"
```

### Boolean

```js
//false
""//（空字符串）
0, -0, NaN//（无效的number）
null, undefined

//true
"hello"
42
true
[ ], [1,"2",3]
{ }, {a:42}
```

### 等式

>
> `==` 在允许强制类型转换的情况下来检查两个值是否相等，而`===` 不允许强制转换来检查两个值是否相等；因此`===`常称作“严格相等”。
>


根据不同的情况选择用`==`还是`===`，规则如下：

- 如果比较的两个值中有一个可能是true或false值，应用`===`，不用`==`。
- 如果比较的两个值中有一个可能是这些特定值（0, ""或[]——空数组），应用`===`，不用`==`。
- 在其他所有情况下，都可以放心的用`==`。用`==`不仅安全无害，而且在很多情况下都可以简化你的代码，从而提高程序的可读性。 列举的这些规则要求你认真思考你的代码，仔细考虑对变量进行比较时得到的具体是什么类型的值。如果你能够确定值的类型，用`==`就很安全，大胆的用吧！如果你不能确定值的类型，就用`===`

### 不等式

<`,`>`,`<=`和`>= 这里 的对比， 如果两者都是string 对比，那么会字典对比 ， 如果两者有一个或者两个都不是string，强制转换为number 

### 变量（变量提升 作用域 严格模式 条件语句）

### 立即执行函数表达式(IIFEs)

### 闭包

```js
function makeAdder(x) {
    // parameter `x` is an inner variable
    function add(y) {
        return y + x;
    };
    return add;
}

var plusOne = makeAdder( 1 );

var plusTen = makeAdder( 10 );

plusOne( 3 );       // 4  <-- 1 + 3
plusOne( 41 );      // 42 <-- 1 + 41
plusTen( 13 );      // 23 <-- 10 + 13
```



### 