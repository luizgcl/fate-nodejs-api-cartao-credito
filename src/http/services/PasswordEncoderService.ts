import { genSalt, hash } from 'bcrypt'
import z from 'zod'

const passwordSchema = z.string().min(8, {
  message: 'A senha deve conter no mínimo 8 caracteres.',
})

export async function handleEncodePassword(input: string) {
  const password = passwordSchema.parse(input)

  const salts = await genSalt()

  const passwordHash = await hash(password, salts)

  return {
    passwordHash,
  }
}
