import { call, takeLatest, put, select } from 'redux-saga/effects';
import axios from 'axios';
import endpoints from '../../../constants/endpoints';
import { sessionTokenSelector } from '../../login/redux/selectors'
import { 
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAILURE,
  UPLOAD_MULTIPLE_FILES,
 } from './actions';
 import toast from '../../../components/toast/Toast';

function *uploadApiCall(fileData){
  const sessionToken = yield select(sessionTokenSelector)
    const config = {
      headers : {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'basic ' + sessionToken
      }
    }
    const iconResponse = yield axios.post(endpoints.PROJECT.UPLOAD_ICON, fileData, config)
    return iconResponse

}

function* uploadSingleFile(payload) {
  try {
    const response = yield call(uploadApiCall, payload.file)
    if(payload.callBack){
      payload.callBack(response.data, payload.file.get("file"))
    }
    yield put({ type: UPLOAD_FILE_SUCCESS })
  } catch(error) {
    yield put({ type: UPLOAD_FILE_FAILURE })
    if(error && error.response && error.response.data && error.response.data.error)
      toast.error(error.response.data.error);
    else
      toast.error('Some error while uploading');
  }
}

function* uploadFiles(payload) {
  try {
    let d = {
      callBack: payload.data.callBack
    }
    for (const i in payload.data.files) {
      const file = payload.data.files[i]
      d.file = file    
      yield call(uploadSingleFile, d);
    }
    yield put({ type: UPLOAD_FILE_SUCCESS })
  } catch (error) {
    yield put({ type: UPLOAD_FILE_FAILURE })
    if(error && error.response && error.response.data && error.response.data.error)
      toast.error(error.response.data.error);
    else
      toast.error('Some error while uploading');
  }
}

function* uploadFile(payload) {
  try {
    // const sessionToken = yield select(sessionTokenSelector)
    // const config = {
    //   headers : {
    //     'Content-Type': 'multipart/form-data',
    //     'Authorization': 'basic ' + sessionToken
    //   }
    // }
    const iconResponse = yield call(uploadApiCall, payload.data.formData)
    const iconData = iconResponse.data;
    if(payload.data.callBack)
    {
       payload.data.callBack(iconData);
    }
    yield put({ type: UPLOAD_FILE_SUCCESS })
  } catch (error) {
    yield put({ type: UPLOAD_FILE_FAILURE })
    if(payload.data.callBack)
    {
      payload.data.callBack(null);
    }
    if(error && error.response && error.response.data && error.response.data.error)
      toast.error(error.response.data.error);
    else
      toast.error('Some error while uploading');
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* watcherSaga() {
  yield takeLatest(UPLOAD_FILE, uploadFile);
  yield takeLatest(UPLOAD_MULTIPLE_FILES, uploadFiles);
}