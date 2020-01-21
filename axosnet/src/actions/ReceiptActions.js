import api from "../apis/api";
import { GET_CURRENCIES, GET_SUPPLIERS, GET_RECEIPTS, MODAL_LOADING } from "./types";
import { logOut, updateToken, toggleModal, searchLoading, searchLoaded } from ".";

export const getCurrencies = (token, history) => async dispatch => {
  let url = "/currencies";
  await api
    .get(url, { headers: { Authorization: `Bearer ${token}` } })
    .then(response => {
      let { Result, Token } = response.data;
      if (Token !== undefined || Token !== "") {
        dispatch(updateToken(Token));
        if (Result !== undefined) {
          dispatch({ type: GET_CURRENCIES, payload: Result });
        }
      } else {
        logOut(history);
      }
    })
    .catch(error => {
      if (error.response === undefined) logOut(history);
    });
};

export const getSuppliers = (token, history) => async dispatch => {
  let url = `/suppliers`;
  await api
    .get(url, { headers: { Authorization: `Bearer ${token}` } })
    .then(response => {
      let { Result, Token } = response.data;
      if (Token !== undefined || Token !== "") {
        dispatch(updateToken(Token));
        if (Result !== undefined) {
          dispatch({ type: GET_SUPPLIERS, payload: Result });
        }
      } else {
        logOut(history);
      }
    })
    .catch(error => {
      if (error.response === undefined) logOut(history);
    });
};

export const getReceipts = (supplierId, currencyId, token, history) => async dispatch => {
  let url = `/receipts/${supplierId}/${currencyId}`;
  dispatch(searchLoading());
  await api
    .get(url, { headers: { Authorization: `Bearer ${token}` } })
    .then(response => {
      let { Result, Token } = response.data;
      if (Token !== undefined || Token !== "") {
        dispatch(searchLoaded());
        dispatch(updateToken(Token));
        if (Result !== undefined) {
          dispatch({ type: GET_RECEIPTS, payload: Result });
        }
      } else {
        logOut(history);
      }
    })
    .catch(error => {
      dispatch(searchLoaded());
      if (error.response === undefined) logOut(history);
    });
};

export const saveReceipts = (receipt, token, history) => async dispatch => {
  let url = "/receipts/";
  dispatch({ type: MODAL_LOADING });
  await api
    .post(url, receipt, { headers: { Authorization: `Bearer ${token}` } })
    .then(response => {
      let { Result, Token } = response.data;
      if (Token !== undefined || Token !== "") {
        dispatch(updateToken(Token));
        if (Result !== undefined) {
          debugger;
          dispatch(getReceipts(receipt.supplierId, receipt.currencyId, token, history));
          dispatch(toggleModal(false));
        }
      } else {
        logOut(history);
      }
    })
    .catch(error => {
      if (error.response === undefined) logOut(history);
      dispatch(toggleModal(false));
    });
};

export const deleteReceipts = (currencyId, token, history) => async dispatch => {
  let url = `/receipts/${currencyId}/`;
  dispatch({ type: MODAL_LOADING });
  debugger;
  await api
    .delete(url, { headers: { Authorization: `Bearer ${token}` } })
    .then(response => {
      let { Result, Token } = response.data;
      debugger;
      if (Token !== undefined || Token !== "") {
        dispatch(updateToken(Token));
        if (Result !== undefined) {
          dispatch(getReceipts("0", "0", token, history));
          dispatch(toggleModal(false));
        }
      } else {
        logOut(history);
      }
    })
    .catch(error => {
      if (error.response === undefined) logOut(history);

      dispatch(toggleModal(false));
    });
};
