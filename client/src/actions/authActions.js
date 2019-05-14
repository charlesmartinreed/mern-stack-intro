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

// Register User - take in name, email and password
export const register = ({ name, email, password }) => dispatch => {
  // make post request to api/users
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ name, email, password });

  // endpoint returns user/token
  axios
    .post("/api/users", body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      const { data, status } = err.response;
      dispatch(returnError(data, status, "REGISTER_FAIL"));
      //remove token, set state values back to null
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

// Setup axios config/headers
export const tokenConfig = getState => {
  // grab token from local storage, referenced by checking the state. Pass it in the headers for our request.
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
