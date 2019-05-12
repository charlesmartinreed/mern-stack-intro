import { combineReducers } from "redux";
import itemReducer from "./itemReducers";

// bring together all our other reducers

export default combineReducers({
  item: itemReducer
});
