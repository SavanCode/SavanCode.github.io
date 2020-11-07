---
title: Hexo issue
date: 2020-11-07 17:26:40
tags:Hexo
---
 The value ‘{}’ was passed to a date-related filter that expects valid dates in /_layouts/default.html or one of its layouts. For more information, see https://docs.github.com/github/working-with-github-pages/troubleshooting-jekyll-build-errors-for-github-pages-sites#date-is-not-a-valid-datetime.

解决方法：

网上查到的解决方法：没有用jekyll时，在github.io仓库“根目录”建立名为.nojekyll的空文件，以跳过jekyll检查。