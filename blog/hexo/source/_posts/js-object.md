---
title: js object
top: false
cover: false
toc: true
mathjax: true
date: 2020-11-26 13:45:33
password:
summary:
tags: JS
categories:
---

# 对象基本操作

## 生成

### 基本生成办法（直接生成obj）

```js
var obj = {
  foo: 'Hello',
  'h w': 'Hello World',
  'p+q': 'Hello World'，
  m: function () { ... },
};
```

```js
var obj = {
  1: 'a',
  3.2: 'b',
  1e2: true,
  1e-2: true,
  .234: true,
  0xFF: true
};
// Object {
//   1: "a",
//   3.2: "b",
//   100: true,
//   0.01: true,
//   0.234: true,
//   255: true
// }
obj['100'] // true
```

```js
var age=30;
var name="dfghjkl";
var sex="male";
var obj={ age, name, sex}
console.log(obj);
```

### constructor（用构造函数+new生成对象）

```js
//构造函数
function Person(first, last, age, eye) {
  this.firstName = first;
  this.lastName = last;
  this.age = age;
  this.eyeColor = eye;
  this.name = function() {return this.firstName + " " + this.lastName;};
    this.changeName = function (name) {this.lastName = name;};
}
//实例化
var myFather = new Person("John", "Doe", 50, "blue");
var myMother = new Person("Sally", "Rally", 48, "green");

```

```js
function Dog(name) {
  this.name = name;
}

// Only change code below this line
Dog.prototype = {

  numLegs: 4,
  eat: function() {
    console.log("nom nom nom");
  },
  describe: function() {
    console.log("My name is " + this.name);
  }
};

```



## 读取

```js
var foo = 'bar';

var obj = {
  foo: 1,
  bar: 2
};

obj.foo  // 1
obj[foo]  // 2
```

```js
var obj = {
  0.7: 'Hello World',
  123: 'this is 123'
};

obj['0.7'] // "Hello World"
obj[0.7] // "Hello World"
obj.123 // 报错
obj[123] // "this is 123"
```

## 赋值

```js
var obj = {};

obj.foo = 'Hello';
obj['bar'] = 'World';
```

## 查看obj内属性，验证obj是否有某属性

`Object.keys`方法和`Object.getOwnPropertyNames`方法都用来遍历对象的属性。

`Object.hasOwnProperty(Property)`确定是否含有对应属性

```js
var obj = {
  key1: 1,
  key2: 2
};

Object.keys(obj);// ['key1', 'key2']
Object.getOwnPropertyNames(obj);// ['key1', 'key2']
Object.hasOwnProperty(key1)
Boolean(obj[key1])
```

## 验证obj的原型链

**instanceof** **运算符**用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链

```js
object instanceof constructor
```

```js
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
const auto = new Car('Honda', 'Accord', 1998);

console.log(auto instanceof Car);
// expected output: true

console.log(auto instanceof Object);
// expected output: true
```



## 删除obj属性

```js
var obj = { p: 1 };
Object.keys(obj) // ["p"]

delete obj.p // true
obj.p // undefined
Object.keys(obj) // []
delete obj.p12 // true


var obj = Object.defineProperty({}, 'p', {
  value: 123,
  configurable: false
});

obj.p // 123
delete obj.p // false
```

> 删除一个不存在的属性，`delete`不报错，而且返回`true`
>
> `delete`命令会返回`false`，那就是该属性存在，且不得删除。
>
> `delete`命令只能删除对象本身的属性，无法删除继承的属性

## 增加属性和方法

### 增加constructor的办法

 prototype 属性允许您为对象构造器添加新属性

```js
function Person(first, last, age, eyecolor) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.eyeColor = eyecolor;
}
Person.prototype.nationality = "English";
```

```html

<p id="demo"></p>

<script>
function Person(first, last, age, eye) {
  this.firstName = first;
  this.lastName = last;
  this.age = age;
  this.eyeColor = eye;
}

Person.prototype.name = function() {
  return this.firstName + " " + this.lastName
};

var myFriend = new Person("Bill", "Gates", 62, "blue");
document.getElementById("demo").innerHTML =
"My friend is " + myFriend.name(); 
</script>
```

### 增加单个的object的办法

```js
// Constructor function for Person objects
function Person(first, last, age, eye) {
  this.firstName = first;
  this.lastName = last;
  this.age = age;
  this.eyeColor = eye;
}

// Create 2 Person objects
var myFather = new Person("John", "Doe", 50, "blue");

// Add a name method to first object
myFather.name = function() {
  return this.firstName + " " + this.lastName;
};
```



## 属性是否存在 in运算符

