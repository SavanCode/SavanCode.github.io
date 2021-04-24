const { result } = require("underscore");

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
Function,prototype.call = function(context,arguments){
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

function  myinstanceof(left,right){
let objProto = left.__proto__;
let prototype = right.prototype;

while(true){
    if(!objProto){
        return false
    }
    if(prototype === objProto){
        return true
    }
    prototype = right.prototype;
    myinstanceof(objProto,prototype)
}
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
  let result = [];
  let count;
  array.array.forEach((element,index) => {
    Promise.resolve(element).then(
      result=>{ res[index]=result;count++}
    )
  });
}