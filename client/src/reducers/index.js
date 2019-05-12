import { combineReducers } from "redux";
import itemReducer from "./itemReducer";

// bring together all our other reducers

export default combineReducers({
  item: itemReducer
});
