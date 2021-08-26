import {applyMiddleware, combineReducers, createStore} from 'redux';
import {listReducer} from '../reducers/listReducer';
import {boardReducer} from '../reducers/boardReducer';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';

const logger = createLogger();
const rootReducer = combineReducers({listReducer, boardReducer});
const store = createStore(rootReducer, (applyMiddleware(thunkMiddleware, logger)));
// const store = createStore(rootReducer, (applyMiddleware(thunkMiddleware)));

export default store;
