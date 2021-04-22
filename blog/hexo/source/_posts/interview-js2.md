---
title: interview js 知识点总结2
top: false
cover: false
toc: true
mathjax: true
date: 2021-03-30 11:06:42
password:
summary: interview js 笔试题
tags: interview
categories: interview
---

### 问题1：数组排序比较 考虑以下数组。在不同的排序条件中会输出什么?

const arr1 = [‘a’, ‘b’, ‘c’]; const arr2 = [‘b’, ‘c’, ‘a’];

console.log( arr1.sort() `===` arr1, arr2.sort() == arr2, arr1.sort() `===` arr2.sort() ); 

> 答案: true, true, false

### 问题2：set 一组对象 考虑下面的对象 Set 集合，它们散布到一个新的数组中。会输出什么?

const mySet = new Set([{ a: 1 }, { a: 1 }]);

const result = […mySet];

console.log(result); 

>  答案：[{a: 1}, {a: 1}]。
>
> 这里的去重 更适合对于array

### 问题3：深度对象可变性 考虑下面这个代表用户Joe和他的狗Buttercup的对象。我们使用 Object.freeze 保存我们的对象，然后尝试更改Buttercup的名称。会输出什么?

const user = { name: ‘Joe’, age: 25, pet: { type: ‘dog’, name: ‘Buttercup’ } };

Object.freeze(user);

user.pet.name = ‘Daffodil’;

console.log(user.pet.name); 

> 答案：Daffodil。
>
> Object.freeze 将对对象执行浅层冻结，但不会保护深层属性不被突变。在此示例中，我们将无法更改user.age，但对 user.pet.name 进行更改不会有问题。如果我们认为需要保护某个对象以免其被“彻底破坏”，则可以递归应用 Object.freeze 或使用现有的“deep freeze”库。

### 问题4：原型继承 在这个问题中，我们有一个 Dog 构造函数，我们的 dog 显然知道说话的命令。当我们要求Pogo讲话时，以下示例中将会输出什么?

function Dog(name) { this.name = name; this.speak = function() { return ‘woof’; }; }

const dog = new Dog(‘Pogo’);

Dog.prototype.speak = function() { return ‘arf’; };

console.log(dog.speak()); 

>  答案：woof。
>
> 每次创建一个新的 Dog 实例时，我们都会将该实例的 speak 属性设置为一个返回字符串 woof 的函数。由于每次创建新的 Dog 实例时都会设置该字段，因此解释器无需再向上寻找原型链来查找 speak 属性。结果，永远不会使用 Dog.prototype.speak 上的 speak 方法。

### 问题5：Promise.all Resolve Order 在这个问题中，我们有一个 timer 函数，该函数返回一个 Promise，该Promise将在随机时间后解析。我们使用 Promise.all 解析 timers 数组。会输出什么，还是随机的?

const timer = a => { return new Promise(res => setTimeout(() => { res(a); }, Math.random() * 100) ); };

const all = Promise.all([ timer(‘first’), timer(‘second’) ]).then(data => console.log(data));

> 答案： [“first”, “second”]。
>
> Promise解决的顺序与 Promise.all 无关。我们可以可靠地指望它们以数组参数中提供的相同顺序返回。

### 问题6：Reduce Math 下面的代码输出什么?

const arr = [ x => x * 1, x => x * 2, x => x * 3, x => x * 4 ];

console.log(arr.reduce((agg, el) => agg + el(agg), 1)); 

> 答案：120。
>
> 使用 Array#reduce 时，聚合器的初始值(在这里称为 agg)在第二个参数中给出。在这种情况下，就是 1。然后，我们可以如下迭代函数：
>
> ```
> arr.reduce(callback( accumulator, currentValue),[initialValue])
> ```
>
> 1 +1 * 1 = 2(下一次迭代中聚合器的值)
> 2 + 2 * 2 = 6(下一次迭代中聚合器的值) 
6 + 6 * 3 = 24(下一次迭代中聚合器的值) 
24 + 24 * 4 = 120(最终值) 因此，它是120!

### 问题7 Short-Circuit Notification(s) ???

Let’s display some notifications to our user! What gets logged in the following snippet?

```javascript
const notifications = 1;

console.log(
  `You have ${notifications} notification${notifications !== 1 && 's'}`)
```

> 答案: "You have 1 notificationfalse"
>
> 因为false = 0; true = 1 但是这里的想法是错的
>
>  If we want our snippet to work correctly, we could consider the conditional operator: `${notifications === 1 ? '' : 's'}`.

### 问题8 Array Method Binding

What gets logged in the following scenario?

```javascript
const map = ['a', 'b', 'c'].map.bind([1, 2, 3]);
map(el => console.log(el));
```

>  **Answer:** 1 2 3
>
> Function.prototype.bind 将把函数的 this 绑定到第一个参数(在本例中是 [1, 2, 3])

### 问题9  JS随机生成N个长度的字符

```js
//方法一
function aa(N){ 
     var arr =[];//定义一个数组，用来拼接字符 
 for(var i=0;i<N;i++){//N个长度 
     var ran = Math.foor(Math.random()*10);//生成随机数 
     arr.push(ran);//在数组最后添加生成的随机数 
 } 
 	console.log(arr.join(""));//使用join转换为字符 } 
 }
 aa(10);//生成10个长度的字符

//方法2
function aa(N){ 
     var string ="";//定义一个数组，用来拼接字符
 for(var i=0;i<N;i++){//N个长度
     var ran = Math.floor(Math.random()*10);//生成随机数
     string=string+ran;//在数组最后添加生成的随机数
     } 
console.log(string)
 }function aa(N){ 
     var string ="";//定义一个数组，用来拼接字符
 for(var i=0;i<N;i++){//N个长度
     var ran = Math.floor(Math.random()*10);//生成随机数
     string=string+ran;//在数组最后添加生成的随机数
     } 
console.log(string)
console.log(typeof string)
 }
```

