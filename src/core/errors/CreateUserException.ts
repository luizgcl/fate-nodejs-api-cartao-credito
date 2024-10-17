import { Exception } from './bases/Exception'

export class CreateUserException extends Exception {
  constructor() {
    super('CREATE_USER', 'Ocorreu um erro ao criar usuário')
  }
}
