import uuid from "uuid";
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from "../actions/types";

// STATIC DATA FOR TESTING
const initialState = {
  items: [
    { id: uuid.v4(), name: "Eggs" },
    { id: uuid.v4(), name: "Seasoning Salt" },
    { id: uuid.v4(), name: "Cereal" },
    { id: uuid.v4(), name: "Bread" }
  ]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state
      };
    case ADD_ITEM:
      return {
        ...state
      };
    case DELETE_ITEM:
      return {
        ...state
      };
    default:
      return state;
  }
}
