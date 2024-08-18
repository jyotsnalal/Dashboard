// src/redux/sagas/fetchDataSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { FETCH_DATA_REQUEST, fetchDataSuccess, fetchDataFailure } from '../Action/Index';

function fetchUserActivitiesAPI() {
  return axios.get('http://52.168.1.54:8080/api/v1/userActivities');
}


function* fetchDataSaga() {
  try {
    const response = yield call(fetchUserActivitiesAPI);
    yield put(fetchDataSuccess(response.data));
  } catch (error) {
    yield put(fetchDataFailure(error.message));
  }
}

export default function* watchFetchDataSaga() {
  yield takeLatest(FETCH_DATA_REQUEST, fetchDataSaga);
}
