```jsx
import React from 'react'
import ReactDOM from 'react-dom'
 
class IndecisionApp extends React.Component{
  render(){
    const title ='Indecision App';
    const subtitle = 'Put your life in the hand of Computer';
    const options = ["option 1","option 2","option 3"]
    return (
      <div>
         <Header title={title} subtitle={subtitle}/>
        <Actions />
        <Options optionArray={options}/>
        <AddOption />
      </div>
    )
  }
}


// class Header extends React.Component{
//   render(){
//     return (
//       <div>
//         <h1>{this.props.title}</h1>
//         <h2>{this.props.subtitle}</h2>
//       </div>
//     )
//   }
// } 

// class Actions extends React.Component{
//   handlePick(){
//     alert("pick!!!");
//   }
//   render(){
//     return (
//       <div>
//         {/* <p>This is Action</p> */}
//         <button onClick={this.handlePick} >What should I do</button>
//       </div>
//     )
//   }
// }

// class Options extends React.Component{
//   constructor(props){
//     super(props);
//     this.removeAll = this.removeAll.bind(this);
//   }
//   removeAll(){
//     console.log(this.props.optionArray);
     
//   }
//   render(){
//     return (
//       <div>
//         Here are option Components from optionArray
//         {
//          (this.props.optionArray).map((option) => {
//             return <Option key={option} optionText={option}/>
//           })
//         } 
//         {/* 绑定“参数的this” */}
//        <button onClick={this.removeAll}> Remove All</button>
//       </div>
//     )
//   }
// }
 
// class Option extends React.Component{
//   render(){
//     return (
//       <div>
//         {/* <p>This is Option Components</p> */}
//         <p>{this.props.optionText}</p>
//       </div>
//     )
//   }
// }
 
//AddOption
class AddOption extends React.Component{
  addOptionFunc(e){
    e.preventDefault();  //防止刷新
    const option = e.target.elements.option.value;//获得输入值
    if(option){
      console.log(option);
      e.target.elements.option.value="";//清空输入值的显示
    }
  } 
  render(){
    return (
      <div>
        <p>This is AddOption Components</p>
        <form onSubmit={this.addOptionFunc}>
          <input type="text" name="option"/>
          <button>+1</button>
        </form>
      </div>
    )
  }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('root'));
```

