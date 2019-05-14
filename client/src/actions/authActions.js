import axios from "axios";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "./types";
import { returnError } from "./errorActions";

// Check token and load user; hit api/auth/user
export const loadUser = () => (dispatch, getState) => {
  // first, dispatch to user loading, which sets loading to true in state
  dispatch({ type: USER_LOADING });

  // res.data should hold user data and token
  // run errors through errorReducer
  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then(res => dispatch({ type: USER_LOADED, payload: res.data }))
    .catch(err => {
      const { data, status } = err.response;
      dispatch(returnError(data, status));
      dispatch({ type: AUTH_ERROR });
    });
};

// Setup axios config/headers
export const tokenConfig = getState => {
  // grab token from local storage, referenced by checking the state. Pass it in the headers for our request.
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
