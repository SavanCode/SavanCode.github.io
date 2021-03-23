---
title: es6 main concept 重点属性讲解
top: false
cover: false
toc: true
mathjax: true
date: 2021-01-30 12:11:52
password:
summary: es6的 this, 作用域, 高阶函数专门的解释，详细的对应方块笔记也有
tags: [JS,es6]
categories: JS
---

ES6的主要学习内容大纲内容
（有些写在了别处，就会直接link走起）


1. ES6 工具
2.    2.1 ES6 let 与 const
     2.2 ES6 解构赋值
     2.3 [ES6 Symbol](https://www.runoob.com/w3cnote/es6-symbol.html)
3. 3.1
          3.1.1 ES6 Map 与 Set
          3.1.2 [ES6 Reflect 与 Proxy](https://www.runoob.com/w3cnote/es6-reflect-proxy.html)  [更多讲解](https://zhuanlan.zhihu.com/p/60126477)
    3.2
          3.2.1 ES6 对象
          3.2.2 ES6 数值
          3.2.3 ES6 字符串
          3.2.4 ES6 数组
4. 4.1 ES6 函数
   4.2 ES6 迭代器
   4.3 ES6 Class 类
   4.4 ES6 模块
5. 
   5.1 ES6 Promise 对象
   5.2 ES6 Generator 函数
   5.3 ES6 async 函数




## 1. ES6 重要开发工具

> ### webpack
> #### webpack 是一个现代 JavaScript 应用程序的静态模块打包器 (module bundler) 。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图 (dependency graph) ，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle 
> ### gulp  
> #### gulp 是一个基于流的自动化构建工具，具有易于使用、构建快速、插件高质和易于学习的特点，常用于轻量级的工程中

## 2. 块级作用域 (let const)

​	ES6之前没有块级作用域，ES5的var没有块级作用域的概念，只有function有作用域的概念，ES6的let、const引入了块级作用域。

​	ES5之前if和for都没有作用域，所以很多时候需要使用function的作用域，比如闭包。

###	什么是变量作用域

​	变量在什么范围内可用，类似Java的全局变量和局部变量的概念，全局变量，全局都可用，局部变量只在范围内可用。ES5之前的var是没有块级作用域的概念，使用var声明的变量就是全局的。

```js
{
	var name = 'zzz';
	console.log(name);
}
console.log(name);
```

​	上述代码中{}外的`console.log(name)`可以获取到name值并打印出来，用var声明赋值的变量是全局变量，没有块级作用域。

###  没有块级作用域造成的问题

#### if块级

```javascript
var func;
if(true){
	var name = 'zzz';
	func = function (){
		console.log(name);
	}
	func();
}
name = 'ttt';
func();
console.log(name);
```

代码输出结果为`'zzz','ttt','ttt'`，第一次调用func()，此时name=‘zzz’，在if块外将name置成‘ttt’，此时生效了，if没有块级作用域。

#### for块级

​	定义五个按钮，增加事件，点击哪个按钮打印“第哪个按钮被点击了”。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>块级作用域</title>
</head>
<body>
  <button>按钮1</button>
  <button>按钮2</button>
  <button>按钮3</button>
  <button>按钮4</button>
  <button>按钮5</button>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js">    </script>
    <script>
      // 3.没有块级作用域引起的问题:for块级
      var btns = document.getElementsByTagName("button");
      for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click',function (param) {
        console.log("第"+i+"个按钮被点击了");
        });
      }
    </script>
</body>
</html>
```

​	for块级中使用`var`声明变量i时，是全局变量，点击任意按钮结果都是“第五个按钮被点击了”。说明在执行`btns[i].addEventListener('click',function())`时，for块级循环已经走完，此时`i=5`，所有添加的事件的i都是5。

​	改造上述代码，将for循环改造，由于函数有作用域，使用闭包能解决上述问题。

```javascript
      // 使用闭包,函数有作用域
      for (var i = 0; i < btns.length; i++) {
        (function (i) {
          btns[i].addEventListener('click',function (param) {
            console.log("第"+i+"个按钮被点击了");
          })
        })(i);
      }
