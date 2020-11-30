---
title: js DOM
top: false
cover: false
toc: true
mathjax: true
date: 2020-11-26 16:53:38
password:
summary:
tags: JS
categories:
---

# DOM

（文档对象模型）Document Object Model

## getElementById 方法

```html
<p id="demo"></p>

<script>
document.getElementById("demo").innerHTML = "Hello World!";
</script>
```

## innerHTML 属性

innerHTML 属性可用于获取或替换 HTML 元素的内容。

innerHTML 属性可用于获取或改变任何 HTML 元素，包括 <html> 和 <body>。

## 查找 HTML 元素/DOM

### 通过标签

| 方法                                    | 描述                     |
| :-------------------------------------- | :----------------------- |
| document.getElementById(*id*)           | 通过元素 id 来查找元素   |
| document.getElementsByTagName(*name*)   | 通过标签名来查找元素     |
| document.getElementsByClassName(*name*) | 通过类名来查找元素（少） |

### 通过 CSS 选择器查找 HTML 元素

```js
var x = document.querySelectorAll("p.intro");
```

### 查找html form元素

本例查找 id="frm1" 的 form 元素，在 forms 集合中，然后显示所有元素值

```html
<form id="frm1" action="/demo/action_page.php">
  First name: <input type="text" name="fname" value="Bill"><br>
  Last name: <input type="text" name="lname" value="Gates"><br><br>
  <input type="submit" value="提交">
</form> 

<script> //打印出框中内容
function myFunction() {
  var x = document.forms["frm1"];
  var text = "";
  var i;
  for (i = 0; i < x.length ;i++) {
    text += x.elements[i].value + "<br>";
  }
  document.getElementById("demo").innerHTML = text;
}
</script>
```



## 改变 HTML 元素

| 方法                                                         | 描述                   |
| :----------------------------------------------------------- | :--------------------- |
| element.innerHTML = *new html content*<br />*document.write()* | 改变元素的 inner HTML  |
| element.attribute = *new value*<br />document.getElementById("myImage").src = "landscape.jpg"; | 改变 HTML 元素的属性值 |
| element.setAttribute(*attribute*, *value*)                   | 改变 HTML 元素的属性值 |
| element.style.property = *new style*                         | 改变 HTML 元素的样式   |

## 添加和删除元素

| 方法                              | 描述             |
| :-------------------------------- | :--------------- |
| document.createElement(*element*) | 创建 HTML 元素   |
| document.removeChild(*element*)   | 删除 HTML 元素   |
| document.appendChild(*element*)   | 添加 HTML 元素   |
| document.replaceChild(*element*)  | 替换 HTML 元素   |
| document.write(*text*)            | 写入 HTML 输出流 |

## 添加事件处理程序

| 方法                                                     | 描述                            |
| :------------------------------------------------------- | :------------------------------ |
| document.getElementById(id).onclick = function(){*code*} | 向 onclick 事件添加事件处理程序 |

## 改变css

语法：document.getElementById(id).style.property = new style

```html
<script>
document.getElementById("p2").style.color = "blue";
</script>
<p id="p2">Hello World!</p>

<h1 id="id1">我的标题 1</h1>
<button type="button" onclick="document.getElementById('id1').style.color = 'red'">
点击我！
</button>
```

## DOM事件

