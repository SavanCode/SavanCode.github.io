---
title: JS design pattern
top: false
cover: false
toc: true
mathjax: true
date: 2021-06-10 15:09:48
password:
summary: JS design pattern
tags: JS
categories: JS
---

## 设计模式定义

设计模式是解决某个特定场景下对某种问题的解决方案。因此，当我们遇到合适的场景时，我们可能会条件反射一样自然而然想到符合这种场景的设计模式。

### 设计模式原则

- S – Single Responsibility Principle 单一职责原则
  - 一个程序只做好一件事
  - 如果功能过于复杂就拆分开，每个部分保持独立
- O – OpenClosed Principle 开放/封闭原则
  - 对扩展开放，对修改封闭
  - 增加需求时，扩展新代码，而非修改已有代码
- L – Liskov Substitution Principle 里氏替换原则
  - 子类能覆盖父类
  - 父类能出现的地方子类就能出现
- I – Interface Segregation Principle 接口隔离原则
  - 保持接口的单一独立
  - 类似单一职责原则，这里更关注接口
- D – Dependency Inversion Principle 依赖倒转原则
  - 面向接口编程，依赖于抽象而不依赖于具体
  - 使用方只关注接口而不关注具体类的实现

### 单例模式（Singleton Pattern）---  一定要会写

![](JS-design-pattern/image-20210610180740683.png)

一个类只有一个实例，并提供一个访问它的全局访问点。

#### 代码例子

重点： 闭包！！！

```js
 class LoginForm {
    constructor() {
        this.state = 'hide'
    }
    show() {
        if (this.state === 'show') {
            alert('已经显示')
            return
        }
        this.state = 'show'
        console.log('登录框显示成功')
    }
    hide() {
        if (this.state === 'hide') {
            alert('已经隐藏')
            return
        }
        this.state = 'hide'
        console.log('登录框隐藏成功')
    }
 }
 LoginForm.getInstance = (function () {
     let instance = null;
     return function () {
        if (!instance) {
            instance = new LoginForm()
        }
        return instance
     }
 })()
//测试单例模式实例
let obj1 = LoginForm.getInstance()
obj1.show()
let obj2 = LoginForm.getInstance()
obj2.hide()
// 因为单体模式是只实例化一次，所以下面的实例是相等的
console.log(obj1 === obj2)//true

//闭包包装实例：
const SingletonP = (function() {
  let instance
  return class Singleton {
    constructor(name) {
      if (instance) {
        return instance
      } else {
        this.init(name)
        instance = this
        return this
      }
    }

    init(name) {
      this.name = name
      console.log('已初始化')
    }
  }
})()
```

#### 优点

- 划分命名空间，减少全局变量
- 增强模块性，把自己的代码组织在一个全局变量名下，放在单一位置，便于维护
- 且只会实例化一次。简化了代码的调试和维护

#### 缺点

- 由于单例模式提供的是一种单点访问，所以它有可能导致模块间的强耦合 从而不利于单元测试。无法单独测试一个调用了来自单例的方法的类，而只能把它与那个单例作为一个单元一起测试。

#### 场景例子

