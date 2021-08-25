import {ADD_LIST, DRAG_OCCURRED} from '../constants';

export const addList = (title) => ({
    type: ADD_LIST,
    payload: title
});

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
