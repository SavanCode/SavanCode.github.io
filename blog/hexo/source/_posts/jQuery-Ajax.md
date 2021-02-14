---
title: jQuery Ajax
top: false
cover: false
toc: true
mathjax: true
date: 2020-12-13 14:45:36
password:
summary: AJAX
tags:[jQuery,JS,AJAX]
categories: [jQuery,JS,AJAX]
---

AJAX = 异步 JavaScript 和 XML（Asynchronous JavaScript and XML）。

简短地说，在不重载整个网页的情况下，AJAX 通过后台加载数据，并在网页上进行显示。

## 1.jQuery中ajax的两种书写方式【一般采用第二种方式】

1. $.ajax(url,[setting]);
2. $.ajax([setting]); 

```js
 $.ajax({
        url:'',    //放置请求地址路径
        method:'',    //请求方式(GET、POST等请求方式,不区分大小写)
        data:{},    //传递给服务器的参数数据,如果不传递数据可以不需要该键值对
        success:function(res){},    //请求成功回调函数,参数res为请求成功返回的结果信息
        error:function(error){}        //请求失败回调函数,参数error为请求失败返回的结果信息
    });
```

## 2.setting参数说明

setting为一个对象,用于配置 Ajax 请求的键值对集合 

- acync：　　     是否异步请求【默认为true】
  beforeSend: 　 请求发送前的回调函数   返回false将取消这个请求。
  complete：　　  请求完成后的回调函数(请求success,error之后均调用)该选项可以接受一个函数数组，每个函数将被依次调用。
  cache：　　　　 浏览器是否缓存此页面【默认为true】
  dataType : 　　从服务器返回你期望的数据类型
  常用的参数值为："json": 返回 JSON 数据
  statusCode :    (默认: {})

```js
$.ajax(
        statusCode: {
            //HTTP状态码为404时,执行下面的函数
              404: function() {
                 console.log("页面没有找到！！！");
              }
           }
    );
```

## 3. load()

load() 方法从服务器加载数据，并把返回的数据放入被选元素中。

**语法:**

```js
$(selector).load(URL,data,callback);
$dom.load(url,[data],[complete(){}])  
```

可选的 callback 参数规定当 load() 方法完成后所要允许的回调函数。回调函数可以设置不同的参数：

- *responseTxt* - 包含调用成功时的结果内容
- *statusTXT* - 包含调用的状态
- *xhr* - 包含 XMLHttpRequest 对象

下面的例子会在 load() 方法完成后显示一个提示框。如果 load() 方法已成功，则显示"外部内容加载成功！"，而如果失败，则显示错误消息：

```javascript
$("button").click(function(){ 
    $("#div1").load("demo_test.txt",function(responseTxt,statusTxt,xhr){   
        if(statusTxt=="success")      
            alert("外部内容加载成功!");    
        if(statusTxt=="error")      
            alert("Error: "+xhr.status+": "+xhr.statusText); 
    }); 
});
```

> **注意：**
> a、该指定路径页面为html页面,该页面可以直接写节点信息【不需要文件头等信息】;
> 也可以在路径中指定html页面中的相应元素节点内容
> b、注意url路径是相对于选取的dom节点元素的路径

```js
$('#result') .load('./test.html #container');    //向$('#result')中载入test.html中的$("#container")
```

## 4.get() 和 post() 方法

两种在客户端和服务器端进行请求-响应的常用方法是：GET 和 POST。

- *GET* - 从指定的资源请求数据
- *POST* - 向指定的资源提交要处理的数据

GET 基本上用于从服务器获得（取回）数据。注释：GET 方法可能返回缓存数据。

POST 也可用于从服务器获取数据。不过，POST 方法不会缓存数据，并且常用于连同请求一起发送数据。

### 4.1 $.get() 方法

$.get() 方法通过 HTTP GET 请求从服务器上请求数据。

语法：

```js
$.get(URL,callback);
$.get(url,[data],[success(){}],[dataType])    
```

必需的 *URL* 参数规定您希望请求的 URL。

可选的 *callback* 参数是请求成功后所执行的函数名

