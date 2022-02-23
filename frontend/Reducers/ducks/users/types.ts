/**
 * Action types
 */
export enum UserRepositoriesTypes {
  USER_LOAD_REQUEST = '@repositories/USER_LOAD_REQUEST',
  USER_LOAD_SUCCCES = '@repositories/USER_LOAD_SUCCCES',
  USER_LOAD_FAILURE = '@repositories/USER_LOAD_FAILURE'
}

/**
 * Data types
 */
export interface UserRepository {
  id: number
  nome: string
}

/**
 * State type
 */
export interface UserRepositoriesState {
  readonly user: UserRepository[]
  readonly loading: boolean
  readonly error: boolean
}
