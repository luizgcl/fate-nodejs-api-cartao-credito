import { CreateCardException } from '@/core/errors/CreateCardException'
import { InvalidCredentialsException } from '@/core/errors/InvalidCredentialsException'
import { prismaClient } from '@/database/prisma'
import z from 'zod'
import { handleCreateToken } from './CardTokenService'

const cardSchema = z.object({
  number: z.string(),
  month_expires: z.coerce.number(),
  year_expires: z.coerce.number(),
  code: z.string(),
  cpf: z.string(),
})

export type CreateCardParams = z.infer<typeof cardSchema>
export type ValidateCardParams = z.infer<typeof cardSchema>

export async function createCard({
  number,
  month_expires,
  year_expires,
  code,
  cpf,
}: CreateCardParams) {
  try {
    await prismaClient.card.create({
      data: {
        number,
        monthExpires: month_expires,
        yearExpires: year_expires,
        code,
        cpf,
      },
    })
  } catch {
    throw new CreateCardException()
  }
}

export async function validateCard({
  number,
  month_expires,
  year_expires,
  code,
  cpf,
}: ValidateCardParams) {
  const card = await prismaClient.card.findFirst({
    where: {
      number,
      monthExpires: month_expires,
      yearExpires: year_expires,
      code,
      cpf,
    },
  })

  if (!card) {
    throw new InvalidCredentialsException()
  }

  return handleCreateToken(card)
}
