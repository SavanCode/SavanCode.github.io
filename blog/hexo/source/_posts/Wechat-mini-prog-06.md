---
title: Wechat-mini-prog-06 小程序npm
top: false
cover: false
toc: true
mathjax: true
date: 2021-01-21 15:52:59
password:
summary:
tags: WechatMini Program
categories: WechatMini Program
---
## 利用npm第三方包

### 例子： [npm安装第三方包miniprogram-datepicker](https://www.npmjs.com/package/miniprogram-datepicker)

1. 先在工具上，勾选“npm模块”

2. 打开电脑自带命令行工具，进入到项目根文件夹下，执行 `npm init -y`(项目根下会出现两个文件package.json、package-lock.json)

3. 安装插件  `npm install miniprogram-datepicker --production` (根目录下会出现一个新文件夹node_modules，同时，在node_modules文件下会出现miniprogram-datepicker文件夹) 

   （这里控制台有error！但是没关系，不影响）

4. 安装组件后，需要构建npm，在开发工具中，工具–构建npm

5. 记得在界面右侧的项目详情中，本地设置中要选择 使用npm模块

6. 在wxml & json 加入代码，测试界面效果

   ```json
   //json
   {
     "usingComponents": {
       "datepicker": "miniprogram-datepicker"
     }
   }
   ```

   

   ```html
   <!-- wxml -->  
   <datepicker value="{{solar}}" bindchange="bindSolarChange">
       <button type="default">公历</button>
     </datepicker>
     <datepicker value="{{lunar}}" chinese="{{true}}" bindchange="bindLunarChange">
       <button type="default">农历</button>
     </datepicker>
   
     <block wx:for="{{feeds}}" wx:key="{{item.ArticleId}}">
       <view class="list" data-para="{{item}}" bindtap="tapItem">
         <view class="view_preinfo">
           <text class="list_preinfo">{{item.CreateDateTime}} / {{item.ArticleAuthor}}</text>
         </view>
         <text class="list_title">{{item.ArticleTitle}}</text>
         <view>
           <block wx:for="{{item.Tags}}" wx:key="{{item.TagName}}">
             <text class="list_tag" style="border: solid 1px {{item.BackgroundColor}};">{{item.TagName}}</text>
           </block>
         </view>
       </view>
     </block>
   ```

   他的官方写的wxml，我不知道为啥，反正我用了它不显示╮(╯▽╰)╭

   

### 其他好用的npm包

#### we-ui 

#### [模板- wepy](https://github.com/Tencent/wepy)

[wepy的优秀笔记](https://juejin.cn/post/6844903774851432456) 

#### [其他的 小程序npm搜索](https://www.npmjs.com/search?q=miniprogram) 