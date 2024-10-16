import { ValidationError } from './bases/ValidationError'

export class InvalidCredentialsError extends ValidationError {
  constructor() {
    super('INVALID_CREDENTIALS', 'Credenciais inválidas')
  }
}