```

​	结果就是一直显示 第5个摁纽一直被点击

​	在ES6中使用let/const解决块级作用域问题，let和const有块级作用域，const定义常量，在for块级中使用let解决块级作用域问题。

```javascript
      // ES6使用let/const
      const btns = document.getElementsByTagName("button");
      for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click',function (param) {
          console.log("第"+i+"个按钮被点击了");
        })
      }
```

​	结果和使用闭包解决一致。

##  3. const的使用

> **const 其实保证的不是变量的值不变，而是保证变量指向的内存地址所保存的数据不允许改动**
>
> 简单地说,不要重定向（赋值）

​	1.const用来定义常量，赋值知乎不能再赋值，再次赋值会报错。

```javascript
        //1.定义常量，赋值后不能再赋值，在赋值报错
        const count = 1
        // count = 2
```

​	2.const不能只声明不赋值，会报错。

```javascript
        //2.只声明不赋值，必须赋值
        // const count;
```

​	3.const常量含义是你不能改变其指向的对象，例如user，都是你可以改变user属性。

```js
        //3.常量的含义是你不能改变其指向的对象user，但是你可以改变user属性
        const user = {
            name:"zzz",
            age:24,
            height:175
        }
        console.log(user)
        user.name = "ttt"
        user.age = 22
        user.height = 188
        console.log(user)
```

##  4. ES6对象写法

###  obj属性增强型写法

```javascript
const name = "zzz";
const age = 18;
const user = {
	name,age// 跟属性名一样
}
console.log(user);

const obj = {
 ["he"+"llo"](){
   return "Hi";
  }
}
obj.hello();  //"Hi"
```

###  obj-function增强型写法

​	ES6之前对象内定义函数

```javascript
const obj = {
  run:function(){
     console.log("奔跑");
  }
}
```

  ES6写法

```javascript
const obj = {
  run(){
     console.log("奔跑");
  }
}
```

### es6 obj own functions
1. Object.preventExtensions(obj)  让一个对象变的不可扩展，也就是永远不能再添加新的属性。 
2. Object.isExtensible(obj) 判断一个对象是否是可扩展的
3. Object.seal(obj)让一个对象密封(只能读写 不能新增) 
4. Object.isSealed(obj)判断一个对象是否密封 
5. Object.isFrozen(arr)  让一个对象被冻结(只能读) 
6. Object.isFrozen(obj)：判断一个对象是否被冻结 
7. Object.keys(obj) 返回一个由给定对象的所有可枚举自身属性的属性名组成的数组 
8. Object.getOwnPropertyNames(obj)：返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性）组成的数组 Object.is(value1, value2)：判断两个值是否是同一个值。 
9. Object.create(proto [, propertiesObject ]) 是E5中提出的一种新的对象创建方式，第一个参数是要继承的原型，如果不是一个子函数，可以传一个null，第二个参数是对象的属性描述符，这个参数是可选的。
10. Object.assign 把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象。 
11. Object.defineProperty() 定义单个对象属性或方法(可以设置读写可枚举) 
12. Object.defineProperties() 定义多个对象属性或方法(可以设置读写可枚举)

### object.assign ()

#### 创建新对象

```js
Object.assign(3);         // Number {3}
typeof Object.assign(3);  // "object"
```

#### obj copy object复制

```js
var obj = { a: 1 };
var copy = Object.assign({}, obj);
console.log(copy); // { a: 1 }
```

#### 改变obj内容 对象合并

```js
var o1 = { a: 1 };
var o2 = { b: 2 };
var o3 = { c: 3 };

