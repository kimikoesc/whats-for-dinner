import { createStore, combineReducers } from "redux";

const reducer = combineReducers({
    allRecipes: (state = [], action) => {
    let newState = Object.assign([], state);
    if (action.type === 'assignAllRecipe') {
        newState = action.item
    }
    return newState;
    },

    userData: (state = [], action) => {
        let newState = Object.assign([], state);
        if (action.type === 'add') {
            newState.push(action.item);
        } else if (action.type === 'remove') {
            newState.splice(action.index, 1);
        } else if (action.type === 'assign') {
            newState = action.item;
        }
        return newState;
    },

    username: (state = "", action) => {
        if (action.type === 'assignUsername') {
            state = action.item
        }
        return state
    },

    filterOption: (state = "", action) => {
        if (action.type === 'updateFilter') {
            state = action.item
        }
        return state
    },

    flexible: (state = false, action) => {
        if (action.type === 'updateFlexibility') {
            state = action.item
        }
        return state
    },

});

const store = createStore(reducer);

export default store;