[基本事件总结表](https://developer.mozilla.org/zh-CN/docs/Web/Events)

**当id中string中有数字，需要自己增加； 直接number++；（不用转换）**

**但是如果用number+=1/ number=number+1； 这样要praseInt（number）**

## DOM 事件监听程序

### 语法

```js
element.addEventListener(event, function, useCapture);
```

第一个参数是事件的类型（比如 "click" 或 "mousedown"）。

**(注意：事件名称前不加on; 使用内联onclick属性似乎只能传递自身而不能传递事件对象; 事件监听可以在一种事件上绑定多个方法)**

第二个参数是当事件发生时我们需要调用的函数。

第三个参数是布尔值，指定使用事件冒泡还是事件捕获。此参数是可选的。

**注意：**请勿对事件使用 "on" 前缀；请使用 "click" 代替 "onclick"。

### 添加单个或者多个监听

```js
//单个元素单个事件
element.addEventListener("click", function(){ alert("Hello World!"); });
```

```js
//单个元素
element.addEventListener("click", myFunction);
element.addEventListener("click", mySecondFunction);
```

```js
//单个元素多个不同事件
element.addEventListener("mouseover", myFunction);
element.addEventListener("click", mySecondFunction);
element.addEventListener("mouseout", myThirdFunction);
```

```js
//自定义
element.addEventListener("resize", function(){
    document.getElementById("demo").innerHTML = sometext;
});
```

```js
//有参数
element.addEventListener("click", function(){ myFunction(p1, p2); });
```

### 删除事件监听

```js
element.removeEventListener("mousemove", myFunction);
```

```js
var x = document.getElementById("myBtn");
x.addEventListener("mouseover", myFunction); 
x.removeEventListener("mouseover", myFunction); 
function myFunction() {
  document.getElementById("demo").innerHTML += "Moused over!<br>"
}
```

#### 解除绑定不能写全函数

解除绑定事件的时候一定要用函数的句柄，把整个函数写上是无法解除绑定的。

错误写法：

```js
btn.addEventListener("click",function(){
 alert(11);
});
btn.removeEventListener("click",function(){
 alert(11);
});
正确写法：

btn.addEventListener("click",eventTwo);
btn.removeEventListener("click",eventOne);
```



## 事件对象

事件对象自动传递给回调函数 element.onclick = function(e){}; // e就是事件对象

### e的常见属性：

- e.target; //获取触发此事件的元素（不一定是绑定元素）（e.target.style.backgroundColor=""）
- e.currentTarget //获取触发此事件的元素（一定是绑定元素）
- e.offsetX ||e.offsetY ; //获取鼠标基于target元素内部的偏移x和y
- e.clientX ||e.clientY ; //获取鼠标基于浏览器视窗的偏移x和y
- e.keyCode ||e.which; //返回键盘上的字符的代码
- 事件回调中的this：指向事件的触发元素
- ----如果事件处理函数的绑定在元素生成之前，则此元素不能绑定事件处理函数，需重新设置

### target、this、currentTarget区别

> - 先诉重点理论：
> - target:**触发**事件的某个具体对象，只会出现在事件流的目标阶段（谁触发谁命中，所以肯定是目标阶段）
> - currentTarget:**绑定**事件的对象，**恒等于this**，可能出现在事件流的任意一个阶段中
> - 通常情况下terget和currentTarget是一致的，我们只要使用terget即可，但有一种情况必须区分这三者的关系，那就是在父子嵌套的关系中，父元素绑定了事件，单击了子元素（根据事件流，在不阻止事件流的前提下他会传递至父元素，导致父元素的事件处理函数执行），这时候currentTarget指向的是父元素，因为他是**绑定事件的对象**，而target指向了子元素，因为他是**触发事件的那个具体对象**

```html
<div id="one">
   <div id="three"></div>
</div>
<script>
one.addEventListener('click',function(e){
    console.log(this);//one - 函数对应的区域
    console.log(e.target);  //three  - 多层套叠的时候，选中直接触发的区域
    console.log(e.currentTarget);  //one
},false);
</script>
```

## 捕获/阻止捕获、冒泡/阻止冒泡

### 原理

**DOM事件流**

这就要经过事件流，整个事件流分三个阶段：

- 第一阶段是 捕获，事件从上（window）往下的过程；
- 第二阶段是 目标阶段，如点击某个目标元素，事件通过捕获到达目标元素，就是目标阶段；
- 第三个阶段是 冒泡，从目标元素再上传到window对象，就是冒泡的过程。

![](js-DOM/1606715897933.png)

### 语法

```js
document.getElementById("button").addEventListener("click",function(){
            alert("button");
        },true/false);
true:时间捕捉 外入内
false:事件冒泡 内到外
```



### 事件冒泡例子（内到外）

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>bubble</title>
    <style>
        button{
            background: red;
            color:white;
        }
        #third{
            width: 50px;
            height: 50px;
            border:thin solid red;
        }
        #second{
            width: 100px;
            height: 100px;
            border:thin solid red;
        }
        #first{
            width:200px;
            height: 200px;
            border:thin solid red;
        }
    </style>