var obj = Object.assign(o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
console.log(o1);  // { a: 1, b: 2, c: 3 }, 注意目标对象自身也会改变。 
//如果不想o1发生变化
 var obj = Object.assign({},o1, o2, o3);
```

```js
//这里直接通过obj的value覆盖
Object.assign(arr[index], {
    profileId,
    name,
    type,
    rw,
    accrue
  });
//方程方式 newObj({*:*,*:*})
function newObj(...para) {
    Object.assign(newArticleObject,para[0])
}
```

#### 面试经常会遇到的小难题

1.继承属性和不可枚举属性是不能拷贝的

```js
var obj = Object.create({foo: 1}, { // foo 是个继承属性。
    bar: {
        value: 2  // bar 是个不可枚举属性。
    },
    baz: {
        value: 3,
        enumerable: true  // baz 是个自身可枚举属性。
    }
});

var copy = Object.assign({}, obj);
console.log(copy); // { baz: 3 }复制代码
```

2、原始类型会被包装为 object

```js
var v1 = "abc";
var v2 = true;
var v3 = 10;
var v4 = Symbol("foo")

var obj = Object.assign({}, v1, null, v2, undefined, v3, v4); 
// 原始类型会被包装，null 和 undefined 会被忽略。
// 注意，只有字符串的包装对象才可能有自身可枚举属性。
console.log(obj); // { "0": "a", "1": "b", "2": "c" }复制代码
```

3、异常会打断接下来的拷贝任务

```js
var target = Object.defineProperty({}, "foo", {
    value: 1,
    writable: false
}); // target 的 foo 属性是个只读属性。

Object.assign(target, {bar: 2}, {foo2: 3, foo: 3, foo3: 3}, {baz: 4});
// TypeError: "foo" is read-only
// 注意这个异常是在拷贝第二个源对象的第二个属性时发生的。

console.log(target.bar);  // 2，说明第一个源对象拷贝成功了。
console.log(target.foo2); // 3，说明第二个源对象的第一个属性也拷贝成功了。
console.log(target.foo);  // 1，只读属性不能被覆盖，所以第二个源对象的第二个属性拷贝失败了。
console.log(target.foo3); // undefined，异常之后 assign 方法就退出了，第三个属性是不会被拷贝到的。
console.log(target.baz);  // undefined，第三个源对象更是不会被拷贝到的。
```

### [Object.create()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)

```js
var roles = { 
   type: "Admin", // Default value of properties 
   displayType : function() {  
      // Method which will display type of role 
      console.log(this.type); 
   } 
}  
// Create new role type called super_role 
var super_role = Object.create(roles); 
super_role.displayType(); // Output:Admin  

// Create new role type called Guest 
var guest_role = Object.create(roles); 
guest_role.type = "Guest"; 
guest_role.displayType(); // Output:Guest
```

### Object.is() ===

用来判断两个值是否是同一个值

```js
Object.is('haorooms', 'haorooms');     // true
Object.is(window, window);   // true

Object.is('foo', 'bar');     // false
Object.is([], []);           // false

var test = { a: 1 };
Object.is(test, test);       // true

Object.is(null, null);       // true

// 特例
Object.is(0, -0);            // false
Object.is(-0, -0);           // true
Object.is(NaN, 0/0);         // true 
```

### Object.keys()

返回一个由给定对象的自身可枚举属性组成的数组

```js
/* 类数组对象 */ 
var obj = { 0 : "a", 1 : "b", 2 : "c"};
alert(Object.keys(obj));// 弹出"0,1,2"

/* 具有随机键排序的数组类对象 */
var an_obj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.keys(an_obj));// console: ['2', '7', '100'] 
```

### 拷贝obj

```js
let person = {name: "Amy", age: 15};
let someone = { ...person };
someone;  //{name: "Amy", age: 15}
```

### 合并对象

```js
let age = {age: 15};
let name = {name: "Amy"};
let person = {...age, ...name};
person;  //{age: 15, name: "Amy"}

//有重复属性 ，后面覆盖前面
let person = {name: "Amy", age: 15};
let someone = {name: "Mike", age: 17, ...person};
someone;  //{name: "Amy", age: 15}

let a = {...{}, a: 1, b: 2};
a;  //{a: 1, b: 2}。
let b = {...null, ...undefined, a: 1, b: 2};
b;  //{a: 1, b: 2}
```



### 解构obj

```js
let {name,cgpa} = student
let {name:new_name,cgpa:new_cgpa}=student
//复杂的
let emp = {
  id:101,
  address:{
     city:'Mumbai',
     pin:1234
  }
}
let {address} = emp;
console.log(address)//{city: "Mumbai", pin: 1234}
let {address:{city,pin}} = emp
console.log(city)//Mumbai
```

### delete 

删除对象中的某个值

```js
const Employee = {
  firstname: 'John',
  lastname: 'Doe'
};

