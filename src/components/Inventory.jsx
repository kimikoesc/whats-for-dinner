import React, { useState, useEffect } from 'react'
import store from '../store'
import { connect } from "react-redux";
 
const mapStateToProps = (state) => {
    return { userID: state.userID, inventory: state.userData}
};

function Inventory(props) {
   const { inventory }  = props;

    return (
        <div>
            {inventory.map((item) => {
                return (
                    <button key={item}>{item}</button>
                )
            })}
        </div>
    )
}

export default  connect(mapStateToProps)(Inventory)