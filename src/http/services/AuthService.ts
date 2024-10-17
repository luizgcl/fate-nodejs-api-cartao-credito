import { InvalidCredentialsException } from '@/core/errors/InvalidCredentialsException'
import { UserAlreadyExistsException } from '@/core/errors/UserAlreadyExistsException'
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
    throw new UserAlreadyExistsException()
  }

  const { user: hasUserWithSameCpf } = await findUserByCpf(cpf)

  if (hasUserWithSameCpf) {
    throw new UserAlreadyExistsException()
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
    throw new InvalidCredentialsException()
  }

  const isValidPassword = await handleComparePassword({
    password,
    password_hash: user.password,
  })

  if (!isValidPassword) {
    throw new InvalidCredentialsException()
  }

  return handleCreateToken(user)
}
