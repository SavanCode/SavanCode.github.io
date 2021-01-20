---
title: Wechat-mini-prog-03 网络请求
top: false
cover: false
toc: true
mathjax: true
date: 2021-01-13 14:55:03
password:
summary:
tags: WechatMini Program
categories: WechatMini Program
---



## [网络](https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html)

### 请求数据数据

```js
 //index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    newsdata: ''
  },

  loadData: function () {
    var that = this;//以防指向丢失
    wx.request({
      url: 'http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=top&count=10', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json'
      }, 
    success: function(res) {
            wx.hideToast();
            if (res.data.LoginStatus == 1) {
                //进行一些用户状态的存储
                console.log(res.data);
                that.setData({
                  newsdata: res.data
                });
            } else {
                wx.showModal({
        title: '登录失败', 
        content: '请检查您填写的用户信息！', 
        showCancel: false, 
        success: function(res) {
                        //回调函数
                    }});
            }
        }
    })
  }
})
```

```html
<!--index.wxml-->
<view class="container">
  <view>
    <button type="primary" bindtap="loadData">点击按钮加载数据</button>

    <view wx:for="{{newsdata}}">
      <image sytle="width:300px;height:200px;" src="{{item.thumbnail_pic_s}}"></image>
      [{{item.realtype}}]{{item.title}}
    </view>

  </view>
</view>
```

## image

 第一种：加载本地图片，只要是路径没问题就会正常显示

```html
<image src="../images/1.jpg" mode="aspectFill">   
</image> 
```

第二种呢就是通过js加载传输或者利用wxss样式修改背景图片

wxml模板代码

```html
<image src="{{imageUrl}}" mode="aspectFill">   
</image>  
```

js代码

```html
data:{  
	imageUrl:"https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg"   
}, 
```

或者直接在src属性上写网络图片地址

```html
<image class="image_frame" src="https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg" mode="aspectFill">   
</image>  
```

如果在wxss样式中用到背景图片就必须用网络图片了，使用本地图片地址会报错的

```css
.main {
  background-image: url(https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg);
}
```

有些格式没写错 但是图片加载不了 可能原因

