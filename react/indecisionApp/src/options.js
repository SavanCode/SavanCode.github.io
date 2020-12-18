import React from 'react' 
import Option from './option.js'

const Options = (props)=>{
    return (
        <div>
            {props.options.length === 0 && <p>Add an option to started!</p>}
            <ul>
            {/* {props.options.map((i) => <li key={i}>{i} <button onClick={props.remove}> remove </button></li>)}  */}
            {props.options.map((e,i) => <Option key={e} optionText={e} remove={props.remove}/>)}

            </ul>
            <button onClick={props.removeAll}>Remove all</button>
        </div>
    )
}
export default Options