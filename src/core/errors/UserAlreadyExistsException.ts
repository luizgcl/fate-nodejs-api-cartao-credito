import { Exception } from './bases/Exception'

export class UserAlreadyExistsException extends Exception {
  constructor() {
    super('USER_ALREADY_EXISTS', 'O usuário já possui um cadastro.')
  }
}
