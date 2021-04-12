---
title: js create obj - JavaScript深入之创建对象的多种方式以及优缺点
top: false
cover: false
toc: true
mathjax: true
date: 2020-12-07 21:16:41
password:
summary: JavaScript深入之创建对象的多种方式以及优缺点
tags: [JS,JS object]
categories: JS
---

## 1.对象字面量式
```js
//通过new 关键字创建对象
var person = new Ojbect();
person.name = '';
person.age = 30;
person.job = 'web developer';

//通过对象字面量创建对象
var person = {};
person.name = '';
person.age = 30;
person.job = 'web developer';
```

缺点；大量的代码

## 2. 工厂模式

```js
function createPerson(name) {
    var o = new Object();
    o.name = name;
    o.getName = function () {
        console.log(this.name);
    };
    return o;
}

var person1 = createPerson('kevin');
```

> 核心：返回新对象
>
> 优点：可以创建多个类似对象
>
> 缺点：对象无法识别，因为所有的实例都指向一个原型 Object
>

## 3. 构造函数模式

```js
function Person(name) {// let Person = function(name)... 一样
    this.name = name;
    this.getName = function() {
     	 console.log(this.name);
	}
}
var person1 = new Person('kevin');
```

> 跟工厂模式的区别：
>
> - 没有显式创建对象
> - 属性方法 直接给了this
> - 没有return
>
> 这里new的实际内部操作：
> 创建新对象 - 新对象prototype直接指向函数的原型 - this指向对象 - 执行构造函数 - 返回非空对象

> 核心：直接使用new操作符
>
> 优点：实例可以识别为一个特定的类型
>
> 缺点：每次创建实例时，每个方法都要被创建一次
>

### 3.1 构造函数模式优化

```js
function Person(name) {// let Person = function(name)... 一样
    this.name = name;
    this.getName = getName;
}
//这样写节省空间（红宝石书中有解释）
function getName() {
    console.log(this.name);
}

var person1 = new Person('kevin');
```

优点：解决了每个方法都要被重新创建的问题

缺点：这叫啥封装……

## 3. 原型模式

```js
function Person() {}

Person.prototype.name = 'keivn';
Person.prototype.getName = function () {
    console.log(this.name);
};

var person1 = new Person();
let person2 = new Person();

console.log(person1.getName == person2.getName); // true
```

> 优点：方法不会重新创建
>
> 缺点：
>
> 1. 所有的属性和方法都共享 
> 2. 弱化了构造函数，没有初始化参数

```js
//判断属性是否存在原型中
function hasPrototypeProperty(object,name){
    return object.hasOwnProperty(name) && (name in object);
}
```

### 4.1 原型模式优化

```js
function Person(name) {}

Person.prototype = {
    name: 'kevin',
    getName: function () {
        console.log(this.name);
    }
};

var person1 = new Person();
```

优点：封装性好了一点

缺点：重写了原型，丢失了constructor属性；即切断现有原型与之前存在的对象实例之间的联系）

### 4.2 原型模式优化

```js
function Person(name) {}

Person.prototype = {
    constructor: Person,//这里的好处与问题 下面讲解
    name: 'kevin',
    getName: function () {
        console.log(this.name);
    }
};

var person1 = new Person('jack');
```

优点：实例可以通过constructor属性找到所属构造函数

缺点：原型模式该有的缺点还是有

## 5. 组合模式 (推荐)

构造函数模式与原型模式双剑合璧。

> 核心：用构造函数定义实例属性，用原型定义方法和共享属性
>
> 优点：该共享的共享，该私有的私有，使用最广泛的方式
>
> 缺点：有的人就是希望全部都写在一起，即更好的封装性

> 由于原型模式， constructor 不声明，那么就会丢失。如果constructor 的值很重要，则可以像下面这样在重写原型对象时专门设置一下它的值

```js
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ["Shelby", "Court"];
}

Person.prototype = {
    constructor: Person,
    getName: function () {
        console.log(this.name);
    }
};

var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Greg", 27, "Doctor");

person1.friends.push("Van");
console.log(person1.friends);    //"Shelby,Count,Van"
console.log(person2.friends);    //"Shelby,Count"
console.log(person1.friends === person2.friends); //false
console.log(person1.getName === person2.getName); //true
```

