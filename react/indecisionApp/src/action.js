import React from 'react' 


const Action =(props)=>{
    console.log(props.active)
        return (
        <div>
            <button disabled={props.active<=0} onClick={props.hanldPickOption} >What should I do</button>
        </div>)
    } 
    export default Action