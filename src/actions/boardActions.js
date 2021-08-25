import {
    REQUEST_BOARDS_PENDING,
    REQUEST_BOARDS_SUCCESS,
    REQUEST_BOARDS_FAILED,
    ADD_BOARD_TITLE_PENDING,
    ADD_BOARD_TITLE_SUCCESS,
    ADD_BOARD_TITLE_FAILED,
    EDIT_BOARD_TITLE
} from '../constants';

export const requestBoardsAction = () => (dispatch) => {
    dispatch({type: REQUEST_BOARDS_PENDING, payload: 'loading'});

    fetch(`https://api.trello.com/1/members/stephanbotes1/boards?key=${process.env.REACT_APP_TRELLO_API_KEY}&token=${process.env.REACT_APP_AUTHENTICATION_TOKEN}`)
        .then(response => response.json())
        .then(data => dispatch({type: REQUEST_BOARDS_SUCCESS, payload: data}))
        .catch(error => dispatch({type: REQUEST_BOARDS_FAILED, payload: error}))

    // try {
    //     const response = await fetch(`https://api.trello.com/1/members/stephanbotes1/boards?key=${process.env.REACT_APP_TRELLO_API_KEY}&token=${process.env.REACT_APP_AUTHENTICATION_TOKEN}`)
    //     const data = await response.json();
    //     dispatch({type: REQUEST_BOARDS_SUCCESS, payload: data});
    // } catch (error) {
    //     dispatch({type: REQUEST_BOARDS_FAILED, payload: error});
    // }
}

export const addBoardTitleAction = (newName) => (dispatch) => {
    dispatch({type: ADD_BOARD_TITLE_PENDING, payload: 'adding'});

    fetch(`https://api.trello.com/1/boards/?name=${newName}&key=${process.env.REACT_APP_TRELLO_API_KEY}&token=${process.env.REACT_APP_AUTHENTICATION_TOKEN}`, {
        method: 'POST'
    })
        .then(response => response.json())
        .then(data => dispatch({type: ADD_BOARD_TITLE_SUCCESS, payload: data}))
        .catch(error => dispatch({type: ADD_BOARD_TITLE_FAILED, payload: error}));
}

export const editBoardTitleAction = (listID, newTitle) => {
    return {
        type: EDIT_BOARD_TITLE,
        payload: {
            listID,
            newTitle
        }
    }
}

