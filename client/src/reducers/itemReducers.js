import uuid from "uuid";
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from "../actions/types";

// STATIC DATA FOR TESTING
const initialState = {
  items: [
    { id: uuid.v4(), name: "Eggs" },
    { id: uuid.v4(), name: "Seasoning Salt" },
    { id: uuid.v4(), name: "Cereal" },
    { id: uuid.v4(), name: "Oranges" }
  ]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    default:
      return state;
  }
}
