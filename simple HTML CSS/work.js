const { result, reject, object, isArray } = require("underscore");

onmessage = function (e) {
  let sum = 0,
    num = e.data;
  for (var i = 1; i <= num; i++) {
    sum += i;
  }
  postMessage(sum);
};


//下面是面试手写题目
var sayHi = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let p = "hello,I am Bill";
      resolve(p);
    }, 10000);
  });
};
sayHi().then((value) => {
  console.log(value);
});

var sayHiAgain = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let p = "hello,I am steve";
      resolve(p);
    }, 20000);
  });
};

sayHiAgain().then((value) => {
  console.log(value);
});

sayHi().then(()=>{sayHiAgain()})

Promise.race([sayHi(),sayHiAgain()]).then((value)=>{console.log(value)})

Promise.all([sayHi(),sayHiAgain()]).then((value)=>{console.log(value)})





function red() {
  console.log("red");
}

function green() {
  console.log("green");
}

function yellow() {
  console.log("yellow");
}

// function tic(func, timeout) {
//   setTimeout(() => {
//     func();
//   }, timeout * 1000);
// }

function tic(func, timeout) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      func();
      resolve();
    }, timeout * 1000);
  });
}

//红绿灯一直亮
//promise

// function lighting() {
//     return new Promise((resolve, reject) => {
//       tic(red, 0.1);
//       resolve(1);
  
//     });
//   }
//   lighting()
//     .then((resolve1) => {
//       tic(green, 0.2);
//   console.log(resolve1)
//       return Promise.resolve(2);
//     })
//     .then((resolve2) => {
//       tic(yellow, 0.3);
//   console.log(resolve2)
//         return Promise.resolve();
//     });

 
function lighting(){
   return new Promise((resolve,reject)=>{
       tic(red,1)
       .then( tic(green,2))
       .then(tic(yellow,3))
       .then(resolve("finish"))
    })
}

function run(){  
    lighting().then( run())
}

//generator

function* ticGen() {
  yield tic(red, 1);
  yield tic(green, 2);
  yield tic(yellow, 3);
}

//这里会运行卡住的
ticGen().next();//red
ticGen().next();//red
ticGen().next();

//下面才可以
let genObj = ticGen();
genObj.next();
genObj.next();
genObj.next();


//这个也可以
for(let value of ticGen()){
    value
}

// function start(){
//     let genObj = ticGen();
//     let result =genObj.next();
//     if(result.done){//true
//         start()
//     }else{
//         for(let value of genObj){
//             genObj.next()
//         }
        
//     }
// }

function startgen(iterator){
    let result =iterator.next();
    if(result.done){//true
        startgen(iterator)
    }else{
        result.value.then(()=>{startgen(iterator)})
    }
}


async function playLight(){
    while(true){
        await tic(red,1);
        await tic(green,2);
        await tic(yellow,3);
    }
}

function throttle(func,delay){
    let timer = null;
    return function (){
        if(timer){//timer exist
            //jump
        }else{//without timer
            var that = this;
            setTimeout(()=>{func.apply(that,arguments)},delay)
        }
    }
}
function debounce(func,wait){
    let timer = null;
    return function(){
      if(timer){//timer existed
          clearTimeout(timer)
          timer = null;
          let that= this;
      }else{//without timer
          setTimeout(() => {
              func.apply(that,arguments)
          }, wait);
      }
    }
}


//这里的apply最少两个参数 call bind 是不一定的 最少一个即可
Function.prototype.call = function(context,arguments){
    context = context ||window;
    let fn = Symbol();
    context[fn]=this;
    let result = context[fn](...arguments)
    delete context[fn]
    return result
}

function newObj(){
    let obj = object.create();
    obj.__proto__ = constructor.prototype
    let result = constructor.call(obj,...arguments)
    return typeof result === "object" ? result : obj;
}

//object instanceof constructor
function myInstanceOf(obj, Type) {
  // 得到原型对象
  let protoObj = obj.__proto__

  // 只要原型对象存在
  while(protoObj) {
    // 如果原型对象是Type的原型对象, 返回true
    if (protoObj === Type.prototype) {
      return true
    }
    // 指定原型对象的原型对象
    protoObj = protoObj.__proto__
  }
  
  return false
}
 
let array = [promise1,promise2,promise3]

//串行
async function promiseByQueue(array){
  let result = []
  let errorFlag= false;
  for(let promise of array){
    try{
      result.push(await promise())
    }catch(error){
      result.push(error)    
      errorFlag=true; 
    }

  }
  if(errorFlag){throw new Error()}
}