> 第一个回调参数存有被请求页面的内容，第二个回调参数存有请求的状态。

```javascript
 $.get("demo_test.php",function(data,status){
    alert("数据: " + data + "\n状态: " + status);
  });
```

### 4.2 $.post() 方法

$.post() 方法通过 HTTP POST 请求向服务器提交数据。

**语法:**

```js
$.post(URL,data,callback);
$.post(url,[data],[success(){}],[dataType])  
```

必需的 *URL* 参数规定您希望请求的 URL。

可选的 *data* 参数规定连同请求发送的数据。

可选的 *callback* 参数是请求成功后所执行的函数名。

> 第一个回调参数存有被请求页面的内容，而第二个参数存有请求的状态。

```javascript
 $.post("/try/ajax/demo_test_post.php",
    {
        name:"菜鸟教程",
        url:"http://www.runoob.com"
    },
    function(data,status){
        alert("数据: \n" + data + "\n状态: " + status);
    });
```

## 5. $getJSON方式

$.getJSON(url,[data],[success(){}])   期待后台请求数据为JSON类型

```js
    //$.post()    后台返回的数据类型是JSON格式的时候
    $.getJSON(url,{},function(res){
        console.log(res,'$.getJSON请求');
    });
```

## 6. 获取数据

### 6.1XMLHttpRequest

```js
  document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('getMessage').onclick = function(){//事件取数据
     	 const req = new XMLHttpRequest();
          req.open("GET",'/json/cats.json',true);//get方式 true:异步请求
          req.send();
          req.onload = function(){//事件处理程序解析返回数据
          const json = JSON.parse(req.responseText);//解析字符串
          document.getElementsByClassName('message')[0].innerHTML = JSON.stringify(json);
      };
    };
  });
```

### 6.2 JavaScript`fetch()`

```js
  document.addEventListener('DOMContentLoaded',function(){
    document.getElementById('getMessage').onclick= () => {
        fetch('/json/cats.json') //发出请求 返回promise
            .then(response => response.json())//成功后 转换为json 返回promise
            .then(data => {
           document.getElementById('message').innerHTML = JSON.stringify(data);
         })
    };
  });
```

## 7. 获得json数据 方法

### 7.1forEach方法遍历数据

- [ ]->方括号表示数组
- { }->括号表示对象
- “ ”->双引号表示字符串。它们还用于JSON中的键名

```js
//将所有的数据取出来 
document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('getMessage').onclick = function(){
      const req = new XMLHttpRequest();
      req.open("GET",'/json/cats.json',true);
      req.send();
      req.onload = function(){
        const json = JSON.parse(req.responseText);
        let html = "";
          json.forEach(function(val) {//去除所有的数据
            const keys = Object.keys(val);
            html += "<div class = 'cat'>";
            keys.forEach(function(key) {
              html += "<strong>" + key + "</strong>: " + val[key] + "<br>"; //将数据放进去
            });
            html += "</div><br>";
          });
        document.getElementsByClassName('message')[0].innerHTML = html;//数据直接放到html中 message
```

```js
	let html = "";
    json.forEach(function(val) {
      html += "<div class = 'cat'>";
        html += "<img src = '" + val.imageLink + "' " + "alt='" + val.altText + "'>";
      html += "</div><br>";
    });
    document.getElementsByClassName('message')[0].innerHTML=html;
```

### 7.2 预先过滤JSON以获取所需的数据 - filter

```js
  json = json.filter(function(val) {
      return (val.id !== 1);
    });
```

## 8.发布数据方法

### 8.1XMLHttpRequest方法发布数据

```js
   document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('sendMessage').onclick = function(){
      // 基本元素
      const userName = document.getElementById('name').value;
      const url = 'https://jsonplaceholder.typicode.com/posts';
      // 这里post数据
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 201){
        const serverResponse = JSON.parse(xhr.response);
        document.getElementsByClassName('message')[0].textContent = serverResponse.userName + serverResponse.suffix;
      }
    };
    const body = JSON.stringify({ userName: userName, suffix: ' loves cats!' });
    xhr.send(body); 
    };
  });
```

