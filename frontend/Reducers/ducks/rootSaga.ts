import { all, takeLatest, fork } from 'redux-saga/effects';

import { UserRepositoriesTypes } from './users/types';
import { ConfigRepositoriesTypes } from './configs/types';
import { loadUsers } from './users/sagas';
import { loadConfig } from './configs/sagas';

export default function *rootSaga() {
  yield all([
    takeLatest(UserRepositoriesTypes.USER_LOAD_REQUEST, loadUsers),
    takeLatest(ConfigRepositoriesTypes.CONFIG_LOAD_REQUEST, loadConfig),
  ]);
}
