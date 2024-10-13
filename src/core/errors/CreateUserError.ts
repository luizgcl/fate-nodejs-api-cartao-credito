export class CreateUserError extends Error {
  constructor() {
    super('Ocorreu um erro ao criar usuário')
  }
}
