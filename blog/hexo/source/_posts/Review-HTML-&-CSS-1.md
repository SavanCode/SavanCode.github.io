---
title: Review HTML& CSS 1
date: 2020-11-08 08:48:34
top: false
cover: false
toc: true
mathjax: true
tags: css&html
categories:
---




##   普通css

- 顺序：从上到下（这意味着，如果发生冲突，浏览器将使用最后出现的CSS声明）

   ​	**但是对于css的冲突, 优先级 内联样式 > id > class。**

   **当您绝对需要确保某个元素具有特定的CSS时，可以使用`!important`**

   ```css
   color: red !important;
   ```

   

- 选择器 ：

   ```css
   <h1 style="color: green;">//内联样式
   .className{ }//class      
   #id{ }//id	 	
   div.box1{}    
   p,.hello,#box{}    
   *{ }
   [type='radio/checkbox'] {
     margin: 20px 0px 20px 0px;
   }
   ```

   

- 字体：`<i>,<em>`  斜体        `<strong>,<b>` 加粗

- `<q>`与 `<blockquote>` 的区别

   q标签在本质上与 [blockquote](https://www.w3school.com.cn/tags/tag_blockquote.asp) 是一样的。不同之处在于它们的显示和应用。q 标签用于简短的行内引用。如果需要从周围内容分离出来比较长的部分（通常显示为缩进的块），请使用 blockquote标签。

   也就是 q比blockquote多显示一对双引号 

- `<sup>`和`<sub>` `<sup>`和`<sub>`用于定义上标和下标。例子：

   ![](Review-HTML-&-CSS-1/css_10^3.png)

- `<del>`刪除文本~~加刪除線~~，`<ins>`為插入<u>文本加下劃線</u>

- 插入代码： `<pre>`行块  `<code>` 块状

- 单位：`px ; % ; em`

   **父子包含的div，width&height会传递影响，要是子 > 父，记得用 px。 % 会受父级width影响**

- 行间距= line-height –font-size

- Spacing : word spacing & word spacing

- Text-align: justify(两边对齐)

- padding / margin : 上，右，下，左

   ```css
   margin: 25px 50px 75px;//上 左右 下
   margin: 25px 50px;// 上下 左右
   margin: 25px//all
   ```

   ![](Review-HTML-&-CSS-1/1604995934200.png)

- Overflow：内容溢出盒子 visible; scroll; auto; hidden

- Position: static; relative; absolute;fixed

- Z-index

- 自定义css

   ```css
   <style>
     :root { // pseudo-class selector
         --penguin-skin: gray;//全局定义
     }
   
   .penguin {
       --penguin-belly: white; //重新定义，在class内
     }
   </style>
   
   background: var(--penguin-skin);//使用
   //附加一个后备值，如果给定变量无效，则浏览器将还原为该值
   background: var(--penguin-skin, black);
   ```

- 屏幕小于或大于媒体查询断点

  ```css
    @media (max-width: 350px) {
      :root {
      --penguin-size: 200px;
      --penguin-skin: black;
      }
    }
  ```

  

## table

- 不同列表`<ol> ,<li>` vs `<ul>,<li>`       自定义: `<dl>,<dt>(=ul),<dd>(=li)`

- `<tr>`一行`<th>`一头`<td>` 中 & `<Caption>` 标题、`<thead>` 头部、`<tbody>`、`<tfoot>`

- 横向合并–colspan（ colspan="2"） 纵向合并–rowspan

  ```html
  <!--标准列表-->
  <table> 
    <caption>Monthly savings</caption>
    <thead>
    <tr>
      <th>Month</th>
      <th>Savings</th>
    </tr>
    </thead>
    <tr>
      <td rowspan=2 >January</td>
      <td>100</td>
    </tr>
     <tr>
      <td>100</td>
    </tr>
    <tfoot>
    <tr>
      <td colspan=2 >February</td>
    </tr>
    </tfoot>
  </table>
  ```

  ![](../table_sample.png)

  ```html
  <!--定义自定义列表-->
  <dl>
      <!--定义自定义项目-->
      <dt>cast:</dt>
      <!--定义自定义描述-->
          <dd>vi. 1投掷扔抛, 2丢弃, 抛弃 3把...投向, 抛射, 4分派..., 扮演角色 5铸造, 浇铸 n. 全体演员</dd>
      <dt>forecast:</dt>
          <dd>v. 预测, 预报, /dd>
          <dd>n. 预测, 预报<</dd>
      <dt>insight:</dt>
       <dd>n. 洞察力, 领悟 v. 洞悉, 了解</dd>
  </dl>
  ```

  ![](Review-HTML-&-CSS-1/1604912356663.png)

- border-collapse & separate (default) 表格的边与内容的边

## Form

- 表单中 action提交服务器的地址 method 提交方式

- select中optgroup组中option 选项 

- Fieldset加表框 里面的legend表边框左上名字（边上）表内label 显示文字

  ```html
  <form action="/action_page.php">
   <fieldset>
    <legend>Personalia:</legend>
    <label>select</label>
      <select>
      <optgroup>
      <option>1</option>
      <option>2</option>
      <option>3</option>
      </optgroup>
      </select><br><br>
    <label for="birthday">Birthday:</label>
    <input type="date" id="birthday" name="birthday"><br><br>
    <input type="submit" value="Submit">
   </fieldset>
  </form>
  ```


penguin

```html
<style>
  .penguin {

    /* Only change code below this line */
    --penguin-skin: gray;
    --penguin-belly: white;
    --penguin-beak: orange;
    /* Only change code above this line */

    position: relative;
    margin: auto;
    display: block;
    margin-top: 5%;
    width: 300px;
    height: 300px;
  }

  .penguin-top {
    top: 10%;
    left: 25%;
    background: var(--penguin-skin, gray);
    width: 50%;
    height: 45%;
    border-radius: 70% 70% 60% 60%;
  }

  .penguin-bottom {
    top: 40%;
    left: 23.5%;
    background: var(--penguin-skin, gray);
    width: 53%;
    height: 45%;
    border-radius: 70% 70% 100% 100%;
  }

  .right-hand {
    top: 0%;
    left: -5%;
    background: var(--penguin-skin, gray);
    width: 30%;
    height: 60%;
    border-radius: 30% 30% 120% 30%;
    transform: rotate(45deg);
    z-index: -1;
  }

  .left-hand {
    top: 0%;
    left: 75%;
    background: var(--penguin-skin, gray);
    width: 30%;
    height: 60%;
    border-radius: 30% 30% 30% 120%;
    transform: rotate(-45deg);
    z-index: -1;
  }

  .right-cheek {
    top: 15%;
    left: 35%;
    background: var(--penguin-belly, white);
    width: 60%;
    height: 70%;
    border-radius: 70% 70% 60% 60%;
  }

  .left-cheek {
    top: 15%;
    left: 5%;
    background: var(--penguin-belly, white);
    width: 60%;
    height: 70%;
    border-radius: 70% 70% 60% 60%;
  }

  .belly {
    top: 60%;
    left: 2.5%;
    background: var(--penguin-belly, white);
    width: 95%;
    height: 100%;
    border-radius: 120% 120% 100% 100%;
  }

  .right-feet {
    top: 85%;
    left: 60%;
    background: var(--penguin-beak, orange);
    width: 15%;
    height: 30%;
    border-radius: 50% 50% 50% 50%;
    transform: rotate(-80deg);
    z-index: -2222;
  }

  .left-feet {
    top: 85%;
    left: 25%;
    background: var(--penguin-beak, orange);
    width: 15%;
    height: 30%;
    border-radius: 50% 50% 50% 50%;
    transform: rotate(80deg);
    z-index: -2222;
  }

  .right-eye {
    top: 45%;
    left: 60%;
    background: black;
    width: 15%;
    height: 17%;
    border-radius: 50%;
  }

  .left-eye {
    top: 45%;
    left: 25%;
    background: black;
    width: 15%;
    height: 17%;
    border-radius: 50%;
  }

  .sparkle {
    top: 25%;
    left: 15%;
    background: white;
    width: 35%;
    height: 35%;
    border-radius: 50%;
  }

  .blush-right {
    top: 65%;
    left: 15%;
    background: pink;
    width: 15%;
    height: 10%;
    border-radius: 50%;
  }

  .blush-left {
    top: 65%;
    left: 70%;
    background: pink;
    width: 15%;
    height: 10%;
    border-radius: 50%;
  }

  .beak-top {
    top: 60%;
    left: 40%;
    background: var(--penguin-beak, orange);
    width: 20%;
    height: 10%;
    border-radius: 50%;
  }

  .beak-bottom {
    top: 65%;
    left: 42%;
    background: var(--penguin-beak, orange);
    width: 16%;
    height: 10%;
    border-radius: 50%;
  }

  body {
    background:#c6faf1;
  }

  .penguin * {
    position: absolute;
  }
</style>
<div class="penguin">
  <div class="penguin-bottom">
    <div class="right-hand"></div>
    <div class="left-hand"></div>
    <div class="right-feet"></div>
    <div class="left-feet"></div>
  </div>
  <div class="penguin-top">
    <div class="right-cheek"></div>
    <div class="left-cheek"></div>
    <div class="belly"></div>
    <div class="right-eye">
      <div class="sparkle"></div>
    </div>
    <div class="left-eye">
      <div class="sparkle"></div>
    </div>
    <div class="blush-right"></div>
    <div class="blush-left"></div>
    <div class="beak-top"></div>
    <div class="beak-bottom"></div>
  </div>
</div>
```

![](Review-HTML-&-CSS-1/1604985404187.png)