import React, { useEffect } from 'react';
import store from '../store';
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {flexible: state.flexible, filter: state.filterOption}
  };


function Filter(props) {
    const { flexible, filter } = props

    const addFilter = (e) => {
        store.dispatch({
            type: "updateFilter",
            item: e.target.value,
        })

        console.log(filter)
    };

    const setFlexibility = (e) => {
        store.dispatch({
            type: "updateFlexibility",
            item: !flexible
        })
    };

    return (
        <div>
            <div className="special-diet">
                <span>Special Diet: </span>
                <input type="radio" id="none" name="input" value="none" onClick={addFilter}/>
                <label>None</label>
                <input type="radio" id="vegan" name="input" value="vegan" onClick={addFilter}/>
                <label>Vegan</label>
                <input type="radio" id="pescatarian" name="input" value="pescatarian" onClick={addFilter}/>
                <label>Pescatarian</label>
            </div>
            <div className="flexible">
                <span>Flexibility: </span>
                <input type="checkbox" id="flexible" name="flexible" value="flexible" onClick={setFlexibility}/>
                <label> I can buy 1 or 2 missing items </label>
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(Filter)
