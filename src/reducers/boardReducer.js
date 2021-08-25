import {REQUEST_BOARDS_PENDING, REQUEST_BOARDS_SUCCESS, REQUEST_BOARDS_FAILED, ADD_BOARD_TITLE_PENDING, EDIT_BOARD_TITLE} from '../constants';

const initialState = {
    isPending: false,
    boards: [],
    error: ''
}

export const boardReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case REQUEST_BOARDS_PENDING:
            return Object.assign({}, state, {isPending: true});
        case REQUEST_BOARDS_SUCCESS:
            return Object.assign({}, state, {boards: action.payload, isPending: false});
        case REQUEST_BOARDS_FAILED:
            return Object.assign({}, state, {error: action.payload, isPending: false});

        case ADD_BOARD_TITLE_PENDING: {
            return state;
        }

        case EDIT_BOARD_TITLE: {
            // const { listID, newTitle } = action.payload;
            // const list = state[listID];
            // list.title = newTitle;
            // return { ...state, [listID]: list };

        }

        default:
            return state;
    }
}
