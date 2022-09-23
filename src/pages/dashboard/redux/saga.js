import {
  FETCH_REVENUE_DATA,
  FETCH_REVENUE_DATA_FAILURE,
  FETCH_REVENUE_DATA_SUCCESS,
} from "./actions";
import { call, takeLatest, put, select } from "redux-saga/effects";

import endpoints from "../../../constants/endpoints";
import axios from "axios";
import { sessionTokenSelector } from "../../login/redux/selectors";

const fetchRevenueDataApiCall = async (sessionToken) => {
  const config = {
    headers: {
      Authorization: "basic " + sessionToken,
    },
  };
  const response = axios.get(endpoints.DASHOBARD, config);
  console.log("res");
  console.log(response);

  // const dummy = {
  //   users: {
  //     total: 1545,
  //     this_month: 155,
  //   },
  //   projects: {
  //     total: 1210,
  //     this_month: 155,
  //   },
  //   revenue: {
  //     total: 5600,
  //     this_month: 155,
  //     revenue_data: {
  //       "2020-01-01": 1001,
  //       "2020-02-01": 2061,
  //       "2020-03-01": 8061,
  //       "2020-04-01": 4061,
  //       "2020-05-01": 7061,
  //       "2020-06-01": 1061,
  //       "2020-07-01": 1061,
  //       "2020-08-01": 3000,
  //       "2020-09-01": 2050,
  //       "2020-10-01": 3556,
  //       "2020-11-01": 6026,
  //       "2020-12-01": 4086,
  //     },
  //   },
  //   subscriptions: {
  //     total: 800,
  //     this_month: 155,

  //     subscription_data: [
  //       {
  //         name: "Starter",
  //         price: 12,
  //         count: 200,
  //         revenue: 2135,
  //       },
  //       {
  //         name: "Enterprise",
  //         price: 12,
  //         count: 200,
  //         revenue: 2135,
  //       },
  //       {
  //         name: "Professional",
  //         price: 12,
  //         count: 200,
  //         revenue: 2135,
  //       },
  //       {
  //         name: "Platinum",
  //         price: 12,
  //         count: 200,
  //         revenue: 2135,
  //       },
  //     ],
  //   },
  //   environment: {
  //     total: 50,
  //     this_month: 155,
  //   },
  //   resources: {
  //     total: 1024,
  //     used: 512,
  //     this_month: 155,
  //   },
  //   clusters: {
  //     total: 120,
  //     this_month: 15,
  //   },
  //   plugins: {
  //     total: 130,
  //     this_month: 15,
  //   },
  //   applications: {
  //     total: 1200,
  //     this_month: 155,
  //   },
  // };
  // // const res = {
  //   data: dummy,
  // };
  return response;
};

function* fetchRevenueData() {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const response = yield call(fetchRevenueDataApiCall, sessionToken);
    const data = response.data;
    if (response.data) {
      yield put({ type: FETCH_REVENUE_DATA_SUCCESS, data });
    } else {
      yield put({
        type: FETCH_REVENUE_DATA_FAILURE,
        error: "Cannot fetch Revenue Data",
      });
    }
  } catch (error) {
    yield put({
      type: FETCH_REVENUE_DATA_FAILURE,
      error: error.message,
    });
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_REVENUE_DATA, fetchRevenueData);
}