function promiseQueue(array){
  array.reduce((prevP,nextP)=>{prevP.then(()=>nextP)},Promise.resolve())
}

//并行
function parallel(array){
  let resultArray = new Array(array.length);
  let count;
  array.forEach((element,index) => {
    Promise.resolve(element).then(
      result=>{ 
        resultArray[index]=result;
        count++;
        if(count === array.length){
          resolve(resultArray)
        }
      },
      reason =>reject(reason)
    )
  });
}


async function chuanxing(promises){
  let result=[]
  for(let promise of promises){
    try {
      result.push(await promise) 
    } catch (error) {
      return reject(error)
    }
  }

}

//promises.reduce((prevp,nextp)=>{prevp.then(()=>nextp)},Promise.resolve())

function bingxing(promises){
  let resultArray= new Array(promises.length);
  let count=0;
  promises.forEach(promise => {
    promise.then(value=>{
      resultArray.push(value); 
      count++;
      if(count === promises.length){
        return resolve(resolveArray)
      }
    },error=>{return reject(error)})
  });
}

//fn.call(obj)
function mycall(obj,fn,...args){
  if(obj === undefined || obj === null){
    obj = globalThis;
  }

  obj.temp=fn;
  let result = obj.temp(...args)
  delete obj.temp;
  return result
}

//fn.apply(obj,argumentArray)
function myapply(obj,fn,argumentArray){
  if(obj === undefined || obj === null){
    obj = globalThis;
  }
  obj.temp=fn;
  let result =obj.temp(...argumentArray);
  delete obj.temp;
  return result
}

//fn.bind(obj,..args)
function bind(obj,fn,...args){
  return function(...args2){
    return call(obj,fn,...args,...args2)
  }
}
//function debounce  throttle call apply bind newobj  parallelp queuep myinstanceof promise generator 

//function map

function map(array,callback){
  const arr=[];
  for (let index=0;index<array.length;index++){
    arr.push(callback(array[index]))
  }
  return arr
}
function reduce(array,callback,initValue){
  let result = initValue;
  for(let index= 0;index< array.length;index++){
    result=callback(result,array[index],index)
  }
  return result
}

function filter(array,callback){
  let result=[]
  for(let index=0;index<array.length;index++){
    if(callback(array[index],index)){
      result.push(array[index])
    }
  }
  return result
}
/*
const array1 = [5, 12, 8, 130, 44];

const found = array1.find(element => element > 10);

console.log(found);
// expected output: 12
 */
function find(array,callback){
  for(let index=0;index<array.length;index++){
    if(callback(array[index],index)){
        return array[index]
    }
  }
  return -1
}

function findIndex(array,callback){
  for(let index=0;index<array.length;index++){
      if(callback(array[index],index)){
          return index;
      }
  }
  return -1
}

//每一个过了就过
function every(array,callback){
  for(let index=0;index<array.length;index++){
        if(!callback(array[index])){
            return false
        }
  }
  return true
}

//一个通过就行
function some(array,callback){
    for(let index=0;index<array.length;index++){
        if(callback(array[index],index)){
            return true
        }
    }
    return false
}
//map reduce filter find findIndex every some 

//unique
//双重便利
function unique1(array){
  let result=[]
  array.forEach(item=>{
      if(result.findIndex(item)===-1){
        result.push(item)
      }
    }
  )
  return result
}  

function unique2(array){
  return [new Set(array)]
}

function unique3(array){
  let result={};
  let resultArr=[];
  array.forEach(item=>{
  if(!result.hasOwnProperty(item)){
      result[item]=true;
    resultArr.push(item)
    }
  })
  return resultArr
}  




//unique 





//concat slice flatten chunk difference pull pullAll frop drop dropRight
//这里不是完全的concat的实现 因为本身的是array不会拆的
function concat(array,...args){
const resultArr=[...array];
resultArr.forEach((item)=>{
  if(Array.isArray(item)){
      resultArr.push(...item)
  }else{
    resultArr.push(item)
  }
})
}
/*
- 　　如果start是负数，则start = max(length + start,0)
- 　　如果end是负数，则end = max(length + end,0)
- 　　start和end无法交换位置
- 　　如果没有参数，则返回原数组
*/ 
function slice(array,start,end){
  start = start < 0 ? Math.max(start+array.length,0) : start;
  end = end < 0 ? Math.max(end+array.length,0) : end;
  if(arr.length=0){return array}
  let result=[];
  for(let index=start;index<end;index++){
    result.push(array[index])
  }
  return result
}

