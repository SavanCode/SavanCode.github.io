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

其实这里没什么好说的，不安装工具其实也是可以的，只有记得下面的规则哦

- feat - 新功能 feature
- fix - 修复 bug
- docs - 文档注释
- style - 代码格式(不影响代码运行的变动)
- refactor - 重构、优化(既不增加新功能，也不是修复bug)
- perf - 性能优化
- test - 增加测试
- chore - 构建过程或辅助工具的变动
- revert - 回退
- build - 打包

 文章推荐 ：  [超详细的Git提交规范引入指南](https://juejin.cn/post/6844903793033756680)

### JSON-SERVER

关于模拟数据接口，实际上有很多方法。

- Mock 

  - 虽然模拟了接口请求，但是数据都是动态生成的假数据，无法真是的模拟增删改查的情况
  - 仅支持AJAX，不支持fetch
- 接口管理工具： Rap,Swagger,Moco,Yapi
- 配置复杂，一般是后端不能出手，等配置完了，接口估计也都已经配置完成了
  - 一般大的开发团队喜欢用，原因是配置功能强大。接口管理和mock一起，后端修改接口方便，可靠
- Json-server 
  - 配置简单，很快可以配置RESTFUL API Server
  - 自定义程度高；增删改查真实模拟
  - 但是没有办法随着后端API 改变而进行自动修改



##### 安装json-server

```sh
npm install -g json-server
```

##### 设置文件以及script

```json
//这里注意 文件夹名字 __json_server_mock__ 文件名字db.json
//文件夹前面以及最后两个横杠意味着 与项目无关，只是模拟数据
{
    "users": [
      {
        "id": 1,
        "name": "高修文"
      },
      {
        "id": 2,
        "name": "熊天成"
      },
      {
        "id": 3,
        "name": "郑华"
      },
      {
        "id": 4,
        "name": "王文静"
      }
    ],
    "projects": [
      {
        "id": 1,
        "name": "骑手管理",
        "personId": 1,
        "organization": "外卖组",
        "created": 1604989757139
      },
      {
        "id": 2,
        "name": "团购 APP",
        "personId": 2,
        "organization": "团购组",
        "created": 1604989757139
      },
      {
        "id": 3,
        "name": "物料管理系统",
        "personId": 2,
        "organization": "物料组",
        "created": 1546300800000
      },
      {
        "id": 4,
        "name": "总部管理系统",
        "personId": 3,
        "organization": "总部",
        "created": 1604980000011
      },
      {
        "id": 5,
        "name": "送餐路线规划系统",
        "personId": 4,
        "organization": "外卖组",
        "created": 1546900800000
      }
    ]
  }
```

```json
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "json-server": "json-server __json_server_mock__/db.json --watch --port 3001"//这里运行数据库
  },
```

然后运行起来

```
 Resources
  http://localhost:3001/users
  http://localhost:3001/projects
```

更多详细的请参考 [json-server 详解](https://www.cnblogs.com/fly_dragon/p/9150732.html)

### 自定义Hook

useEffect的使用这里不展开。**自定义HOOK名字应该始终以 `use` 开头，这样可以一眼看出其符合 [Hook 的规则](https://zh-hans.reactjs.org/docs/hooks-rules.html)。**

- 最基础的useeffect 改造(后面参数也可以提出来)

```js
export const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, []);
};
```

- 复杂点的改造

```js
export const useDebounce = (value,delay) => {
  console.log("value",value)
  const [debouncedValue,setDebouncedValue] = useState(value)
  useEffect(()=>{
    //每一次输入的变化 产生新的timer
    const timeout = setTimeout(()=>setDebouncedValue(value,delay))
    // 上一个useEffect处理完之后执行
    //执行当前 effect 之前对上一个 effect 进行清除
    return ()=> clearTimeout(timeout)
  },[value,delay])
  return debouncedValue
}
```

为防止内存泄漏，清除函数会在组件卸载前执行。另外，如果组件多次渲染（通常如此），则**在执行下一个 effect 之前，上一个 effect 就已被清除**。官网有详细说明的 [传送门](https://zh-hans.reactjs.org/docs/hooks-effect.html) 