import { combineReducers } from "redux";
import login from "./login";
import balance from "./balance";

export default combineReducers({
    login,
    balance
});
