import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { RegisterUseCase } from '@/use-cases/register'

export function makeRegisterUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const useCase = new RegisterUseCase(orgsRepository)

  return useCase
}
