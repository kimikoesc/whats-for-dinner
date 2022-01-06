import React, { useState, createRef } from 'react'
import store from '../store'
import { doc, updateDoc, arrayUnion } from "@firebase/firestore";
import db from "../firebase-config";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return { username: state.username}
};

function AddIngredients(props) {
    const { username } = props;
    const textInput = createRef();
    const usernameRef = doc(db, 'Users', username);
    const [added, setAdded] = useState(false);
    const [invalid, setInvalid] = useState(false);
    
    const addToInventory = async () => {
        if (textInput.current.value.length > 2) {
            store.dispatch({
                type: "add",
                item: textInput.current.value.toLowerCase()
            })
            await updateDoc(usernameRef, {
                Inventory: arrayUnion(textInput.current.value.toLowerCase())
            })
            setInvalid(false)
            setAdded(true)
        } else {
            setInvalid(true)
            setAdded(false)
        }
    };

    return (
        <div>
            <input ref={textInput} type="text" placeholder="Enter an ingredient"/>
            <button onClick={addToInventory}> add </button>
            { invalid ? 
            <div className="add-error">
                    <p> Please enter a valid ingredient. </p>
            </div> 
            : null }
            { added ?
            <div className="add-confirmed">
                <p> Added! </p>
            </div> 
            : null }
        </div>
    )
}

export default connect(mapStateToProps)(AddIngredients)
