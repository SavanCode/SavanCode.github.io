---
title: Hexo Building Issue
date: 2020-11-07 21:28:54
tags: Hexo
---

[TOC]


# 问题1

The value {} was passed to a date-related filter that expects valid dates in /_layouts/default.html or one of its layouts. For more information, see https://docs.github.com/github/working-with-github-pages/troubleshooting-jekyll-build-errors-for-github-pages-sites#date-is-not-a-valid-datetime.

解决方法：

没有用jekyll时，在github.io仓库根目录建立名为.nojekyll的空文件，以跳过jekyll检查。

# 问题2

404 not found：找不到index.html

解决方法
问题就出在hexo的deploy了。

hexo gitpage 部署命令注意格式

_config.yml中

deploy:  
type: git  
repo: https://github.com/<username>/<project>  # example, https://github.com/hexojs/hexojs.github.io  
branch: master

# 问题3

今天使用hexo发布文章，输入指令hexo g的时候出现了如题的错误：
can not read a block mapping entry; a multiline key may not be an implicit key at line 2, column 5:

解决方法
实际上是文章开头的配置，注意冒号之后的空格
title: Hexo Building Issue
date: 2020-11-07 21:28:54
tags: Hexo

# 问题4

当提交hexo文件代码到git，重新clone的时候，编译的时候会出现错误：
"Cannot find module './build/Release/DTraceProviderBindings'"
ERROR Local hexo not found in ~/Documents/（文件地址）
ERROR Try running: 'npm install hexo --save'

解决办法：
npm install hexo --no-optional
或者
$ npm uninstall hexo-cli -g
$ npm install hexo-cli -g
（实际上是没有办法上传node modules）

# 问题5

hexo yilia主题配置中的确实模块- 右侧的文章列表
按照官方指引，但是没有实现列表

可能的解决办法：
1.有没有安装在blog的根目录
2.在config中的配置，复制粘贴时，注意缩进距离（此处文件，格式很重要）