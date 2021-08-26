import {
    ADD_LIST,
    DRAG_OCCURRED, LIST_ORDER_UPDATE_FAILED, LIST_ORDER_UPDATE_PENDING, LIST_ORDER_UPDATE_SUCCESS,
    REQUEST_LISTS_FAILED,
    REQUEST_LISTS_PENDING,
    REQUEST_LISTS_SUCCESS
} from '../constants';

// Redux action - Fetches lists of the active board
export const requestListsAction = (boardID) => async (dispatch) => {
    dispatch({type: REQUEST_LISTS_PENDING, payload: 'loading'});
    const populatedLists = [];
    try {
        const lists = await fetch(`https://api.trello.com/1/boards/${boardID}/lists?key=${process.env.REACT_APP_TRELLO_API_KEY}&token=${process.env.REACT_APP_AUTHENTICATION_TOKEN}`)
            .then(response => response.json());
        for (const list of lists) {
            const cards = await fetch(`https://api.trello.com/1/lists/${list.id}/cards?key=${process.env.REACT_APP_TRELLO_API_KEY}&token=${process.env.REACT_APP_AUTHENTICATION_TOKEN}`)
                .then(response => response.json());
            populatedLists.push({
                id: list.id,
                title: list.name,
                cards: cards.map((card) => {
                    return {
                        id: card.id,
                        text: card.name
                    };
                })
            });
        }

        const board = await fetch(`https://api.trello.com/1/boards/${boardID}?key=${process.env.REACT_APP_TRELLO_API_KEY}&token=${process.env.REACT_APP_AUTHENTICATION_TOKEN}`)
            .then((response) => response.json());
        const boardName = board.name;
        dispatch({
            type: REQUEST_LISTS_SUCCESS, payload: {
                lists: populatedLists,
                activeBoardName: boardName
            }
        });
    } catch (error) {
        dispatch({type: REQUEST_LISTS_FAILED, payload: {error: error}});
    }
}

// Redux action - Adds a list to the interface (API implementation required)
export const addList = (title) => ({
    type: ADD_LIST,
    payload: title
});

// Redux action - Moves content on the interface
export const sort = (droppableIdStart, droppableIdEnd, droppableIndexStart, droppableIndexEnd, draggableId, type) => ({
    type: DRAG_OCCURRED,
    payload: {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        draggableId,
        type
    }
});

// Redux action - Updates trello list order after sorting occurs
export const updateListsOrder = (lists) => (dispatch) => {
    dispatch({type: LIST_ORDER_UPDATE_PENDING, payload: 'updating'});
    const promises = [];
    lists.forEach((list, index) => {
        promises.push(
            fetch(`https://api.trello.com/1/lists/${list.id}/?pos=${(index + 1) * 10}&key=${process.env.REACT_APP_TRELLO_API_KEY}&token=${process.env.REACT_APP_AUTHENTICATION_TOKEN}`,
                {
                    method: 'PUT'
                })
        );
    });
    Promise.all(promises)
        .then(() => dispatch({type: LIST_ORDER_UPDATE_SUCCESS}))
        .catch(() => dispatch({type: LIST_ORDER_UPDATE_FAILED}));
}
