---
title: js class
top: false
cover: false
toc: true
mathjax: true
date: 2020-11-27 13:30:23
password:
summary: class基础
tags: [JS,book]
categories: JS
---

## Class

###  class 定义基础

```js
// class declaration 
class Person {}
// class expression 
const Animal = class {};
```

- function声明挂起，class 声明不会

```js
console.log(FunctionExpression); // undefined 
var FunctionExpression = function() {};
console.log(FunctionExpression); // function() {}

console.log(FunctionDeclaration); // FunctionDeclaration() {}
function FunctionDeclaration() {} console.log(FunctionDeclaration); // FunctionDeclaration() {}

console.log(ClassExpression); 		// undefined
var ClassExpression = class {}; 
console.log(ClassExpression);			// class {}

console.log(ClassDeclaration); 		// ReferenceError: ClassDeclaration is not defined
class ClassDeclaration {} 
console.log(ClassDeclaration);		// class ClassDeclaration {}
```

#### class构成
```js
// Valid empty class definition 
class Foo {}

// Valid class definition with constructor 
class Bar {
  constructor() {} 
}

// Valid class definition with getter 
class Baz {
  get myBaz() {}
}

// Valid class definition with static method 
class Qux {
  static myQux() {} 
}
```

### class 构造函数

#### Instantiation

1. a new object 创建在内存
2. [[Prototype]]指针被分配到构造函数原型
3. 构造函数的this被分配到new object
4. 构造函数执行
5. 如果构造函数返回object，就返回object；否则被生成的new object返回
```js
class Animal {}
class Person { 
  constructor() {
  console.log('person ctor'); }
}
class Vegetable { 
  constructor() {
    this.color = 'orange'; 
  }
}

let a = new Animal();
let p = new Person(); // person ctor

let v = new Vegetable(); 
console.log(v.color); // orange
```

#### 将class看作特殊函数

```js
class Person {}
console.log(Person); // class Person {} 
console.log(typeof Person); // function
```

- class标识符拥有prototype属性，属性拥有constructor属性又引用class本身

```js
class Person{}
console.log(Person.prototype); // { constructor: f() } 
console.log(Person === Person.prototype.constructor); // true
```

- 构造函数与class的关系
```js
class Person {}
let p1 = new Person();
console.log(p1.constructor === Person); // true 
console.log(p1 instanceof Person); // true 
console.log(p1 instanceof Person.constructor); // false

let p2 = new Person.constructor(); 
console.log(p2.constructor === Person); // false
console.log(p2 instanceof Person); // false 
console.log(p2 instanceof Person.constructor); // true
```

### 实例，原型与class 成员

#### 示例成员(Instance Members)

```js
class Person { 
  constructor() {
// For this example, define a string with object wrapper 
// as to check object equality between instances below 
    this.name = new String('Jack');
    this.sayName = () => console.log(this.name);
    this.nicknames = ['Jake', 'J-Dog'] }
}
let p1 = new Person(), 
    p2 = new Person();

p1.sayName(); // Jack 
p2.sayName(); // Jack

console.log(p1.name === p2.name); 
console.log(p1.sayName === p2.sayName); 
console.log(p1.nicknames === p2.nicknames); // false

p1.name = p1.nicknames[0]; 
p2.name = p2.nicknames[1];

p1.sayName(); // Jake 
p2.sayName(); // J-Dog
```

#### 原型与访问器

- primitives and objects 不可以直接加入到class内的原型

```js
class Person { 
  name: 'Jake'
}
// Uncaught SyntaxError: Unexpected token :
```

- get set
```js
class Person {
  set name(newName) { 
    this.name_ = newName;
  }
  get name() {
    return this.name_;
  }
}
let p = new Person();
p.name = 'Jake'; 
console.log(p.name); // Jake
```

#### 静态class方法与访问器
```js
class Person { 
  constructor() {
// Everything added to 'this' will exist on each individual instance
    this.locate = () => console.log('instance', this); }
// Defined on the class prototype object locate() {
  console.log('prototype', this); }
// Defined on the class
  static locate() { 
    console.log('class', this);
  }
}

let p = new Person();

p.locate(); // instance, Person {} 
Person.prototype.locate(); // prototype, {constructor: ... } 
Person.locate(); // class, class Person {}
```

#### 无函数原型与class成员

```js
class Person { 
  sayName() {
    console.log('${Person.greeting} ${this.name}'); 
  }
}
// Define data member on class 
Person.greeting = 'My name is';

// Define data member on prototype 
Person.prototype.name = 'Jake';

let p = new Person(); 
p.sayName(); // My name is Jake
```

#### 迭代与生成

```js
class Person { 
  constructor() {
    this.nicknames = ['Jack', 'Jake', 'J-Dog']; 
  }
    *[Symbol.iterator]() {
      yield *this.nicknames.entries();
  }
}
let p = new Person();
for (let [idx, nickname] of p) {console.log(nickname); }
// Jack // Jake // J-Dog
```

###  继承

#### 继承基础

```js
class Vehicle {}

// Inherit from class
class Bus extends Vehicle {}

let b = new Bus();
console.log(b instanceof Bus); // true 
console.log(b instanceof Vehicle); // true

function Person() {}

// Inherit from function constructor 
class Engineer extends Person {}

let e = new Engineer();
console.log(e instanceof Engineer); // true 
console.log(e instanceof Person); // true
```

#### 构造函数、Homeobjects 与 super()

- super()用于子类的构造函数中或者静态方法中

```js
class Vehicle { 
  constructor() {
    this.hasEngine = true; }
}

class Bus extends Vehicle { 
  constructor() {
// Cannot reference 'this' before super(), will throw ReferenceError 
    super(); // same as super.constructor()
    console.log(this instanceof Vehicle); // true
    console.log(this); // Bus { hasEngine: true } 
  }
}

new Bus();
```

#### 抽象基类(Abstract Base Classes)

```js
// Abstract base class 
class Vehicle {
  constructor() { 
    console.log(new.target);
  	if (new.target === Vehicle) {
    	throw new Error('Vehicle cannot be directly instantiated'); 
    }
	} 
}

// Derived class
class Bus extends Vehicle {}

new Bus(); // class Bus {}
new Vehicle(); // class Vehicle {}
// Error: Vehicle cannot be directly instantiated
```

#### 由已经建类型继承(Inheriting from Built-in Types)

```js
class SuperArray extends Array { 
  shuffle() {
// Fisher-Yates shuffle
    for (let i = this.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this[i], this[j]] = [this[j], this[i]]; }
  } 
}

let a= new SuperArray(1, 2, 3, 4, 5);

console.log(a instanceof Array); // true 
console.log(a instanceof SuperArray); // true

console.log(a); // [1, 2, 3, 4, 5] 
a.shuffle();
console.log(a); // [3, 1, 4, 5, 2]
```

#### 类掺合(Class Mixins)

## Reference

js高级程序设计