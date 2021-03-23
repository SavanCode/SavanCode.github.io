---
title: uniapp 实操总结
top: false
cover: false
toc: true
mathjax: true
date: 2021-03-22 19:07:36
password:
summary:  uniapp 实操总结
tags: uniapp 
categories: uniapp 
---

## 将view做成正圆形

uni本身已经有专门获取dom元素的API了，官方文档在此 [节点信息](https://uniapp.dcloud.io/api/ui/nodes-info?id=createselectorquery)。

```
<view class="photo-user" :style="{ height: photoStyleHeight }"></view>
```

```js
export default {
 data() {
  return {
   photoStyleHeight: ''
  };
 },
 onLoad() {

 },
onReady:function(){
  //返回一个SelectorQuery对象实例。可以在这个实例上使用select等方法选择节点，并使用boundingClientRect等方法选择需要查询的信息。
  const query = uni.createSelectorQuery();
  let that = this;
  /*
  select()方法：在当前页面下选择第一个匹配选择器selector的节点，返回一个节点对象实例，可以用于获取节点信息。
  boundingClientRect()方法：添加节点的布局位置的查询请求，返回参数为该节点的所有信息
  */
  query.select('.class').boundingClientRect(data=>{ //这里必须写成data=>，而不能写成function(data)
   console.log(data.width);
   that.photoStyleHeight=data.width+'px';
  }).exec();
 },
 methods: {

 }
};
```

## uni-app 子组件使用onLoad无效
1.uni-app 支持的页面生命周期函数是包含onLoad但是，在组件里面的时候不能使用页面生命周期函数，因此想要有onload的效果的时候，必须改成vue的mounted
2.uni-app的组件中可以直接使用Vue的生命周期函数对逻辑进行处理
3.或者组件的信息 变为props

## uniapp实现加载图片失败显示占位图

一、导入第三方插件 

二、利用 @error事件

```html
<img width='100%' :src="imgs" alt="picture" :onerror="errorImg">
data() {
    const nullImage = require('@/assets/images/error.png')
    return {
      errorImg: 'this.src="' + nullImage + '"'
    }
  }
```



注意：这里有点不好的就是一开始显示的都是空白的，只有图片加载成功或者失败后才会显示正常图片还是占位图 

三、使用两个image标签，一个image用来展示占位图、一个用来展示网络图。(但是呢 这里image不多的时候可以 多了就不好了哦)

四、使用背景图 但是图片大小要控制好

```js
background-image:url(../../static/picture.png);
//使用图片的最好是，本地图片使用背景图，万无一失，网络图片使用image src。 
```

五、尽量使用懒加载

```html
<image :src="require('../../static/picture')">   //使用v-bind + require
//第一种可以解决99%的问题，若有1%的没解决，可以使用background-image属性
```

## uni-app 点击预览图片

uni-app 点击小图，放大预览，保存到手机相册

```xml
<template>
<view class="main-wrap">
    <view class="img-wrap">
        <image :src="handleClick.imageUrl" @click="TanPreviewImage(handleClick.imageUrl)" mode=""></image>
    </view>
</view>     
</template>
```

```jsx
methods:{
    TanPreviewImage(imageUrl){ 
        console.log(imageUrl) // http://192.168.100.251:8970/6_1597822634094.png
        var images = [];
        images.push(imageUrl);
        console.log(images)  // ["http://192.168.100.251:8970/6_1597822634094.png"]
        uni.previewImage({ // 预览图片  图片路径必须是一个数组 => ["http://192.168.100.251:8970/6_1597822634094.png"]
            current:0,
            urls:images,
            longPressActions: {  //长按保存图片到相册
                itemList: ['保存图片'],
                success: (data)=> {
                    console.log(data);
                    uni.saveImageToPhotosAlbum({ //保存图片到相册
                        filePath: payUrl,
                        success: function () {
                            uni.showToast({icon:'success',title:'保存成功'})
                        },
                        fail: (err) => {
                            uni.showToast({icon:'none',title:'保存失败，请重新尝试'})
                        }
                    });
                },
                fail: (err)=> {
                    console.log(err.errMsg);
                }
        }
        });
    },
}
```

## 设置uniapp背景图（动态gif）

可以通过设置view的background或者background-image属性来实现：

1. 背景图不支持本地图片，请使用 base64 或网络资源。
2. 40k大小以内的图片作为背景图，uni会自动转换为base64编码的形式，如果大小超出限制，只能手动转换为base64编码，或者传到服务器上 ,站长工具在线工具转换如下：
在线转换链接
3. 大小没有超出限制的话，就按普通使用方式就好啦
```html
<template>
	<view class="content" :style="{background: 'url('+imageURL+')'}">
	<!-- background-image则写成：<view:style="{backgroundImage: 'url('+imageURL+')'}"> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageURL: '/static/1.png'
			};
		}
	}
</script>
```

## 设置背景图

```css
image{
	background-image: url(../../static/error_img.png);
	background-size: cover;
}
```

或者

```html
<view class="background":style="{backgroundImage:`url(${ImgBdg})`,backgroundSize: 'cover',}">
```

## 返回html文本

```html
<rich-text :nodes="content"></rich-text>
```

这里从content必须是string类型

这里 如果直接拿到的content内容样式需要改变,可以直接找到对应的class,进行改变(!!!! 但是这里要从全局进行改变!!!!!!!!!!)

**在app.vue这里可以直接放公用的css**

## swiper 设置

```css
swiper{
    width: 100%;
    height: 350rpx;
    image{
        width: 100%;
        height: 100%;
    }
}
```

## Vue.js Uniapp 获取屏幕的高度宽度

## [uni.getSystemInfo(OBJECT)](https://uniapp.dcloud.io/api/system/info?id=getsysteminfo)

获取系统信息：

- screenWidth 屏幕宽度
- screenHeight 屏幕高度
- windowWidth 可使用窗口宽度
- windowHeight 可使用窗口高度
- windowTop 可使用窗口的顶部位置 App、H5
- windowBottom 可使用窗口的底部位置 App、H5
- statusBarHeight 状态栏的高

```js
uni.getSystemInfo({
    success: function (res) {
        console.log(res.model);
        console.log(res.pixelRatio);
        console.log(res.windowWidth);
        console.log(res.windowHeight);
        console.log(res.language);
        console.log(res.version);
        console.log(res.platform);
    }
});
```

## 示例

设置弹框宽度为屏幕的80%

```jsx
<view class="set-plan-block" :style="{ 'width': setWidth + 'px' }">

export default {
  data () {
    return {
      setWidth: 0
    }
  mounted () {
    this.$refs.setPlan.open()

    // 注意，这里要用个变量存this，不然进到getSystemInfo后this指向会变化，找不到data变量
    var _this = this
    uni.getSystemInfo({
      success: function (res) {
        _this.setWidth = res.windowWidth * 0.8
      }
    })
  },
```

> 注意：计算表达式不能用 80%（会报错），要用0.8
> 错：300 *80%
> 对： 300* 0.8

## uniapp Popup弹框使用

[uniapp](https://uniapp.dcloud.io/component/README?id=uniui)的官网会把组件地址指向这里https://ext.dcloud.net.cn/plugin?id=329。 但这个文档有问题。

以github为准：https://github.com/dcloudio/uni-ui。但github也会跳转回那个网站，死循环。我记录一下正确过程。

## 安装

```
npm install @dcloudio/uni-ui  --save
```

## import

文档写的`import uniPopup from "@/components/uni-popup/uni-popup.vue"` 是错的

在这里找到相应的路径

```
import uniPopup from '@dcloudio/uni-ui/lib/uni-popup/uni-popup'
```

简便写法，但是会引入更多东西：

```
import {uniPopup} from '@dcloudio/uni-ui'
```

可以配置[Tree shaking](https://en.wikipedia.org/wiki/Tree_shaking)，在打包的时候消除无用代码(dead code)的方式
[配置Tree Shaking来减少JavaScript的打包体积](https://www.cnblogs.com/fundebug/archive/2018/08/15/reduce_js_payload_with_tree_shaking.html)

## 使用

通过ref来调用弹框显示、隐藏 `this.$refs.popupHi.open()`

```
<button @click="openHi">打开弹窗</button>
<uni-popup ref="popupHi" type="bottom">底部弹出 Popup</uni-popup>

   methods:{
      openHi(){
         this.$refs.popupHi.open()
      }
   }
```

文档上显示的效果是弹框有白色背景，实际是没有的默认的，要自己写

```
 <uni-popup class="finish-popup" ref="finish" type="center">
    <view class="popup-box">
      <uni-icons type="checkmarkempty" size="60"></uni-icons>
      <view class="txt">恭喜完成阅读</view>
    </view>
  </uni-popup>

.popup-box {
  text-align: center;
  background-color: #fff;
  padding: 30rpx;
  border-radius: 10rpx;
  font-size: 28rpx;
}
```

默认是点击随意一处后关闭弹框。可以用定时器来自动关闭：

```
openHi(){
     setTimeout(() => {
       this.$refs.finish.close()
     }, 2000)
     this.$refs.popupHi.open()
}
```