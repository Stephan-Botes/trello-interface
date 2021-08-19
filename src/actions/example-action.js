import {CHANGE_ATTRIBUTE} from '../constants';

// This action will take text and return an object of type 'CHANGE_ATTRIBUTE' and send the text as a payload
export const setAttribute = (text) => ({
    type: CHANGE_ATTRIBUTE,
    payload: text
});
