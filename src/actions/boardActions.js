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
    EDIT_BOARD_FAILED
} from '../constants';

export const requestBoardsAction = () => (dispatch) => {
    dispatch({type: REQUEST_BOARDS_PENDING, payload: 'loading'});
    fetch(`https://api.trello.com/1/members/stephanbotes1/boards?key=${process.env.REACT_APP_TRELLO_API_KEY}&token=${process.env.REACT_APP_AUTHENTICATION_TOKEN}`)
        .then(response => response.json())
        .then(data => dispatch({type: REQUEST_BOARDS_SUCCESS, payload: data}))
        .catch(error => dispatch({type: REQUEST_BOARDS_FAILED, payload: error}))
}

export const addBoardAction = (newName) => (dispatch) => {
    dispatch({type: ADD_BOARD_PENDING, payload: 'adding'});
    fetch(`https://api.trello.com/1/boards/?name=${newName}&key=${process.env.REACT_APP_TRELLO_API_KEY}&token=${process.env.REACT_APP_AUTHENTICATION_TOKEN}`, {
        method: 'POST'
    })
        .then(response => response.json())
        .then(data => dispatch({type: ADD_BOARD_SUCCESS, payload: data}))
        .catch(error => dispatch({type: ADD_BOARD_FAILED, payload: error}));
}

export const deleteBoardAction = (boardID) => (dispatch) => {
        dispatch({type: DELETE_BOARD_PENDING, payload: 'deleting'});
        fetch(`https://api.trello.com/1/boards/${boardID}?key=${process.env.REACT_APP_TRELLO_API_KEY}&token=${process.env.REACT_APP_AUTHENTICATION_TOKEN}`, {
            method: 'DELETE'
        })
            .then(data => dispatch({type: DELETE_BOARD_SUCCESS, payload: boardID}))
            .catch(error => dispatch({type: DELETE_BOARD_FAILED, payload: error}));
    }

export const editBoardAction = (boardID, newName) => (dispatch) => {
    dispatch({type: EDIT_BOARD_PENDING, payload: 'editing'});
    fetch(`https://api.trello.com/1/boards/${boardID}?name=${newName}&key=${process.env.REACT_APP_TRELLO_API_KEY}&token=${process.env.REACT_APP_AUTHENTICATION_TOKEN}`, {
        method: 'PUT'
    })
        .then(data => dispatch({type: EDIT_BOARD_SUCCESS, payload: {id: boardID, newName: newName}}))
        .catch(error => dispatch({type: EDIT_BOARD_FAILED, payload: error}));
}

