const {
  createCompanySchema,
} = require('../../../validations/companies/createCompanySchema')
const {
  editCompanySchema,
} = require('../../../validations/companies/editCompanySchema')
const knex = require('../../../connection')
const bcrypt = require('bcrypt')
const { companyGreetingsEmail } = require('../../data/emails')
const {
  createCompanyInfoValidator,
  editCompanyInfoValidator,
} = require('../usersFunctions/campaniesHelpers')

const companyRegistration = async (req, res) => {
  const {
    company_name,
    company_description,
    company_cnpj,
    company_email,
    company_password,
  } = req.body
  try {
    await createCompanySchema.validate(req.body)

    const errorMessage = await createCompanyInfoValidator(req.body)

    if (errorMessage) return res.status(401).json({ errorMessage })

    const encryptedPassword = await bcrypt.hash(company_password, 10)

    const companyCreated = await knex('companies').insert({
      company_name,
      company_description,
      company_cnpj,
      company_email,
      company_password: encryptedPassword,
    })

    if (companyCreated.length)
      return res
        .status(500)
        .json({ message: 'Não foi possível se conectar com o banco de dados.' })

    companyGreetingsEmail(req.body)

    return res.status(200).json({ message: 'Empresa registrada com sucesso.' })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const companyEdit = async (req, res) => {
  const {
    company_name,
    company_description,
    company_cnpj,
    company_email,
    company_password,
  } = req.body
  const { id } = req.user

  try {
    await editCompanySchema.validate(req.body)

    const errorMessage = await editCompanyInfoValidator(req.body, id)

    if (errorMessage) return res.status(401).json({ errorMessage })

    if (company_password) {
      if (company_password.length < 5)
        return res
          .status(401)
          .json({ message: 'Senha muito curta. Insira ao menos 5 caracteres.' })

      const encryptedPassword = await bcrypt.hash(company_password, 10)

      const companyEditedWithPassword = await knex('companies')
        .update({
          company_name,
          company_description,
          company_email,
          company_cnpj,
          company_password: encryptedPassword,
        })
        .where('id', id)

      if (companyEditedWithPassword.length)
        return res.status(500).json({
          message: 'Não foi possível conectar-se com o banco de dados.',
        })

      return res
        .status(200)
        .json({ message: 'Informações da empresa editadas com sucesso.' })
    }

    const companyEdited = await knex('companies')
      .update({
        company_name,
        company_description,
        company_email,
        company_cnpj,
      })
      .where('id', id)

    if (companyEdited.length)
      return res.status(500).json({
        message: 'Não foi possível conectar-se com o banco de dados.',
      })

    return res.status(200).json({ message: 'Usuário editado com sucesso.' })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const companyDeletion = async (req, res) => {
  const { id } = req.user

  const deletedCompany = await knex('companies').where({ id }).del()

  if (deletedCompany.length)
    return res
      .status(500)
      .json({ message: 'Não foi possível conectar-se com o banco de dados' })

  return res
    .status(200)
    .json({ message: 'Sua conta foi removida com sucesso.' })
}

module.exports = { companyRegistration, companyEdit, companyDeletion }
