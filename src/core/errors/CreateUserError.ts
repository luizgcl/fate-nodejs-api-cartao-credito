import { Exception } from './bases/Exception'

export class CreateUserError extends Exception {
  constructor() {
    super('CREATE_USER_ERROR', 'Ocorreu um erro ao criar usuário')
  }
}
