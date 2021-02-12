---
title: Rest Api
top: false
cover: false
toc: true
mathjax: true
date: 2021-02-11 12:51:25
password:
summary: Rest & Rest Api 
tags: [Node.js , Js , Express, Rest Api]
categories: [Node.js , Js , Express, Rest Api]
---

## Rest & Rest Api 

Representational State Transfer = **REST**

REST由一组用于在不同系统之间共享数据的标准或约束组成，实现REST的系统称为RESTful。REST是一个抽象概念，而不是语言，框架或软件类型。

一个**API**是编程接口，它是一个接口，允许软件程序能够与彼此通信的应用。一个**REST的API**只是一个API，它附着在原则和REST的约束。在Web API中，服务器通过URL端点接收 **请求**并返回**响应**，该**响应**通常是JSON等格式的数据。

## REST原则

六个指导性约束定义了REST体系结构，概述如下。

1. **统一接口**：组件的接口必须相同。这意味着使用URI标准来标识资源，即可以输入到浏览器位置栏中的路径。
2. **客户端-服务器**：存储和处理数据的服务器与请求和显示响应的客户端之间存在关注点分离。
3. **无状态交互**：有关每个请求的所有信息都包含在每个单独的请求中，并且不依赖于会话状态。
4. **可缓存的**：客户端和服务器可以缓存资源。
5. **分层系统**：客户端可以连接到最终服务器，也可以连接到中间层（例如负载平衡器）。
6. **按需提供代码（可选）**：客户端可以下载代码，从而减少了外部可见性。

## 请求和回应

### 申请方法

有四种主要的HTTP方法，也称为HTTP动词，通常用于与Web API进行交互。这些方法定义将对任何给定资源执行的操作。

HTTP请求方法大致对应于**CRUD**的范例，它代表*Create，Update，Read，Delete*。尽管CRUD指的是数据库操作中使用的功能，但是我们可以将这些设计原理应用于RESTful API中的HTTP动词。

| 行动     | 申请方法 | 定义           |
| :------- | :------- | :------------- |
| 读       | `GET`    | 检索资源       |
| 创造     | `POST`   | 创建一个新资源 |
| 更新资料 | `PUT`    | 更新现有资源   |
| 删除     | `DELETE` | 删除资源       |

`GET`是一种安全的只读操作，不会更改服务器的状态。每次您在浏览器中点击URL时（例如）`https://www.google.com`，都`GET`将向Google服务器发送请求。

`POST`用于创建新资源。一个常见的示例`POST`是在网站或应用上以用户身份注册。提交表单后，`POST`带有用户数据的请求可能会发送到服务器，服务器随后会将信息写入数据库。

`PUT`更新现有资源，该资源可用于编辑现有用户的设置。与`POST`，不同，`PUT`是**幂等的**，意味着同一呼叫可以多次进行而不会产生不同的结果。例如，如果您`POST`多次发送相同的请求以在数据库中创建一个新用户，则它将为您提出的每个请求创建一个具有相同数据的新用户。但是，`PUT`对同一用户使用相同的请求将连续产生相同的结果。

`DELETE`，顾名思义，只会删除现有资源。

### 响应码

一旦请求从客户端传递到服务器，服务器将发送回HTTP响应，该响应将包含有关响应的元数据（称为标头）以及正文。响应的第一个也是最重要的部分是**状态码**，它指示请求是否成功，是否存在错误或是否必须执行其他操作。

- `1xx`：信息
- `2xx`：成功
- `3xx`：重定向
- `4xx`：客户端错误
- `5xx`： 服务器错误

其他常见响应是 `301 Moved Permanently`，用于将网站重定向到新的URL，以及 `500 Internal Server error`，这是错误消息，如果服务器上发生意外事件导致无法满足预期的请求，该错误就会经常出现。

关于RESTful API及其对应的HTTP动词，所有响应都应在`2xx`范围内。

