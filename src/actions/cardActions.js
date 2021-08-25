import {ADD_CARD} from '../constants';

export const addCard = (listId, text) => ({
    type: ADD_CARD,
    payload: {listId, text}
});
