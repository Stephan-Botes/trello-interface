import {
    REQUEST_BOARDS_PENDING,
    REQUEST_BOARDS_SUCCESS,
    REQUEST_BOARDS_FAILED,
    ADD_BOARD_PENDING,
    ADD_BOARD_SUCCESS,
    ADD_BOARD_FAILED,
    DELETE_BOARD_PENDING,
    DELETE_BOARD_SUCCESS,
    DELETE_BOARD_FAILED,
    EDIT_BOARD_PENDING,
    EDIT_BOARD_SUCCESS,
    EDIT_BOARD_FAILED,
    SET_ACTIVE_BOARD
} from '../constants';

// Redux action - Fetches all boards from user account
export const requestBoardsAction = () => async (dispatch) => {
    dispatch({type: REQUEST_BOARDS_PENDING, payload: 'loading'});
    try {
        const boards = await fetch(`https://api.trello.com/1/members/stephanbotes1/boards?key=${process.env.REACT_APP_TRELLO_API_KEY}&token=${process.env.REACT_APP_AUTHENTICATION_TOKEN}`)
            .then(response => response.json())
        dispatch({type: REQUEST_BOARDS_SUCCESS, payload: boards});
    } catch (error) {
        dispatch({type: REQUEST_BOARDS_FAILED, payload: error});
    }
}

// Redux action - Adds a board to the user account
export const addBoardAction = (newName) => async (dispatch) => {
    dispatch({type: ADD_BOARD_PENDING, payload: 'adding'});
    try {
        const newBoard = await fetch(`https://api.trello.com/1/boards/?name=${newName}&key=${process.env.REACT_APP_TRELLO_API_KEY}&token=${process.env.REACT_APP_AUTHENTICATION_TOKEN}`, {
            method: 'POST'
        })
            .then(response => response.json())
        dispatch({type: ADD_BOARD_SUCCESS, payload: newBoard});
    } catch (error) {
        dispatch({type: ADD_BOARD_FAILED, payload: error});
    }
}

// Redux action - Deletes a board from user account
export const deleteBoardAction = (boardID) => async (dispatch) => {
    dispatch({type: DELETE_BOARD_PENDING, payload: 'deleting'});
    try {
        await fetch(`https://api.trello.com/1/boards/${boardID}?key=${process.env.REACT_APP_TRELLO_API_KEY}&token=${process.env.REACT_APP_AUTHENTICATION_TOKEN}`, {
            method: 'DELETE'
        })
        dispatch({type: DELETE_BOARD_SUCCESS, payload: boardID});
    } catch (error) {
        dispatch({type: DELETE_BOARD_FAILED, payload: error});
    }
}

// Redux action - Edits a board name on user account
export const editBoardAction = (boardID, newName) => async (dispatch) => {
    dispatch({type: EDIT_BOARD_PENDING, payload: 'editing'});
    try {
        await fetch(`https://api.trello.com/1/boards/${boardID}?name=${newName}&key=${process.env.REACT_APP_TRELLO_API_KEY}&token=${process.env.REACT_APP_AUTHENTICATION_TOKEN}`, {
            method: 'PUT'
        })
        dispatch({type: EDIT_BOARD_SUCCESS, payload: {id: boardID, newName: newName}});
    } catch (error) {
        dispatch({type: EDIT_BOARD_FAILED, payload: error});
    }
}

// Redux action - Sets active board ID when clicking a specific board
export const setActiveBoardAction = (boardID) => ({type: SET_ACTIVE_BOARD, payload: boardID});

