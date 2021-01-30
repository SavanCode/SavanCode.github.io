---
title: api_multiRequest 封装请求函数 
top: false
cover: false
toc: true
mathjax: true
date: 2021-01-24 21:14:49
password:
summary: api_multiRequest 封装请求函数 
tags: WechatMini Program
categories: WechatMini Program
---

> 看Json数据 pretty 网站 https://jsonformatter.org/
>

## 封装请求函数

这里主要是讲面对对于同个接口多个请求的时候，该怎么办

一般做法
一个url 我们就会请求一次数据
但是实际上面对一个页面很多内容的时候，这样是非常不利的，所以做法就是要封装请求函数

小程序为例 （网易云音乐的仿写- musicMiniPro）

```js
//config.js - 服务器的接口
export default {
    // host:'https://musicapi.leanapp.cn/' //这个接口真的我不想弄那个502的问题所以
    host:'http://localhost/3000'
}
```

```js
//util.js - 请求的处理函数
import config from './config';
const request = (url, data={},method='GET') => { 
  let _url = API_BASE_URL  + url;
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host+url,
      method,
      data: data, 
      success(res) {
        console.log("success",res)
        resolve(res.data) 
      },
      fail(err) {
        console.log("fail",res)
        reject(err)
      }
    })
  });
} 
//注意这里其实是异步的，所以如果考虑一般的提取数据方式是不行的，还是要用promise
module.exports = {
  request
}
```

```js
//page.js 发出请求函数
  onLoad: async function (options) {
      let result= await request('/banner',{type:2});
      console.log("结果",result.banners)
      this.setData({
        bannerList:result.banners
      })
  }
//当考虑封装请求函数，一定就要处理异步的问题，一定就会用到async & await
```

```html
<!-- 最后显示 -->
<swiper
 indicator-dots="true"
 autoplay="true"
 interval="2000"
>
	<swiper-item
	 wx:for="{{bannerList}}"
	 wx:key="index"
	 wx:for-index="index"
	>
		<image src="{{item.pic}}"></image>
	</swiper-item>
</swiper>
```

![](api-multiRequest/image-20210124224454356.png)

## 网易云的api请求

官网 ： https://binaryify.github.io/NeteaseCloudMusicApi/#/

git clone ----> npm install —> node app.js的方式运行调试

当运行起来会看到 运行在端口3000

比如上面的例子

![](api-multiRequest/image-20210124223220969.png)

## 一次请求多条数据 - 一个array

例子：

比如我现在要请求下面这个的数据中的tracks以及 name

![](api-multiRequest/image-20210125142130291.png)

实际上就是网易云本地跑起来 （http://localhost:3000/top/list?idx=6） 网上接口没法放上来 😵

请求处

```js
      //musicRankList 这里我们需要请求5次
      let index=0;
      let result=[];
      while(index<5){ 
        let musicRank= await request('/top/list',{idx:index++});
        let topListItem={name:musicRank.playlist.name,tracks:musicRank.playlist.tracks.slice(0,3)}
        result.push(topListItem);
        this.setData({
          topList:result
        })}
        console.log("result",result)
```

![](api-multiRequest/image-20210125142521644.png)

请求结果就出来啦

> 这里实际上，如果要提升用户体验，就要读取的时候就渲染，不用等到最后完全渠道之后再更新

## 请求cookie 保存cookie

```js
//request页面的时候
import config from './config'
export default  (url, data={}, method='GET') => {
  return new Promise((resolve, reject) => {
    // 1. new Promise初始化promise实例的状态为pending
    wx.request({
      url: config.host + url,
      data,
      method,
      header: {
        cookie: wx.getStorageSync('cookies')?wx.getStorageSync('cookies').find(item => item.indexOf('MUSIC_U') !== -1):''
      },
      success: (res) => {
        // console.log('请求成功: ', res);
        if(data.isLogin){// 登录请求
          // 将用户的cookie存入至本地
          wx.setStorage({
            key: 'cookies',
            data: res.cookies
          })
        }
        resolve(res.data); // resolve修改promise的状态为成功状态resolved
      },
      fail: (err) => {
        // console.log('请求失败: ', err);
        reject(err); // reject修改promise的状态为失败状态 rejected
      }
    })
  })
  
}
```

> 这里一定要注意这里的`indexOf('MUSIC_U')`, 只是为了找到有效的标识符

```
//注意 这次
```

