import React, { createRef } from 'react'
import store from '../store'


function AddIngredients() {
    let textInput = createRef();

    const addToInventory = () => {
       store.dispatch({
           type: "add",
           item: textInput.current.value
       })

       
    };

    return (
        <div>
            <input ref={textInput} type="text" placeholder="Enter an ingredient"/>
            <button onClick={addToInventory}> add </button>
        </div>
    )
}

export default AddIngredients
