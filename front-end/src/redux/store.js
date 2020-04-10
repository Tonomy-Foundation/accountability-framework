import { createStore } from 'redux';
import { LOGIN } from './actions';

const initialState = {
    eosio: null
};

function reducer(state = initialState, action) {
    console.log('reducer', state, action);

    switch(action.type) {
        case LOGIN:
        return {
            count: state.count + 1
        };
        default:
        return state;
    }
}

const store = createStore(reducer);

export default store;