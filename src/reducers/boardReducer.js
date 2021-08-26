import {
    REQUEST_BOARDS_PENDING,
    REQUEST_BOARDS_SUCCESS,
    REQUEST_BOARDS_FAILED,
    ADD_BOARD_SUCCESS,
    ADD_BOARD_FAILED,
    DELETE_BOARD_SUCCESS,
    DELETE_BOARD_FAILED,
    EDIT_BOARD_SUCCESS,
    EDIT_BOARD_FAILED,
    SET_ACTIVE_BOARD
} from '../constants';

const initialState = {
    isPending: false,
    boards: [],
    error: '',
    activeBoardID: '',
    activeBoardName: ''
}

// Redux reducer - Handles all board related actions and updates the store state according to their types
export const boardReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case REQUEST_BOARDS_PENDING:
            return Object.assign({}, state, {isPending: true});
        case REQUEST_BOARDS_SUCCESS:
            return Object.assign({}, state, {boards: action.payload, isPending: false});
        case REQUEST_BOARDS_FAILED:
            return Object.assign({}, state, {error: action.payload, isPending: false});

        case ADD_BOARD_SUCCESS:
            return Object.assign({}, state, {boards: [...state.boards, action.payload]});
        case ADD_BOARD_FAILED:
        case DELETE_BOARD_FAILED:
        case EDIT_BOARD_FAILED:
            return Object.assign({}, state, {error: action.payload});

        case DELETE_BOARD_SUCCESS:
            return Object.assign({}, state, {boards: [...state.boards.filter((board) => board.id !== action.payload)]});

        case EDIT_BOARD_SUCCESS: {
            let newBoard = state.boards.find(board => {
                return board.id === action.payload.id;
            });
            newBoard.name = action.payload.newName;
            // const newBoardIndex = state.boards.indexOf(newBoard);
            // let newState = state.boards;
            // newState.splice(newBoardIndex, 1);
            // newState[newBoardIndex] = newBoard;
            // console.log(newState)
            // console.log(state.boards);
            // return Object.assign({}, state, {boards: newState});

            return Object.assign({}, state, {
                boards: [...state.boards.filter((board) => board.id !== action.payload.id), newBoard]
            });
        }

        case SET_ACTIVE_BOARD:
            return Object.assign({}, state, {activeBoardID: action.payload.activeBoardID});

        default:
            return state;
    }
}
