import React from 'react'

const Option= (props)=>{
    return(
        <div>
            <li>   {props.optionText} 
                <button  onClick={() => props.remove(props.optionText)} >
                    remove
                </button>
                    </li>
        </div>
    )
}

export default Option