const knex = require('../../connection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { companyPass } = require('../../hashPass')
const { companyLoginSchema } = require('../../validations/loginSchema')

const companyLogin = async (req, res) => {
  const { company_emailOrCnpj, company_password } = req.body

  if (!company_emailOrCnpj || !company_password)
    return res.status(400).json({ message: 'Ambos os campos são obrigatórios' })

  try {
    await companyLoginSchema.validate(req.body)

    const companyCnpjOrEmailExist = await knex('companies')
      .where({
        company_email: company_emailOrCnpj,
      })
      .orWhere({ company_cnpj: company_emailOrCnpj })
      .first()

    if (!companyCnpjOrEmailExist)
      return res
        .status(401)
        .json({ message: 'Combinação de email e senha incorreta' })

    const company = companyCnpjOrEmailExist

    const validPassword = await bcrypt.compare(
      company_password,
      company.company_password,
    )

    if (!validPassword)
      return res
        .status(401)
        .json({ message: 'Combinação de email e senha incorreta' })

    const token = jwt.sign({ id: company.id }, companyPass, {
      expiresIn: '5h',
    })

    const { company_password: _, ...companyData } = company

    return res.status(200).json({
      companyData,
      token,
    })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

module.exports = { companyLogin }
