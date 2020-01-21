import { combineReducers } from "redux";
import authReducer from "./authReducer";
import componentsReducer from "./componentsReducer";
import receiptReducer from "./receiptReducer";

export default combineReducers({
  auth: authReducer,
  components: componentsReducer,
  receipt: receiptReducer
});
