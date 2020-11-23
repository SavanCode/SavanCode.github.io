---
title: JS basic
top: false
cover: false
toc: true
mathjax: true
date: 2020-11-23 11:48:53
password:
summary:
tags: JS
categories:
---

## **this关键字和标识符**

```js
this;//返回当前对象
i;//返回变量i的值
sum;//返回变量sum的值
```

## **对象属性访问**

```js
var o = {x:1,y:{z:3}}; //对象字面量
var a = [o,4,[5,6]]; // 包含对象的数组字面量
o.x;//表达式o的x属性
o.y.z;//表达式o.y的z属性
o['x'];//对象o的x属性
a[1];//表达式a中索引为1的元素
```

## 运算符

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Left_shift

https://www.w3schools.com/js/js_operators.asp

### Postfix increment

```js
let x = 3;
y = x++;
// y = 3; x = 4
```

### Prefix increment

```js
let a = 2;
b = ++a;
// a = 3; b = 3
```

```js
var data = [0,1,2],i=0;
data[++i]+=10;
console.log(data);//[0,11,12]
```

难点：

```js
 var data = [7,8,9]; var i = 0; data[i++] *= 2;
```

数组data和i的值

```js
 var data = [7,8,9];var i = 0; data[i++] = data[i++] * 2; 
```

数组data和i的值又是多少

第一个表达式结果

```js
 data[0]=14  data[1]=8  data[2]=9  i=1
```

第二个结果

```js
 data[0]=16 data[1]=8 data[2]=9   i=2
```

## 结合性

数运算符都具有从左向右的结合性，只有一元运算符、条件运算符和赋值运算符具有从右向左的结合性

```js
w = x + y + z;
//等价于:
w = ((x + y)+ z);
w = x = y = z;
//等价于:
w = (x = (y = z));
q = a ? b : c ? d : e ? f : g;
//等价于:
q = a ? b : (c ? d : (e ? f : g));    
```

```js
a = 1;
b = a++ + a-- * a++;
```

　　先分析该表达式中，根据优先级的顺序，分别运算递增运算符、乘法运算符、加法运算符和赋值运算符

　　先计算第一个a++;//结果为1，a为2

```js
//表达式变成
b = 1 + a-- * a++;//计算a--;结果为2，a为1
```

```js
//表达式变成
b = 1 + 2 * a++;//计算第二个a++;//结果为1，a为2
```

```js
//表达式变成
b = 1 + 2 * 1;
```

　　所以，最终a = 2; b = 3;

##  数据类型转换

https://www.cnblogs.com/xiaohuochai/p/5674678.html

## Error

https://www.cnblogs.com/xiaohuochai/p/5677490.html

## javascript语句——条件语句、循环语句和跳转语句

### switch

```js
switch (expression)
  case value1: statement1;
    break;
  case value2: statement2;
    break;
  case value3: statement3;
    break;
  default: statement4;
```

### for in

```js
for(variable in object){
    statement
}
```

