---
title: js class
top: false
cover: false
toc: true
mathjax: true
date: 2020-11-27 13:30:23
password:
summary:
tags: JS
categories:
---

# class基础

## class基本定义

### 语法

```js
class ClassName {
  constructor() { ... }//这里全部放属性
  method_1() { ... }//方法之间不放逗号
  method_2() { ... }
  method_3() { ... }
  }
}
```

### 例子

```js
 class Car {
      constructor(name, year) {
        this.name = name;
        this.year = year;
      }
      age() {
        let date = new Date();
        return date.getFullYear() - this.year;
      }
     static coding(){ console.log("静态方法，不用实例化直接可以调用")}
}

Car.coding();

let myCar = new Car("Ford", 2014);
document.getElementById("demo").innerHTML =
"My car is " + myCar.age() + " years old.";;
  }
}
```

> A JavaScript class is **not** an object.
>
> It is a **template** for JavaScript objects.

## class创建对象

```js
let myCar1 = new Car("Ford", 2014);
let myCar2 = new Car("Audi", 2019);
```

# class继承 - extends

```js
class Car {
  constructor(brand) {
    this.carname = brand;
  }
  present() {
    return 'I have a ' + this.carname;
  }
}

class Model extends Car {
  constructor(brand, mod) {
    super(brand);//引用parent的constructor - 没有不行
    this.model = mod;
  }
  show() {
    return this.present() + ', it is a ' + this.model;
  }
    present() {
        //super.present() 这样会调用父类方法
    	console.log("我会覆盖父类方法");
  }
}

let myCar = new Model("Ford", "Mustang");
document.getElementById("demo").innerHTML = myCar.show();
```

## Getters and Setters

```js
class Car {
  constructor(brand) {
    this.carname = brand;
  }
  get cnam() {
    return this.carname;
  }
  set cnam(x) {
    this.carname = x;
  }
}

let myCar = new Car("Ford");

document.getElementById("demo").innerHTML = myCar.cnam;
```

## static function

You cannot call a `static` method on an object, only on an object class.

```js
class Car {
  constructor(name) {
    this.name = name;
  }
  static hello() {
    return "Hello!!";
  }
}

let myCar = new Car("Ford");

// You can calll 'hello()' on the Car Class:
document.getElementById("demo").innerHTML = Car.hello();

// But NOT on a Car Object:
// document.getElementById("demo").innerHTML = myCar.hello();
// this will raise an error.
```

改为：

```js
class Car {
  constructor(name) {
    this.name = name;
  }
  static hello(x) {
    return "Hello " + x.name;
  }
}
let myCar = new Car("Ford");
document.getElementById("demo").innerHTML = Car.hello(myCar);
```

