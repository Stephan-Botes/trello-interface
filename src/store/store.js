import {combineReducers, createStore} from 'redux';
import {changeAttribute} from '../reducers/example-reducer';

const rootReducer = combineReducers({changeAttribute});
const store = createStore(rootReducer);

export default store;
