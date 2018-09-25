import {combineReducers} from 'redux';
import itemReducer from './itemReducer';
import userReducer from './userReducer';
import recipeReducer from './recipeReducer';

const rootReducer = combineReducers({
    itemReducer,
    userReducer,
    recipeReducer
})

export default rootReducer;