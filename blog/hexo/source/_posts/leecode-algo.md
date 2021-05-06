---
title: leecode algo 刷题顺便复习一下算法思维
top: false
cover: false
toc: true
mathjax: true
date: 2021-05-05 20:48:47
password:
summary:
tags: [JS,alog,leecode]
categories: JS
---

## 数组专栏

### 动态规划 - leecode 53

重叠子问题、最优子结构、状态转移方程就是动态规划三要素

**明确 base case -> 明确「状态」-> 明确「选择」 -> 定义 dp 数组/函数的含义**。

按上面的套路走，最后的结果就可以套这个框架：

```python
# 初始化 base case
dp[0][0][...] = base
# 进行状态转移
for 状态1 in 状态1的所有取值：
    for 状态2 in 状态2的所有取值：
        for ...
            dp[状态1][状态2][...] = 求最值(选择1，选择2...)
```

[动态规划教学](https://github.com/labuladong/fucking-algorithm/blob/master/%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92%E7%B3%BB%E5%88%97/%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92%E8%AF%A6%E8%A7%A3%E8%BF%9B%E9%98%B6.md)

