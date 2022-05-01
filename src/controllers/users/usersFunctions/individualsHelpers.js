const knex = require('../../../connection')

const createIndividualInfoValidator = async (body) => {
  const { individual_email, individual_cpf } = body

  const isRepeatedEmail = await knex('individuals')
    .where({ individual_email })
    .first()

  if (isRepeatedEmail)
    return 'O e-mail inserido já está sendo usado por outro usuário'

  const isRepeatedEmailOnCompanies = await knex('companies')
    .where({ company_email: individual_email })
    .first()

  if (isRepeatedEmailOnCompanies)
    return 'O e-mail inserido já está sendo usado por outro usuário'

  const isRepeatedCpf = await knex('individuals')
    .where({ individual_cpf })
    .first()

  if (isRepeatedCpf)
    return 'O cpf inserido já está sendo usado por outro usuário'
}

const editIndividualInfoValidator = async (body, id) => {
  const { individual_email, individual_cpf } = body

  const isRepeatedEmail = await knex('individuals')
    .whereNot({ id })
    .where({ individual_email })
    .first()

  if (isRepeatedEmail)
    return 'O e-mail inserido já está sendo usado por outro usuário'

  const isRepeatedEmailOnCompanies = await knex('companies')
    .where({ company_email: individual_email })
    .first()

  if (isRepeatedEmailOnCompanies)
    return 'O e-mail inserido já está sendo usado por outro usuário'

  const isRepeatedCpf = await knex('individuals')
    .whereNot({ id })
    .where({ individual_cpf })
    .first()

  if (isRepeatedCpf)
    return 'O cpf inserido já está sendo usado por outro usuário'
}

module.exports = { createIndividualInfoValidator, editIndividualInfoValidator }
