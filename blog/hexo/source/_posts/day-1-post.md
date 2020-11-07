---
title: Bulid Hexo page - issue 
date: 2020-11-07 16:46:09
tags: Hexo
---
第一个：

You are attempting to use a Jekyll theme, “maupassant”, which is not supported by GitHub Pages
主题问题？

网上查到的解决方法：手动修改了github.io仓库里_config，去掉theme:maupassant`一行；

然后迎来第二个报错：

The value ‘{}’ was passed to a date-related filter that expects valid dates in /_layouts/default.html or one of its layouts. For more information, see https://docs.github.com/github/working-with-github-pages/troubleshooting-jekyll-build-errors-for-github-pages-sites#date-is-not-a-valid-datetime.
解决方法：

网上查到的解决方法：没有用jekyll时，在github.io仓库根目录建立名为.nojekyll的空文件，以跳过jekyll检查。

然后没有报错了，取而代之的是：

404 not found：找不到index.html
查看了github.io仓库，发现的确没有index.html，里面存的是gitpage仓库的源文件，而不是生成的html页面。

所以问题在于 hexo gitpage 部署