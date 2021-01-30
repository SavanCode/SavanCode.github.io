---
title: react3-Form&Array
top: false
cover: false
toc: true
mathjax: true
date: 2020-12-15 17:40:10
password:
summary:
tags: React
categories: React
---

# react 之 表单组件

在React中表单组件分为约束组件和无约束组件两种。

　　- 无约束组件，是指其value值不通过的props或者state来设置，仅由其自身来决定。表单组件的值的变化也不会被记录，只能通过找到DOM节点的方式来获取。

　　- 约束组件，是React中推荐的表单的使用方式。表单组件的值并不是由其自身决定，而是通过父组件传递或者本身的state来控制。其内容的每次变化都会被保存，需要时仅需要通过this.state便能获取。