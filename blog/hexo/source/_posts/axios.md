---
title: axios 封装 axios 模块
top: false
cover: false
toc: true
mathjax: true
date: 2021-02-25 13:49:55
password:
summary: 封装 axios 模块
tags: Axios
categories: Axios
---

[Axios基础部分笔记](https://savancode.github.io/2021/02/01/Vue-day7/)

## 封装原因

- 统一 url 配置
- 统一 api 请求 （因为会遇到不同域名 类似 开发域名，测试域名，生产域名）
- request (请求) 拦截器，例如：带上token等，设置请求头
- response (响应) 拦截器，例如：统一错误处理，页面重定向等
- 根据需要，结合 Vuex 做全局的 loading 动画，或者错误处理
- 将 axios 封装成 Vue 插件使用

## axios 封装的路线理解

### 整体思路

![](axios/image-20210309175305540.png)

### 细节走向

这里的细节其实就是将Axios里面的实现给分成了 两个拦截器（response & request）

![](axios/image-20210301194803937.png)

## 文件结构

```
-http
 -- config.js：axios 默认配置，包含基础路径等信息。
 -- axios.js：二次封装 axios 模块，包含拦截器等信息。
 -- interface.js ：请求接口汇总模块，聚合模块 API。
 -- index.js：将 axios 封装成插件，按插件方式引入。 
```

下面的例子是**Admin-ui的练习 不是完整的**

#### config.js

```js
export default {
  method: 'get',
  // 基础url前缀
  baseURL: 'http://localhost:8080/',
  // 请求头信息
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  // 参数
  data: {},
  // 设置超时时间 1s超时
  timeout: 10000,
  // 携带凭证
  withCredentials: true,
  // 返回数据类型
  responseType: 'json'
}
```

#### axios.js

这里添加了js -cookie 主要为了登陆页面

```js
import axios from 'axios';
import config from './config';
import qs from 'qs';
import Cookies from "js-cookie";
import router from '@/router'

// 使用vuex做全局loading时使用
// import store from '@/store'

export default function $axios(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: config.baseURL,
      headers: {},
      transformResponse: [function (data) {
      }]
    })

    // request 拦截器 
    //所有的网络请求都会先走这个方法
    instance.interceptors.request.use(
      config => {
        let token = Cookies.get('token')
        // 1. 请求开始的时候可以结合 vuex 开启全屏 loading 动画
        // console.log(store.state.loading)
        // console.log('准备发送请求...')
        // 2. 带上token
        if (token) {
          config.headers.accessToken = token
        } else {
          // 重定向到登录页面
          router.push('/login')
        }
        // 3. 根据请求方法，序列化传来的参数，根据后端需求是否序列化
        if (config.method === 'post') {
          if (config.data.__proto__ === FormData.prototype
            || config.url.endsWith('path')
            || config.url.endsWith('mark')
            || config.url.endsWith('patchs')
          ) {

          } else {
            config.data = qs.stringify(config.data)
          }
        }
        return config
      },

      error => {
        // 请求错误时
        console.log('request:', error)
        // 1. 判断请求超时
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
          console.log('timeout请求超时')
          // return service.request(originalRequest);// 再重复请求一次
        }
        // 2. 需要重定向到错误页面
        const errorInfo = error.response
        console.log(errorInfo)
        if (errorInfo) {
          error = errorInfo.data  // 页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
          const errorStatus = errorInfo.status; // 404 403 500 ...
          router.push({
            path: `/error/${errorStatus}`
          })
        }
        return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
      }
    )

    // response 拦截器
    // 所有的网络请求返回数据之后会执行这个方法
    instance.interceptors.response.use(
      response => {
        let data;
        // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
        if (response.data == undefined) {
          data = JSON.parse(response.request.responseText)
        } else {
          data = response.data
        }

        // 根据返回的code值来做不同的处理
        switch (data.rc) {
          case 1:
            console.log(data.desc)
            break;
          case 0:
            store.commit('changeState')
            // console.log('登录成功')
          default:
        }
        // 若不是正确的返回code，且已经登录，就抛出错误
        // const err = new Error(data.desc)
        // err.data = data
        // err.response = response
        // throw err

        return data
      },
      err => {
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.message = '请求错误'
              break
            case 401:
              err.message = '未授权，请登录'
              break
            case 403:
              err.message = '拒绝访问'
              break
            case 404:
              err.message = `请求地址出错: ${err.response.config.url}`
              break
            case 408:
              err.message = '请求超时'
              break
            case 500:
              err.message = '服务器内部错误'
              break
            case 501:
              err.message = '服务未实现'
              break
            case 502:
              err.message = '网关错误'
              break
            case 503:
              err.message = '服务不可用'
              break
            case 504:
              err.message = '网关超时'
              break
            case 505:
              err.message = 'HTTP版本不受支持'
              break
            default:
          }
        }
        console.error(err)
        return Promise.reject(err) // 返回接口返回的错误信息
      }
    )

    // 请求处理
    instance(options).then(res => {
      resolve(res)
      return false
    }).catch(error => {
      reject(error)
    })
  })
}
```

#### interface.js

```js
import axios from './axios'

/* 
 * 将所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 */

// 单独导出
export const login = () => {
    return axios({
        url: '/login',
        method: 'get'
    })
}

export const getUser = () => {
    return axios({
        url: '/user',
        method: 'get'
    })
}

export const getMenu = data => {
    return axios({
        url: '/menu',
        method: 'post',
        data
    })
}

// 默认全部导出
export default {
    login,
    getUser,
    getMenu
}
```

#### index.js

```js
// 导入所有接口
import apis from './interface'

const install = Vue => {
    if (install.installed)
        return;

    install.installed = true;

    Object.defineProperties(Vue.prototype, {
        // 注意，此处挂载在 Vue 原型的 $api 对象上
        $api: {
            get() {
                return apis
            }
        }
    })
}

export default install
```

## 原理实现 - 手写ajax请求函数

### 实现整体流程

1. 函数的参数为一个配置对象

   { url: '', // 请求地址 method: '', // 请求方式GET/POST/PUT/DELETE params: {}, // GET/DELETE请求的query参数 data: {}, // POST或DELETE请求的请求体参数 }

2. 返回值: 函数的返回值为promise, 成功的结果为response, 失败的结果为error

3. 能处理多种类型的请求: GET/POST/PUT/DELETE

4. 响应json数据自动解析为js的对象/数组

```js
/* 发送任意类型请求的函数 */
function axios({
  url,
  method='GET',
  params={},
  data={}
}) {
  // 返回一个promise对象
  return new Promise((resolve, reject) => {

    // 处理method(转大写)
    method = method.toUpperCase()
    
    // 处理query参数(拼接到url上)   id=1&xxx=abc
    /* { id: 1, xxx: 'abc'} */
    let queryString = ''
    Object.keys(params).forEach(key => {
      queryString += `${key}=${params[key]}&`
    })
    if (queryString) { // id=1&xxx=abc&
      // 去除最后的&
      queryString = queryString.substring(0, queryString.length-1)
      // 接到url
      url += '?' + queryString
    }


    // 1. 执行异步ajax请求
    // 创建xhr对象
    const request = new XMLHttpRequest()
    // 打开连接(初始化请求, 没有请求)
    request.open(method, url, true)
    
    // 发送请求
    if (method==='GET') {
      request.send()
    } else if (method==='POST' || method==='PUT' || method==='DELETE'){
      // 告诉服务器请求体的格式是json
      request.setRequestHeader('Content-Type', 'application/json;charset=utf-8') 
       // 发送json格式请求体参数
      request.send(JSON.stringify(data))
    }
    
    // 绑定状态改变的监听
    request.onreadystatechange = function () {
      // 如果请求没有完成, 直接结束
      if (request.readyState!==4) {
        return
      }
      // 如果响应状态码在[200, 300)之间代表成功, 否则失败
      const {status, statusText} = request
      // 2.1. 如果请求成功了, 调用resolve()
      if (status>=200 && status<=299) {
        // 准备结果数据对象response
        const response = {
          data: JSON.parse(request.response),
          status,
          statusText
        }
        resolve(response)
      } else { // 2.2. 如果请求失败了, 调用reject()
        reject(new Error('request error status is ' + status))
      }
    }
  })
}

/* 发送特定请求的静态方法 */
axios.get = function (url, options) {
  return axios(Object.assign(options, {url, method: 'GET'}))
}
axios.delete = function (url, options) {
  return axios(Object.assign(options, {url, method: 'DELETE'}))
}
axios.post = function (url, data, options) {
  return axios(Object.assign(options, {url, data, method: 'POST'}))
}
axios.put = function (url, data, options) {
  return axios(Object.assign(options, {url, data, method: 'PUT'}))
}

export default axios
```



## Reference

[Vue + Element UI 实现权限管理系统 前端篇（三）：工具模块封装](https://blog.csdn.net/xifengxiaoma/article/details/92839222?spm=1001.2014.3001.5501)