---
title: react_jira 项目笔记
top: false
cover: false
toc: true
mathjax: true
date: 2021-05-26 18:19:56
password:
summary: react_jira 项目笔记
tags: [project_note,react]
categories: project_note
---

### 创建项目

官方指南啊~~~ https://create-react-app.dev/docs/getting-started/

这里有一个 它会提示你，如果你用的是老版本的create react app的命令，你要uninstall一下哦~

### 安装prettier ， **commitlint**  以及 eslint

[prettier官网](https://prettier.io/docs/en/install.html)

yarn

```
yarn add --dev --exact prettier
```

Then, create an empty config file to let editors and other tools know you are using Prettier:

```bash
echo {}> .prettierrc.json
```

Next, create a [.prettierignore](https://prettier.io/docs/en/ignore.html) file to let the Prettier CLI and editors know which files to *not* format. Here’s an example:

```
# Ignore artifacts:
build
coverage
```

由于 我们希望自动化的prettier 所以使用到[pre-commit hook](https://prettier.io/docs/en/precommit.html)

安装eslint主要是注意与prettier的冲撞问题

[**commitlint**](https://github.com/conventional-changelog/commitlint) 

规范commit msg的规范