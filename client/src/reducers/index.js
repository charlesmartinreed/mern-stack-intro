import { combineReducers } from "redux";
import itemReducer from "./itemReducers";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

// bring together all our other reducers

export default combineReducers({
  item: itemReducer,
  error: errorReducer,
  auth: authReducer
});
