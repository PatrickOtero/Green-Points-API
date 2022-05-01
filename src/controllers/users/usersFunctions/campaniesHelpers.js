const knex = require('../../../connection')

const createCompanyInfoValidator = async (body) => {
  const { company_cnpj, company_email } = body

  const isRepeatedCnpj = await knex('companies').where({ company_cnpj }).first()

  if (isRepeatedCnpj)
    return res.status(401).json({
      message: 'O CNPJ inserido pertence à outra empresa',
    })

  const isRepeatedEmail = await knex('companies')
    .where({ company_email })
    .first()

  if (isRepeatedEmail)
    return res.status(401).json({
      message: 'O e-mail inserido pertence à outra empresa',
    })
}

const editCompanyInfoValidator = async (body, id) => {
  const { company_cnpj, company_email } = body

  const isRepeatedEmail = await knex('companies')
    .whereNot({ id })
    .where({ company_email })
    .first()

  if (isRepeatedEmail)
    return res.status(401).json({
      message: 'O e-mail inserido pertence à outra empresa',
    })

  const isRepeatedCnpj = await knex('companies')
    .whereNot({ id })
    .where({ company_cnpj })
    .first()

  if (isRepeatedCnpj)
    return res.status(401).json({
      message: 'O cnpj inserido pertence à outra empresa',
    })
}

module.exports = { createCompanyInfoValidator, editCompanyInfoValidator }
