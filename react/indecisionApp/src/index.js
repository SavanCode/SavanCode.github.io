import React from 'react'
import ReactDOM from 'react-dom' 
import Header from './header.js'
import Action from './action.js'
import Options from './options.js'
import AddOption from './addOption.js'
import OptionModal from './optionModal.js'


class IndecisionApp extends React.Component{
    constructor(props){
        super(props);
        this.state={
            options : ["option 1","option 2","option 3"],//options : [ ]
            pickedOption:null,
        }
    }

    hanldPickOption=()=>{
        console.log("pick >>>>>");
        const randomNum= Math.floor(Math.random() * this.state.options.length) 
        //alert( this.state.options[randomNum]);
        this.setState(()=>({
            pickedOption: this.state.options[randomNum]
        }))
    }

    handleRemoveAll=()=>{
        console.log("remove all");
        this.setState(()=>({
            options: []
        }))
    }
    //remove specific option 
    handleRemove=(optionValue)=>{ 
        console.log("remove this ",optionValue);
        this.setState(()=>({
            options: this.state.options.filter(function (elem, index, arr) {
                return  elem !== optionValue
              })
        }))
    }
    //get input value ; new add, existed & null out 
    handleAddOption=(newOption)=>{
        //e.preventDefault(); 
        console.log("new option", newOption);
        // if(newOption==""){
        //     alert("please enter a vaild option");
        //     return ;
        // }
        if(this.state.options.indexOf(newOption)>= 0){
            alert("option existed, please add a new option");
            return ;
        }
        console.log("adding >>> ",newOption);
        this.setState(()=>({
            options: this.state.options.concat(newOption)//为什么不能用push？？？？？？？？？
        }))
    }
    
    //clear picked option
    clearPickedOption=()=>{
        console.log("clearing")
        this.setState(()=>({
            pickedOption:null
        }))
        console.log(this.state.pickedOption);
    }

    componentDidUpdate(prevProps,prevState){
        if(prevState.options.length !== this.state.options.length){
                console.log("options changed")
                const json =JSON.stringify(this.state.options);
                localStorage.setItem('option',json);
        }
    }
    componentDidMount(){

    try{
        const json=localStorage.getItem('option');
        const options=JSON.parse(json);
        this.setState({
            options,
        })
    }catch(error){
        
    }
       
    }

    render(){
        const subtitle = 'Put your life in the hands of a computer'
        return(
            <div>
                <Header subtitle={subtitle}/>
                {/* What should i do  render pick- 弹窗+产生随机数 */}
                <Action active={this.state.options.length} hanldPickOption={this.hanldPickOption} />
                {/* show all options+ remove all + remove one */}
                <Options options={this.state.options} removeAll={this.handleRemoveAll} remove={this.handleRemove}/>
                {/* add one option */}
                <AddOption addOption={this.handleAddOption}/>
                {/* 弹框 */}
                <OptionModal pickedOption={this.state.pickedOption} clearPickedOption={this.clearPickedOption} />  
            </div>
        )
    }
}
ReactDOM.render( <IndecisionApp />, document.getElementById('root'));


                 



































// import React from 'react'
// import ReactDOM from 'react-dom'
 
// class IndecisionApp extends React.Component{
//   constructor(props){
//       super(props);
//       this.state={
//         options : ["option 1","option 2","option 3"]
//         //options : []
//       }
//       this.handlePick=this.handlePick.bind(this);
//       this.removeAll=this.removeAll.bind(this);
//   }

//   handlePick(){
//     const randomNum= Math.floor(Math.random() * this.state.options.length) 
//     alert( this.state.options[randomNum]);
//   }

//   removeAll(){
//       this.setState((prevState)=>{
//         return {
//           option: []}
//     });
//     }
//   handleAddOption(option){
//         if(!option){
//             return "enter a vaild value to add option";
//         }else if(this.state.options.indexOf(option)>-1){
//             return "this option alreay exist";
//         }
//         this.setState((prevState)=>{
//           return {option: prevState.options.concat(option)}
//         })
//     }

//   render(){
//     const title ='Indecision App';
//     const subtitle = 'Put your life in the hand of Computer';
     
