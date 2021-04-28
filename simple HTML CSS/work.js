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
    var context = context ||window;
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