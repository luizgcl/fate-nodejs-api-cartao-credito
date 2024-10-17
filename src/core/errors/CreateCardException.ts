import { Exception } from './bases/Exception'

export class CreateCardException extends Exception {
  constructor() {
    super('CREATE_CARD', 'Não foi possível criar o cartão')
  }
}
