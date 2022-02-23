import { action } from 'typesafe-actions';
import { ConfigRepositoriesTypes, ConfigRepository } from './types';

export const loadRequest = () => action(ConfigRepositoriesTypes.CONFIG_LOAD_REQUEST);

export const loadSuccess = (data: ConfigRepository[]) => action(ConfigRepositoriesTypes.CONFIG_LOAD_SUCCCES, { data });

export const loadFailure = () => action(ConfigRepositoriesTypes.CONFIG_LOAD_FAILURE);
