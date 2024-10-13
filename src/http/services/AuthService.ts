import { UserAlreadyExistsError } from '@/core/errors/UserAlreadyExistsError'
import { handleEncodePassword } from './PasswordEncoderService'
import {
  type CreateUserParams,
  createUser,
  findUserByCpf,
  findUserByEmail,
} from './UserService'

export async function register({
  email,
  cpf,
  cep,
  name,
  password,
}: CreateUserParams) {
  const { user: hasUserWithSameEmail } = await findUserByEmail(email)

  if (hasUserWithSameEmail) {
    throw new UserAlreadyExistsError()
  }

  const { user: hasUserWithSameCpf } = await findUserByCpf(cpf)

  if (hasUserWithSameCpf) {
    throw new UserAlreadyExistsError()
  }

  const { passwordHash } = await handleEncodePassword(password)

  await createUser({
    cpf: cpf,
    email: email,
    cep,
    name,
    password: passwordHash,
  })
}
