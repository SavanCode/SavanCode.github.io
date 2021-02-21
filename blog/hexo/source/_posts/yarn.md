---
title: Yarn 管理依赖包
top: false
cover: false
toc: true
mathjax: true
date: 2021-02-20 11:20:12
password:
summary: Yarn 管理依赖包
tags:
categories:
---

本来没想这回写这个,主要是心血来潮写Vue练习的时候,在新电脑安装了 ,然后一直报的错 让我极度的想打人 -.-^

## Yarn vs npm

其实都是安装package的助手

只是yarn的优势在于

- Yarn 总会自动更新 yarn.lock，而 npm 需要你重新操作
- 行的执行这些任务，提高了性能,npm单线程
- Yarn的输出会更加清晰

## 安装Yarn


如果你安装了node，就安装了npm，可以使用下面的命令来安装：

```sh
npm i yarn -g --verbose
```

npm官方源访问速度实在不敢恭维，建议使用之前切换为淘宝镜像，在yarn安装完毕之后执行如下指令：

```sh
yarn config set registry https://registry.npm.taobao.org
yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass -g
```

## 查看是否安装成功

```
yarn --version
```

或者

你可以再自己的项目里直接运行 yarn 安装一些包,会看到一个yarn-lock文件,那就是没问题了

## 命令

### 安装包的命令

使用Yarn跟npm差别不大，具体命令关系如下：

```sh
npm install  => yarn install
npm install --save [package] => yarn add [package]
npm install --save-dev [package] => yarn add [package] --dev
npm install --global [package] => yarn global add [package]
npm uninstall --save [package] => yarn remove [package]
npm uninstall --save-dev [package] => yarn remove [package]
```

### 初始化项目

同npm init，执行输入信息后，会生成package.json文件

````sh
yarn init
````

### 添加包（会更新package.json和yarn.lock
```sh
yarn add [package] // 在当前的项目中添加一个依赖包，会自动更新到package.json和yarn.lock文件中
yarn add [package]@[version] // 安装指定版本，这里指的是主要版本，如果需要精确到小版本，使用-E参数
yarn add [package]@[tag] // 安装某个tag（比如beta,next或者latest）
```