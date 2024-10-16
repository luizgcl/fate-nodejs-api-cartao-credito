import { InvalidCredentialsError } from '@/core/errors/InvalidCredentialsError'
import { UserAlreadyExistsError } from '@/core/errors/UserAlreadyExistsError'
import z from 'zod'
import {
  handleComparePassword,
  handleEncodePassword,
} from './PasswordEncoderService'
import { handleCreateToken } from './TokenService'
import {
  type CreateUserParams,
  createUser,
  findUserByCpf,
  findUserByEmail,
} from './UserService'

const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export type UserLoginParams = z.infer<typeof userLoginSchema>

export async function handleRegister({
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

export async function handleLogin({ email, password }: UserLoginParams) {
  const { user } = await findUserByEmail(email)

  if (!user) {
    throw new InvalidCredentialsError()
  }

  const isValidPassword = await handleComparePassword({
    password,
    password_hash: user.password,
  })

  if (!isValidPassword) {
    throw new InvalidCredentialsError()
  }

  return handleCreateToken(user)
}
