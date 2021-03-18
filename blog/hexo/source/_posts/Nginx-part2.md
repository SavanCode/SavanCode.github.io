---
title: Nginx part2
top: false
cover: false
toc: true
mathjax: true
date: 2021-03-18 01:32:23
password:
summary: Nginx 安装以及所有的Nginx踩坑集合
tags: Nginx 
categories: Nginx
---

[Nginx 官方下载](http://nginx.org/en/download.html)

（本人这里都是window的安装）

下载后，解压并启动Nginx
```sh
cd c:\
unzip nginx-1.18.0.zip
cd nginx-1.18.0
start nginx
```
查询是否启动Nginx
```sh
tasklist /fi "imagename eq nginx.exe"
```
映像名称|PID 会话名|会话#|内存使用
nginx.exe|7824 Console|1|8,860 K
nginx.exe|7472 Console|1      9,200 
注意，配置文件中的文件路径分隔符要用“/”，而不是“\”。

Nginx/Windows 作为一个标准后台应用（非服务）在运行，可以用以下命令行管理已运行Nginx。
```sh
command	meaning
nginx -s stop	fast shutdown
nginx -s quit	graceful shutdown
nginx -s reload	changing configuration, starting new worker processes with a new configuration, graceful shutdown of old worker processes
nginx -s reopen	re-opening log files
```