1. 云梯
2. 链接失效
3. [官方承认的问题](https://developers.weixin.qq.com/community/develop/doc/000ace6189c0c03bc719a781856009) 

## 页面跳转

页面两种跳转方式 navigator 和 wxAPI

### navigator

#### redurect

```html
<navigator url="/pages/about/about" open-type="redirect">跳到关于页面(redirect)</navigator>
```

关闭当前页面, 跳到关于页面, 不允许跳转到tabbar页面, 不能反回, 安卓手机反回直接退出小程序

#### switchTab

switchTab：跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。（需要在tabBar中定义的）

```html
<navigator url="/pages/detail/detail" open-type="switchTab">跳到详情页面(switchTab)</navigator>
```

app.json:

```json
//读取数据之后 跳转
wx.switchTab({
        url:'../../pages/index/index',
        success:function(){
            console.log("called switchtab.");
        }
    });
```

#### reLaunch

关闭所有的页面，打开应用中某个页面。（直接展示某个页面，并且可以跳转到tabBar页面） 效果与redirect类似

#### navigateBack

关闭当前页面，返回上一页面或多级页面。可通过 `getCurrentPages` 获取当前的页面栈，决定需要返回几层。 当使用`redirect`和`reLaunch`关闭页面时,  `getCurrentPages`无效

open-type：navigateBack（表示该navigator组件用于返回）

delta：返回的层级（指定返回的层级，open-type必须是navigateBack才生效）

about.wxml

```html
<navigator open-type="navigateBack" delta="2">跳到关于页面</navigator>
```



### wxAPI

- wx.navigateTo
- wx.switchTab
- wx.reLaunch
- wx.redirectTo
- wx.navigateBack

**例子 - navigateTo**

home.wxml

```
<button bind:tap="handlePushAbout">wxAPI跳转</button>
```

home.js

```
handlePushAbout(){
    wx.navigateTo({
      url: '/pages/about/about?key=value',
    })
  }
```

**例子 -  navigateBack**

about.wxml

```
<button bind:tap="backHome">返回主页</button>
```

about.js

```
backHome(){
    wx.navigateBack({
      delta: '1'  // 返回的页面数，如果 delta 大于现有页面数，则返回到首页。
    })
  }
```





## 页面跳转数据传输

### 数据传递-传递方式分析

如果在界面跳转过程中我们需要相互传递一些数据，应该如何完成呢？

- 首页 -> 详情页：使用URL中的query字段
- 详情页 -> 首页：在详情页内部拿到首页的页面对象，直接修改数据



![img](https://user-gold-cdn.xitu.io/2019/10/10/16db4c2525383a5c?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



### 数据传递过程

#### home页面传递数据给其他待跳转页面

home.wxml

```
<navigator url="/pages/about/about?key=hello"><button>跳到关于页面</button></navigator>
```

url参数后面的查询字符串会被子页面直接接收

about.js

```
onLoad:function(options){
    console.log(options)
  }
```

控制台会打印出: `{key: "hello"}`

#### 子页面传递数据给home页面

如果是监听按钮或者navigator的点击来返回时, 可以通过bindtap调用函数完成.

但是这种方式不能监听左上角返回按钮的点击.所以我们选择在onUnload中修改数据

小程序并没有提供直接修改数据的方法.

可以通过getCurrentPages来获取所有的页面, 然后使用页面对象的setData({})函数来修改

about页面退出时, home页面message数据会被改变 home.js

```
data:{
    message: '本身内容'
}
```

about.js

```js
  // 页面退出时调用
  onUnload: function(){
    let pages = getCurrentPages()   // 获取当前所有的页面
    let home = pages[pages.length - 2]  
    home.setData({
      message: '退出内容'
    })
  }
```

## [地图](https://developers.weixin.qq.com/miniprogram/dev/component/map.html)

基本用法

```html
<map id="map" longitude="113.324520" latitude="23.099994" scale="14" controls="{{controls}}" 
     bindcontroltap="controltap" markers="{{markers}}" 
     bindmarkertap="markertap" polyline="{{polyline}}" bindregionchange="regionchange" 
     show-location style="width: 100%; height: 300px;"></map>
```

```
markers: [{
      iconPath: "/resources/others.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
```

[map其他使用](https://www.jianshu.com/p/5b2f95a16fce)

## 开放接口 - login

### 了解小程序登录流程时序

![](Wechat-mini-prog-03/api-login.jpg)

> #### 说明：
>
> 1. 调用 [wx.login()](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/wx.login.html) 获取 **临时登录凭证code** ，并回传到开发者服务器。
> 2. 调用 [auth.code2Session](https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html) 接口，换取 **用户唯一标识 OpenID** 和 **会话密钥 session_key**。
>
> 之后开发者服务器可以根据用户标识来生成自定义登录态，用于后续业务逻辑中前后端交互时识别用户身份。
>
> **注意：**
>
> 1. 会话密钥 `session_key` 是对用户数据进行 [加密签名](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/signature.html) 的密钥。为了应用自身的数据安全，开发者服务器**不应该把会话密钥下发到小程序，也不应该对外提供这个密钥**。
> 2. 临时登录凭证 code 只能使用一次

<img src="Wechat-mini-prog-03/image-20210115170352058.png" style="zoom: 67%;" />

<img src="Wechat-mini-prog-03/image-20210115170257245.png" style="zoom: 67%;" />



### 微信小程序wx.getUserInfo授权获取用户信息（头像、昵称）- file: newteo

https://segmentfault.com/a/1190000023682165

### 利用opendata 获取用户info

```html
<view class="userinfo">  
      <view class="userinfo-avatar">
        <open-data type="userAvatarUrl"></open-data>
      </view>
       <open-data type="userNickName"></open-data>
</view>
```

```css
//style
.userinfo {  
  position: relative;  
  width: 750rpx;  
  height: 320rpx;  
  color: #999999;  
  display: flex;  
  flex-direction: column;  
  align-items: center;  
}  
  
.userinfo-avatar {  
  overflow:hidden;  
  display: block;  
  width: 160rpx;  
  height: 160rpx;  
  margin: 20rpx;  
  margin-top: 50rpx;  
  border-radius: 50%;  
  border: 2px solid #fff;  
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);  
}
```



### 微信用户登录openid 获取

思维流程：小程序前台请求后台-> 后台请求微信服务器-> 微信服务器返回后台 -> 后台返回小程序前台

https://developers.weixin.qq.com/community/develop/doc/0004e229464d78c1d557ed5e359404

这里需要 appid 跟 secret

## 页面刷新

```
 onPullDownRefresh:function()
  {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    
    //模拟加载
    setTimeout(function()
    {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    },1500);
  },
```



## 推荐仿练习
https://github.com/justjavac/awesome-wechat-weapp

## Reference

[页面跳转- 小程序](https://juejin.cn/post/6844903960596185102#heading-13)

[小程序登录流程官方解释](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html)