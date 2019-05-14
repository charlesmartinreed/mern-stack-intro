import axios from "axios";
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./types";
import { tokenConfig } from "./authActions";
import { returnError } from "./errorActions";

// beause we've added our proxy in package.json, we don't need to type the full local URL
// no need to convert to JSON since it's sent to us from the api as JSON
export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  axios
    .get("/api/items")
    .then(res =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })
    )
    .catch(err => {
      const { data, status } = err.response;
      dispatch(returnError(data, status));
    });
};

// tokenConfig is being used to attach the token the headers for authenticated adding/removing of list items

// api returns a new item, which is what we send to the reducer
export const addItem = item => (dispatch, getState) => {
  axios
    .post("/api/items", item, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      })
    )
    .catch(err => {
      const { data, status } = err.response;
      dispatch(returnError(data, status));
    });
};

export const deleteItem = id => (dispatch, getState) => {
  axios
    .delete(`/api/items/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_ITEM,
        payload: id
      })
    )
    .catch(err => {
      const { data, status } = err.response;
      dispatch(returnError(data, status));
    });
};

// long story short, this sets loading from its initial state of 'false' to 'true'
export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