//这里不考虑layer
function flatten(array){
  return array.reduce((prev,next,index)=>{
    if(Array.isArray(item) && 
    item.some((innerItem)=>{Array.isArray(innerItem)})){
        return pre.concat(flatten(item))
    }else{
      return pre.concat(item)
    }
  })
}
function flatten2(array){
  let arr=[].concat(...array);
  while(arr.some(item =>Array.isArray(item))){
        arr.concat(...item)
  }
  return arr
}

function flatten(array){
  return array.reduce((pre,item)=>{
    if(Array.isArray(item)&&item.some(cItem=>Array.isArray(cItem))){
      return pre.concat(flatten(item))
    }else{
      return pre.concat(item)
    }
  },[])
}
function flatten(array){
  let result= [...array];
  if(array.some(item=>Array.isArray(item))){
    arr = [].concat(...arr)
  }
  return arr
} 

//function chunck 分切
function chunk(array,chunkNum){
  Array.isArray({length:Math.ceil(array.length/chunkNum)},(v,i)=>{
    //v->undefined
    array.slice(i*chunkNum,i*(chunkNum+1))
  })
}  

//intersection 交集
function intersection(arr1,arr2){
  let result=[]
  result.concat(arr1.filter(x=>{arr2.includes(x)}))
}
//difference 取自己的独特部分
function difference(arr1,arr2){
  return arr1.concat(arr2).filter(x=>{arr2.includes(x)})
  //arr1.filter(x => !arr2.includes(x));
}
//sysmmetric 独立各自的部分 
function symmetric(arr1,arr2){
return arr1.filter(x1=>{!arr2.includes(x1)}).concat(arr2.filter(x2=>{!arr1.includes(x2)}))
}
//drop 从左边起 不要几个数字
function drop(array,number){
  if(number<0) return 
  return array.slice(number);
}

//drop right 从右边起 丢弃几个数字
function dropRight(array,number){
  if(number<0) return 
  return array.slice(-number)
}

/*
语法: object mergeObject(...objs)
功能: 合并多个对象, 返回一个合并后对象(不改变原对象)
例子:
{ a: [{ x: 2 }, { y: 4 }], b: 1}
{ a: { z: 3}, b: [2, 3], c: 'foo'}
合并后: { a: [ { x: 2 }, { y: 4 }, { z: 3 } ], b: [ 1, 2, 3 ], c: 'foo' }
*/


function merge(...objs){
  let result={}
  objs.forEach(obj=>{
    Object.keys(obj).forEach((key)=>{
      if(!result.hasOwnProperty(key)){
        result[key]=obj[key];
      }else{
        result[key]=[].concat(result[key],obj[key])
      }
    })
  })
  return result
}


function shawllowClone(target){
  //obj ...或者object assign
  //function 或者null 或者普通类型 直接返回
  if(target!=null && typeof target === 'object'){
    if(target instanceof Array){
        return array.slice();
        //return array.filter(()=>true)
        //return array.map(item=>item)
        //return [...target]
    }else{
      //return Object.assign({},target)
      return {...target}
    }
  }
return target
}

function shallowclone(target){
  if(target!=null && typeof target === 'object'){
    let result =  Array.isArray(target)? []:{}
    for(let key in target){
       //这里有一个target.hasownproperty 的判断
       cloneTarget[key] = target[key]
    }
  }else {
    return target
  }
}

function reverseString(str){
  // return str.split('').reverse().join('')
    // return [...str].reverse().join('')
  return Array.from(str).reverse().join()
}

/* 
2. 字符串是否是回文: palindrome(str) 如果给定的字符串是回文，则返回 true ；否则返回 false
*/
function palindrome(str){
   return str === Array.from(str).reverse().join()
}

/* 
3. 截取字符串: truncate(str, num) 如果字符串的长度超过了num, 截取前面num长度部分, 并以...结束
*/
function truncate(str, num) {
	return str.length > num ? str.slice(0, num) + '...' : str
}

/*
基于Promise封装Ajax
返回一个新的Promise实例
创建HMLHttpRequest异步对象
调用open方法，打开url，与服务器建立链接（发送前的一些处理）
监听Ajax状态信息
如果xhr.readyState == 4（表示服务器响应完成，可以获取使用服务器的响应了）
xhr.status == 200，返回resolve状态
xhr.status == 404，返回reject状态
xhr.readyState !== 4，把请求主体的信息基于send发送给服务器
*/ 

