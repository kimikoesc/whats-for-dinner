import React from 'react'
import store from '../store'
import { connect } from "react-redux";

import { doc, updateDoc, arrayRemove } from "@firebase/firestore";
import db from "../firebase-config";
 
const mapStateToProps = (state) => {
    return { username: state.username, inventory: state.userData}
};

function Inventory(props) {
   const { inventory, username }  = props;
   const usernameRef = doc(db, 'Users', username);

   const removeFromInventory = async (index, item) => {
        store.dispatch({
            type: "remove",
            index: index
        })
        await updateDoc(usernameRef, {
            Inventory: arrayRemove(item)
        })
    };

    return (
        <div>
            {inventory.map((item, index) => {
                return (
                    <span>
                        <button onClick={() => removeFromInventory(index, item)}>{item}</button>
                    </span>
                )
            })}
        </div>
    )
}

export default  connect(mapStateToProps)(Inventory)