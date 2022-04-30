const knex = require('../connection')
const jwt = require('jsonwebtoken')
const { companyPass } = require('../hashPass')

const companyValidation = async (req, res, next) => {
  let { authorization } = req.headers

  if (!authorization) return res.status(401).json({ message: 'Não autorizado' })

  console.log('rodei')

  try {
    const token = authorization.replace('Bearer ', '').trim()

    const { id } = jwt.verify(token, companyPass)

    const companyExists = await knex('companies').where({ id }).first()

    if (!companyExists)
      return res.status(404).json({ message: 'Usuário não encontrado' })

    const userProfile = companyExists

    const { ...user } = userProfile

    req.user = user

    next()
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

module.exports = { companyValidation }
