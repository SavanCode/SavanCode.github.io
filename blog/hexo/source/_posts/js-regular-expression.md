---
title: js regular expression JS 正则表达式
top: false
cover: false
toc: true
mathjax: true
date: 2020-11-24 22:18:15
password:
summary: JS 正则表达式
tags: JS
categories: JS
---

## 模式
- g: 表示全局(global)模式，即模式将被应用于所有字符串，而并非在发现第一个匹配项时立即停止
- i: 表示不区分大小写(case-insensitive)模式，即在确定匹配项时忽略模式与字符串的大小写
- m: 表示多行(multi-line)模式，即在到达一行文本末尾时还会继续查找下一行中是否存在与模式匹配的项
- s: dotAll / singleline模式：. 可以匹配换行符
- u: unicode，unicode模式：匹配unicode字符集

```js
 console.log(/^.$/.test("\uD842\uDFB7"));
 console.log(/^.$/u.test("\uD842\uDFB7")); 
```

- y: sticky，粘性模式：匹配正则中lastIndex属性指定位置的字符，并且如果没有匹配也不尝试从任何后续的索引中进行匹配

## 元字符
`. `转义符
- 匹配行结束符（\n \r \u2028 或 \u2029）以外的任意单个字符
- 在 `字符集合（Character Sets）` 中，`.` 将失去其特殊含义，表示的是原始值

`\ `转义符，它有两层含义 
- 表示下一个具有特殊含义的字符为字面值 
- 表示下一个字符具有特殊含义（转义后的结果是元字符内约定的）


| 字符 | 说明                           |
| ---- | ------------------------------ |
| `.`  | 匹配除换行符外的任意一个字符   |
| `\d` | 匹配任意一个数字（0-9）        |
| `\w` | 匹配任意一个字母、数字或下划线 |
| `\s` | 匹配任意一个空白符             |

**`\d` `\w` `\s` 如果把小写变为大写，就是取相反的意思，比如 `\D` 表示任意一个非数字字符。**

| 字符 | 说明               |
| ---- | ------------------ |
| `\s` | 匹配任意一个空白符 |
| `\t` | 匹配一个制表符     |
| `\n` | 匹配一个换行符     |
| `\f` | 匹配一个换页符     |
| `\v` | 匹配一个垂直制表符 |
| `\r` | 匹配一个回车符     |


## 字符集合
`[xyz]`  一个字符集合。匹配方括号中的任意字符，包括[转义序列](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Grammar_and_types)。你可以使用破折号（-）来指定一个字符范围。对于点（.）和星号（*）这样的特殊符号在一个字符集中没有特殊的意义。他们不必进行转义，不过转义也是起作用的。
例如，`[abcd]` 和 `[a-d]`是一样的。他们都匹配"brisket"中的‘b’,也都匹配“city”中的‘c’。`/[a-z.]+/` 和`/[\w.]+/`与字符串“test.i.ng”匹配。

## 范围的元字符
| 字符     | 说明                                                    |
| -------- | ------------------------------------------------------- |
| `|`      | 或，如 `ab|bc` 匹配 `ab` 或 `bc`                        |
| `[...]`  | 多选一，匹配括号中任意一个元素                          |
| `[a-z]`  | 匹配 a 到 z 之间任意一个元素（按照 ASCII 表，包含 a,z） |
| `[^...]` | 取反，匹配不能是括号中的任意一个元素                    |

## 量词元字符
| 字符    | 说明                       |
| ------- | -------------------------- |
| `*`     | 出现 0 到多次              |
| `+`     | 出现 1 到多次              |
| `？`    | 出现 0 或 1 次，如 colou?r |
| `{m}`   | 出现 m 次                  |
| `{m}`   | 至少出现 m 次              |
| `{m,n}` | 出现 m 到 n 次             |


> 注意：
> 1. 量词的使用要注意其作用范围，其一般只作用于前面的那个字符，如正则 `a+` 表示匹配字符 `a` 1 次或多次。如果量词跟在分组 `()` 后，那么量词的作用范围就是前面 `()` 内的内容。
> 2. 量词默认是贪婪的，即极可能多的去匹配字符。如果要实现把量词变为非贪婪的，那么要在量词后加个 `?`，这样量词就变为非贪婪了。


## 断言(定位单词边界、行的开始结束以及环视)
| 字符      | 说明                                         |
| --------- | -------------------------------------------- |
| `\b`      | 匹配单词的边界                               |
| `^`       | 匹配行的开始，多行模式时，可以匹配任意行开头 |
| `$`       | 匹配行的结束，多行模式时，可以匹配任意行结尾 |
| `\A`      | 只匹配整个字符串的开始，不支持多行模式       |
| `\Z`      | 只匹配整个字符串的结束，不支持多行模式       |
| `(?<=Y)X` | 匹配前面是 Y 的 X                            |
| `(?<!Y)X` | 匹配前面不是 Y 的 X                          |
| `(?=Y)X`  | 匹配后面是 Y 的 X                            |
| `(?!Y)X`  | 匹配后面不是 Y 的 X                          |


> 注意：
> 1. 反向引用里面“断言是没有带过去的”，复用的部分只是匹配到的文本内容，这段很重要，也是自己也开始没有意识到的。
> 2. 断言只是匹配位置，准确地说就是只负责定位，不会匹配任何字符！这点很重要。
> 3. 环视中 `\W` 不等于 `!\w`，

## [正则表达式匹配提取值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#用正则表达式匹配提取值)

```js
function parseProtocol(url) {
  var parsedURL = /^(\w+)\:\/\/([^\/]+)\/(.*)$/.exec(url);
  if (!parsedURL) {
    return false;
  }
  console.log(parsedURL); // ["https://developer.mozilla.org/en-US/Web/JavaScript", "https", "developer.mozilla.org", "en-US/Web/JavaScript"]

  var [, protocol, fullhost, fullpath] = parsedURL;
  return protocol;
}

console.log(parseProtocol('https://developer.mozilla.org/en-US/Web/JavaScript')); // "https"
```



**Reference**
1.https://blog.csdn.net/lxcnn/category_538256.html
2.https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions
3.https://www.cnblogs.com/xiaohuochai/p/5612230.html


**Tool**
https://regex101.com/
https://juejin.cn/post/6844904182835757064
https://regexper.com/