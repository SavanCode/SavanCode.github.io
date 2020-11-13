---
title: 图上字下的方法-css
top: false
cover: false
toc: true
mathjax: true
date: 2020-11-13 23:21:39
password:
summary:
tags: css&html
categories:
---

# **图上字下的方法-css**

3个方法

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <style type="text/css">
            *{
                margin: 0;
                padding: 0;
            }
            #wrap{ 
                border: 1px solid;
                margin:100px auto;
                 
                display: flex;
            }
            #wrap > .item{

                background: whitesmoke;
                text-align: center;
                line-height: 50px;
                flex-shrink: 1;
                flex-grow: 1;
                flex-basis: 0;
                
            }

            #wrap > .item > a:before{
                content: "";
                display: block;
                width: 86px;
                height: 86px;
                margin: 0 auto;
            }
            #wrap > .item:nth-child(2) >a:before{
                background: url(./img/02.png) no-repeat;
                background-size: 100% auto
            }   

            .list-img{
                display: block;
                width: 30vw;/*viewport change in %*/
                max-width: 200px;
            }
        </style>
    </head>
    <body>
        <p>下面是用div 但是加入了flex布局 使用了background img link</p>
        <div id="wrap">
            <div class="item"> <img src="./img/01.png"> <div>img+div</div></div>
            <div class="item"><a>bgimg+a</a></div>
            <div class="item"><img src="./img/03.png">3</div>
            <div class="item">这个为div+flex</div>
        </div>

        <p>下面的使用表格实现的 </p>

        <div>
        <ul>
            <li style="float:left;">
                <a href="#"> 
                    <img class="list-img" src="./img/04.png" />
                    随着视窗大小变化图片大小
                </a>
            </li>
            <li style="float:left;">
                <a href="#">
                    <img src="./img/05.png"  style=" width:100px; height: 100px; display: block;" />
                    固定大小
                </a>
            </li>
        </ul>
     </div> 
 
     <div style="margin-top: 100px; display: inline-block;">
        <p>或者将img块与文字块（文本块存放在div中）放在同一个div 中，然后设置他们之间的位置</p>
    </div>
        <div style="position:relative;">
            　　<img src="./img/07.png" />
            　　<div style="position:absolute; z-index:2; left:10px; top:100px">下文标题 下文详细解释</div>
            </div>
    </body>
</html>
```

