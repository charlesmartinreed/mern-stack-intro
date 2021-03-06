import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

const initialState = {
  msg: {},
  status: null,
  id: null
};

// the server will return the state elements that we need
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      const { msg, status, id } = action.payload;
      return {
        msg,
        status,
        id
      };
    case CLEAR_ERRORS:
      return {
        msg: {},
        status: null,
        id: null
      };
    default:
      return state;
  }
}
