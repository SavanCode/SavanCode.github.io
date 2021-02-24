---
title: Less 简介
top: false
cover: false
toc: true
mathjax: true
date: 2020-11-14 14:58:49
password:
summary: less 简介
tags: [css&html,less]
categories: less
---

1. less是CSS的预编译器，可以扩展CSS语言（当然也兼容CSS），可以定义变量、混合、函数等等，让CSS代码更易维护和扩展

2. less与传统写法相比：

   - less后缀为" .less "
   - less中的注释有两种

   ```
   // 这种注释不会编译到CSS文件*
   /* 这种注释会编译到CSS文件*/
   ```

3. less需要编译成css才能使用

   - 使用编译工具，比如 Koala 挺好用的（当然也有很多在线编译工具）
   - 在项目中使用（比如Vue，需要安装less-loader）
   - 客户端调试（存在跨域问题，不推荐这种方式）

   

   使用link标签引用less.min.js（官网下载），注意rel="stylesheet/less" （这种方式不生成css文件，直接在浏览器查看） 

## 嵌套规则

1. ### 基本结构

   嵌套规则类似HTML的结构，使得CSS代码清晰

   ```css
   /*css 写法*/
   div {
     font-size: 14px;
   }
   div p {
    margin: 0 auto;
   }
   
   div p a {
     color: red;
   }
   
   // less写法
   div {
     font-size: 14px;
     p {
       margin: 0 auto;
       a {
         color: red;
       }
     }
   }
   
   ```

2. ### 父元素选择符 &

   ```css
   //css写法
   .bgcolor {
     background: #fff;
   }
   .bgcolor a {
     color: #888888;
   }
   .bgcolor a:hover {
     color: #ff6600;
   }
   
   //less写法
   .bgcolor {
     background: #fff; 
     a {
       color: #888888;      
       &:hover {
         color: #ff6600;
       }
     }
   }
   ```

3. ### 改变选择器的顺序 - & 代表当前选择器的所有父选择器

   ```css
   ul {
     li {
       .color &{
         background: #fff;
       }
     }
   }
   //编译结果
   .color ul li {
     background: #fff;
   }
   ```

4. ### 组合使用

   ```css
   .div1, .div2 {
     color: red;
     & & {
       border-top: 1px solid blue;
     }
   } 
   
   //编译结果
   .div1, .div2 {
     color: red;
   }
   .div1 .div2,
   .div2 .div1,
   .div1 .div1,
   .div2 .div2 {
     border-top: 1px solid blue;
   }
   ```

## 变量

### 1.变量定义与使用

- 定义：@name: value; （@black: #000;）
- @arguments表示所有可变参数
- 使用场合分3种：
  - 常规使用：@name
  - 作为选择器或属性名：@{name}
  - 作为URL："@{name}"

```css
/* 1.常规使用 */
@black: #000000;

div {
  color: @black
}

//编译结果
div {
  color: #000000;
}

/* 2.作用选择器和属性名 */
@selName: container;
@proName: width;

.@{selName} {
  @{proName}: 100px;
}

//编译结果
.container {
  width: 100px;
}

/* 3.作为URL */
@imgUrl: "./images/logo.png"

div {
  background: #FFF url("@{imgUrl}")
}

//编译结果
div {
  background: #FFF url("./images/logo.png")
}

```

### 2.变量的加载声明与作用域

- 变量的加载声明

  ```css
  div {
    color: @black
  }
  
  @black: #000000;
  
  //编译结果
  div {
    color: #000000;
  }
  ```

- 变量的作用域

  less会从当前作用域没找到，将往上查找（类似js）

  如果在某级作用域找到多个相同名称的变量，使用最后定义的那个（类似css）

  ```css
  @var: 0;
  .class {
      @var: 1;
      .brass {
          @var: 2;
          three: @var;
          @var: 3;
      }
      one: @var; //类似js，无法访问.brass内部
  }
  
  //编译结果
  .class {
      one: 1;
  }
  .class .brass {
      three: 3;  //使用最后定义的 @var: 3
  }
  ```

## less -> css的编译

### 1.混合（mixins）

1. 一般的混合

   ```css
   .border { /*这里要注意*/
     border-top: solid 1px black;
     border-bottom: solid 2px black;
   }
   #menu a {
     color: #eee;
     .border;
   }
   
   //编译结果
   .border {
     border-top: solid 1px black;
     border-bottom: solid 2px black;
   }
   
   #menu a {
     color: #eee;
     border-top: solid 1px black;
     border-bottom: solid 2px black;
   }
   ```

   上面的如果加上括号，那么编译结果会不一样

   ```css
   //加括号但不带参数的混合
   .border() {
     border-top: solid 1px black;
     border-bottom: solid 2px black;
   }
   #menu a {
     color: #eee;
     .border;  //加不加括号都可以
   }
   
   //编译结果
   #menu a {
     color: #eee;
     border-top: solid 1px black;
     border-bottom: solid 2px black;
   }
   ```

2. 带参数的混合

   ```css
   //带参数的混合
   .border(@color) {
     border-top: solid 1px @color;
     border-bottom: solid 2px @color;
   }
   #menu a {
     color: #eee;
     .border(#fff);
   }
   
   //编译结果
   #menu a {
     color: #eee;
     border-top: solid 1px #ffffff;
     border-bottom: solid 2px #ffffff;
   }
   ```

   

