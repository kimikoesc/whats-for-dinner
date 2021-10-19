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
    filterOption: (state = {vegan: false, pescatarian: false, flexible: false}, action) => {
        let newState = Object.assign({}, state);
        if (action.type === "updateFilter") {
           if (action.key === "vegan") {
            newState.vegan = !newState.vegan
           } else if (action.key === "pescatarian") {
            newState.pescatarian = !newState.pescatarian
           } else if (action.key === "flexible") {
            newState.flexible = !newState.flexible
           }
        }
        return newState
    },
});

const store = createStore(reducer);

export default store;