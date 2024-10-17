import { Exception } from './bases/Exception'

export class UserNotFoundException extends Exception {
  constructor() {
    super('USER_NOT_FOUND', 'Usuário não encontrado')
  }
}
