// combines all other reducers
import { combineReducers } from "redux";
import itemReducer from './itemReducer';

export default combineReducers({
    item: itemReducer
});