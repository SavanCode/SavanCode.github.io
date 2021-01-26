---
title: Wechat-mini-prog-10 视频播放列表
top: false
cover: false
toc: true
mathjax: true
date: 2021-01-26 17:43:27
password:
summary:
tags: WechatMini Program
categories: WechatMini Program
---

## video 复用 - music小程序

##  video列表，实现同一时间只能播放一个视频

```js
// video列表，实现同一时间只能播放一个视频
  playVideo(e) {
    var curIdx = e.currentTarget.id;
    // 没有播放时播放视频
    // console.log(curIdx)
    if (!this.data.indexCurrent) {
      this.setData({
        indexCurrent: curIdx
      })
      var videoContext = wx.createVideoContext(curIdx, this) //这里对应的视频id
      videoContext.play()
    } else { // 有播放时先将prev暂停，再播放当前点击的current
      var videoContextPrev = wx.createVideoContext(this.data.indexCurrent)//this是在自定义组件下，当前组件实例的this，以操作组件内 video 组件（在自定义组件中药加上this，如果是普通页面即不需要加）
      if (this.data.indexCurrent != curIdx) {
        console.log(123)
        videoContextPrev.pause()
        this.setData({
          indexCurrent: curIdx
        })
        var videoContextCurrent = wx.createVideoContext(curIdx, this)
        videoContextCurrent.play()
      }
    } 
  },
```

## poster 属性 先显示第一帧

## 性能优化部分 

用img先替代视频，点击img之后切换到video，加载不会显示

```html
<!--自己要用的要改数据(⊙o⊙)
object-fit="fill" - 黑框边消除
-->
<video
			 wx:if="{{item.data.vid===choseVideo}}"
			 poster="{{item.data.coverUrl}}"
			 class="myVideo"
			 custom-cache="{{false}}"
			 bindplay="playVideo"
			 show-center-play-btn="{{true}}"
			 id="{{item.data.vid}}"
			 src="{{item.data.urlInfo.url}}"
			 enable-danmu
			 danmu-btn
			 controls
			></video>
			<image
			 wx:else
			 class="videoPoster"
			 id="{{item.data.vid}}"
			 bindtap="playVideoImg"
			 src="{{item.data.coverUrl}}"
			 alt=""
			/>
```

```js
//灵活应用this，在下一个视频数据没进来之前，他指向的都是前一个视频数据
 playVideoImg: function(e){ 
    let vid=e.target.id
    this.setData({
      choseVideo:vid
    }) 
        // 创建控制video标签的实例对象
        this.videoContext = wx.createVideoContext(vid);
        this.videoContext.play();
  },
```

## 视频继续自动播放

```html
      <video
          src="{{item.data.urlInfo.url}}"
          bindplay="handlePlay"
          id="{{item.data.vid}}"
          bindtimeupdate="handleTimeUpdate"
          bindended="handleEnded"
      ></video>
```

```js
  data: { 
    videoId: '', // 视频id标识
    videoUpdateTime: [], // 记录video播放的时长
  }, 
// 监听视频播放进度的回调
  handleTimeUpdate(event){
    let videoTimeObj = {vid: event.currentTarget.id, currentTime: event.detail.currentTime};
    let {videoUpdateTime} = this.data;
    /*
    * 思路： 判断记录播放时长的videoUpdateTime数组中是否有当前视频的播放记录
    *   1. 如果有，在原有的播放记录中修改播放时间为当前的播放时间
    *   2. 如果没有，需要在数组中添加当前视频的播放对象
    *
    * */
    let videoItem = videoUpdateTime.find(item => item.vid === videoTimeObj.vid);
    if(videoItem){ // 之前有
      videoItem.currentTime = event.detail.currentTime;
    }else { // 之前没有
      videoUpdateTime.push(videoTimeObj);
    }
    // 更新videoUpdateTime的状态
    this.setData({
      videoUpdateTime
    })
  },
  // 视频播放结束调用的回调
  handleEnded(event){
    // 移除记录播放时长数组中当前视频的对象
    let {videoUpdateTime} = this.data;
    videoUpdateTime.splice(videoUpdateTime.findIndex(item => item.vid === event.currentTarget.id), 1);
    this.setData({
      videoUpdateTime
    })
  }, 
   playVideoImg: function(e){ 
    let vid=e.target.id
    this.setData({
      choseVideo:vid
    }) 
        // 创建控制video标签的实例对象
        this.videoContext = wx.createVideoContext(vid);
        // 判断当前的视频之前是否播放过，是否有播放记录, 如果有，跳转至指定的播放位置
         let {videoUpdateTime} = this.data;
         let videoItem = videoUpdateTime.find(item => item.vid === vid);
         if(videoItem){
           this.videoContext.seek(videoItem.currentTime);
         }
        this.videoContext.play();
  },
```

## scroll-view 下拉刷新

```html
<scroll-view  
 bindrefresherrefresh="handleRefresher"
 refresher-triggered="{{isRefresh}}" 
>
</scroll-view>
```

```js
  handleRefresher:function(){ 
      //console.log('scroll-view 下拉刷新');
      // 再次发请求，获取最新的视频列表数据
      this.getContentNav(this.data.choseNav);
      //这里停止刷新
      this.setData({ 
        isRefresh:false
      })  
  },
```

## 触底刷新数据 - scrolltolower

```html
<scroll-view   
 bindscrolltolower="scrolltolower"
>
</scroll-view>
```

```js
scrolltolower: async function(){
    //先用http://localhost:3000/video/group?id=9104
    //因为网易云api没有分页
    let result= await request('/video/group',{id:9104});
    console.log(result.datas)
    if(result.datas.length===0){
      wx.showToast({
        title: '没有更多类似视频~',
        icon: 'none'
      })  
    }else{  
      let videoList=this.data.videoList
      let newVideoList=result.datas
      videoList.push(...newVideoList)
      this.setData({
        videoList:videoList
      })  
    } 
  },
```

## Page本身下拉刷新

```json
//页面或者全局
"enablePullDownRefresh": true
```

