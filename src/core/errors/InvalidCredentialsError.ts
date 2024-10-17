import { Exception } from './bases/Exception'

export class InvalidCredentialsError extends Exception {
  constructor() {
    super('INVALID_CREDENTIALS', 'Credenciais inválidas')
  }
}