### 5.1 动态原型模式

> 核心：通过检查某个应该存在的方法是否存在，来决定需要初始化原型

```js
function Person(name) {
    this.name = name;
    if (typeof this.getName != "function") {
        Person.prototype.getName = function () {
            console.log(this.name);
        }
    }
}

var person1 = new Person();
```

注意：使用动态原型模式时，不能用对象字面量重写原型

解释下为什么：

```js
function Person(name) {
    this.name = name;
    if (typeof this.getName != "function") {
        Person.prototype = {
            constructor: Person,
            getName: function () {
                console.log(this.name);
            }
        }
    }
}

var person1 = new Person('kevin');
var person2 = new Person('daisy');

// 报错 并没有该方法
person1.getName();
// 注释掉上面的代码，这句是可以执行的。
person2.getName();
```

为了解释这个问题，假设开始执行`var person1 = new Person('kevin')`。

如果对 new 和 apply 的底层执行过程不是很熟悉，可以阅读底部相关链接中的文章。

我们回顾下 new 的实现步骤：

1. 首先新建一个对象
2. 然后将对象的原型指向 Person.prototype
3. 然后 Person.apply(obj)，执行函数
4. 返回这个对象

注意这个时候，回顾下 apply 的实现步骤，会执行 obj.Person 方法，这个时候就会执行 if 语句里的内容，注意构造函数的 prototype 属性指向了实例的原型，使用字面量方式直接覆盖 Person.prototype，并不会更改实例的原型的值，person1 依然是指向了以前的原型，而不是 Person.prototype。而之前的原型是没有 getName 方法的，所以就报错了！

如果你就是想用字面量方式写代码，可以尝试下这种：

```js
function Person(name) {
    this.name = name;
    if (typeof this.getName != "function") {
        Person.prototype = {
            constructor: Person,
            getName: function () {
                console.log(this.name);
            }
        }
        return new Person(name);
    }
}

var person1 = new Person('kevin');
var person2 = new Person('daisy');
person1.getName(); // kevin
person2.getName();  // daisy
```

## 6. 优化函数模式

> - **【定义】**: 基本思想是创建一个函数，该函数的作用仅仅是**封装创建对象的代码，然后再返回新创建的对象**。
> - **【特点】**：
>   1. 返回的对象与构造函数或者与构造函数的原型属性之间没有关系；
>   2. 寄生构造函数返回的对象与在寄生构造函数外部创建的对象没有什么不同；
>   3. 不能依赖`instanceof`操作符来确定对象类型；

### 6.1 寄生构造函数模式

```js
function Person(name) {
    var o = new Object();
    o.name = name;
    o.getName = function () {
        console.log(this.name);
    };
    return o;
}

var p1 = new Person('Tom', 25);
var p2 = new Person('Greg',30);
console.log(p1 instanceof Object); // true
console.log(p1 instanceof Person); // false
console.log(p1.getName == p2.getName); // false
console.log(p1.constructor == Object); //true
```

### 6.2 稳妥构造函数模式

```js
function person(name){
    var o = new Object();
    o.sayName = function(){
        console.log(name);
    };
    //o.sayName = () => name
    return o;
}

var person1 = person('kevin');
person1.sayName(); // kevin
person1.name = "daisy";
person1.sayName(); // kevin
console.log(person1.name); // daisy
```

所谓稳妥对象，指的是没有公共属性，而且其方法也不引用 this 的对象。

**与寄生构造函数模式有两点不同：**

1. **新创建的实例方法不引用 this**
2. **不使用 new 操作符调用构造函数**

稳妥对象最适合在一些安全的环境中。

稳妥构造函数模式也跟工厂模式一样，无法识别对象所属类型。

# Reference

1. https://segmentfault.com/a/1190000016708006

2. [推荐阅读](https://tsejx.github.io/javascript-guidebook/object-oriented-programming/object-creation/the-factory-pattern)

   