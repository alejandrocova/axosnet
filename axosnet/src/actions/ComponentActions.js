import { SHOW_ERR, CLEAR_ERR, SHOW_ALERT, CLEAR_ALERT, TOGGLE_MODAL, SEARCH_LOADING, SEARCH_LOADED } from "./types";

export const showErr = message => {
  return {
    type: SHOW_ERR,
    payload: message
  };
};

export const clearErr = () => {
  return {
    type: CLEAR_ERR
  };
};

export const showAlert = message => {
  return {
    type: SHOW_ALERT,
    payload: message
  };
};

export const clearAlert = () => {
  return {
    type: CLEAR_ALERT
  };
};

export const toggleModal = visible => {
  return { type: TOGGLE_MODAL, payload: visible };
};

export const searchLoading = () => {
  return {
    type: SEARCH_LOADING
  };
};

export const searchLoaded = () => {
  return {
    type: SEARCH_LOADED
  };
};
