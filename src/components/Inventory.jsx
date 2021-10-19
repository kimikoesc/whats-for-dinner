import React, { useState, useEffect } from 'react'
import store from '../store'

function Inventory() {
   const [inventory, setInventory] = useState([]);

    const populateInventory = () => {
        const inv = [];
        for (const data of store.getState().userData) {
            inv.push(
                <button key={data}>{data}</button>
            );
        }
        setInventory(inv);
    };

    useEffect(() => {
        populateInventory();
    }, [])

    return (
        <div>
            {inventory}
        </div>
    )
}

export default Inventory