console.log(Employee.firstname);// expected output: "John"
delete Employee.firstname;
console.log(Employee.firstname);//undefined
```

## 5. Number

### number 转换

```js
//Number.isFinite()对于非数值一律返回false
//Number.isNaN()只有对于NaN才返回true，非NaN一律返回false
Number.isFinite(15); // true
Number.isFinite(NaN); // false
Number.isFinite(Infinity); // false

Number.isNaN(NaN) // true
Number.isNaN("NaN") // false
Number.isNaN(1) // false

Number.parseInt(), Number.parseFloat()//只是前面加上了Number
Number.isInteger()//判断整数
```



### 进制对比

```js
//二进制表示法新写法: 前缀 0b 或 0B
//八进制表示法新写法: 前缀 0o 或 0O 
console.log(0b11 === 3); // true
console.log(0B11 === 3); // true
console.log(0o11 === 9); // true
console.log(0O11 === 9); // true
```

### 常量

Number.EPSILON 属性表示 1 与大于 1 的最小浮点数之间的差。它的值接近于  2^-52。

```js
0.1+0.2 == 0.3//false
0.1+0.2 === 0.3//false
//why??
equal = (Math.abs(0.1 - 0.3 + 0.2) < Number.EPSILON); // true 所以实际上有偏差

//Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER这两个常量，用来表示这个范围的上下限。

Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1 // true
Number.MAX_SAFE_INTEGER === 9007199254740991 // true
Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER // true
Number.MIN_SAFE_INTEGER === -9007199254740991 // true

//Number.isSafeInteger()则是用来判断一个整数是否落在这个范围之内。

Number.isSafeInteger('a') // false
Number.isSafeInteger(null) // false
Number.isSafeInteger(NaN) // false
Number.isSafeInteger(Infinity) // false
Number.isSafeInteger(-Infinity) // false

Number.isSafeInteger(3) // true
Number.isSafeInteger(1.2) // false
Number.isSafeInteger(9007199254740990) // true
Number.isSafeInteger(9007199254740992) // false

Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1) // false
Number.isSafeInteger(Number.MIN_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1) // false
```

### Math 新函数

#### 数字

- Math.sign() 用来判断一个数到底是正数、负数、还是零
它会返回五种值。
  - 参数为正数，返回+1；
  - 参数为负数，返回-1；
  - 参数为0，返回0；
  - 参数为-0，返回-0;
  - 其他值，返回NaN。

- Math.cbrt()   Math.cbrt方法用于计算一个数的立方根。（ 3的立方） 
```
  Math.cbrt('8') // 2 
  Math.cbrt('hello') // NaN
```

- Math.clz32() 返回一个数的32位无符号整数形式有多少个前导0
- Math.imul( ) 返回两个数以32位带符号整数形式相乘的结果，返回的也是一个32位的带符号整数
- Math.fround() 返回一个数的单精度浮点数形式。
- Math.fround() 返回一个数的单精度浮点数形式
- Math.hypot() 返回所有参数的平方和的平方根

#### 对数
1. Math.expm1(x)返回ex - 1，即Math.exp(x) - 1
2. Math.log1p(x)方法返回1 + x的自然对数，即Math.log(1 + x)。如果x小于-1，返回NaN
3. Math.log10(x)返回以10为底的x的对数。如果x小于0，则返回NaN
4. Math.log2(x)返回以2为底的x的对数。如果x小于0，则返回NaN

#### 三角函数方法

1. Math.sinh(x) 返回x的双曲正弦（hyperbolic sine）
2. Math.cosh(x) 返回x的双曲余弦（hyperbolic cosine）
3. Math.tanh(x) 返回x的双曲正切（hyperbolic tangent）
4. Math.asinh(x) 返回x的反双曲正弦（inverse hyperbolic sine）
5. Math.acosh(x) 返回x的反双曲余弦（inverse hyperbolic cosine）
6. Math.atanh(x) 返回x的反双曲正切（inverse hyperbolic tangent）

### 新的指数运算符 `**`

```js
2 ** 2 // 4
let b = 4;
b **= 3;  // 等同于 b = b * b * b;
console.log(b)  //64
```



## 6. string 字符串

### 字符 字节操作

```js
codePointAt() //测试一个字符由两个字节还是由四个字节组成
String.fromCodePoint() // 用于从码点返回对应字符，但是这个方法不能识别32位的UTF-16字符
// ES5对字符串提供charAt  ES6 at()
'abc'.at(0) // "a"
''.at(0) // ""
'\u01D1'==='\u004F\u030C' //false
//normalize()方法，用来将字符的不同表示方法统一为同样的形式，这称为Unicode正规化。
```

### for…of循环string遍历

```js
//最大的优点是可以识别大于0xFFFF的码点
for(let codePointAt of 'hicai'){
     console.log(codePointAt);
  }  
