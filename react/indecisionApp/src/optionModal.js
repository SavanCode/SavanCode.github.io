import React from 'react' 
import Modal from "react-modal"

const OptionModal=(props)=>{
    return (
        <div>
        <Modal 
           isOpen={!!props.pickedOption}
           onRequestClose={props.clearPickedOption}
           ariaHideApp={false}
        >
          <p>{props.pickedOption}</p>
          <button onClick={props.clearPickedOption}>Close Modal</button>
        </Modal>
        </div>
    )
}

export default OptionModal