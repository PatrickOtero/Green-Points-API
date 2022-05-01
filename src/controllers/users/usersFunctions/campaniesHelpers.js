const knex = require('../../../connection')

const createCompanyInfoValidator = async (body) => {
  const { company_cnpj, company_email } = body

  const isRepeatedCnpj = await knex('companies').where({ company_cnpj }).first()

  if (isRepeatedCnpj) return 'O CNPJ inserido pertence à outra empresa'

  const isRepeatedEmail = await knex('companies')
    .where({ company_email })
    .first()

  if (isRepeatedEmail) return 'O e-mail inserido pertence à outra empresa'

  const isRepeatedEmailOnIndividuals = await knex('individuals')
    .where({ individual_email: company_email })
    .first()

  if (isRepeatedEmailOnIndividuals)
    return 'O e-mail inserido já está sendo usado por outro usuário'
}

const editCompanyInfoValidator = async (body, id) => {
  const { company_cnpj, company_email } = body

  const isRepeatedEmail = await knex('companies')
    .whereNot({ id })
    .where({ company_email })
    .first()

  if (isRepeatedEmail) return 'O e-mail inserido pertence à outra empresa'

  const isRepeatedCnpj = await knex('companies')
    .whereNot({ id })
    .where({ company_cnpj })
    .first()

  if (isRepeatedCnpj) return 'O cnpj inserido pertence à outra empresa'

  const isRepeatedEmailOnIndividuals = await knex('individuals')
    .where({ individual_email: company_email })
    .first()

  if (isRepeatedEmailOnIndividuals)
    return 'O e-mail inserido já está sendo usado por outro usuário'
}

module.exports = { createCompanyInfoValidator, editCompanyInfoValidator }