```

### 包含

```js
let string = "apple,banana,orange";
string.includes("banana");     // true
string.startsWith("apple");    // true
string.endsWith("apple");      // false
string.startsWith("banana",6)  // true
```

### repeat

```js
console.log("Hello,".repeat(2));  // "Hello,Hello,"
console.log("Hello,".repeat(3.2));  // "Hello,Hello,Hello,"
console.log("Hello,".repeat(-0.5));  // "" 
console.log("Hello,".repeat(NaN));  // "" 

//如果参数是负数或者 Infinity ，会报错:
console.log("Hello,".repeat(-1));  
// RangeError: Invalid count value
console.log("Hello,".repeat(Infinity));  
// RangeError: Invalid count value

//如果传入的参数是字符串，则会先将字符串转化为数字
console.log("Hello,".repeat("hh")); // ""
console.log("Hello,".repeat("2"));  // "Hello,Hello,"
```

### string生成按照要求

```js
//数字表示整体的string总长度
//start从左补起
//end从右补起
console.log("h".padStart(5,"o"));  // "ooooh"
console.log("h".padEnd(5,"o"));    // "hoooo"
console.log("h".padStart(5));      // "    h"
console.log("hello".padStart(5,"A"));  // "hello"
console.log("hello".padEnd(10,",world!"));  // "hello,worl"
console.log("123".padStart(10,"0"));  // "0000000123"
```

### 换行字符串

```js
let string = `Hello'\n'world`;
console.log(string); 
// "Hello'
// 'world"

let string1 =  `Hey,
can you stop angry now?`;
console.log(string1);
// Hey,
// can you stop angry now?
```
### 插入变量 表达式 函数 的string

```js
let name = "Mike";
let age = 27;
let info = `My Name is ${name},I am ${age+1} years old next year.`
console.log(info);
// My Name is Mike,I am 28 years old next year.

function f(){
  return "have fun!";
}
let string2= `Game start,${f()}`;
console.log(string2);  // Game start,have fun!
```

### 标签模板

```js
innerHtml = `<ul>
  <li>menu</li>
  <li>mine</li>
</ul>
`;
console.log(innerHtml);
//输出
<ul>
 <li>menu</li>
 <li>mine</li>
</ul>
```



## 7.函数

### 不定参数

```js
function f(...values){    
    console.log(values.length); 
} 
f(1,2);      //2 f(1,2,3,4);  //4
```

### 默认参数

```js
function f(x,y=x){
    console.log(x,y);
}
f(1);  // 1 1
```

##  8. 箭头函数

[额外的基础专题笔记](https://savancode.github.io/2020/11/26/js-arrowFunction/)

###  认识箭头函数

> 传统定义函数的方式

```javascript
  const aaa = function (param) { }
```

> 对象字面量中定义函数

```javascript
const obj = { bbb (param) {  }, }
```

> ES6中的箭头函数

```javascript
//const ccc = (参数列表) => {}
  const ccc = () => {}
