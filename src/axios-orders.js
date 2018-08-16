import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://react-galala-burger.firebaseio.com/"
});

export default AxiosInstance;