//     return (
//       <div>
//          <Header title={title} subtitle={subtitle}/>
//         <Actions hasOptions={this.state.options.length>0} handlePick={this.handlePick} />
//         <Options optionArray={this.state.options}/>
//         <AddOption handleAddOption={this.handleAddOption}/>
//       </div>
//     )
//   }
// }

// const Header=(props)=>{
//   return(
//     <div>
//     <h1>{props.title}</h1>
//     {props.subtitle && <h2>{props.subtitle}</h2>}
//   </div>
//   );
// }
// //此处为默认
// Header.defaultProps={
//   title:'Default Title'
// }

// const Actions = (props)=>{
//   return (
//     <div> 
//         <button onClick={props.handlePick} >What should I do</button>
//     </div>
//   )
// }

// const Options = (props)=>{
//   return (
//     <div>
//       Here are option Components from optionArray 
//       {
//        (props.optionArray).map((option) => {
//           return <Option key={option} optionText={option}/>
//         })}
        
//      {/* <button onClick={removeAll}> Remove All</button> */}
//     </div>
//   )
// }

// const Option = (props)=>{
//   return(
//     <div> 
//       <p>{props.optionText}</p>
//       <button onClick={()=>{props.deleteFunc(props.inputText)}}>remove this</button>
//     </div>
//   )
// }

// //AddOption
// class AddOption extends React.Component{
//   // addOptionFunc(e){
//   //   e.preventDefault();  //防止刷新
//   //   const option = e.target.elements.option.value;//获得输入值
//   //   if(option){
//   //     console.log(option);

//   //     e.target.elements.option.value="";//清空输入值的显示
//   //   }
//   // } 
//   render(){
//     return (
//       <div>
//         <p>This is AddOption Components</p>
//         <form onSubmit={this.props.handleAddOption}>
//           <input type="text" name="option"/>
//           <button>+1</button>
//         </form>
//       </div>
//     )
//   }
// }

// ReactDOM.render(<IndecisionApp />, document.getElementById('root'));


// //import React from 'react'
// //import ReactDOM from 'react-dom'
// // class Toggle extends React.Component{
// //   constructor(props){
// //     super(props);
// //     this.toggle=this.toggle.bind(this);
// //     this.state={
// //       visibility: false,
// //     }
// //   }
  
// //  toggle(e){
// //     console.log("this is click",this.state.visibility);
// //     this.setState((prevState)=>{
// //       return{ visibility:!prevState.visibility}
// //     })
// //     }
// //   render(){
// //     return (
// //       <div>
// //         <h1>Visibility Toggle</h1>  
// //         <button onClick={this.toggle}>{this.state.visibility? "Show Detail" : "Hide Detail"}</button>
// //          {/*根据visibility显示*/}
// //          {/* {visibility? <p></p> : <p>This is the c/1//ontent</p>} */}
// //          {this.state.visibility && (<p>This is the content</p>)}
// //         </div>
// //     )
// //   }
// // }
// // ReactDOM.render( <Toggle />, document.getElementById('root')); 





// // class Counter extends React.Component{
// //   constructor(props){
// //     super(props);
// //     this.addone=this.addone.bind(this);
// //     this.minuseone=this.minuseone.bind(this);
// //     this.reset=this.reset.bind(this);
// //     this.state={ count:100 }
// //   }

// //   addone(){
// //     this.setState((prevState)=>{
// //        return {
// //          count: prevState.count+1}
// //     });
// //   }
// //   minuseone(){
// //     this.setState((prevState)=>{
// //       return {
// //         count: prevState.count-1}
// //    });
// //   }
// //   reset(){
// //     this.setState((prevState)=>{
// //       return {
// //         count: 0}
// //    });
// //   }

// //   render() {
// //     return (
// //     <div>
// //     <h1>Count: {this.state.count} </h1>
// //     <button onClick={this.addone }> +1</button>
// //     <button onClick={this.minuseone}> -1</button>
// //     <button onClick={this.reset}> reset</button>
// //     </div>
// //     )
// //   }
// // }

// // ReactDOM.render( <Counter />, document.getElementById('root'));

// import React,{Component} from 'react';
// import {render} from 'react-dom';
// import './index.css';

// class CommentInput extends Component{
//     constructor(){
//         super();
//         this.state={
//             username:'',
//             content:''
//         }
//     }