属性 in obj

```js
var obj = { p: 1 };
'p' in obj // true
'toString' in obj // true
```

`in`运算符的一个问题是，它不能识别哪些属性是对象自身的，哪些属性是继承的。就像上面代码中，对象`obj`本身并没有`toString`属性，但是`in`运算符会返回`true`，因为这个属性是继承的。

这时，可以使用对象的`hasOwnProperty`方法判断一下，是否为对象自身的属性。

```js
var obj = {};
if ('toString' in obj) {
  console.log(obj.hasOwnProperty('toString')) // false
}
```

## 属性的遍历：for...in 循环

- 它遍历的是对象所有可遍历（enumerable）的属性，会跳过不可遍历的属性。
- 它不仅遍历对象自身的属性，还遍历继承的属性。
- **注意： 不能用 for ... of**

```js
var obj = {a: 1, b: 2, c: 3};

for (var i in obj) {
  console.log('键名：', i);
  console.log('键值：', obj[i]);
}
// 键名： a
// 键值： 1
// 键名： b
// 键值： 2
// 键名： c
// 键值： 3
```

## with 语句

格式如下：

```js
with (对象) {
  语句;
}
```

```js
// 例一
var obj = {
  p1: 1,
  p2: 2,
};
with (obj) {
  p1 = 4;
  p2 = 5;
}
// 等同于
obj.p1 = 4;
obj.p2 = 5;

// 例二
with (document.links[0]){
  console.log(href);
  console.log(title);
  console.log(style);
}
// 等同于
console.log(document.links[0].href);
console.log(document.links[0].title);
console.log(document.links[0].style);
```

> `with`区块内部有变量的赋值操作，必须是当前对象已经存在的属性，否则会创造一个当前作用域的全局变量。

```js
var obj = {};
with (obj) {
  p1 = 4;
  p2 = 5;
}

obj.p1 // undefined
p1 // 4
```

## 额外的object[静态方法](https://wangdoc.com/javascript/stdlib/attributes.html)

（1）对象属性模型的相关方法

- `Object.getOwnPropertyDescriptor()`：获取某个属性的描述对象。
- `Object.defineProperty()`：通过描述对象，定义某个属性。
- `Object.defineProperties()`：通过描述对象，定义多个属性。

（ 2）控制对象状态的方法

- `Object.preventExtensions()`：防止对象扩展。
- `Object.isExtensible()`：判断对象是否可扩展。
- `Object.seal()`：禁止对象配置。
- `Object.isSealed()`：判断一个对象是否可配置。
- `Object.freeze()`：冻结一个对象。
- `Object.isFrozen()`：判断一个对象是否被冻结。

**（3）原型链相关方法**

- `Object.create()`：该方法可以指定原型对象和属性，返回一个新的对象。
- `Object.getPrototypeOf()`：获取对象的`Prototype`对象。

## 实例对象方法 - Object.prototype

- `Object.prototype.valueOf()`：返回当前对象对应的值。
- `Object.prototype.toString()`：返回当前对象对应的字符串形式。
- `Object.prototype.toLocaleString()`：返回当前对象对应的本地字符串形式。
- `Object.prototype.hasOwnProperty()`：判断某个属性是否为当前对象自身的属性，还是继承自原型对象的属性。
- `Object.prototype.isPrototypeOf()`：判断当前对象是否为另一个对象的原型。
- `Object.prototype.propertyIsEnumerable()`：判断某个属性是否可枚举。

Reference:

1. https://wangdoc.com/javascript/types/object.html#%E7%94%9F%E6%88%90%E6%96%B9%E6%B3%95
2. https://wangdoc.com/javascript/stdlib/object.html#object-%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0

# 练习例子

## 从超类型继承行为

```js
function Animal() { }
Animal.prototype.eat = function() {
  console.log("nom nom nom");
};
let animal = new Animal();//有缺点所以不用
let animal = Object.create(Animal.prototype);
```

`Object.create(obj)`创建一个新对象，并将其设置`obj`为新对象的`prototype`。回想一下，`prototype`就像创建对象的“配方”一样。通过将`prototype`of设置`animal`为`Animal's` `prototype`，您可以有效地给该`animal`实例与的任何其他实例相同的“配方” `Animal`。

```js
animal.eat(); // prints "nom nom nom"
animal instanceof Animal; // => true
```

## 将子代的原型设置为父代的实例 （2层继承的函数）

### 例子1

```js
function Animal() { }

Animal.prototype = {
  constructor: Animal,
  eat: function() {
    console.log("nom nom nom");
  }
};

function Dog() { }

// Only change code below this line
Dog.prototype = Object.create(Animal.prototype);

let beagle = new Dog();
```

