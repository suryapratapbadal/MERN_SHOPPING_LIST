import {combineReducers} from 'redux';
import itemReducer from './itemReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    itemReducer,
    userReducer
})

export default rootReducer;