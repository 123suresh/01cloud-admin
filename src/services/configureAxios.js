import axios from "axios";

import { RESTAPI_ENDPOINT } from "../constants/general";
import { logout } from "../pages/login/redux/actions";
import createStore from "../redux/createStore";
import toast from "../components/toast/Toast";
import axiosRetry from "axios-retry";

axiosRetry(axios, {
  retryDelay: (retryCount) => {
    return retryCount * 1000;
  },
  retryCondition: (error) => {
    return (
      axiosRetry.isNetworkOrIdempotentRequestError(error) ||
      error.code === "ECONNABORTED"
    );
  },
});

export default () => {
  // define baseURL
  axios.defaults.baseURL = RESTAPI_ENDPOINT;
};

const { store } = createStore();

axios.interceptors.response.use(
  function (response) {
    return response.data &&
      typeof response.data.success !== "undefined" &&
      typeof response.data.message !== "undefined"
      ? {
        // config: response.config,
        // headers: response.headers,
        // request: response.request,
        // status: response.status,
        // statusText: response.statusText,
        ...response,
        data: response.data.data,
        message: response.data.message,
      }
      : response;
  },
  function (error) {
    const statusCode = error.response ? error.response.status : null;
    //const message = error.response && error.response.data ? error.response.data.error : "";
    const message = getMessage(error);
    if (statusCode === 401 && message === "Token is expired") {
      toast.error(message);
      //clearNotifications();
      store.dispatch(logout());
      window.location = "/";
    }
    else if (error && error.response && error.response.data && error.response.data.success === 0) {
      if (error.response.data.message) {
        error.response.data.error = error.response.data.message;
      }
    }
    return Promise.reject(error);
  }
);

function getMessage(error) {
  let message = "";
  if (error && error.response && error.response.data) {
    if (error.response.data.error)
      message = error.response.data.error;
    else if (error.response.data.success === 0)
      message = error.response.data.message;
  }
  return message;
}