### 例子2

```js
function Animal() { }
Animal.prototype.eat = function() {
  console.log("nom nom nom");
};

function Bird() { }
Bird.prototype = Object.create(Animal.prototype);//这个要最前面 注意是create！！！
Bird.prototype.constructor = Bird;

Bird.prototype.fly = function() {
  console.log("I'm flying!");
};

let duck = new Bird();
duck.eat(); // prints "nom nom nom"
duck.fly(); // prints "I'm flying!
```



```js
var Person = function(firstAndLast) {
  // Only change code below this line
  // Complete the method below and implement the others similarly
  var firstName=firstAndLast.split(" ")[0];
  var lastName=firstAndLast.split(" ")[1];
  var fullName=firstAndLast;

  this.setFullName = function(nameStr){
    var arr=nameStr.split(" "); 
    fullName=nameStr;
    firstName=arr[0];
    lastName=arr[1];
    };
    
    this.setFirstName = function(nameStr){ 
    firstName=nameStr; 
    fullName=firstName+" "+lastName;
    };

    this.setLastName = function(nameStr){ 
    lastName=nameStr; 
    fullName=firstName+" "+lastName;
    };


  this.getFullName = function() {
    console.log(firstName+" "+lastName);
    return fullName;
  };

  this.getFirstName = function() {
    console.log(firstName);
    return firstName;
  };
   this.getLastName = function() {
    console.log(lastName);
    return lastName;
  };


};

var bob = new Person('Bob Ross');
bob.setFullName("Haskell Curry")
bob.getFullName();
bob.getFirstName()

```



## 重写继承下来的方法

```js
ChildObject.prototype = Object.create(ParentObject.prototype);//继承
```

```js
ChildObject.prototype.methodName = function() {...};//改变                                          
```

```js
function Animal() { }
Animal.prototype.eat = function() {
  return "nom nom nom";
};
function Bird() { }

// Inherit all methods from Animal
Bird.prototype = Object.create(Animal.prototype);

// Bird.eat() overrides Animal.eat()
Bird.prototype.eat = function() {
  return "peck peck peck";
};
```

JavaScript在`duck’s` `prototype`链上查找方法的方式：

1. duck=>在这里定义了eat（）吗？没有。
2. bird=>在这里定义了eat（）吗？=>是的。执行它并停止搜索。
3. 还定义了Animal => eat（），但是JavaScript在达到此级别之前停止搜索。
4. Object => JavaScript在达到此级别之前已停止搜索。

## 重置继承的构造方法属性

当一个对象`prototype`从另一个对象继承其对象时，它还将继承超类型的构造函数属性。

```js
function Bird() { }
Bird.prototype = Object.create(Animal.prototype);
let duck = new Bird();
duck.constructor // function Animal(){...}
```

但是`duck`和的所有实例`Bird`都应表明它们是由`Bird`和不是构造的`Animal`。为此，您可以手动将`Bird's`构造函数属性设置为该`Bird`对象：

```js
Bird.prototype.constructor = Bird;
duck.constructor // function Bird(){...}
```

修改代码，`duck.constructor`然后`beagle.constructor`返回它们各自的构造函数。

## 使用Mixin在不相关的对象之间添加通用行为

```js
let bird = {
  name: "Donald",
  numLegs: 2
};

let boat = {
  name: "Warrior",
  type: "race-boat"
};

// 此处创建办法
let glideMixin  = function(obj) {
  obj.glide = function() {
    console.log("Flying, wooosh!");
  }
};

glideMixin(bird); // prints "Flying, wooosh!"
glideMixin(boat); // prints "Flying, wooosh!"
```



## 创建模块-利用立马执行函数

```js
let motionModule = (function () {
  return {
    glideMixin: function(obj) {
      obj.glide = function() {
        console.log("Gliding on the water");
      };
    },
    flyMixin: function(obj) {
      obj.fly = function() {
        console.log("Flying, wooosh!");
      };
    }
  }
})(); // The two parentheses cause the function to be immediately invoked

//////////////////////////////////////////////////////////
motionModule.glideMixin(duck);
duck.glide();
```



## 查看obj array中 每个obj是否都存有有效的属性（ NaN undefined ）

```js
function truthCheck(collection, pre) {
  // Is everyone being true?
  return collection.every(obj => obj[pre]);
}

truthCheck([{"single": "double"}, {"single": NaN}], "single");

```

```js
function truthCheck(collection, pre) {
  return collection.every(function(element) {
    return element.hasOwnProperty(pre) && Boolean(element[pre]);
  });
}
```

