import {
  SHOW_ERR,
  CLEAR_ERR,
  SHOW_ALERT,
  CLEAR_ALERT,
  MODAL_LOADING,
  TOGGLE_MODAL,
  SEARCH_LOADING,
  SEARCH_LOADED
} from "../actions/types";

const INTIAL_STATE = {
  err: "",
  alert: "",
  modal: {
    show: false,
    loading: false
  },
  searchLoading: false
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_ERR:
      return { ...state, err: action.payload };
    case CLEAR_ERR:
      return { ...state, err: "" };
    case SHOW_ALERT:
      return { ...state, alert: action.payload };
    case CLEAR_ALERT:
      return { ...state, alert: "" };
    case MODAL_LOADING:
      return { ...state, modal: { show: true, loading: true } };
    case TOGGLE_MODAL:
      return { ...state, modal: { show: action.payload, loading: false } };
    case SEARCH_LOADING:
      return { ...state, searchLoading: true };
    case SEARCH_LOADED:
      return { ...state, searchLoading: false };
    default:
      return state;
  }
};
