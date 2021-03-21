---
title: Linux vim
top: false
cover: false
toc: true
mathjax: true
date: 2021-03-21 02:14:07
password:
summary: Linux vim 指令
tags: Linux 
categories: Linux 
---

## **常用命令**

- `ls -all`：列出目录和文件信息
- `ls ../`：列出当前目录，父目录下，所有文件和目录
- `pwd`：显示目前的目录
- `cd`：切换到「~」目录
- `cd <path>`：切换到「path」下的目录
- `cd ..`：退回上一层目录
- `cd -`：退回上次切换的目录，并显示路径
- `mkdir`：创建一个新的目录
- `rmdir`：删除一个空的目录
- `mv`：移动文件与目录，或修改文件与目录的名称
- `clear`：清屏

## **路径写法**

- **绝对路径：**
- *路径的写法，由根目录 / 写起。*
- 例如： `/var/nginx/httpd` 这个目录。
- **相对路径：**
- *路径的写法，不是由 / 写起。*
- `./` 为当前目录：当前目录为父目录，切换到此目录下的子目录。
- 例如由 `/var/` 要到 `/var/www` 底下时，可以写成： `cd ./www` 。
- `../` 为父级目录：同目父录下，不同目录之间的切换。
- 例如由 `/var/www/html` 要到 `/var/www/cgi-bin` 底下时，可以写成： `cd ../cgi-bin` 。

### 补充

- 【#】代表root权限，【$】代表普通用户。
- 【/】符号表示根目录，【~】符号表示用户的家目录，所以这个是绝对路径。
- `.`：代表此层目录
- `..`：代表上一层目录
- `-`：代表前一个工作目录
- `~`：代表“目前使用者身份”所在的主文件夹
- `~<account>`：代表`<account>`这个使用者的主文件夹（account是个帐号名称）

## **YUM命令**

- 1.查找软件包：yum search` <keyword>`
- 2.显示有关一个或多个软件包的信息：`yum info <package_name>`·
- 3.仅安装指定的软件：`yum install <package_name>`
- 4.仅更新指定的软件：`yum update <package_name>`
- 5.列出所有可安裝的软件清单：`yum list`
- 6.删除软件包命令：`yum remove <package_name>`

## **Vim命令**

- i切换到输入模式，以输入字符。
- x 删除当前光标所在处的字符。
- Ctrl+v进入可视化模式，移动光标选取。
- : 切换到底线命令模式（英文:），按「ESC」键可随时退出底线命令模式。
- :q退出程序。
- :w保存文件。
- :e <path/to/file> 打开一个文件。
- :saveas <path/to/file> 另存为 <path/to/file>。
- :file <name>重命名，未命名时用，「name」替换成你要的名字。

## 基础教程
[Linux 教程| 菜鸟教程](https://www.runoob.com/linux/linux-tutorial.html) 
[Vim命令查询文档](https://vim.rtorr.com/)
[鸟哥学习手册](https://link.zhihu.com/?target=https%3A//links.jianshu.com/go%3Fto%3Dhttps%3A%2F%2Fwizardforcel.gitbooks.io%2Fvbird-linux-basic-4e%2Fcontent%2F49.html)

