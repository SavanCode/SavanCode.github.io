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

# 定义变量

## let/const 一起和 var 的区别

| var                                       | let/const                        |
| ----------------------------------------- | -------------------------------- |
| 会进行预解析                              | 不会进行预解析, 必须先定义后使用 |
| 声明重复变量名                            | 不能声明重复的变量名             |
| 没有块级作用域,声明全局变量（函数内除外） | 有块级作用域                     |

![](JS-basic/1606354411609.png)



**以上报错i未定义，说明let定义变量i，只在所在的块作用域内起作用**

![](JS-basic/1606354454983.png)

**var 定义变量没有块级作用域，i在块级作用域照样可以输出结果**

var在函数内命名的变量是只在整个函数作用域内起作用，出了这个函数作用域就不能用了

## let vs const

| let          | const          |
| ------------ | -------------- |
| 变量         | 常量           |
| 可以先不赋值 | 必须声明时赋值 |
| 变量可以改   | 不能改         |



## 对象属性访问

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

###  increment（i++ & ++i）

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



## 结合性 - 数运算符



![运算符结合性](JS-basic/1606353255160.png)


- 优先级越高的优先运算，不用死记该图片，可以使用（）提升优先级 
  赋值优先级最低

- 先乘除后加减

- 优先级相同情况下,从左到右依次计算

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

https://www.runoob.com/js/js-type-conversion.html

https://www.w3school.com.cn/js/js_type_conversion.asp

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