| 请求     | 响应                                               |
| :------- | :------------------------------------------------- |
| `GET`    | `200` （行）                                       |
| `POST`   | `201` （已创建）                                   |
| `PUT`    | `200` （行）                                       |
| `DELETE` | `200` （确定）， `202` （接受）或 `204` （无内容） |

`200 OK`是指示请求成功的响应。发送`GET`或`PUT`请求时用作响应。`POST`将返回一个`201 Created`，表示已创建一个新资源，并且`DELETE`有一些可接受的响应，表明该请求已被接受（`202`），或者由于该资源不再存在而没有返回内容（`204`）。

我们可以使用CURL测试资源请求的状态代码，CURL是用于通过URL传输数据的命令行工具。使用`curl`，后跟`-i` 或`--include`标志，将向`GET`URL发送请求并显示标题和正文。我们可以通过打开命令行程序并使用Google测试cURL来进行测试。

```
curl -i https://www.google.com
```

Google的服务器将响应以下内容。

```
HTTP/2 200 
date: Tue, 14 Aug 2018 05:15:40 GMT 
expires: -1
cache-control: private, max-age=0 
content-type: text/html; charset=ISO-8859-1 
...
```

如我们所见，`curl`请求返回多个标头和响应的整个HTML正文。由于请求已成功通过，因此响应的第一部分是`200`状态代码以及HTTP版本（HTTP / 1.1或HTTP / 2）。

由于此特定请求正在返回网站，因此返回的`content-type`（MIME类型）为`text/html`。在RESTful API中，您可能会看到`application/json`指示响应为JSON。

有趣的是，通过输入略有不同的URL，我们可以看到另一种类型的响应。做一个`curl`对谷歌没有`www`。

```
curl -i https://google.com
HTTP/2 301 
location: https://www.google.com/ 
content-type: text/html; 
charset=UTF-8
```

Google重定向`google.com`到`www.google.com`，并使用`301`响应指示应重定向资源。

## REST API端点

在服务器上创建API后，可以通过端点访问其中包含的数据。一个**端点**是可以接受和处理请求的URL `GET`，`POST`，`PUT`，或`DELETE`请求。

API URL将由根，路径和可选查询字符串组成。

- **根，**例如`https://api.example.com`或`https://api.example.com/v2`：API的根，可以由协议，域和版本组成。
- **路径，**例如`/users/`或`/users/5`：特定资源的唯一位置。
- **查询参数（可选），**例如`?location=chicago&age=29`：用于排序，过滤和分页的可选键值对。
  我们可以将它们放在一起以实现诸如下面的示例之类的示例，该示例将返回所有用户的列表，并使用查询参数of`limit`过滤响应以仅包含十个结果。

```
https://api.example.com/users?limit=10
```

通常，当人们将API称为RESTful API时，他们所指的是建立API URL端点所使用的命名约定。标准RESTful API的一些重要约定如下：

- **路径应为复数形式**：例如，要使用户的ID为`5`，我们可以使用`/users/5`，而不是`/user/5`。
- **端点不应显示文件扩展名**：尽管API很可能会返回JSON，但URL不应以结尾`.json`。
- **端点应使用名词，而不是动词**：REST URL中不应出现的单词，例如，`add`并且`delete`不应出现在REST URL中。为了添加新用户，您只需向发送`POST`请求`/users`，而不是`/users/add`。应该开发API以处理对同一URL的多种类型的请求。
- **路径区分大小写，并且应使用小写字母加连字符（而不是下划线）**。

## 请求template - asynchronousMethod

```js
async asynchronousMethod() {
  try {
    const response = await fetch('url')
    const data = await response.json()

    // do something with `data`
  } catch (error) {
    // do something with `error`
  }
}
```

## 暂时还未阅读

[如何在Node.js中设置Express API服务器](https://code.tutsplus.com/tutorials/code-your-first-api-with-nodejs-and-express-set-up-the-server--cms-31698)



## Reference

[了解REST和RESTful API](https://code.tutsplus.com/tutorials/code-your-first-api-with-nodejs-and-express-understanding-rest-apis--cms-31697)