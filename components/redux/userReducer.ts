import type { User } from './action';
import {
  getUserList,
  userListFailure,
  userListSuccess,
} from './action';
import {
  USER_LIST,
  USER_LIST_FAILURE,
  USER_LIST_SUCCESS,
} from './constants';

export type UserListState = {
  data: User[];
  loading: boolean;
  error: string | null;
};

const initialState: UserListState = {
  data: [],
  loading: false,
  error: null,
};

type UserListAction =
  | ReturnType<typeof getUserList>
  | ReturnType<typeof userListSuccess>
  | ReturnType<typeof userListFailure>;

export default function userReducer(
  state = initialState,
  action: UserListAction,
): UserListState {
  switch (action.type) {
    case USER_LIST:
      return { ...state, loading: true, error: null };
    case USER_LIST_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null,
      };
    case USER_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.data,
      };
    default:
      return state;
  }
}
