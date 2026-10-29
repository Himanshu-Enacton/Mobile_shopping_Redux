import type { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  userListFailure,
  userListSuccess,
} from './action';
import type { User } from './action';
import { USER_LIST } from './constants';

type UserListResponse = {
  users: User[];
};

function* userList(): SagaIterator {
  try {
    const response: Response = yield call(
      fetch,
      'https://dummyjson.com/users',
    );
    if (!response.ok) {
      throw new Error(`User request failed with status ${response.status}`);
    }

    const result: UserListResponse = yield call([response, 'json']);
    yield put(userListSuccess(result.users));
    console.warn(`User list API succeeded: ${result.users.length} users loaded`);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unable to load users';
    yield put(userListFailure(message));
  }
}

function* SagaData(): SagaIterator {
  yield takeEvery(USER_LIST, userList);
}

export default SagaData;