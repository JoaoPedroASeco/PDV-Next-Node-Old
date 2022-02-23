import { call, put } from 'redux-saga/effects';
import api from '../../../services/api';

import { loadSuccess, loadFailure } from './actions';

export function* loadUsers() {
  try {
    const response = yield call(api.post, 'userlist');

    yield put(loadSuccess(response.data));
  } catch (err) {
    yield put(loadFailure());
  }
}