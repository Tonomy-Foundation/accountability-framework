import { createStore } from 'redux';
import { LOGIN } from './actions';

const initialState = {
    eosio: null
};

function reducer(state = initialState, action) {
    switch(action.type) {
        case LOGIN:
            return {
                eosio: action.payload
            };
        default:
            return state;
    }
}

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;