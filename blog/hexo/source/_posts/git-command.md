---
title: git command
top: false
cover: false
toc: true
mathjax: true
date: 2021-01-27 23:18:33
password:
summary: git笔记
tags: git
categories: git
---

## git版本控制 推荐软件
- gitHub desktop 

- SourceTree

为什么不用commandLine,因为..

  ![gitHub Desktop](git-command/image-20210220133043365.png)

![SourceTree](git-command/image-20210220133305975.png)

Source Tree的好处的,处理这种复杂的(因为当时比这个还多几个分支).不在话下, 一点也不怕晕(((φ(◎ロ◎;)φ)))

![](git-command/image-20210220133351680.png)

## Vim 

这个真的让我避之不及~ 就是感受不到他的好 /(ㄒoㄒ)/~~

- 创建文件的语句   touch README.md

- 进入文件  vim README.md

- 对文件进行编辑   点击i 可以进入编辑状态（或者common v）

- 保存编辑文件
:x  进行保存
“:x”和”:wq”的真正区别，如下：
:wq   强制性写入文件并退出。即使文件没有被修改也强制写入，并更新文件的修改时间。
:x   写入文件并退出。仅当文件被修改时才写入，并更新文件修改时间，否则不会更新文件修改时间。

- 退出编辑状态  esc

## 基本几个command

```
git add -A 添加全部变更
git pull origin master 拉源文件
git commit -m “xxxxx”进行提交项目文件备注
git log 获取版本记录状态
```

## 进入vim进行编辑保存:x退出就可以了

## commit之后，想撤销commit

**git reset --soft HEAD^**

这样就成功的撤销了你的cmmit

注意，仅仅是撤回commit操作，您写的代码仍然保留。

HEAD^的意思是上一个版本，也可以写成HEAD~1

如果你进行了2次commit，想都撤回，可以使用HEAD~2



## 至于这几个参数：

## --mixed 

意思是：不删除工作空间改动代码，撤销commit，并且撤销git add . 操作

这个为默认参数,git reset --mixed HEAD^ 和 git reset HEAD^ 效果是一样的。

## --soft  

不删除工作空间改动代码，撤销commit，不撤销git add . 

## --hard

删除工作空间改动代码，撤销commit，撤销git add . 

注意完成这个操作后，就恢复到了上一次的commit状态。

### 如果commit注释写错了，只是想改一下注释，只需要：

git commit --amend

此时会进入默认vim编辑器，修改注释完毕后保存就好了。

## 解决git中upstream丢失问题Your branch is based on 'origin/xxxx', but the upstream is gone.

https://blog.csdn.net/limengke123/article/details/77850134

## git push 之后的回撤

通过git log 获取提交的版本号
git revert 版本号xxxx
然后:x保存退出就可以了撤回到指定的版本了

## 取消更改 - 未push的状态撤回

  首先需要知道工作区（working diretory）和暂存区（Stage）这两个概念。工作区的该概念不仅包含你实际操作、更改的文件还应当包括当前修改但未add存入暂存区的文件变化信息，暂存区的作用则是临时存储文件的变化信息，在git add file操作之后，暂存区中将记录file文件上的修改信息。暂存区的存在更细化了时间节点，要知道commit的往往是有重大改变的版本或者是在一次修改工作整体完成之后才使用commit。而在这之间需要保存的修改，自然需要一个缓存区暂时存放。
### “撤销修改” 命令
- 1.git checkout

- 2.git reset

- git checkout -- file；撤销对工作区修改，这个命令是以最新的存储时间节点（add和commit）为参照，覆盖工作区对应文件file；这个命令改变的是工作区

- git reset HEAD -- file；清空add命令向暂存区提交的关于file文件的修改（Ustage）

### 总结一下

**有过add提交的使用git reset 文件**

**一直未提交的就是用 git checkout 文件** 

也就是如果我们文件已经提交到本地的缓存区，也就是通过add 这一步了，那么我们撤销的时候需要reset形式撤销，reset撤销只是撤出暂存区，并不是直接取消了而是在工作区还是有的，这个时候我们可以继续进行checkout撤销，这样就彻底取消掉修改的文件了。


## Reference 

https://blog.csdn.net/w958796636/article/details/53611133

