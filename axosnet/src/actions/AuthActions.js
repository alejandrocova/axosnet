import api from "../apis/api";
import { SET_TOKEN, LOGGIN_OUT, TOGGLE_ERROR_LOGIN } from "./types";
import { showAlert } from ".";

export const logIn = (credentials, history) => async dispatch => {
  await api
    .post("/login/authenticate", credentials)
    .then(response => {
      let { data } = response;
      if (data !== undefined) {
        const user = { token: data };
        sessionStorage.setItem("user", JSON.stringify(user));
        dispatch({ type: SET_TOKEN, payload: user.token });

        history.push("/");
      }
    })
    .catch(error => {
      dispatch(toggleError(true));
    });
};

export const logOut = history => {
  sessionStorage.removeItem("user");
  history.push("/auth");

  return { type: LOGGIN_OUT };
};

export const signUp = credentials => async dispatch => {
  await api
    .post("/login/register", credentials)
    .then(response => {
      let { data } = response;
      if (data !== undefined) {
        dispatch(showAlert(data));
      }
    })
    .catch(error => {
      dispatch(toggleError(true));
    });
};

export const toggleError = visible => {
  return { type: TOGGLE_ERROR_LOGIN, payload: visible };
};

export const updateToken = token => {
  let user = {
    token
  };
  window.sessionStorage.setItem("user", JSON.stringify(user));

  return { type: SET_TOKEN, payload: token };
};
