---
title: ts basic
top: false
cover: false
toc: true
mathjax: true
date: 2021-08-07 17:44:59
password:
summary: TS学习之基础类型
tags: [ts]
categories: [ts]
---

> 先看一下[文档](https://www.tslang.cn/docs/handbook/basic-types.html)   然后后面的更多是个人总结或者一些小坑


### 基本类型声明
```tsx
//3：定义数组
let arr: number[] = [1, 3, 5, 7];
let arr2: string[] = ["pink", "lala", "pa"];
console.log(arr2);//["pink", "lala", "pa"]
//第二种方式
let arr3: Array<number> = [1, 4, 7]

//4：元祖类型 （tuple) 也是数组中的一种 可以指定多种类型
let arr0: [string, number, boolean] = ["pom", 123, true]

//5 枚举类型 (enmu) 
//可以定义flag 1为true -1为false  或者支付类型等 0未支付 1支付 2交易成功
enum Flag { success = 1, error = -1 }
let f: Flag = Flag.success;
console.log(f);//1
enum pay_status { nopay = 0, pay = 1, success = 2 };
let type: pay_status = pay_status.pay;
console.log(type);//1
enum Color { red, blur = 5, orange };
let x: Color = Color.orange;
console.log(x);//6 
```

### 函数声明

```tsx
//函数
//1：声明式函数
function fun(): string {
  return "pin";
}
fun();

//2：匿名函数
let fun2 = function (): number {
  return 123;
}
console.log(fun2());

//3：ts中定义方法传参
function getInfo(name: string, age: number): string {
  return `${name}---的年龄为---${age}岁`;
}
console.log(getInfo("lala", 18));
//注意点：name和age定义了传入的参数必须是字符串，数字型，返回值的类型为string
let getInfo2 = function (name: string, age: number): string {
  return `${name}---的年龄为---${age}`;
}
console.log(getInfo2("pon", 30));

function fun0(): void {//没有返回值的函数
  console.log("run");
}
fun0();

//3.2：方法可选参数
//当给age参数添加一个?的时候，代表的是age属性可以传递也可以不传递
function getInfo3(name: string, age?: number): string {
  if (age) {
    return `${name}---的年龄为---${age}`;
  } else {
    return `${name}---的年龄为---保密`;
  }
}
console.log(getInfo3("pip", 20));

//3.3：默认参数 es5中不可设置默认参数 但是es6和ts都可以设置默认参数
// 注意点：可选参数必须配置在最后面，就是类似直接把age设置为默认参数，直接给了默认值
function getInfo4(name: string, age: number = 20): string {
  if (age) {
    return `${name}---的年龄为---${age}`;
  } else {
    return `${name}---的年龄为---保密`;
  }
}
console.log(getInfo4("pia")); //pia---的年龄为---20
console.log(getInfo4("pia", 30)); //pia---的年龄为---30

//3.4：剩余参数
//借助三点运算符  传递的参数转化为数组的形式 
function sum(...result: number[]): number {
  let sum = 0;
  for (let i = 0; i < result.length; i++) {
    sum += result[i]
  }
  return sum
}
console.log(sum(1, 2, 3, 4));//10
console.log(sum(1, 2, 3, 4, 5, 6));//21

//3.5：函数的重载
//在java中方法中的重载：重载指的是两个或者两个以上的同名函数，但是他们的参数不一样，这就是函数重载的现象。
//typescript的重载：通过为同一个函数提供多个函数类型定义来试下多种功能的目的
function getInfo0(name: string): string;
function getInfo0(age: number): number;
function getInfo0(str: any): any {
  if (typeof str === "string") {
    return "我的名字是" + str;
  } else {
    return "我的年龄是" + str
  }
}
console.log(getInfo0("pink"));//我的名字是pink
console.log(getInfo0(40));//我的年龄是40

//另一种写法
function getInfo5(name: string): string;
function getInfo5(name: string, age: number): string;
function getInfo5(name: any, age?: any): any {
  if (age) {
    return "我的名字是" + name + "我的年龄是" + age;
  } else {
    return "我的名字是" + name
  }
}
// console.log(getInfo5("paaa"));//我的名字是paaa
console.log(getInfo5("pa", 90));//我的名字是paaa 我的年龄是90

//3.6：箭头函数  this指向上下文
setTimeout(() => {
  console.log("run");//run
}, 3000) 
```

### [泛型](https://www.tslang.cn/docs/handbook/generics.html)

需要一种方法使返回值的类型与传入参数的类型是相同的。 这里，我们使用了 *类型变量*，它是一种特殊的变量，只用于表示类型而不是值。

```ts
function identity<T>(arg: T): T {
    return arg;
}
```

![]( ts-basic/image-20210808114707399.png)

这样的做法，及时下面的add的obj是本身obj要求数据的一部分，也不会报错