---
title: webpack 重新学习
top: false
cover: false
toc: true
mathjax: true
date: 2021-04-29 14:06:14
password:
summary:  webpack 重新学习
tags: webpack
categories: webpack
---
# webpack的基础动手了解

## 通过基本操作了解webpack

个人觉得 这个小哥讲的很清晰 [参考Creating and Understanding a Basic Webpack 5 Setup](https://www.youtube.com/watch?v=X1nxTjVDYdQ)

### part1 - 初步架构

创建文件中带有index.js index.html

通过`npm init -y`，文件夹会自动生成package.json

![](webpack-note/image-20210604230937943.png)

 ### part2- 尝试引用module变量

这里我们如果创建新的变量在一个js文件，并且在index.js引用时，会报错哦~

此时文件夹目录

![dir structure](webpack-note/image-20210604231919703.png)

![](webpack-note/image-20210604232346519.png)

![](webpack-note/image-20210604232408953.png)

> 这里需要了解一下模块化的内容，建议阅读【professional js中模块化章节】。
>
> 那么如果这里按照原先的模块化，那么就需要给他进行额外配置。
>
> 所以这时候，webpack就登场了

### part3 - using webpack to bundle js files

通过`npm i -D webpack webpack-cli`安装webpack，这里node module文件就有啦

然后实际上，要真的做的，就只是设置正确的文件路径

所以我们创建 src文件夹

![](webpack-note\image-20210605001400345.png)

然后运行`npx webpack`

![](webpack-note/image-20210605001532286.png)

此时就会创建webpack的执行之后的结果在dist文件中

![](webpack-note/image-20210605001705455.png)

这时候我们可以看到main.js 实际上已经将**code集合过来**，直接弄出结果

此时 我们再改变一下index.html的引用，那么我们就可以得到网页版的运行结果

![](webpack-note/image-20210605002600990.png)

**看这里的结果，是不是都来自于main.js 对不对！！ 理解了吧~~ **

 ### part4 example fo minimal output under the hood

这里我们主要是做一个测试（如果我们是否方程呢，那么main.js还是很简单的直接显示结果吗？）

这里我们创建getClasses文件，将其他的两个文件内容放进来。

然后我们对于package.json设置build（主要是为了省事~）

![](webpack-note/image-20210605004918760.png)

然后 main.js其实实际还是一样的哦~

![](webpack-note/image-20210605005136651.png)

### part5 Babel transpilling through webpack config file

首先要安装基本的loader `npm i @babel/core @babel/preset-env babel-loader`

preset-env 是为了基本的最新浏览器需要的

接下来我们设置两个文件（新建）

![](webpack-note/image-20210605094248557.png)

这里告诉webpack， 你现在运行时，要把所有js文件（除了node modules）都进行babel的一个转换。而这里babel loader遵循的是 preset-env的先行标准进行转换。

这里我们在index.js中使用babel会进行转换的

```js
//checking babel support
const obj = {a:'apple', b:'brave'}
const newObj= {...obj,c:'charlie'}
console.log(newObj)
```

然后执行`npm run build`，代码运行没问题，然后我们看看他的结果文件~

![](webpack-note/image-20210605112752370.png)

这里的主要的意义是看到了babel的转换(多出的部分，就是为了transpiling)

###  part6 switch mode between development and production mode

直接设置mode

```json
module.exports = {
    mode: 'development',
    //mode: 'production', 
    //devtool: 'eval-source-map',
    module:{
        rules:[ 
            //object array
            {
                //represent js files
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    //without additional settings, this will reference .babelrc
                    loader:'babel-loader'
                }
            }
        ]
    }
}
```

![](webpack-note/image-20210605112844867.png)

With this script we instruct webpack to work in **development mode**, convenient for working locally.

### part7  source map for debugging

其实就是加上`devtool: 'source-map',`

![](webpack-note/image-20210605115352707.png)

这里看到代码的原本位置~~~

[Webpack 5 Full Project Setup](https://www.youtube.com/watch?v=TOb1c39m64A)

### part  8 watch mode

这里主要是监控变化，不用反复编译

实际就是在package.json 里面编写 `"build": "webpack --watch"`

### part 9 dev server for hot reloading on sav 

这里一般由于我用的是vscode 所以直接安装了一个live server。 但是实际上webpack本身也有一个server安装，方便运行的组件~ 配置起来

1. 设置devServer 在webpack.config.js中

   ```js
       devServer:{
           contentBase:'./dist'
       },
   ```

2. 直接运行`npm i -D webpack-dev-server`

3. 在package.json中设置

   ```json
     "scripts": {
       "start": "webpack serve",//增加这个
       "test": "echo \"Error: no test specified\" && exit 1",
       "build": "webpack --watch"
     },
   ```

4. 运行npm start

   ![](webpack-note/image-20210605120926275.png)

这里就是运行成功了。

测试： js文件中增加内容，页面会自动刷新（不用手动更新）

> 如果运行不成功 注意文件路径 dist里面是html 以及main.js文件
>
> ![文件结构](webpack-note/image-20210605121257828.png)

### part10 custom entry and output path

先指定文件的custom路径

```js
    entry: './src/index.js',
    output:{
        filenmae:'bundle.js',
        path: path.resolve(__dirname,'public') //because of different operating system,no hard coding
    },
```

注意由于我们改变了文件output文件，所以server dev运行的时候的路径也要改变哦

```js
    devServer:{
        //contentBase:'./dist'
        contentBase:'./public'//for part 10 custom output location
    },
```

这里运行出来

![](webpack-note/image-20210605201218388.png)

### part 11 dynamically set development or production 

在package.json 中添加`"build": "NODE_ENV=production webpack"`(之前这里设置的是watch)

在webpack.config.js 中添加`const mode = process.env.NODE_ENV ==='production'? 'production': 'development'`

同时为了保持watch 设置` "build-dev":"webpack --watch"`

这里运行的时候，要么npm run build or npm run build-dev

这里就是两种mode

# webpack 重点部分理解

## webpack 核心原理

## loader

![](webpack-note/image-20210604150039073.png)

比如像这里，loader本身的作用是在于让 webpack 能够去处理那些非 JS 的文件，比如样式文件、图片文件(webpack 自身只理解JS)

第一个babel 主要为了兼容性 以及不同版本之间的js进行一个转换（注意presets 以及pollyfills 的应用）

第二个对于css而言， 这里首先有两个loader，根据规则，这里是**从后往前的**，也就是css文件先传递给了css-loader ，变成js style array。 然后这些在传递给style loader， 这里将得到了array 放入 js modules & bundle files。

所以 假设我们这里是less文件的话，那么就要改变设置，如下了

```js
rules: [
          {
              test: /\.less$/,
              use: ["style-loader", "css-loader", "less-loader"]
          }
  ]
 },
```

> **Hot module replacement**
>
> ```json
> "scripts": {
> "webpack-dev-server": "webpack-dev-server",
>    "dev": "webpack-dev-server --mode=development --hot",
>    "prod": "webpack --mode=production"
>  },
> ```