function ajax(url,method){
  return new Promise((resolve,reject)=>{
    const xhr = new XMLHttpRequest();
    xhr.open(url,method,true)
    xhr.onreadystatechange = function(){
      //4 resolve 200 404  
      // reject
      if(xhr.readyState===4){
        if(xhr.status===200){ resolve(xhr.responseText)}
        if(xhr.status===404){ reject('404')}
      }else{
        reject('request fail')
      }
    }
    xhr.send(null)
  })
}


//普通请求
function ajax() {
  let xhr = new XMLHttpRequest() //实例化，以调用方法
  xhr.open('get', 'https://www.google.com')  //参数2，url。参数三：异步
  xhr.onreadystatechange = () => {  //每当 readyState 属性改变时，就会调用该函数。
    if (xhr.readyState === 4) {  //XMLHttpRequest 代理当前所处状态。
      if (xhr.status >= 200 && xhr.status < 300) {  //200-300请求成功
        let string = request.responseText
        //JSON.parse() 方法用来解析JSON字符串，构造由字符串描述的JavaScript值或对象
        let object = JSON.parse(string)
      }
    }
  }
  request.send() //用于实际发出 HTTP 请求。不带参数为GET请求
}



// json 跨域
function jsonp(url,jsonpCallback,success){
const script = document.createElement('script');
script.src=url;
script.async=true;
script.type='text/javascript'
window[jsonpCallback]=function(data){
  success && success(data)
}
document.body.appendChild(script)
}



//eventbus

// 创建一个 Event Bus（本质上也是 Vue 实例）并导出：

// const EventBus = new Vue()
// export default EventBus
// 在主文件里引入EventBus，并挂载到全局：

// import bus from 'EventBus的文件路径'
// Vue.prototype.bus = bus
// 订阅事件：

// // 这里func指someEvent这个事件的监听函数
// this.bus.$on('someEvent', func)
// 发布（触发）事件：

// // 这里params指someEvent这个事件被触发时回调函数接收的入参
// this.bus.$emit('someEvent', params)


class evebtbus{
  constructor(){
    this.handlers={}
  }

  on(eventName,fn){
    if(this.handlers[eventName]){this.handlers(eventName).push(fn)}
    else{
      this.handlers[eventName]=[];
      this.handlers[eventName].push(fn)
    }
  }

  emit(eventName,...args){
    if(this.handlers[eventName]){
      this.handlers[eventName].forEach((callback)=>{ callback(...args)})
    }
  }

  off(eventName,fn){
    if(!fn){
      delete this.handlers[eventName]
    }
    if(! this.handlers[eventName] || this.handlers[eventName].length ==0){
      return true
    }
        fnIndex=this.handlers[eventName].indexof(fn)
        if(fnIndex!=-1){
            this.handlers[eventName].splice(fnIndex,1)
        }

  }

  once(eventName,fn){
    const warpper= (...args)=>{
      fn.apply(...args)
      this.off(eventName,warpper)
    }
    this.on(eventName,warpper)
  }

}


class eventbus{
  constructor(){
    this.handlers={}
  }
  on(eventName,fn){
      if(!this.handlers[eventName]){
          this.handlers[eventName]=[]
      }
      this.handlers[eventName].push(fn)
  }


  off(eventName,fn){
    if(this.handlers[eventName]){
        fnIndex= this.handlers[eventName].indexof(fn)
        if(fnIndex!=-1){ this.handlers[eventName].splice(fnIndex,1)}
    }
  }

  emit(eventName,args){
    if(this.handlers[eventName]){
      this.handlers[eventName].forEach((callback)=>{callback(...args)})
    }
  }
  once(eventName,fn){
    const onceEvent=(...args)=>{
        fn(...args)
        this.on(eventName,onceEvent)
    }
    this.off(eventName,onceEvent)
  }
}

// 不断找到最小的放前面
function selectionSort(arr){
  for(let i=0;i<arr.length-1;i++){
    minIndex=i;
    for(let j=i;j<arr.length;j++){
        if(arr[j]<arr[minIndex]){ minIndex=j}
    }
     if(minIndex!==i){
    [arr[i],arr[minIndex]]=[arr[minIndex],arr[i]]
    }
  }
 return arr
}