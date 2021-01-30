---
title: Wechat-mini-prog-05 云开发 - 文件储存
top: false
cover: false
toc: true
mathjax: true
date: 2021-01-21 12:55:32
password:
summary:
tags: WechatMini Program
categories: WechatMini Program
---

## 云开发存储

开发者可以在小程序端和云函数端通过 API 使用云存储功能。
在小程序端可以分别调用 `wx.cloud.uploadFile` 和 `wx.cloud.downloadFile` 完成上传和下载云文件操作

## 选择并上传图片

### 可以使用的API

1. [wx.chooseImage](https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.chooseImage.html)
2. [wx.cloud.uploadFile](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-sdk-api/storage/uploadFile/client.uploadFile.html)

###  新page`uploadImg`

### `uploadImg.wxml`

```html
<button bindtap="handleTap">chooseImage上传</button>
<image src="{{URL}}"></image>

<button bindtap="selectAndUpload">uploadFile上传</button>
<image src="{{URL}}"></image> 
```

### `uploadImg.js`
```js
// pages/uploadImg/uploadImg.js 

//方式一： 传照片
// Page({
//   data:{
//     URL:''
//   }, 
//   handleTap:function() {
//     let that = this
//     console.log("点击了上传按钮")
//     wx.chooseImage({
//       count: 1,
//       sizeType: ['original', 'compressed'],
//       sourceType: ['album', 'camera'],
//       success(res) {
//         console.log("选择成功", res)
//         that.upload(res.tempFilePaths[0])
//       }
//     }) 
//   },

//   upload(imgUrl) {
//     wx.cloud.uploadFile({
//       cloudPath: new Date().getTime() +'.png',    //防止文件名重复，使用时间戳
//       filePath: imgUrl, // 文件路径
//       success: res => {
//         // get resource ID
//         console.log("上传成功",res)
//         this.setData({
//           URL: res.fileID
//         })
//       },
//       fail: err => {
//         // handle error
//       }
//     })
//   }
// })
 
//方式二： 上传文件
Page({
  data: {
    imgURL:''
  },
  selectAndUpload:function() {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        console.log('choose successfully',res)
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + '.png',
          filePath: res.tempFilePaths[0], // 文件路径
          success: function (res) {
            console.log('upload successfully', res)
            that.setData({
              imgURL: res.fileID
            })
          },
          fail(res) {
            console.log('upload failed', res)
          }
        })
      },
      fail(res) {
        console.log('choose failed', res)
      }
    })
  },
}) 
```

## 选择并上传视频

### 可以使用的API

1. [wx.chooseMedia](https://developers.weixin.qq.com/miniprogram/dev/api/media/video/wx.chooseMedia.html)
2. [wx.cloud.uploadFile](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-sdk-api/storage/uploadFile/client.uploadFile.html)

### 新page `uploadVideo`

### `uploadVideo.wxml`

```html
<!--pages/uploadVideo/uploadVideo.wxml-->
<!-- 上传预览 -->
<view class='preview-warp' wx:if="{{urls}}">
  <image  src='{{urls}}' />
</view>
<view class="prew_video" hidden="{{chooesVideo==''}}">
  <video bindfullscreenchange="bindVideoScreenChange" src="{{chooesVideo}}" ></video>
</view>

<!-- 上传按钮 -->
<view class='upimg' bindtap='chooseImg'>上传图片</view>
<view class='upvideo' bindtap='chooseVideo'>上传视频</view>
<view class='upimg' bindtap='uploadImg'>确定上传图片（还没绑定）</view>
<view class='upvideo' bindtap='uploadVideo'>确定上传视频</view>

<text>
  上传图片 - 可以上传多个 但是没有分为两个图片
  上传视频 - 分成了两步骤 但是注意加一个loading time 因为上传有时会有卡顿，不然重复点击，会上传多个
</text>
```

### `uploadVideo.js`

```js
//pages/uploadVideo/uploadVideo.js 
var app = getApp()
var count = 0;
Page({
  data: {
    chooesVideo:'', 
    tipHide: false,
    chooseTypeHide: true,
  }, 
  /*生命周期函数--监听页面加载*/
  onLoad: function (options) {
    console.log(options.status)
  },
  /*生命周期函数--监听页面初次渲染完成*/
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('prew_video');
  },
  /*上传图片*/
  chooseImg:function() {
    let that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        var tempFilePaths = res.tempFilePaths
        that.data.images = tempFilePaths
        // 多图片
        // that.data.urls = that.data.urls.concat(tempFilePaths)
        // 单图片
        that.data.urls = tempFilePaths[0]
        that.setData({
          images: tempFilePaths[0],
          urls: that.data.urls
        })
      }
    })
  },
  /*上传视频*/
  chooseVideo:function(){
    let that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: function (res) {
        that.setData({
          chooesVideo: res.tempFilePath
        })
        console.log("选择上传",that.data.chooesVideo) 
      } 
    })
  },
  uploadVideo:function(){ 
    let that=this;
    console.log("准备上传",that.data.chooesVideo)
    let temUrl= that.data.chooesVideo
    wx.cloud.uploadFile({
      cloudPath: new Date().getTime() +'.mp4',    //防止文件名重复，使用时间戳
      filePath: temUrl, // 文件路径
      success: res => {
        // get resource ID
        console.log("上传成功",res) 
        that.setData({
          chooesVideo: ''
        })
      },
      fail: err => {
        // handle error
        console.log("上传失败",res)
      }
    })
  },

  /* 全屏改变 */
  bindVideoScreenChange: function (e) {
    var status = e.detail.fullScreen;
    var play = {
      playVideo: false
    }
    if (status) {
      play.playVideo = true;
    } else {
      this.videoContext.pause();
    }
    this.setData(play);
  } 
})
```

# Reference

[视频上传参考](https://www.cnblogs.com/zxf100/p/9924133.html)