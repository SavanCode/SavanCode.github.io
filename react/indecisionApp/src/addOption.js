import React from 'react' 

class AddOption extends React.Component{
    constructor(props){
        super(props); 
        this.state={
            newOption:null
        }
    }

    addOption=(e)=>{
        e.preventDefault();
         //const input=e.target.elements[0].value;
         console.log();
         const option=e.target.elements.newOpt.value;
         
         if(option){
            console.log(option);
            this.props.addOption(option);
            e.target.elements.newOpt.value="";//清空输入值的显示
          }else{
              alert("please enter a vaild option");
          }
    }

    render(){
        return (
            <div>
                <form onSubmit={this.addOption}>
                <input name="newOpt" />
                <button> Add Option</button>
                </form>
            </div>
        )   }
    }

    export default AddOption