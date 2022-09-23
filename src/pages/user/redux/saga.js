import { call, takeLatest, put, select } from "redux-saga/effects";
import axios from "axios";
import endpoints from "../../../constants/endpoints";
import { sessionTokenSelector } from "../../login/redux/selectors";
import {
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from "./actions";

async function fetchUsersCall(sessionToken, payload) {
  const config = {
    headers: {
      Authorization: "basic " + sessionToken,
    },
  };
  const endPoint = endpoints.GET_USERS_LIST
    .replace(":page", payload?.data?.page ?? 1)
    .replace(":size", payload?.data?.size ?? 20)
    .replace(":search", payload?.data?.search ?? "")
    .replace(":sort-column", payload?.data?.sortColumn ?? "id")
    .replace(":sort-direction", payload?.data?.sortDirection ?? "desc")
  const response = await axios.get(endPoint, config);
  return response;
}

function* fetchUsers(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const response = yield call(fetchUsersCall, sessionToken, payload);
    const data = response.data;
    if (data) {
      yield put({ type: FETCH_USERS_SUCCESS, data: { data, count: response.count } });
    } else {
      yield {
        type: FETCH_USERS_FAILURE,
        data: {
          error: "Error While fetching Users",
        },
      };
    }
  } catch (error) {
    yield {
      type: FETCH_USERS_FAILURE,
      data: {
        error: "Error While fetching Users",
      },
    };
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_USERS, fetchUsers);
}
