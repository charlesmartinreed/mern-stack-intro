import axios from "axios";
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./types";

// beause we've added our proxy in package.json, we don't need to type the full local URL
// no need to convert to JSON since it's sent to us from the api as JSON
export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  axios.get("/api/items").then(res =>
    dispatch({
      type: GET_ITEMS,
      payload: res.data
    })
  );
};

export const deleteItem = id => {
  return {
    type: DELETE_ITEM,
    payload: id
  };
};

export const addItem = item => {
  return {
    type: ADD_ITEM,
    payload: item
  };
};

// long story short, this sets loading from its initial state of 'false' to 'true'
export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