</head>
<body>
    <div id="first">
        <div id="second" >
            <div id="third" >
                <button id="button">事件冒泡</button>
            </div>
        </div>
    </div>
    <script>

        document.getElementById("button").addEventListener("click",function(){
            alert("button");
        },false);

        document.getElementById("third").addEventListener("click",function(){
            alert("third");
        },false);

        document.getElementById("second").addEventListener("click",function(){
            alert("second");
        },false);        

        document.getElementById("first").addEventListener("click",function(){
            alert("first");
        },false);

    </script>
</body>
</html>
```

### 阻止事件冒泡

```js
        document.getElementById("button").addEventListener("click",function(event){
            alert("button");
            event.stopPropagation();    
        },false);
```



### 事件捕获例子（外到内）

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>bubble</title>
    <style>
        button{
            background: red;
            color:white;
        }
        #third{
            width: 50px;
            height: 50px;
            border:thin solid red;
        }
        #second{
            width: 100px;
            height: 100px;
            border:thin solid red;
        }
        #first{
            width:200px;
            height: 200px;
            border:thin solid red;
        }
    </style>
</head>
<body>
    <div id="first">
        <div id="second" >
            <div id="third" >
                <button id="button">事件冒泡</button>
            </div>
        </div>
    </div>
    <script>

        document.getElementById("button").addEventListener("click",function(){
            alert("button");
        },true);

        document.getElementById("third").addEventListener("click",function(){
            alert("third");
        },true);

        document.getElementById("second").addEventListener("click",function(){
            alert("second");
        },true);        

        document.getElementById("first").addEventListener("click",function(){
            alert("first");
        },true);

    </script>
</body>
</html>
```



> **stopPropagation()方法只能阻止事件的冒泡，而不能阻止事件捕获。**

### 阻止事件捕获



```js
document.getElementById("second").addEventListener("click",function(){
            alert("second");
            event.stopImmediatePropagation();
        },true); 
```



### stopImmediatePropagation() 和 stopPropagation()的区别 

　　**后者只会阻止冒泡或者是捕获。 但是前者除此之外还会阻止该元素的其他事件发生，但是后者就不会阻止其他事件的发生**



## js进行css操作

### 改变 HTML 样式

语法

```js
document.getElementById(id).style.property = new style
```

### 1.直接设置style属性

```js
 element.style.height = '100px';
document.getElementById("p2").style.color = "blue"; 
```

### 2.直接设置属性 
```js
element.setAttribute('height', '100px');
```
### 3.使用setAttribute设置style属性 
```js
element.setAttribute('style', 'height: 100px !important');
```

###  4.使用setProperty设置属性，通过第三个参数设置important 
```js
element.style.setProperty('height', '300px', 'important');
```

### 5.设置cssText 

```js
element.style.cssText = 'height: 100px !important';
element.style.cssText += 'height: 100px !important';
```

### 6. 改变class   

比如JQ的更改class相关方法

因JS获取不到css的伪元素，所以可以通过改变伪元素父级的class来动态更改伪元素的样式

```js
element.className = 'blue';
element.className += 'blue fb';
```

###  7. 创建引入新的css样式文件

```js
function addNewStyle(newStyle) {
            var styleElement = document.getElementById('styles_js');

            if (!styleElement) {
                styleElement = document.createElement('style');
                styleElement.type = 'text/css';
                styleElement.id = 'styles_js';
                document.getElementsByTagName('head')[0].appendChild(styleElement);
            }
            
            styleElement.appendChild(document.createTextNode(newStyle));
        }

        addNewStyle('.box {height: 100px !important;}');
```

### 8. 使用addRule、insertRule

```js
// 在原有样式操作
        document.styleSheets[0].addRule('.box', 'height: 100px');
        document.styleSheets[0].insertRule('.box {height: 100px}', 0);

        // 或者插入新样式时操作
        var styleEl = document.createElement('style'),
            styleSheet = styleEl.sheet;

        styleSheet.addRule('.box', 'height: 100px');
        styleSheet.insertRule('.box {height: 100px}', 0);

        document.head.appendChild(styleEl);        
```