//     handleUsernameChange=(event)=>{
//         this.setState({
//             username:event.target.value
//         })
//     };

//     handleContentChange=(event)=>{
//         this.setState({
//             content:event.target.value
//         })
//     };

//     handleSubmit=()=>{
//         if(this.props.submit){
//             this.props.submit({
//                 username:this.state.username,
//                 content:this.state.content,
//                 createTime:+new Date()
//             })
//         }
//         this.setState({
//             content:''
//         })
//     };

//     handleUsernameHold=(event)=>{
//         localStorage.setItem('username',event.target.value)
//     };

//     componentWillMount(){
//         const username=localStorage.getItem('username');
//         if(username){
//             this.setState({username})
//         }
//     }

//     componentDidMount(){
//         this.input.focus();
//     };

//     render(){
//         return(
//             <div className='comment-input'>
//                 <div className='comment-field'>
//                     <span className='comment-field-name'>用户名：</span>
//                     <div className='comment-field-input'>
//                         <input
//                             ref={(input)=>this.input=input}
//                             value={this.state.username}
//                             onBlur={this.handleUsernameHold}
//                             onChange={this.handleUsernameChange}
//                         />
//                     </div>
//                 </div>
//                 <div className='comment-field'>
//                     <span className='comment-field-name'>评论内容：</span>
//                     <div className='comment-field-input'>
//                         <textarea
//                             value={this.state.content}
//                             onChange={this.handleContentChange}
//                         />
//                     </div>
//                 </div>
//                 <div className='comment-field-button'>
//                     <button onClick={this.handleSubmit}>
//                         发布
//                     </button>
//                 </div>
//             </div>
//         )
//     }
// }

// class CommentList extends Component{

//     constructor(){
//         super();
//         this.state={
//             items:[]
//         }
//     }

//     render(){
//         return(
//             <div>
//                 {this.props.items.map((item,index)=><Comment deleteItem={this.props.deleteItem} item={item} index={index} key={index}/>)}
//             </div>
//         )
//     }
// }

// class Comment extends Component{
//     constructor(){
//         super();
//         this.state={
//             timeString:''
//         }
//     }

//     handleTimeString=()=>{
//         const item=this.props.item;
//         const duration=(+Date.now()-item.createTime)/1000;
//         return duration>60?`${Math.round(duration/60)}分钟前`:`${Math.round(Math.max(duration,1))}秒前`;
//     };

//     handleDelete=()=>{
//         if(this.props.deleteItem){
//             this.props.deleteItem(this.props.index)
//         }
//     };

//     render(){
//         return(
//             <div className='comment'>
//                 <div className='comment-user'>
//                     <span className='comment-username'>{this.props.item.username} </span>：
//                 </div>
//                 <p>{this.props.item.content}</p>
//                 <span className="comment-delete" onClick={this.handleDelete}>删除</span>
//                 <span className="comment-createdtime">
//                     {this.handleTimeString()}
//                 </span>
//             </div>
//         )
//     }
// }

// class CommentApp extends Component{
//     constructor(){
//         super();
//         this.state={
//             items:[]
//         }
//     }

//     handleSubmit=(item)=>{
//         this.state.items.push(item);
//         this.setState({
//             items:this.state.items
//         });
//         localStorage.setItem('items',JSON.stringify(this.state.items))
//     };

//     handleDelete=(index)=>{
//         console.log(index);
//         this.state.items.splice(index,1);
//         this.setState({
//             items:this.state.items
//         });
//         localStorage.setItem('items',JSON.stringify(this.state.items))
//     };

//     componentWillMount(){
//         let items=localStorage.getItem('items');
//         if(items){
//             items=JSON.parse(items);
//             this.setState({items})
//         }
//     };

//     render(){
//         return(
//             <div className="wrapper">
//                 <CommentInput submit={this.handleSubmit} />
//                 <CommentList deleteItem={this.handleDelete} items={this.state.items}/>
//             </div>
//         )
//     }
// }

// class Index extends Component{
//     render(){
//         return(
//             <div>
//                 <CommentApp/>
//             </div>
//         )
//     }
// }

// render(<Index/>,document.getElementById('root'));