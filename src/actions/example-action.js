import {CHANGE_ATTRIBUTE} from '../constants';

export const setAttribute = (text) => ({
    type: CHANGE_ATTRIBUTE,
    payload: text
});
