import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { RegisterUseCase } from './register'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterUseCase

describe('Register org use case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterUseCase(orgsRepository)
  })

  it('should be able to register a org', async () => {
    const { org } = await sut.execute({
      title: 'Cãopanheiros',
      phone: '999999999',
      password: '123456',
      postal_code: '13254000',
      address: 'Rua do meio - 123, Boa viagem',
      uf: 'PE',
      city: 'Recife',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to register a org with already used phone', async () => {
    const phone = '999999999'

    await orgsRepository.create({
      title: 'Cãopanheiros',
      phone,
      password_hash: '123456',
      postal_code: '13254000',
      address: 'Rua do meio - 123, Boa viagem',
      uf: 'PE',
      city: 'Recife',
    })

    await expect(() =>
      sut.execute({
        title: 'Cãopanheiros',
        phone,
        password: '123456',
        postal_code: '13254000',
        address: 'Rua do meio - 123, Boa viagem',
        uf: 'PE',
        city: 'Recife',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
