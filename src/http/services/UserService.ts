import { CreateUserException } from '@/core/errors/CreateUserException'
import { prismaClient } from '@/database/prisma'
import z from 'zod'

const createUserSchema = z.object({
  cpf: z.string().regex(/[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}/g),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  cep: z.string().regex(/[0-9]{5}-[0-9]{3}/g),
})

export type CreateUserParams = z.infer<typeof createUserSchema>

export async function createUser(data: CreateUserParams) {
  try {
    await prismaClient.user.create({
      data,
    })
  } catch {
    throw new CreateUserException()
  }
}

export async function findUserByCpf(cpf: string) {
  const user = await prismaClient.user.findUnique({
    where: {
      cpf,
    },
  })

  return { user }
}

export async function findUserByEmail(email: string) {
  const user = await prismaClient.user.findUnique({
    where: {
      email,
    },
  })

  return { user }
}
