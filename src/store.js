import { createStore, combineReducers } from "redux";

const reducer = combineReducers({
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
    }
});

const store = createStore(reducer);

export default store;