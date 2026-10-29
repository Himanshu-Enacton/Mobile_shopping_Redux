import { combineReducers } from "redux";
import { reducer } from "./reducer";
import userReducer from "./userReducer";

export default combineReducers({
    reducer,
    users: userReducer,
})