import { SET_TOKEN, LOGGIN_OUT, TOGGLE_ERROR_LOGIN } from "../actions/types";

const INTIAL_STATE = {
  token: "",
  error: false
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.payload };
    case TOGGLE_ERROR_LOGIN:
      return { ...state, error: action.payload };
    case LOGGIN_OUT:
      return state;
    default:
      return state;
  }
};
