import { Exception } from './bases/Exception'

export class InvalidCredentialsException extends Exception {
  constructor() {
    super('INVALID_CREDENTIALS', 'Credenciais inválidas')
  }
}
