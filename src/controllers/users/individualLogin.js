const knex = require('../../connection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { individualPass } = require('../../hashPass')
const { individualLoginSchema } = require('../../validations/loginSchema')

const individualLogin = async (req, res) => {
  const { individual_emailOrCpf, individual_password } = req.body

  if (!individual_emailOrCpf || !individual_password)
    return res.status(400).json({ message: 'Ambos os campos são obrigatórios' })

  try {
    await individualLoginSchema.validate(req.body)

    const individualCpfOrEmailExist = await knex('individuals')
      .where({
        individual_email: individual_emailOrCpf,
      })
      .orWhere({ individual_cpf: individual_emailOrCpf })
      .first()

    if (!individualCpfOrEmailExist)
      return res
        .status(401)
        .json({ message: 'Combinação de email e senha incorreta' })

    const individual = individualCpfOrEmailExist

    const validPassword = await bcrypt.compare(
      individual_password,
      individualCpfOrEmailExist.individual_password,
    )

    if (!validPassword)
      return res
        .status(401)
        .json({ message: 'Combinação de email e senha incorreta' })

    const token = jwt.sign({ id: individual.id }, individualPass, {
      expiresIn: '5h',
    })

    const { individual_password: _, ...individualData } = individual

    return res.status(200).json({
      individualData,
      token,
    })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

module.exports = { individualLogin }
