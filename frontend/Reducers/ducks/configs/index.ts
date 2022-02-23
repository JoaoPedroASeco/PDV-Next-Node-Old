import { Reducer } from 'redux';
import { ConfigRepositoriesState, ConfigRepositoriesTypes } from './types';

const INITIAL_STATE: ConfigRepositoriesState = {
  config: [],
  error: false,
  loading: false,
};

const reducer: Reducer<ConfigRepositoriesState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ConfigRepositoriesTypes.CONFIG_LOAD_REQUEST:
      return { ...state, loading: true };
    case ConfigRepositoriesTypes.CONFIG_LOAD_SUCCCES:
      return {
      ...state, loading: false, error: false, config: action.payload.data ,
      };
    case ConfigRepositoriesTypes.CONFIG_LOAD_FAILURE:
      return {
      ...state, loading: false, error: true, config: [],
      };
    default:
      return state;
  }
};
export default reducer;
