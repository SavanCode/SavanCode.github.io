---
title: react-1week Day 6 - react-hooks
top: false
cover: false
toc: true
mathjax: true
date: 2021-01-01 21:00:43
password:
summary:
tags: React
categories: React
---

# react-hooks

## useState()使用- 简单state

> 不要尝试在循环或条件等不稳定的代码结构中编写

### 练习例子

count

```jsx
import React, { useState } from 'react'
import ReactDOM from 'react-dom'; 
import reportWebVitals from './reportWebVitals';

const App =(props)=>{
  //完全改变全部的值 改变部分的话还是用类组件
  const [count,setConut] =useState(props.count);
  const [text,setText] =useState('');


  return(
    <div>
      <p>The current { text || "count"} is {count}</p>
      <button onClick={()=>setConut(count+1)}>+1</button>
      <button onClick={()=>setConut(count-1)}>-1</button>
      <button onClick={()=>setConut(props.count)}>reset</button>
      <input value={text} onChange={(e)=>setText(e.target.value)}/>
    </div>
  )
}
 
App.defaultProps={
  count:0
}

ReactDOM.render(  <App /> , document.getElementById('root'));
```

note-增加减

```jsx
const NodeApp =()=>{
  const [note,setNotes] =useState([]);
  const [title,setTitle] = useState('');
  const [body,setBody] = useState('');
 
  const addNote=(e)=>{
    e.preventDefault();
    setNotes([...note,{title,body}]);
    setTitle('');
    setBody('')
  }
  const removeOne=(title)=>{ 
    setNotes(note.filter((note)=>{return note.title!==title}))
  }

  console.log({note},{title},{body});
  return(
    <div>
      <h1> Notes</h1> 
       {note.map((element)=>{
          return(
            <div key={element.title}>
              {element.title}
              {element.body}
              <button onClick={()=>removeOne(element.title)}> Remove this</button>
            </div>
          )
        })}
      <p>Add notes</p>
      <form onSubmit={addNote}>
      <input value={title} onChange={(e)=>setTitle(e.target.value)}/>
      <textarea value={body} onChange={(e)=>setBody(e.target.value)} />
      <button>add note</button>
      </form>
    </div>
  )
}

ReactDOM.render(  <NodeApp /> , document.getElementById('root'));
```

## useEffect()使用 - 观察函数

### 练习例子 - 加入localstorage

```jsx
const NodeApp =()=>{
  const NotesData =JSON.parse(localStorage.getItem('notes'));
  const [note,setNotes] =useState(NotesData || []);
  const [title,setTitle] = useState('');
  const [body,setBody] = useState('');
 
  const addNote=(e)=>{
    e.preventDefault();
    setNotes([...note,{title,body}]);
    setTitle('');
    setBody('')
  }
  const removeOne=(title)=>{ 
    setNotes(note.filter((note)=>{return note.title!==title}))
  }
  useEffect(()=>{
    localStorage.setItem('notes',JSON.stringify(note))
  })

  console.log({note},{title},{body});
  return(
    <div>
      <h1> Notes</h1> 
       {note.map((element)=>{
          return(
            <div key={element.title}>
              {element.title}
              {element.body}
              <button onClick={()=>removeOne(element.title)}> Remove this</button>
            </div>
          )
        })}
      <p>Add notes</p>
      <form onSubmit={addNote}>
      <input value={title} onChange={(e)=>setTitle(e.target.value)}/>
      <textarea value={body} onChange={(e)=>setBody(e.target.value)} />
      <button>add note</button>
      </form>
     
    </div>
  )
}

ReactDOM.render(  <NodeApp /> , document.getElementById('root'));
```

### 用法二： 限制useeffect()发生条件以及次数

#### 练习例子 - 基本应用

```jsx
const App =(props)=>{
  //完全改变全部的值 改变部分的话还是用类组件
  const [count,setConut] =useState(props.count);
  const [text,setText] =useState('');

//只有当某个state变化的时候，避免重复渲染
useEffect(()=>{
  console.log("I am running while state change");
  document.title=count;
},[count])


//只运行一次，尤其为了读取数据
useEffect(()=>{
  console.log("Only once"); 
},[])

  return(
    <div>
      <p>The current { text || "count"} is {count}</p>
      <button onClick={()=>setConut(count+1)}>+1</button>
      <button onClick={()=>setConut(count-1)}>-1</button>
      <button onClick={()=>setConut(props.count)}>reset</button>
      <input value={text} onChange={(e)=>setText(e.target.value)}/>
    </div>
  )
}
 
App.defaultProps={
  count:0
}
```



#### 练习例子 - 深入应用

