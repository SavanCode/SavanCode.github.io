---
title: 前端style框架
top: false
cover: false
toc: true
mathjax: true
date: 2021-01-10 16:48:07
password:
summary: 前端Style 收集
tags: [React,UI,Vue]
categories: UI
---

React Style : Bootstrap , Material-UI

## [Material-UI](https://material-ui.com/zh/getting-started/installation/)

```sh
// 用npm安装
npm install @material-ui/core
```

自己练习 - clock


## [Ant Design of React](https://ant.design/components/overview-cn/)

基于 React.js

## [Echart](https://echarts.apache.org/zh/index.html)

[github](https://github.com/apache/incubator-echarts)

常见问题："export 'default' (imported as 'ECharts') was not found in 'echarts/lib/echarts.js'

解决办法：

1. 引入echarts的地方改为

```jsx
import * as echarts from 'echarts'
```

1. webpack的DefinePlugin里加入如下字段

```sh
// 此处根据情况自行修改，结果为boolean就行，true的情况下会多一些日志信息
'__DEV__': process.env.node_env === 'dev' 
```

或者

```sh
npm un echarts && npm i -E echarts@3.7.2 zrender@3.6.3
```

基本的component例子

```jsx
import echarts from 'echarts';
import 'echarts/map/js/china';
import geoJson from 'echarts/map/json/china.json';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class EChartsView extends Component {
  componentDidMount() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('echart'));
      // 绘制图表
      myChart.setOption({
          title: { text: 'ECharts 入门示例' },
          tooltip: {},
          xAxis: {
              data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
          },
          yAxis: {},
          series: [{
              name: '销量',
              type: 'bar',
              data: [5, 20, 36, 10, 10, 20]
          }]
      });
  }

  render() {
      return(
          <div id="echart" style={{ width: '80vw', height: "80vh" }}></div>
      );
  }
}
 
ReactDOM.render(<EChartsView/>,document.getElementById('root'));
```

## [react echarts](https://github.com/hustcc/echarts-for-react)

```sh
npm install echarts-for-react echarts
```

## [Element for Vue](https://element.eleme.cn/#/zh-CN/component/installation)

基于 Vue.js



## [iview  for Vue](https://www.iviewui.com/)

基于 Vue.js