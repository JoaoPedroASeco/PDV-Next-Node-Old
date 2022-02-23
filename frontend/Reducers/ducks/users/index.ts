import { Reducer } from 'redux';
import { UserRepositoriesState, UserRepositoriesTypes } from './types';

const INITIAL_STATE: UserRepositoriesState = {
  user: [],
  error: false,
  loading: false,
};

const reducer: Reducer<UserRepositoriesState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserRepositoriesTypes.USER_LOAD_REQUEST:
      return { ...state, loading: true };
    case UserRepositoriesTypes.USER_LOAD_SUCCCES:
      return {
      ...state, loading: false, error: false, user: action.payload.data ,
      };
    case UserRepositoriesTypes.USER_LOAD_FAILURE:
      return {
      ...state, loading: false, error: true, user: [],
      };
    default:
      return state;
  }
};
export default reducer;
