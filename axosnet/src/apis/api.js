import axios from "axios";

const baseURL = "http://localhost:50691/api/";
export default axios.create({
  baseURL
});