```

###  箭头函数的参数和返回值

####  参数问题

> 1.放入两个参数

```javascript
const sum = (num1,num2) => {  return num1 + num2  }
```

> 2.放入一个参数,()可以省略

```javascript
const power = num => { return num * num }
```

#### 函数内部

> 1.函数中代码块中有多行代码

```javascript
const test = () =>{
  console.log("hello zzz")
  console.log("hello vue")
}
```

> 2.函数代码块中只有一行代码，可以省略return

```javascript
// const mul = (num1,num2) => {
//   return num1 * num2
// }
const mul = (num1,num2) => num1* num2
// const log = () => {
//   console.log("log")
// }
const log = () => console.log("log")
```

###  箭头函数的this使用

> 什么时候使用箭头函数

```javascript
setTimeout(function () {
	console.log(this)
} , 1000);
setTimeout(() => {
	console.log(this)//这里this找的是window的this
}, 1000);
```

> 结论：箭头函数没有this，这里this引用的是最近作用域（aaa函数里的this）的this。

```javascript
const obj = {
  aaa(){
    setTimeout(function () {
      console.log(this)//window
     });
     setTimeout(() => {
      console.log(this)//obj
    });
  }
}
obj.aaa()
```

> ​	上述中第一个是window对象的this，第二个箭头函数的this是obj的。

```javascript
const obj = {
  aaa() {
    setTimeout(function () {
      setTimeout(function () {
        console.log(this) //window
      })
      setTimeout(() => {
        console.log(this) //window
      })
    })
    setTimeout(() => {
      setTimeout(function () {
        console.log(this) //window
      })
      setTimeout(() => {
        console.log(this) //obj
      })
    })
  }
}
obj.aaa()
```

个人笔记： 
箭头函数没有this，这里this会引用上一层的this

箭头函数里面有正常函数，正常函数的this是有他自己定

正常函数包裹箭头函数 ，箭头函数this 上一层管

正常函数包裹正常函数，上一层管（？）

## 9. this的额外题目

https://blog.csdn.net/weixin_44766633/article/details/107592044
https://my.oschina.net/u/4627303/blog/4540593

## 10. 高阶函数

###  filter过滤函数

```javascript
const nums = [2,3,5,1,77,55,100,200]
//要求获取nums中大于50的数
//回调函数会遍历nums中每一个数，传入回调函数，在回调函数中写判断逻辑，返回true则会被数组接收，false会被拒绝
let newNums = nums.filter(function (num) {
  if(num > 50){
    return true;
  }
  return false;
 })
 //可以使用箭头函数简写
//  let newNums = nums.filter(num => num >50)
//多条件筛选
//return el.price <= 1000 && el.sqft >= 500 && el.num_of_beds >=2 && el.num_of_baths >= 2.5;
```

###  map高阶函数

```javascript
// 要求将已经过滤的新数组每项乘以2
//map函数同样会遍历数组每一项，传入回调函数为参数，num是map遍历的每一项，回调函数function返回值会被添加到新数组中
let newNums2 = newNums.map(function (num) {
  return num * 2
 })
 //简写
//  let newNums2 = newNums.map(num => num * 2)
console.log(newNums2);
```

### reduce高阶函数

```javascript
// 3.reduce高阶函数
//要求将newNums2的数组所有数累加
//reduce函数同样会遍历数组每一项，传入回调函数和‘0’为参数，0表示回调函数中preValue初始值为0，回调函数中参数preValue是每一次回调函数function返回的值，currentValue是当前值
//例如数组为[154, 110, 200, 400],则回调函数第一次返回值为0+154=154，第二次preValue为154，返回值为154+110=264，以此类推直到遍历完成
let newNum = newNums2.reduce(function (preValue,currentValue) {
  return preValue + currentValue
 },0)
//简写
// let newNum = newNums2.reduce((preValue,currentValue) => preValue + currentValue)
console.log(newNum);
```

###  综合使用

```javascript
//三个需求综合
let n = nums.filter(num => num > 50).map(num => num * 2).reduce((preValue,currentValue) => preValue + currentValue)
console.log(n);
```

## [基本到这里 可以看一下总结的JS 脑图~~~~](https://gitee.com/jinsexiaozhima/jiujin/tree/master/Mindmap/%E5%8E%9F%E7%94%9FJS%E7%AF%87)

## Reference

[ES6](https://www.tutorialspoint.com/es6/index.htm)