```jsx
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'; 
import reportWebVitals from './reportWebVitals';

const App =(props)=>{
  //完全改变全部的值 改变部分的话还是用类组件
  const [count,setConut] =useState(props.count);
  const [text,setText] =useState('');

//只有当某个state变化的时候，避免重复渲染
useEffect(()=>{
  console.log("I am running while state change");
  document.title=count;
},[count])


//只运行一次，尤其为了读取数据
useEffect(()=>{
  console.log("Only once"); 
},[])

  return(
    <div>
      <p>The current { text || "count"} is {count}</p>
      <button onClick={()=>setConut(count+1)}>+1</button>
      <button onClick={()=>setConut(count-1)}>-1</button>
      <button onClick={()=>setConut(props.count)}>reset</button>
      <input value={text} onChange={(e)=>setText(e.target.value)}/>
    </div>
  )
}
 
App.defaultProps={
  count:0
}

ReactDOM.render(  <App /> , document.getElementById('root'));
```

### 练习例子 - 用法三：本身return

```jsx
const NodeApp =()=>{
  const [note,setNotes] =useState([]);
  const [title,setTitle] = useState('');
  const [body,setBody] = useState('');
 
  const addNote=(e)=>{
    e.preventDefault();
    setNotes([...note,{title,body}]);
    setTitle('');
    setBody('')
  }
  
  const removeOne=(title)=>{ 
    setNotes(note.filter((note)=>{return note.title!==title}))
  }
  
  //此处2个useEffect顺序绝对不能错，不然取不出
  useEffect(()=>{
    const NotesData =JSON.parse(localStorage.getItem('notes')); 
    if(NotesData){
      setNotes(NotesData);
    }
  },[])
  
  useEffect(()=>{
    localStorage.setItem('notes',JSON.stringify(note))
  },[note])


  console.log({note},{title},{body});
  return(
    <div>
      <h1> Notes</h1> 
       {note.map((element)=>{
          return(
            <div >
              <NoteItem key={element.title} note={element} removeOne={removeOne}/>
            </div>
          )
        })}
      <p>Add notes</p>
      <form onSubmit={addNote}>
      <input value={title} onChange={(e)=>setTitle(e.target.value)}/>
      <textarea value={body} onChange={(e)=>setBody(e.target.value)} />
      <button>add note</button>
      </form>
     
    </div>
  )
}

const NoteItem =({note,removeOne})=>{
  useEffect(()=>{
    console.log("starting");
    return ()=>{
      console.log("cleaning up")
    }
  })
  return(
    <div> 
      {note.title}
      {note.body}
      <button onClick={()=>removeOne(note.title)}> Remove this</button>
    </div>
  )
} 
ReactDOM.render(  <NodeApp /> , document.getElementById('root'));
```

## useReducer()使用（复杂的state）

### 适用场景

 1. 复杂的数据类型，需要差量更新
 2. 可以获取到上一次的数据
 3. 性能优化：稳定的 dispatch 句柄

### 例子

Redux 提供了状态管理方案，在这里你也可以使用 useReducer。