3. 带参数与默认值的混合

   ```css
   //带参数且有默认值的混合
   .border(@color: #fff) {
     border-top: solid 1px @color;
     border-bottom: solid 2px @color;
   }
   #menu a {
     color: #eee;
     .border;
   }
   
   #menu p {
     .border(#000);
   }
   
   //编译结果
   #menu a {
     color: #eee;
     border-top: solid 1px #ffffff;
     border-bottom: solid 2px #ffffff;
   }
   
   #menu p {
     border-top: solid 1px #000000;
     border-bottom: solid 2px #000000;
   }
   ```


### 2.多个参数

多个参数时，参数之间可以用分号或逗号分隔

**注意逗号分隔的是“各个参数”还是“某个列表类型的参数”**

>  两个参数，并且每个参数都是逗号分隔的列表：.name(1,2,3; something, ele)
>
> 三个参数，并且每个参数都包含一个数字：.name(1,2,3)
>
> 使用分号，调用包含一个逗号分割的css列表（一个参数）： .name(1,2,3; )
>
> 逗号分割默认值（两个参数）：.name(@param1:red, blue)

```less
//less编写
//定义多个相同名称的混合
//less会根据参数进行调用相应的混合
.mixin(@color, @padding: xxx, @margin: 2) {
  color-3: @color;
  padding-3: @padding;
  margin: @margin @margin @margin @margin;
}

.div {
  .mixin(1,2,3; something, ele);  //2个参数
}
.div1 {
  .mixin(1,2,3);                  //3个参数
}
.div2 {
  .mixin(1,2,3; );                //1个参数
}

//编译输出
.div {
  color-3: 1, 2, 3;
  padding-3: something, ele;
  margin: 2 2 2 2;
}
.div1 {
  color-3: 1;
  padding-3: 2;
  margin: 3 3 3 3;
}
.div2 {
  color-3: 1, 2, 3;
  padding-3: xxx;
  margin: 2 2 2 2;
}
```

### 3.参数使用时候，顺序不限制

```less
.mixin(@color: black; @margin: 10px; @padding: 20px) {
  color: @color;
  margin: @margin;
  padding: @padding;
}
.class1 {
  .mixin(@margin:20; @color: #33acfe);
}
.class2 {
  .mixin(#efca44; @padding: 40px);
}

//编译输出
.class1 {
  color: #33acfe;
  margin: 20px;
  padding: 20px;
}
.class2 {
  color: #efca44;
  margin: 10px;
  padding: 40px;
}
```



### 4.类似函数的匹配模式

```less
.border(all, @w: 5px) {
  border-radius: @w;
}
.border(t_l, @w: 5px) {
  border-top-left-radius: @w;
}
.border(b_l, @w: 5px) {
  border-bottom-left-radius: @w;
}
.border(b_r, @w: 5px) {
  border-bottom-right-radius: @w;
}

.border {
  .border(all, 50%);
}
//编译结果
.border {
  border-radius: 50%;
}
```

```less
.average(@x, @y) {
  @average((@x + @y)/2);
}

div {
  .average(16px, 50px);
  padding: @average;
}

//编译结果
div {
  padding: 33px;
}
```



### 5.用> 或者 空格 的选择

```less
//混合集
#bgcolor() {
  background: #fff;
  .a() {
    color: #888;
    &:hover {
      color: #ff6600;
    }
    .b() { background: #ff0000;}    
  }
}

.bgcolor1 {
  background: #fdfee0;
  #bgcolor>.a;     //只使用.a() 内部的不用
}
.bgcolor2 {
  #bgcolor>.a>.b;  //只使用.b()
}

//编译输出
.bgcolor1 {
  background: #fdfee0;
  color: #888;
}
.bgcolor1:hover {
  color: #ff6600;
}
.bgcolor2 {
  background: #ff0000;
}
```



### 6.引入文件

- 引入一个或多个less或者css文件，这些文件定义的规则可在当前less文件中使用
- 使用@import

## 逻辑运算

### 1.条件表达

​	条件表达式：

- 比较运算符：>, >=, =, =<, <

- 格式：when() { }

  ```less
  // lightness() 是检测亮度的函数，用%度量
  .mixin(@a) when(lightness(@a) >= 50% ) {
    background-color: black;
  }
  .mixin(@a) when(lightness(@a) < 50% ) {
    background-color: white;
  }
  
  .mixin(@a) {
    color: @a;
  }
  .class1 {
    .mixin(#ddd);
  }
  .class2 {
    .mixin(#555);
  }
  
  //编译输出
  .class1 {
    background-color: black;
    color: #dddddd;
  }
  .class2 {
    background-color: white;
    color: #555555;
  }
  ```

### 2.类型检测

​		iscolor / isnumber / isstring / iskeyword / isurl

### 3.检测函数

​		ispixel / ispercentage / isem / isunit

### 4.循环

```less
.loop(@counter) when(@counter > 0) {
  .h@{counter} {
    padding: (10px*@counter);
  }
  .loop((@counter - 1)); //递归调用自身
}
div{
  .loop(5);
}
```



### 5.合并属性

- 在需要合并的属性的冒号之前加上 **“+”**，合并后用逗号分隔
- 在需要合并的属性的冒号之前加上 “+_”，合并用空格分隔

```less
.mixin() {
  background+_: #f66;
  background+: url("/sss.jpg");
  background+_: no-repeat;
  background+: center;
}
.class {
  .mixin;
}

//编译输出
.class {
  background: #f66, url("/sss.jpg")  no-repeat, center;
}
```

### 6.less中封装了非常多[函数库](http://lesscss.cn/functions/)

