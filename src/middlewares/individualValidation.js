const knex = require('../connection')
const jwt = require('jsonwebtoken')
const { individualPass } = require('../hashPass')

const individualValidation = async (req, res, next) => {
  let { authorization } = req.headers

  if (!authorization) return res.status(401).json({ message: 'Não autorizado' })

  try {
    const token = authorization.replace('Bearer ', '').trim()

    const { id } = jwt.verify(token, individualPass)

    const individualExists = await knex('individuals').where({ id }).first()

    if (!individualExists)
      return res.status(404).json({ message: 'Usuário não encontrado' })

    const userProfile = individualExists

    const { individual_password: _, ...user } = userProfile

    req.user = user

    next()
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

module.exports = { individualValidation }
