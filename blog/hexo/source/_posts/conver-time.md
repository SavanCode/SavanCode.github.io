---
title: conver time 时间转换
top: false
cover: false
toc: true
mathjax: true
date: 2021-01-27 23:57:49
password:
summary:
tags: js
categories: js
---

这个还是看自己写的练习文件，这个太一半了


```
// miniprogram/pages/song/song.js
import { request } from "../../utils/util";
import {formatDuring} from "../../utils/time"
// import moment from 'moment'; 这个真的麻烦 不弄了 直接写 
var appInstance = getApp();
Page({ 
  data: {
    currentWidth:30,
    playing:false,
    songContent:[],
    songUrl:'',
    durationTime:'00:00',
    currentTime:'03:00',
  }, 
  onLoad: function (options) { 
    let songId=options.songId; 
    this.getSongContent(songId);
    this.getSongUrl(songId);
  },
  getSongUrl: async function(id){
    let result= await request('/song/url',{id}) 
    this.setData({
      songUrl:result.data[0].url
    })
    console.log("setting url",this.data)
  }
  , 
  getSongContent: async function(id){
    let result= await request('/song/detail',{ids:id})
    console.log("song content",result.songs[0])
    let dt= result.songs[0].dt;
    let {minutes , seconds }=formatDuring(dt)
    //console.log(parseInt(minutes),parseInt(seconds)) 
    this.setData({
       songContent:result.songs[0],
       durationTime:parseInt(minutes)+":"+parseInt(seconds)
    }) 
    wx.setNavigationBarTitle({
      title: this.data.songContent.name+"   "+this.data.songContent.ar[0].name
    })
  },

  controlMusic:function(){
    this.setData({
      playing:!this.data.playing
    }) 
    this.playMusic()
  },
  playMusic(){
    console.log(this.data.songUrl)
    let backgroundAudioManager=wx.getBackgroundAudioManager()
    let {songUrl,songContent}= this.data
    if(this.data.playing){
      backgroundAudioManager.src = songUrl;
      backgroundAudioManager.title =  songContent.name;
    }else{
      backgroundAudioManager.pause();
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
```

## Reference 

https://blog.csdn.net/think_ma/article/details/78750379

https://blog.csdn.net/weixin_30652491/article/details/98254274?utm_medium=distribute.pc_relevant.none-task-blog-baidujs_title-10&spm=1001.2101.3001.4242