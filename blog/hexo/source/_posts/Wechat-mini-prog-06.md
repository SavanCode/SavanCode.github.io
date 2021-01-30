---
title: Wechat-mini-prog-06 小程序npm
top: false
cover: false
toc: true
mathjax: true
date: 2021-01-21 15:52:59
password:
summary: npm 但是实际操作还有很多坑 ( ╯□╰ )
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

## 消息订阅发布

1. 使用第三方库: pubsub-js

2. 安装: npm install pubsub-js

3. 使用：

   a) Import PubSub from ‘pubsub-js’

   b) 订阅消息: PubSub.subscribe(‘eventName’, callback) 

   c) 发布消息: PubSub.publish(‘eventName’, data)

   d) 取消订阅: PubSub.unsubscribe(‘eventName’)



### 其他好用的npm包

[wxa-plugin-canvas 生成二维码海报的组件](https://github.com/jasondu/wxa-plugin-canvas)

#### [其他的 小程序npm搜索](https://www.npmjs.com/search?q=miniprogram) 



## 框架- wepy

### [wepy的优秀笔记](https://juejin.cn/post/6844903774851432456) 

### wepy框架vscode代码高亮 

指南：https://blog.csdn.net/UNIONDONG/article/details/105257584

安装Vetur + 设置vetur的setting json



## 其他优秀框架：

### Taro多端统一开发解决方案
官网文档：[http://taro-docs.jd.com/taro/docs/README/index.html](https://links.jianshu.com/go?to=http%3A%2F%2Ftaro-docs.jd.com%2Ftaro%2Fdocs%2FREADME%2Findex.html)
 GitHub地址：[https://github.com/nervjs/taro 

### uni-app 基于 Vue.js 的跨平台框架
GitHub地址：[https://github.com/dcloudio/uni-app](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fdcloudio%2Funi-app)
官网文档：[https://uniapp.dcloud.io/](https://links.jianshu.com/go?to=https%3A%2F%2Funiapp.dcloud.io%2F)

### WeUI 小程序–使用教程
官网文档：[https://weui.io/](https://links.jianshu.com/go?to=https%3A%2F%2Fweui.io%2F)
GitHub地址：[https://github.com/Tencent/weui](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2FTencent%2Fweui)

### 美团小程序框架mpvue

GitHub地址：[https://github.com/Meituan-Dianping/mpvue](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2FMeituan-Dianping%2Fmpvue)
官网文档：[http://mpvue.com/](https://links.jianshu.com/go?to=http%3A%2F%2Fmpvue.com%2F)

### 组件化开发框架wepy
Github地址:[https://github.com/Tencent/wepy](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2FTencent%2Fwepy)
官网地址：[https://wepyjs.github.io/wepy-docs/](https://links.jianshu.com/go?to=https%3A%2F%2Fwepyjs.github.io%2Fwepy-docs%2F)

### ColorUI-高颜值,高效率的小程序组件库
官网文档：[https://www.color-ui.com/](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.color-ui.com%2F)
GitHub地址：[https://github.com/weilanwl/ColorUI/](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fweilanwl%2FColorUI%2F)

### 微信UI组件库 iView Weapp
官网文档：[https://weapp.iviewui.com/](https://links.jianshu.com/go?to=https%3A%2F%2Fweapp.iviewui.com%2F)
GitHub地址：[https://github.com/TalkingData/iview-weapp](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2FTalkingData%2Fiview-weapp)

### kbone 微信小程序和 Web 端同构的解决方案
官网文档：[https://developers.weixin.qq.com/miniprogram/dev/extended/kbone/](https://links.jianshu.com/go?to=https%3A%2F%2Fdevelopers.weixin.qq.com%2Fminiprogram%2Fdev%2Fextended%2Fkbone%2F)
GitHub地址：[https://github.com/Tencent/kbone](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2FTencent%2Fkbone)