- 定义命名空间和实现分支型方法
- 登录框
- vuex 和 redux中的store
- 当我们在电脑上玩经营类的游戏，经过一番眼花缭乱的骚操作好不容易走上正轨，夜深了我们去休息，第二天打开电脑，发现要从头玩，立马就把电脑扔窗外了，所以一般希望从前一天的进度接着打，这里就用到了存档。每次玩这游戏的时候，我们都希望拿到同一个存档接着玩，这就是属于单例模式的一个实例。
- 编程中也有很多对象我们只需要唯一一个，比如数据库连接、线程池、配置文件缓存、浏览器中的 window/document 等，如果创建多个实例，会带来资源耗费严重，或访问行为不一致等情况。
- 类似于数据库连接实例，我们可能频繁使用，但是创建它所需要的开销又比较大，这时只使用一个数据库连接就可以节约很多开销。一些文件的读取场景也类似，如果文件比较大，那么文件读取就是一个比较重的操作。比如这个文件是一个配置文件，那么完全可以将读取到的文件内容缓存一份，每次来读取的时候访问缓存即可，这样也可以达到节约开销的目的。
- [创建唯一灰色背景例子](http://www.alloyteam.com/2012/10/common-javascript-design-patterns/)

[拓展内容](http://interview.poetries.top/docs/design-pattern.html#%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F)

### [观察者模式 - 发布订阅 ](https://juejin.cn/post/6844903737002033165) ---  一定要会写

定义了一种一对多的关系，让多个观察者对象同时监听某一个主题对象，这个主题对象的状态发生变化时就会通知所有的观察者对象，使它们能够自动更新自己，当一个对象的改变需要同时改变其它对象，并且它不知道具体有多少对象需要改变的时候，就应该考虑使用观察者模式。

- 发布 & 订阅
- 一对多

#### **主要的作用(优点)**

1. 广泛应用于异步编程中(替代了传递回调函数)
2. 对象之间松散耦合的编写代码

#### **缺点**

- 创建订阅者本身要消耗一定的时间和内存
- 多个发布者和订阅者嵌套一起的时候，程序难以跟踪维护

> 发布订阅的核心:： 每次`event. emit`（发布），就会触发一次`event.on`（注册）

#### 代码例子
```js
class EventEmitter {
  constructor() {
      //事件对象，存放订阅的名字和事件
    this.cache = {}//这里是多个eventname的数组
  }
 // 订阅事件的方法
  on(name, fn) {
    if (this.cache[name]) {
      this.cache[name].push(fn)// 存在则push到指定数组的尾部保存
    } else {
      this.cache[name] = [fn]// 注意数据，一个名字可以订阅多个事件函数
    }
  }

  off(name, fn) {
    const tasks = this.cache[name]
    if (tasks) {
      const index = tasks.findIndex((f) => f === fn || f.callback === fn)
      if (index >= 0) {
        tasks.splice(index, 1)
      }
    }
  }
  // 触发事件的方法
  emit(name) {
    if (this.cache[name]) {
      // 创建副本，如果回调函数内继续注册相同事件，会造成死循环
      const tasks = this.cache[name].slice()
      for (let fn of tasks) {
        fn();
      }
    }
  }
//once
  emit(name, once = false) {
    if (this.cache[name]) {
      // 创建副本，如果回调函数内继续注册相同事件，会造成死循环
      const tasks = this.cache[name].slice()//遍历
      for (let fn of tasks) {
        fn();
      }
      if (once) {
        delete this.cache[name]
      }
    }
  }
}

// 测试
const eventBus = new EventEmitter()
const task1 = () => { console.log('task1'); }
const task2 = () => { console.log('task2'); }
eventBus.on('task', task1)
eventBus.on('task', task2)

setTimeout(() => {
  eventBus.emit('task')
}, 1000)
```

**测试用例**

```js
let em = new EventEmitter();

function workDay() {
  console.log("每天工作");
}
function makeMoney() {
  console.log("赚100万");
}
function sayLove() {
  console.log("向喜欢的人示爱");
}
em.on("money",makeMoney);
em.on("love",sayLove);
em.on("work", workDay);

em.emit("money");
em.emit("love");  
em.emit("work");  
```
#### 场景

- DOM事件

- vue 响应式

> 下面这个应用场景感觉更加值得看 [来源](https://juejin.cn/post/6844903737002033165)

网站登录 假如我们正在开发一个商城网站，网站里有 header 头部、nav 导航、消息列表、购物车等模块。这几个模块的渲染有一个共同的前提条件，就是必须先用 ajax 异步请求获取用户的登录信息。 这是很正常的，比如用户的名字和头像要显示在 header 模块里，而这两个字段都来自用户登录后 返回的信息。 至于 ajax 请求什么时候能成功返回用户信息，这点我们没有办法确定。现在的情节看起来像 极了售楼处的例子，小明不知道什么时候开发商的售楼手续能够成功办下来。

```js
$.ajax( 'http:// xxx.com?login', function(data){ // 登录成功 
  login.trigger('loginSucc', data); // 发布登录成功的消息
});
var header = (function(){ // header 模块 
  login.listen( 'loginSucc', function( data){
      header.setAvatar( data.avatar );
  }); 
  return {
      setAvatar: function( data ){
          console.log( '设置 header 模块的头像' );
      } 
  }
})();

var nav = (function(){
  login.listen( 'loginSucc', function( data ){// nav 模块 
      nav.setAvatar( data.avatar );
  }); 
  return {
      setAvatar: function( avatar ){ 
          console.log( '设置 nav 模块的头像' );
      } 
  }
  })();
```

### 手动实现观察者模式（基于发布订阅模式） 

> 观察者模式（基于发布订阅模式） 有观察者，也有被观察者

![](JS-design-pattern/image-20210610175904621.png)

类图解析：

- 每一个观察者（Observer）都有一个update 方法，并且观察者的状态就是等待被触发；
- 每一个主题（subject）都可以通过attach方法接纳N个观察者所观察，即观察者们存储在主题的observers数组里，；
- 主题有初始化状态（init）、获取状态（getState）和设置状态（setState）三个通用型方法；
- 当主题的状态发生变化时，通过特定的notifyAllObervers方法通知所有观察者。

**观察者需要放到被观察者中，被观察者的状态变化需要通知观察者** 我变化了 内部也是基于发布订阅模式，收集观察者，状态变化后要主动通知观察者

```js
class Subject { // 被观察者 学生
  constructor(name) {
    this.state = '开心的'
    this.observers = []; // 存储所有的观察者
  }
  // 收集所有的观察者
  attach(o){ // Subject. prototype. attch
    this.observers.push(o)
  }
  // 更新被观察者 状态的方法
  setState(newState) {
    this.state = newState; // 更新状态
    // this 指被观察者 学生
    this.observers.forEach(o => o.update(this)) // 通知观察者 更新它们的状态
  }
}

class Observer{ // 观察者 父母和老师
  constructor(name) {
    this.name = name
  }
  update(student) {
    console.log('当前' + this.name + '被通知了', '当前学生的状态是' + student.state)
  }
}

let student = new Subject('学生'); 

let parent = new Observer('父母'); 
let teacher = new Observer('老师'); 

// 被观察者存储观察者的前提，需要先接纳观察者
student. attach(parent); 
student. attach(teacher); 
student. setState('被欺负了');
```

# 下面是拓展（面试很少问，了解即可）

 ### [中介者模式 Mediator Pattern](https://juejin.cn/post/6844903745570996238#heading-0)

中介者模式的作用就是解除对象与对象之间的紧耦合关系。增加一个中介者对象后，所有的 相关对象都通过中介者对象来通信，而不是互相引用，所以当一个对象发生改变时，只需要通知 中介者对象即可。中介者使各对象之间耦合松散，而且可以独立地改变它们之间的交互。中介者模式使网状的多对多关系变成了相对简单的一对多关系

- Colleague： 同事对象，只知道中介者而不知道其他同事对象，通过中介者来与其他同事对象通信；
- Mediator： 中介者，负责与各同事对象的通信；

![](JS-design-pattern/image-20210610183552525.png)

#### 代码例子

以现实生活中打牌的例子来实现下中介者模式。打牌总有输赢，对应的则是货币的变化，如果不用中介者模式的话，实现如下：

```java
/// <summary>
/// 抽象牌友类
/// </summary>
public abstract class AbstractCardPartner
{
    public int Money { get; set; }
 
    public abstract void ChangeMoney(int money, AbstractCardPartner other);
}
 
/// <summary>
/// 牌友A
/// </summary>
public class PartnerA : AbstractCardPartner
{
    public override void ChangeMoney(int money, AbstractCardPartner other)
    {
        Money += money;
        other.Money -= money;
    }
}
 
/// <summary>
/// 牌友B
/// </summary>
public class PartnerB : AbstractCardPartner
{
    public override void ChangeMoney(int money, AbstractCardPartner other)
    {
        Money += money;
        other.Money -= money;
    }
}
 
/// <summary>
/// 调用
/// </summary>
/// <param name="args"></param>
static void Main(string[] args)
{
    AbstractCardPartner A = new PartnerA();
    A.Money = 20;
    AbstractCardPartner B = new PartnerB();
    B.Money = 20;
 
    // A赢了B的钱减少
    A.ChangeMoney(5, B);
    Console.WriteLine("A 现在的钱是：{0}", A.Money); // 应该是25
    Console.WriteLine("B 现在的钱是：{0}", B.Money); // 应该是15
 
    // B赢了A的钱减少
    B.ChangeMoney(10, A);
    Console.WriteLine("A 现在的钱是：{0}", A.Money); // 应该是15
    Console.WriteLine("B 现在的钱是：{0}", B.Money); // 应该是25
 
    Console.ReadLine();
}
```

这样的实现确实解决了上面场景中的问题，并且使用了抽象类使具体牌友A和牌友B都依赖于抽象类，从而降低了同事类之间的耦合度。但是如果其中牌友A发生变化时，此时就会影响到牌友B的状态，如果涉及的对象变多的话，这时候某一个牌友的变化将会影响到其他所有相关联的牌友状态。例如牌友A算错了钱，这时候牌友A和牌友B的钱数都不正确了，如果是多个人打牌的话，影响的对象就会更多。这时候就会思考——能不能把算钱的任务交给程序或者算数好的人去计算呢，这时候就有了我们QQ游戏中的欢乐斗地主等牌类游戏了。

进一步完善的方案，即加入一个中介者对象来协调各个对象之间的关联，这也就是中介者模式的应用了，具体完善后的实现代码如下所示：

```java
/// <summary>
/// 抽象牌友类
/// </summary>
public abstract class AbstractCardPartner
{
    public int Money { get; set; }
 
    public abstract void ChangeMoney(int money, AbstractMediator mediator);
}
 
/// <summary>
/// 牌友A
/// </summary>
public class PartnerA : AbstractCardPartner
{
    public override void ChangeMoney(int money, AbstractMediator mediator)
    {
        mediator.AWin(money);
    }
}
 
/// <summary>
/// 牌友B
/// </summary>
public class PartnerB : AbstractCardPartner
{
    public override void ChangeMoney(int money, AbstractMediator mediator)
    {
        mediator.BWin(money);
    }
}
 
/// <summary>
/// 抽象中介者类
/// </summary>
public abstract class AbstractMediator
{
    protected AbstractCardPartner A;
    protected AbstractCardPartner B;
 
    public AbstractMediator(AbstractCardPartner a, AbstractCardPartner b)
    {
        A = a;
        B = b;
    }
 
    public abstract void AWin(int money);
    public abstract void BWin(int money);
}
 
/// <summary>
/// 调用
/// </summary>
/// <param name="args"></param>
static void Main(string[] args)
{
    AbstractCardPartner A = new PartnerA();
    AbstractCardPartner B = new PartnerB();
    A.Money = 20;
    B.Money = 20;
 
    AbstractMediator mediator = new MediatorPater(A, B);
 
    // A赢了
    A.ChangeMoney(5, mediator);
    Console.WriteLine("A 现在的钱是：{0}", A.Money); // 应该是25
    Console.WriteLine("B 现在的钱是：{0}", B.Money); // 应该是15
 
    // B赢了
    B.ChangeMoney(10, mediator);
    Console.WriteLine("A 现在的钱是：{0}", A.Money); // 应该是15
    Console.WriteLine("B 现在的钱是：{0}", B.Money); // 应该是25
 
    Console.ReadLine();
}
```

在上面的实现代码中，抽象中介者类保存了两个抽象牌友类，如果新添加一个牌友类似时，此时就不得不去更改这个抽象中介者类。

**中介者模式的优缺点**

#### **优点**

- 松散耦合，降低了同事对象之间的相互依赖和耦合，不会像之前那样牵一发动全身；
- 将同事对象间的一对多关联转变为一对一的关联，符合最少知识原则，提高系统的灵活性，使得系统易于维护和扩展；
- 中介者在同事对象间起到了控制和协调的作用，因此可以结合代理模式那样，进行同事对象间的访问控制、功能扩展；
- 因为同事对象间不需要相互引用，因此也可以简化同事对象的设计和实现；

#### **缺点**

- 逻辑过度集中化，当同事对象太多时，中介者的职责将很重，逻辑变得复杂而庞大，以至于难以维护。

> 当出现中介者可维护性变差的情况时，考虑是否在系统设计上不合理，从而简化系统设计，优化并重构，避免中介者出现职责过重的情况。

#### **适用场景**

- 在现实生活中，有很多中介者模式的身影，例如QQ游戏平台，聊天室、QQ群、短信平台和房产中介。不论是QQ游戏还是QQ群，它们都是充当一个中间平台，QQ用户可以登录这个中间平台与其他QQ用户进行交流，如果没有这些中间平台，我们如果想与朋友进行聊天的话，可能就需要当面才可以了。电话、短信也同样是一个中间平台，有了这个中间平台，每个用户都不要直接依赖与其他用户，只需要依赖这个中间平台就可以了，一切操作都由中间平台去分发。
- 中介者模式，定义了一个中介对象来封装一系列对象之间的交互关系。中介者使各个对象之间不需要显式地相互引用，从而使耦合性降低，而且可以独立地改变它们之间的交互行为。
- 但是，如果对象之间的关系耦合并不紧密，或者之间的关系本就一目了然，那么引入中介者模式就是多此一举、画蛇添足。
- 实际上，我们通常使用的 `MVC/MVVM` 框架，就含有中介者模式的思想，`Controller/ViewModel` 层作为中介者协调 `View/Model` 进行工作，减少 `View/Model` 之间的直接耦合依赖，从而做到视图层和数据层的最大分离。可以关注后面有单独一章分析 `MVC/MVVM` 模式，深入了解

> **中介者模式与发布-订阅模式**
>
> - 中介者模式和发布-订阅模式都可以用来进行对象间的解耦，比如发布-订阅模式的发布者/订阅者和中介者模式里面的中介者/同事对象功能上就比较类似。
> - 这两个模式也可以组合使用，比如中介者模式就可以使用发布-订阅模式，对相关同事对象进行消息的广播通知。
> - 比如上面相亲的例子中，注册各方和通知信息就使用了发布-订阅模式。