### 若a=1，b=2在不使用第三个变量的情况下，交换a和b的值。（至少两种）
```js
var a = 1, b = 2; 
a = a + b; // a=3 
b = a - b; // b = 3-2; b=1; 
a = a - b; // a = 3 - 1; a=2; 
console.log(a,b); // a=2 , b=1
```
```js
var a = 1, b = 2; 
console.log([a,b],[b,a]); // ES6语法 1,2 2,1
```
```js
var a = 1, b = 2; 
a = [a,b]; a = a[1]; b = a[0]; 
console.log(a,b); // 2,1
```
```js
var a = 1, b = 2; 
a = [b , b = a]; // a[0] = 2, a[1] = 1 
console.log(a) // 2,1
```

### 判断回文 - 字符‘正’过来和‘倒’过来是一样的
```js
var date = 'level'; 
var arr = date.split("").reverse().join(""); date == arr? console.log(true) : console.log(false);
```

### 代码输出
```js
var a = false
var b = a/0
if(a){
	console.log(a * 2 + '2' + 4)
}else{
	console.log(!a * 2 + '2' + 4)
}
// a / 0 返回的是 false / 0 值为 NaN 不是一个数 2.之后a为false 所以进入else
// !a = true a为false 取反则为 true 等于 1
// 结果为：224
```

### 代码输出 ???

```js
function a(xx){
	this.x = xx;
	return this;
}
var x = a(5);
var y = a(6);

console.log(x.x);//undefined
console.log(y.x);//6
```

### 程序输出

```js
var myObject = {
    foo: 'bar',
    func: function () {
    	var self = this;
    	console.log(this.foo==myObject.foo); // 指向的是myObject对象 所以 this.foo == myObject.self
    	console.log(self==this);   // self == myObject 所以 self.foo == this.foo == myObject.self
    	(function(){
          console.log(this==window);  // 普通函数中的 this => window 所以 this.foo == window.foo => undefined
          console.log(self == myObject); // self == myObject 所以 self.foo == myObject => bar
    	}());
   	}
}
myObject.func(); // true true true true 
```

### 如今有一个ul里面有十亿个li，要求点击li触发事件，并弹出li对应的类容

```js
var ul = document.getElementsByTagName('ul')[0];
ul.onclick = function(e){
	var a = e.targent || e.srcElement;
	console.log(a);
}
```

### 数组去重,原型链上编程

```js
Array.prototype.unique = function(){
		var obj = {}, 
		    len = this.length,
		    newArray = [];
		    for (var i = 0; i < len; i++) {
		    // 判断对象上的键值是否为undefined
             // 这里的思想主要是讲value变成了新的数组里面的key 所以可以去判断存在不
                console.log(this[i]);
                console.log(obj)
                console.log(obj[this[i]]);
		    	if (!obj[this[i]]) {
		    	obj[this[i]] = 'test';
		    	newArray.push(this[i]);
		    	}
		    }
		    return newArray;
	}

var arr = [2,3,2,3,4,5,0,6,4,7,'a','a','b'];
arr.unique();
```

### push() 、pop()、shift()、unshift()分别是什么功能？

push() : 在数组的尾部添加一个或者多个元素，并返回数组的新长度。 pop() : 删除数组的最后一个元素，并返回被删除的值。 shift() : 删除数组的第一个元素，并返回。 unshift() : 在数组的头部添加一个或者多个元素，并返回数组的新长度

### 描述一下JS时间线的顺序、状态和触发函数

浏览器开始解析页面，状态为loading 
遇到外部的文件创建线程加载，碰到没有设置async或者defer的JS文件阻塞加载。 
文档解析完成，状态为interactive
触发DOMContentLoaded事件 
所有文档下载完成，状态为complete 或者 loaded
window触发onload事件

### 冒泡排序的代码

```js
function fun(arr){
	for(var i =0; i<arr.length; i++){
		for(var j = 0; j<arr.length; j++){
			if(arr[j]>arr[j+1]){
				var big = arr[j];
				arr[j] = arr[j+1];
				arr[j+1] = big;
			}
		}
	}
	return arr;
}
```
### Object.is() 与比较操作符 ===、== 的区别？
使用双等号进行相等判断时，如果两边的类型不一致，则会进行强制类型转化后再进行比较。
使用三等号进行相等判断时，如果两边的类型不一致时，不会做强制类型准换，直接返回 false。
使用 Object.is 来进行相等判断时，一般情况下和三等号的判断相同，它处理了一些特殊的情况，比如 -0 和 +0 不再相等，两个 NaN 认定为是相等的。

### typeof NaN 的结果是什么？
NaN 意指“不是一个数字”（not a number），NaN 是一个“警戒值”（sentinel value，有特殊用途的常规值），用于指出 数字类型中的错误情况，即“执行数学运算没有成功，这是失败后返回的结果”。
```js
typeof NaN; // "number"
```
NaN 是一个特殊值，它和自身不相等，是唯一一个非自反（自反，reflexive，即 x === x 不成立）的值。而 NaN != NaN 为 true。

### isNaN 和 Number.isNaN 函数的区别？
函数 isNaN 接收参数后，会尝试将这个参数转换为数值，任何不能被转换为数值的的值都会返回 true，因此非数字值传入也会返回 true ，会影响 NaN 的判断。
函数 Number.isNaN 会首先判断传入参数是否为数字，如果是数字再继续判断是否为 NaN ，这种方法对于 NaN 的判断更为准确。