```js
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

借鉴了阮一峰老师的计数器实例：

```jsx
const myReducer = (state, action) => {
  switch (action.type) {
    case "countUp":
      return {
        ...state,
        count: state.count + 1
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(myReducer, { count: 0 });
  return (
    <div className="App">
      <button onClick={() => dispatch({ type: "countUp" })}>+1</button>
      <p>Count: {state.count}</p>
    </div>
  );
}
```

### 练习例子

count

```jsx
function reducer(state: { count: number }, action: { type: 'increment' | 'decrement' }) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

export default function UseReducer() {
  console.warn('render1');
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <>
      Count: {state.count}
      <br />
      <br />
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </>
  );
}
```

notes

```jsx
const notesReducer=(state,action)=>{
switch(action.type){
  case 'POPULATE':
    return action.note
  case 'ADD':
    return [...state,{title:action.title,body:action.body}]
  case 'REMOVE':
    return state.filter((element)=>element.title !== action.title)
  default:
    return state
  }
}

const NodeApp =()=>{
  //const [note,setNotes] =useState([]);
  const [note,Dispatch] = useReducer(notesReducer,[{title:'111',body:'222'}])
  const [title,setTitle] = useState('');
  const [body,setBody] = useState('');
 
  const addNote=(e)=>{
    e.preventDefault();
    //setNotes([...note,{title,body}]); 
    Dispatch({type:'ADD',title,body})
    setTitle('');
    setBody('')
  }
  
  const removeOne=(title)=>{ 
    //setNotes(note.filter((note)=>{return note.title!==title}))
    Dispatch({type:'REMOVE',title});
  }
  
  //此处2个useEffect顺序绝对不能错，不然取不出
  useEffect(()=>{
    const note =JSON.parse(localStorage.getItem('notes')); 
    if(note){
      //setNotes(NotesData);
      Dispatch({type:'POPULATE',note});
    }
  },[])
  
  useEffect(()=>{
    localStorage.setItem('notes',JSON.stringify(note))
  },[note])

  console.log({note},{title},{body});
  return(
    <div>
      <h1> Notes</h1> 
       {note.map((element)=>{
          return(
            <div >
              <NoteItem key={element.title} note={element} removeOne={removeOne}/>
            </div>
          )
        })}
      <p>Add notes</p>
      <form onSubmit={addNote}>
      <input value={title} onChange={(e)=>setTitle(e.target.value)}/>
      <textarea value={body} onChange={(e)=>setBody(e.target.value)} />
      <button>add note</button>
      </form>
     
    </div>
  )
}

const NoteItem =({note,removeOne})=>{
  useEffect(()=>{
    console.log("starting");
    return ()=>{
      console.log("cleaning up")
    }
  })
  return(
    <div> 
      {note.title}
      {note.body}
      <button onClick={()=>removeOne(note.title)}> Remove this</button>
    </div>
  )
}
ReactDOM.render(  <NodeApp /> , document.getElementById('root'));
```

## useContext()使用

适用场景：

1. 状态共享

当组件上层最近的 <SizeContext.Provider> 更新时，该 Hook 会触发重渲染，并使用最新传递给 SizeContext provider 的 context value 值。

```jsx
//NodeApp.js
import notesReducer from '../reducers/notes' 
import React, { useEffect, useReducer } from 'react'
import NoteList from './NoteList'
import AddNoteForm from './AddNoteForm'
import NotesContext from '../contexts/notes-context'

const NodeApp =()=>{
    //const [note,setNotes] =useState([]);
    const [note,Dispatch] = useReducer(notesReducer,[{title:'111',body:'222'}])
    
    //此处2个useEffect顺序绝对不能错，不然取不出
    useEffect(()=>{
      const note =JSON.parse(localStorage.getItem('notes')); 
      if(note){
        //setNotes(NotesData);
        Dispatch({type:'POPULATE',note});
      }
    },[])
    
    
    useEffect(()=>{
      localStorage.setItem('notes',JSON.stringify(note))
    },[note]) 

    return(
        // 原本只是div包裹 由于使用provider share 变量 所以下面元素的传入值都可以不用了
      <NotesContext.Provider value={{note,Dispatch}}>
        <h1> Notes</h1> 
        <NoteList />
      </NotesContext.Provider>
    )
  }
  export default NodeApp
```

 

`<NoteList>`组件

```jsx
import React, { useContext } from 'react' 
import NoteItem from './Note'
import NotesContext from '../contexts/notes-context'

const NoteList = ()=> {
const {note} = useContext(NotesContext);
    return(
        <div>
        {note.map((element)=>{
                return(
                <div >
                    <NoteItem key={element.title} note={element}/>
                </div>
                )
            })}
        </div>
    )
}
export default NoteList
```

`<NoteItem>`组件

```jsx
import React, { useContext,useEffect } from 'react'
import NotesContext from '../contexts/notes-context'

const NoteItem =({note})=>{

    const {Dispatch} = useContext(NotesContext);

    const removeOne=(title)=>{ 
        //setNotes(note.filter((note)=>{return note.title!==title}))
        Dispatch({type:'REMOVE',title});
      }

    useEffect(()=>{
      console.log("starting");
      return ()=>{
        console.log("cleaning up")
      }
    })
    return(
      <div> 
        {note.title}
        {note.body}
        <button onClick={()=>removeOne(note.title)}> Remove this</button>
      </div>
    )
  }
  export default NoteItem
```

## 自定义hooks

### 练习例子 - mouseEvent

自定义文件

```jsx
import React, { useContext,useEffect, useState } from 'react' 

const Mousemove =()=>{
        const [position,setPosition] =useState({x:0,y:0})

        useEffect(()=>{
            console.log("starting");
              const mouseEvent =(e)=>{
                  setPosition({
                      x:e.pageX,
                      y:e.pageY
                  })
              }
              document.addEventListener('mousemove',mouseEvent)
      
            return ()=>{
              console.log("cleaning up");
              document.removeEventListener('mousemove',mouseEvent)
            }
          },[])
          return position
}
```

总文件中

```jsx
const position =Mousemove(); 
```

# 建议阅读市面上一些优秀 hooks 库的源码

[react-use](https://github.com/streamich/react-use)

[awesome-react-hooks](https://github.com/rehooks/awesome-react-hooks)

[@umi/hooks](https://github.com/umijs/hooks)