/**
 * Action types
 */
export enum ConfigRepositoriesTypes {
  CONFIG_LOAD_REQUEST = '@repositories/CONFIG_LOAD_REQUEST',
  CONFIG_LOAD_SUCCCES = '@repositories/CONFIG_LOAD_SUCCCES',
  CONFIG_LOAD_FAILURE = '@repositories/CONFIG_LOAD_FAILURE'
}

/**
 * Data types
 */
export interface ConfigRepository {
  id: number
  nome: string
}

/**
 * State type
 */
export interface ConfigRepositoriesState {
  readonly config: ConfigRepository[]
  readonly loading: boolean
  readonly error: boolean
}
