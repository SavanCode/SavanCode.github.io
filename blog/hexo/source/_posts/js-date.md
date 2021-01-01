---
title: js date
top: false
cover: false
toc: true
mathjax: true
date: 2020-11-25 15:59:47
password:
summary:
tags: JS
categories: JS
---

# date基本

## 时区

格林尼治标准时间(GMT) --伦敦

世界协调时间(UTC)又称世界统一时间

## 闰年

诀是：四年一闰，百年不闰，四百年再闰

```js
function IsLeapYear(year){
    if(typeof year == 'number'){
        if((year % 4 === 0 && year % 100 !== 0)  || year % 400 === 0){
            return 'leap year'
        }else{
            return 'common year'
        }
    }
    return 'please input number'
}
```

```js
console.log(IsLeapYear(4));//'leap year'
console.log(IsLeapYear(400));//'leap year'
console.log(IsLeapYear(2000));//'leap year'
console.log(IsLeapYear(1900));//'common year'
```

## 计算时分秒

```js
date = 100000s
day(天) = Math.floor(100000/86400) = 1
hour(小时) = Math.floor((100000%86400)/3600) = 3
minute(分) = Math.floor((100000%3600)/60) = 46
second(秒) = Math.floor(100000%60)=40
console.log(100000 === 1*86400+ 3*3600+ 46*60+40);//true
```

# Date()构造函数

```js
console.log(new Date('7/12/2016'));//Tue Jul 12 2016 00:00:00 GMT+0800 (中国标准时间)
console.log(new Date('2016-7-12'));//Tue Jul 12 2016 00:00:00 GMT+0800 (中国标准时间)
console.log(new Date('2016-07-12'));//Tue Jul 12 2016 08:00:00 GMT+0800 (中国标准时间)
```

# date函数

## to类别

### toString() 

　　返回本地时区的日期字符串

### toUTCString()

　　返回UTC时间的日期字符串

### toISOString()

　　返回Date对象的标准的日期时间字符串格式的字符串

### toDateString()

　　返回Date对象的日期部分的字符串

### toTimeString()

　　返回Date对象的时间部分的字符串

###  toJSON()

　　返回一个符合JSON格式的日期字符串，与toISOString方法的返回结果完全相同

### toLocaleString()

　　toString()方法的本地化转换

### toLocaleTimeString()

　　toTimeString()方法的本地化转换

###  toLocaleDateString()

　　toDateString()方法的本地化转换

## get类

###  valueOf()

　　返回距离1970年1月1日0点的毫秒数

###  getTimezoneOffset()

　　返回当前时间与UTC的时区差异，以分钟表示(8*60=480分钟)，返回结果考虑到了夏令时因素

###  get[UTC]FullYear()

　　返回年份(4位数)

###  get[UTC]Month()

　　返回月份(0-11)

###  get[UTC]Date()

　　返回第几天(1-31)

###  get[UTC]Day()

　　返回星期几(0-6)

###  get[UTC]Hours()

　　返回小时值(0-23)

###  get[UTC]Minutes()

　　返回分钟值(0-59)

###  get[UTC]Seconds()

　　返回秒值(0-59)

###  get[UTC]Milliseconds()

　　返回毫秒值(0-999)

　　[注意]通过标准日期时间格式字符串，且有前置0的形式的参数设置，设置的是UTC时间

## set类

###  setTime()

使用毫秒的格式，设置一个Date对象的值

###  set[UTC]Month()

设置月份(0-11)，以及可选的日期值

###  set[UTC]Date()

设置第几天(1-31) 

###  set[UTC]Hours()

设置小时值(0-23)，以及可选的分钟值、秒值及毫秒值

###  set[UTC]Minutes()

设置分钟值(0-59)，以及可选的秒值及毫秒值

###  set[UTC]Seconds()

设置秒值(0-59)，以及可选的毫秒值

###  set[UTC]Milliseconds()

设置毫秒值(0-999)