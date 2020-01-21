import { GET_CURRENCIES, GET_SUPPLIERS, GET_RECEIPTS } from "../actions/types";

const INTIAL_STATE = {
  receipts: [],
  currencies: [],
  suppliers: []
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case GET_CURRENCIES:
      return { ...state, currencies: action.payload };
    case GET_SUPPLIERS:
      return { ...state, suppliers: action.payload };
    case GET_RECEIPTS:
      return { ...state, receipts: action.payload };
    default:
      return state;
  }
};
