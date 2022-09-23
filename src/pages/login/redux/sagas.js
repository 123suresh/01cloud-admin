import { call, takeLatest, select, put } from "redux-saga/effects";
import axios from "axios";
import endpoints from "../../../constants/endpoints";
import toast from "../../../components/toast/Toast";
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GETPROFILE,
  FETCH_PROFILE_SUCCESS,
  RESEND_VERIFICATION_MAIL,
} from "./actions";

import { sessionTokenSelector } from "./selectors";

function loginCall(payload) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post(endpoints.AUTH.LOGIN, payload, config);
}

function getProfile(sessionToken, payload) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "basic " + sessionToken,
    },
  };
  return axios.get(endpoints.GET_PROFILE.replace(":userId", payload), config);
}

function* getProfileApiCall(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const response = yield call(getProfile, sessionToken, payload.data);
    const data = response.data;
    if (data) {
      yield put({ type: FETCH_PROFILE_SUCCESS, data });
    } else {
      toast.error("Error while fetching profile");
    }
  } catch (error) {
    toast.error("Error while fetching profile");
  }
}

function* login(payload) {
  try {
    const response = yield call(loginCall, payload.data);
    const data = response.data;
    console.log(data);
    if (!data.user.is_admin) {
      toast.error("You must be an admin to access this console");
      yield put({
        type: LOGIN_FAILURE,
        data: {
          message: "You must be admin to access this console",
        },
      });
      return;
    }
    if (data) {
      yield put({ type: LOGIN_SUCCESS, data });
    } else {
      toast.error("Invalid Credentials");
      yield put({
        type: LOGIN_FAILURE,
        data: {
          message: "Login failed",
        },
      });
    }
  } catch (error) {
    // if(error && error.response)
    // {
    //   if(error.response.status == 401)
    //   {
    //     yield put({
    //       type: IS_RESEND_VERIFY_EMAIL,
    //       data: {
    //         isResendVerifyEmail: true,
    //         resendVerifyEmail: payload.data ? payload.data.email : ""
    //       },
    //     })
    //   }
    //   if(error.response.data && error.response.data.error)
    //     toast.error(error.response.data.error);
    // }
    // else
    toast.error("Login failed");
    yield put({
      type: LOGIN_FAILURE,
      data: {
        message: "Login failed",
      },
    });
  }
}

// function loginOAuthCall(payload) {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };
//   return axios.post(endpoints.AUTH.LOGIN_OAUTH, payload.data.payload, config);
// }

// function* loginOAuth(payload) {
//   try {
//     const response = yield call(loginOAuthCall, payload);
//     const data = response.data;

//     if (response.status == 203) {
//       if (data && data.user && data.user.email) {
//         yield put({
//           type: OAUTH_REGISTER_DATA,
//           data: {
//             email: data.user.email,
//           },
//         });
//         payload.data.history.push("/signup");
//       } else {
//         toast.error("Some error occured. Please try again");
//         payload.data.history.push("/");
//       }
//     } else {
//       if (data && data.token) {
//         yield put({ type: LOGIN_SUCCESS, data });
//         payload.data.history.push("/projects");
//       } else {
//         toast.error("Some error occured. Please try again");
//         payload.data.history.push("/");
//       }
//     }
//   } catch (error) {
//     if (
//       error &&
//       error.response &&
//       error.response.data &&
//       error.response.data.error
//     )
//       toast.error(error.response.data.error);
//     else toast.error("Some error occured. Please try again");

//     payload.data.history.push("/");
//   }
// }

function resendVerificationCall(payload) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post(endpoints.AUTH.RESEND_VERIFY_EMAIL, payload.data, config);
}

function* resendVerification(payload) {
  try {
    const response = yield call(resendVerificationCall, payload);
    const data = response.data;
    if (data) {
      toast.success(data.message);
    }
  } catch (error) {
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.error
    )
      toast.error(error.response.data.error);
    else toast.error("Resend verification mail failed. Please try again");
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* watcherSaga() {
  yield takeLatest(LOGIN, login);
  yield takeLatest(GETPROFILE, getProfileApiCall);
  yield takeLatest(RESEND_VERIFICATION_MAIL, resendVerification);
}
