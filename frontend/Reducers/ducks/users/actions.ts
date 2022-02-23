import { action } from 'typesafe-actions';
import { UserRepositoriesTypes, UserRepository } from './types';

export const loadRequest = () => action(UserRepositoriesTypes.USER_LOAD_REQUEST);

export const loadSuccess = (data: UserRepository[]) => action(UserRepositoriesTypes.USER_LOAD_SUCCCES, { data });

export const loadFailure = () => action(UserRepositoriesTypes.USER_LOAD_FAILURE);
