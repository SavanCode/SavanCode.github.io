---
title: Wechat-mini-prog-04 云数据库
top: false
cover: false
toc: true
mathjax: true
date: 2021-01-20 19:38:59
password:
summary:
tags: WechatMini Program
categories: WechatMini Program
---

## 全局认识

小程序云开发目前提供三大基础能力支持：

- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码
- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理

![](Wechat-mini-prog-04/image-20210120215836620.png)

## 云开发+数据库

### 初始化准备

1. 在创建项目时，填入APPID并选择不使用云函数
2. 进入到开发者页面，点击左上角的云开发并选择开通
3. 设置云开发环境名称，可以任意填写
4. 在`project.config.json`中加入字段`"cloudfunctionRoot":"cloud"`
5. 在打开的云开发控制台中点击设置，新建一个环境ID
6. `app.js`中删除所有代码，只保留`env`即环境ID

```js
App({
  onLaunch: function () {
    //云开发环境初始化
    wx.cloud.init({
      env:"cloud-learning-i44qm"//个人黄静名称
    })
  }
})
```

```json
//project.config.json
"cloudfunctionRoot": "cloud/"
```

### 云数据库的基本操作(查 增 删 )

本身在创建项目的时候，已经有一些提供的例子，可以操作看看

```html

	<input placeholder="输入名字" bindinput="addName"></input>
	<text>\n</text>
	<input placeholder="输入年龄" bindinput="addAge"></input>
	<text>\n</text>

	<button bindtap="addData">新增数据</button>
	<button bindtap="getData">查询数据</button>

	<input placeholder="要删除数据的ID" bindinput="delDataInput"></input>
	<text>\n</text>
	<button bindtap="delData" type="primary">删除数据</button>

	<input placeholder="输入要删除数据的name的属性的值" bindinput="delDataInputName"></input>
	<text>\n</text>
	<button bindtap="delDataByProperty" type="primary">通过name属性的内容删除</button>

	<input placeholder="输入要更新的数据的ID" bindinput="updateID"></input>
	<input placeholder="输入更新后的name的值" bindinput="updateValue"></input>
	<button bindtap="updateData" type="primary">修改更新数据</button>
```

```js
const app = getApp()
const DB = wx.cloud.database().collection("testlist")
let name='';
let age='';
let id = '';
let nameDelete = ''
let updateID = ''
let updateValue = ''

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },
  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  addName(event){
      //console.log(event.detail.value)
      name = event.detail.value
    },

  addAge(event){
    //console.log(event.detail.value)
    age = event.detail.value
  },

  addData() {
    console.log('调用添加数据的方法')
    DB.add({
      data: {
        name: name,
        age: age
      },
      success(res) {
        console.log("添加数据成功", res)
      },
      fail(res) {
        console.log("添加数据失败", res)
      }
    })
  },

  getData() {
    console.log('调用查询数据的方法')
    DB.get({
      success(res){
        console.log('查询数据成功',res)
      }
    })
  },
  delDataInput(event){
    //console.log(event.detail.value)
    id = event.detail.value
  },

  delData() {
    console.log('调用删除数据的方法')
    DB.doc(id).remove({
      success(res) {
        console.log('删除数据成功', res.data)
      }
    })
  },
  delDataInputName(event){
    //console.log(event.detail.value)
    nameDelete = event.detail.value
  },
  
  delDataByProperty() {
    console.log('调用属性删除数据的方法')
    DB.where({
      name: nameDelete
    }).remove({
      success(res) {
        console.log('删除数据成功', res.data)
      },
      fail(res) {
        console.log("删除数据失败", res)
      }
    })
  },
  updateID(event) {
    console.log(event.detail.value)
    updateID = event.detail.value
  },

  updateValue(event) {
    console.log(event.detail.value)
    updateValue = event.detail.value
  },
  
  updateData() {
    console.log('调用修改更新数据的方法')
    DB.doc(updateID).update({
      data: {
        name: updateValue
      },
      success(res) {
        console.log('修改更新数据成功', res.data)
      },
      fail(res) {
        console.log("修改更新数据失败", res)
      }
    })
  },
})
```



## 使用云函数操作数据库 - 不用云服务





# Reference

云开发学习视频：https://www.bilibili.com/video/BV1pE411C7Ca?from=search&seid=14303234966957086491