# DOM 集合

getElementsByTagName() 方法返回 *HTMLCollection* 对象。

```js
var x = document.getElementsByTagName("p");
y = x[1];//获取集合中的第二个p元素
```

length 属性定义了 HTMLCollection 中元素的数量

```js
var myCollection = document.getElementsByTagName("p");
document.getElementById("demo").innerHTML = myCollection.length;
//另一个实际利用
var myCollection = document.getElementsByTagName("p");
var i;
for (i = 0; i < myCollection.length; i++) {
    myCollection[i].style.backgroundColor = "red";
}
```

> HTMLCollection 并非数组！

# NodeList 对象

querySelectorAll() 方法返回 NodeList 对象。

```js
var myNodeList = document.querySelectorAll("p");
y = myNodeList[1];
//索引从 0 开始。
```

length 属性定义节点列表中的节点数

```js
var myNodelist = document.querySelectorAll("p");
document.getElementById("demo").innerHTML = myNodelist.length;
```

# HTMLCollection 与 NodeList 的区别

- HTMLCollection（前一章）是 HTML 元素的集合。
- NodeList 是文档节点的集合。
- NodeList 和 HTML 集合几乎完全相同。
- HTMLCollection 和 NodeList 对象都是类数组的对象列表（集合）。
- 它们都有定义列表（集合）中项目数的 length 属性。
- 它们都可以通过索引 (0, 1, 2, 3, 4, ...) 像数组那样访问每个项目。
- 访问 HTMLCollection 项目，可以通过它们的名称、id 或索引号。
- 访问 NodeList 项目，只能通过它们的索引号。
- 只有 NodeList 对象能包含属性节点和文本节点。
- 节点列表不是数组！
- 节点数组看起来像数组，但并不是。
- 您能够遍历节点列表并像数组那样引用其节点。
- 不过，您无法对节点列表使用数组方法，比如 valueOf()、push()、pop() 或 join()。

