import { call, takeLatest, put, select } from 'redux-saga/effects';
import axios from 'axios';
import endpoints from '../../../constants/endpoints';
import { sessionTokenSelector } from '../../login/redux/selectors'
import { 
  FETCH_PROJECT_DETAIL,
  FETCH_PROJECT_DETAIL_SUCCESS,
  FETCH_PROJECT_APPLIST,
  FETCH_PROJECT_APPLIST_SUCCESS,
  EDIT_PROJECT_CALL,
  DELETE_PROJECT_CALL,
  fetchProjectDetails,
  FETCH_PROJECT_ACTIVITIES,
  FETCH_PROJECT_ACTIVITIES_SUCCESS,
  FETCH_PROJECT_INSIGHT,
  FETCH_PROJECT_INSIGHT_SUCCESS,
 } from './actions';
//import {  BEGIN_LOADING_INDICATOR, END_LOADING_INDICATOR } from '../projectlist/redux/actions';
import Toast from '../../../components/toast/Toast';
//import { getProjectListApiCall } from '../projectlist/redux/actions';

// function projectDetailsCall(sessionToken , payload) {
//    const config = {
//     headers : {
//       'Authorization': 'basic ' + sessionToken
//     }
//   }
//   return axios.get(endpoints.PROJECT_DETAILS.replace(':pId' , payload.data.id), config)
// }

// // Generator Call 
// function* fetchProjectDetail(payload) {
//   console.log(payload,'fetch')
//   try {
//     const sessionToken = yield select(sessionTokenSelector)
//     const response = yield call(projectDetailsCall, sessionToken , payload)
//     const data = response.data;

//     if (data !== null) {
//       yield put({ type: FETCH_PROJECT_DETAIL_SUCCESS, data })
//     } 
//   } catch (error) {
//     return
//   }
// }

// function appListCall(sessionToken , payload) {
//   const config = {
//    headers : {
//      'Authorization': 'basic ' + sessionToken
//    }
//  }
//  return axios.get(endpoints.GET_APP_LIST.replace(':pId' , payload.data.id), config)
// }

// // Generator Call 
// function* fetchAppListByPID(payload) {
//   yield put({ type: BEGIN_LOADING_INDICATOR })
//  try {
//    //debugger;
//    const sessionToken = yield select(sessionTokenSelector)
//    const response = yield call(appListCall, sessionToken , payload)
//    const data = response.data;
//    if (data !== null) {
//     yield put({ type: END_LOADING_INDICATOR })
//     yield put({ type: FETCH_PROJECT_APPLIST_SUCCESS, data })
//    } else {
//     yield put({ type: END_LOADING_INDICATOR })
//    }
//  } catch (error) {
//     yield put({ type: END_LOADING_INDICATOR })
//  }
// }

// // edit project Axios call
// function editProjectDetails(sessionToken , payload) {
//   const config = {
//    headers : {
//      'Content-Type': 'application/json',
//      'Authorization': 'basic ' + sessionToken
//    }
//  }
//  const id = payload.data.payload['id']
//  payload.data.payload.id = undefined;
//  payload.data.payload = JSON.parse(JSON.stringify(payload.data.payload));
//  return axios.put(endpoints.UPDATE_PROJECT_DETAILS.replace(':projectId' , id) ,payload.data.payload, config)
// }

// Generator Call 
// function* editProjectDetailsGenerator(payload) {
//   console.log('edit',payload)
//   try {
//    const sessionToken = yield select(sessionTokenSelector)
//    const response = yield call(editProjectDetails, sessionToken , payload )
//    if (response.status === 200){
//     yield put(getProjectListApiCall({}))
//     yield put(fetchProjectDetails(payload.data.id))
//     Toast.success('Project details updated succesfully');
//    } else {
//     Toast.error(response.error)
//    }
//  } catch (error) {
//   if(error && error.response && error.response.data && error.response.data.error)
//     Toast.error(error.response.data.error);
//   else
//     Toast.error('Error while updating project details. Please try again.')
//  }
// }

// delete project Axios call
// function deleteProject(sessionToken , payload) {
//  const config = {
//   headers : {
//     'Content-Type': 'application/json',
//     'Authorization': 'basic ' + sessionToken
//   }
// }
// return axios.delete(endpoints.DELETE_PROJECT.replace(':projectId' , payload.data.id) , config)

// }

// Generator Call 
// function* deleteProjectGenerator(payload) {
// try {
//   const sessionToken = yield select(sessionTokenSelector)
//   const response = yield call(deleteProject, sessionToken , payload )
//   //const data = response.data;
//   if (response.status === 204){
//     yield put(getProjectListApiCall({}))
//     Toast.success('Project deleted successfully');
//     payload.data.history.push('/projects')
//   } else {
//     Toast.error(response.error);
//   }
// } catch (error) {
//     if(error && error.response && error.response.data && error.response.data.error)
//       Toast.error(error.response.data.error);
//     else
//       Toast.error("Operation failed. Please try again");
// }
// }

// function projectActivitiesCall(sessionToken , payload) {
//   const config = {
//    headers : {
//      'Authorization': 'basic ' + sessionToken
//    }
//  }
//  return axios.get(endpoints.PROJECT.GET_ACTIVITIES.replace(':pId' , payload.data.id), config)
// }

// // Generator Call 
// function* fetchProjectActivities(payload) {
//  try {
//    const sessionToken = yield select(sessionTokenSelector)
//    const response = yield call(projectActivitiesCall, sessionToken , payload)
//    const data = response.data;
//    if (data !== null) {
//      yield put({ type: FETCH_PROJECT_ACTIVITIES_SUCCESS, data })
//    } 
//  } catch (error) {
//   if(error && error.response && error.response.data && error.response.data.error)
//     Toast.error(error.response.data.error);
//   else
//     Toast.error("Unable to get activities. Please try again");
//  }
// }

// function projectInsightsCall(sessionToken , payload) {
//   const config = {
//    headers : {
//      'Authorization': 'basic ' + sessionToken
//    }
//  }
//  return axios.get(endpoints.PROJECT.GET_INSIGHTS.replace(':pId' , payload.data.id), config)
// }

// // Generator Call 
// function* fetchProjectInsights(payload) {
//  try {
//    const sessionToken = yield select(sessionTokenSelector)
//    const response = yield call(projectInsightsCall, sessionToken , payload)
//    const data = response.data;
//    if (data !== null) {
//      yield put({ type: FETCH_PROJECT_INSIGHT_SUCCESS, data })
//    } 
//  } catch (error) {
//   if(error && error.response && error.response.data && error.response.data.error)
//     Toast.error(error.response.data.error);
//   else
//     Toast.error("Unable to get insight. Please try again");

//  }
// }

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* watcherSaga() {
  // yield takeLatest(FETCH_PROJECT_DETAIL, fetchProjectDetail);
  // yield takeLatest(FETCH_PROJECT_APPLIST, fetchAppListByPID);
  // yield takeLatest(EDIT_PROJECT_CALL, editProjectDetailsGenerator);
  // yield takeLatest(DELETE_PROJECT_CALL, deleteProjectGenerator);
  // yield takeLatest(FETCH_PROJECT_ACTIVITIES, fetchProjectActivities);
  // yield takeLatest(FETCH_PROJECT_INSIGHT, fetchProjectInsights);

}