import { createStore } from 'redux';
import { LOGIN, LOGOUT } from './actions';

const initialState = {
    eosio: null
};

function reducer(state = initialState, action) {
    switch(action.type) {
        case LOGIN:
            return {
                eosio: action.payload
            };
        case LOGOUT:
            return {
                eosio: null
            };
            
        default:
            return state;
    }
}

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;