[HTMLCollection vs. NodeList](https://www.jianshu.com/p/f6ff5ebe45fd)

# DOM实例

## [例子集合](https://www.runoob.com/js/js-ex-dom.html)

## [查找集合](https://juejin.cn/post/6844903888886185998#heading-17)

## 多个监听事件覆盖

当同一个对象使用.onclick的写法触发多个方法的时候，后一个方法会把前一个方法覆盖掉，也就是说，在对象的onclick事件发生时，只会执行最后绑定的方法。而用事件监听则不会有覆盖的现象，每个绑定的事件都会被执行。如下：

```js
window.onload = function(){
 var btn = document.getElementById("yuanEvent");
 btn.onclick = function(){
  alert("第一个事件");
 }
 btn.onclick = function(){
  alert("第二个事件");
 }
 btn.onclick = function(){
  alert("第三个事件");
 }
}
```


最后只输出：第三个事件，因为后一个方法都把前一个方法覆盖掉了。
原生态的事件绑定函数addEventListener：

```js
var eventOne = function(){
 alert("第一个监听事件");
}
function eventTwo(){
 alert("第二个监听事件");
}
window.onload = function(){
 var btn = document.getElementById("yuanEvent");
 //addEventListener：绑定函数
 btn.addEventListener("click",eventOne);
 btn.addEventListener("click",eventTwo);
}
```


输出：第一个监听事件 和 第二个监听事件



## 一次性事件绑定(执行中松绑)

```js
// create a one-time event
function onetime(node, type, callback) {
    // create event
    node.addEventListener(type, function(e) {
        // remove event
        e.target.removeEventListener(e.type, arguments.callee);
        // call handler
        return callback(e);
    });
}
```

```html
<body>
<input type="button" id="btn">
</body>
<script>
var btn=document.getElementById('btn');
function f(){
alert(123);
btn.removeEvenListener('click',f);
}
btn.addEventListener('click',f);
</script>
```

## 批量绑定事件 js

```html
<body>  
<ul id="list">  
<li>1</li>  
<li>2</li>  
<li>3</li>  
<li>4</li>  
<li>5</li>  
</ul>  
<script>  
var list_obj = document.querySelectorAll('li');  
//var list_obj = document.getElementsByTagName('li'); 
for (let i = 0; i <= list_obj.length; i++) {        
  list_obj[i].onclick = function() {      
    alert(i);      
  }  
}  
</script>  
</body>  
```

**易错点**  

```js
var list_obj = document.getElementsByTagName('li');  
for (var i = 0; i <= list_obj.length; i++) {        
  list_obj[i].onclick = function() {      
    alert(i);      
  }  
}  

//当onclick事件发生的时候，会向上找到i对象的值。这个时候，由于已经循环完毕（编译），所以i的值是5
//所以注意闭包
```

**解决办法**

1. let是块作用域，而var是函数或者全局作用域
2. 利用闭包

```js
list_obj[i].onclick = (function(x) {      
    alert(x);   
    //return function(){ alert(i);}
 })(i) 
```



## 控制网页前进和后退（历史页面）

这个前进后退按钮是需要在特定环境下才有效果的，即你需要从另一个页面进入到这个页面后，点击这个后退按钮才有后退的效果，否则是没有的。

```html
<input type="button" value="后退" οnclick="javascript:history.go(-1);">

<input type="button" value="前进" οnclick="javascript:history.go(1);">
```



## 无刷新更改URL

data是你要存放的数据，可以使用history.state获取，title是标题，为空则不改变，url是新url

```js
window.history.pushState(data:json,title:string,url:string); // 会存储在url历史中
window.history.replaceState(data:json,title:string,url:string); // 不会存储。。。
```



## location

用来控制页面跳转

```js
location.replace("xx"); //跳转
location.href = 'xxxx'; //同上
location.reload(); //刷新页面
```



## 定时器

`setInterval`在执行完一次代码之后，经过了那个固定的时间间隔，它还会**自动重复**执行代码，而`setTimeout`**只执行一次**那段代码。

```js
var id = setInterval(callback/function,ms); //每隔ms毫秒执行一次函数（回调函数只写函数名）
var id = setTimeout(callback/function,ms); //在ms毫秒后执行一次函数
clearInterval(timer); //清理掉setInterval定时器
clearTimeout(timeout); //让setTimeout定时器失效
window.requestAnimationFrame(callBack/function); //专门为动画设置的定时器（效果比setInterval流畅，每秒执行60次，大部分浏览器中，每秒执行次数和显示器刷新率一致）
```



## 滚动动态加载内容

```js
window.onscroll = function(e){    // 页面滚动事件（一般加给window）
    // 页面被卷起来的高度距离顶部或底部的距离
    var juan = document.documentElement.scrollTop;    // 获取页面被卷起来的高度，documentElement相当于html标签
    var total = document.documentElement.scrollHeight;    // 获取页面总高度
    var visul = window.innerHeight;    // 获取可见区的高度（即浏览器显示出来的高度）
    var bot = total - juan - visul;    // bot就是可见区下面的高度（这是我们需要的）
    ........    // 当bot小于某值时，加载新元素
}
```

[详细讲解1](https://www.cnblogs.com/xiaohuochai/p/5294409.html)

[详细讲解2](https://www.cnblogs.com/xiaohuochai/p/5831640.html)

## 右键点击事件

oncontextmenu

 

## 表单绑定事件的触发

- onkeydown // 按下按键时立即触发，该事件一般绑定在document/window上，因为即使被绑定的表单没有获得焦点，该事件也会执行
- onkeypress // 按下按键时立即触发，只有被绑定的元素获得焦点了，才会执行事件（适用于动态search）
- onchange // 表单值改变时执行，按下按键时不是立即触发，而是等到输入完毕时才会触发（输入完毕指的是按下回车或表单失去焦点）
- oninput // 表单值改变时立即触发



## 动画事件

- animationend 该事件在 CSS 动画结束播放时触发
- animationiteration 该事件在 CSS 动画重复播放时触发
- animationstart 该事件在 CSS 动画开始播放时触发
- transitionend 该事件在 CSS 完成过渡后触发

## 阻止默认事件

建立onclick事件方法，加入var ev=window.event; ev.preventDefault();

阻止a标签的默认事件：

```js
<a href="javascript:void(0)">链接</a>
```

