import {CHANGE_ATTRIBUTE} from '../constants';

const initialState = {
    attribute: ''
}

export const changeAttribute = (state=initialState, action={}) => {
    switch (action.type) {
        case CHANGE_ATTRIBUTE:
            // return Object.assign({}, state, {attribute: action.payload})
            return Object.assign(...state, {attribute: action.payload})
        default:
            return state;
    }
}
