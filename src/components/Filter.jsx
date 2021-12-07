import React, { useEffect } from 'react';
import store from '../store'

function Filter() {
    const addFilter = (e) => {
        store.dispatch({
            type: "updateFilter",
            key: e.target.value,
        })
    };

    return (
        <div>
            <div className="special-diet">
                <span>Special Diet: </span>
                <input type="checkbox" id="vegan" name="vegan" value="vegan" onClick={addFilter}/>
                <label>Vegan</label>
                <input type="checkbox" id="pescatarian" name="pescatarian" value="pescatarian" onClick={addFilter}/>
                <label>Pescatarian</label>
            </div>
            <div className="flexible">
                <span>Flexibility: </span>
                <input type="checkbox" id="flexible" name="flexible" value="flexible" onClick={addFilter}/>
                <label> I can buy 1 or 2 missing items </label>
            </div>
        </div>
    )
}

export default Filter
