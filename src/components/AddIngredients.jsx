import React, { createRef } from 'react'
import store from '../store'
import { doc, updateDoc, arrayUnion, arrayRemove } from "@firebase/firestore";
import db from "../firebase-config";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return { username: state.username}
};

function AddIngredients(props) {
    const { username } = props;
    const textInput = createRef();
    const usernameRef = doc(db, 'Users', username);
    
    const addToInventory = async () => {
       store.dispatch({
           type: "add",
           item: textInput.current.value
       })
       await updateDoc(usernameRef, {
           Inventory: arrayUnion(textInput.current.value)
       })
    };

    return (
        <div>
            <input ref={textInput} type="text" placeholder="Enter an ingredient"/>
            <button onClick={addToInventory}> add </button>
        </div>
    )
}

export default connect(mapStateToProps)(AddIngredients)
