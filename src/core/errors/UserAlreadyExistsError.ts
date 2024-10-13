export class UserAlreadyExistsError extends Error {
  constructor() {
    super('O usuário já possui um cadastro.')
  }
}
