const {
  createIndividualSchema,
} = require('../../../validations/individuals/createIndividualSchema')
const knex = require('../../../connection')
const bcrypt = require('bcrypt')
const {
  editIndividualSchema,
} = require('../../../validations/individuals/editIndividualSchema')
const { individualGreetingsEmail } = require('../../data/emails')

const individualRegistration = async (req, res) => {
  const {
    individual_name,
    individual_cpf,
    individual_email,
    individual_password,
  } = req.body
  try {
    await createIndividualSchema.validate(req.body)

    const isRepeatedEmail = await knex('individuals')
      .where({ individual_email })
      .first()

    if (isRepeatedEmail)
      return res.status(401).json({
        message: 'O e-mail inserido já está sendo usado por outro usuário',
      })

    const isRepeatedCpf = await knex('individuals')
      .where({ individual_cpf })
      .first()

    if (isRepeatedCpf)
      return res.status(401).json({
        message: 'O cpf inserido já está sendo usado por outro usuário',
      })

    const encryptedPassword = await bcrypt.hash(individual_password, 10)

    const individualCreated = await knex('individuals').insert({
      individual_name,
      individual_cpf,
      individual_email,
      individual_password: encryptedPassword,
    })

    if (individualCreated.length)
      return res
        .status(500)
        .json({ message: 'Não foi possível se conectar com o banco de dados.' })

    individualGreetingsEmail(req.body)

    return res.status(200).json({ message: 'Usuário criado com sucesso.' })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const individualEdit = async (req, res) => {
  const {
    individual_name,
    individual_email,
    individual_cpf,
    individual_password,
  } = req.body

  const { id } = req.user

  try {
    await editIndividualSchema.validate(req.body)

    const isRepeatedEmail = await knex('individuals')
      .whereNot({ id })
      .where({ individual_email })
      .first()

    if (isRepeatedEmail)
      return res.status(401).json({
        message: 'O e-mail inserido já está sendo usado por outro usuário',
      })

    const isRepeatedCpf = await knex('individuals')
      .whereNot({ id })
      .where({ individual_cpf })
      .first()

    if (isRepeatedCpf)
      return res.status(401).json({
        message: 'O cpf inserido já está sendo usado por outro usuário',
      })

    if (individual_password) {
      if (individual_password.length < 5)
        return res
          .status(401)
          .json({ message: 'Senha muito curta. Insira ao menos 5 caracteres.' })

      const encryptedPassword = await bcrypt.hash(individual_password, 10)

      const individualEditedWithPassword = await knex('individuals')
        .update({
          individual_name,
          individual_email,
          individual_cpf,
          individual_password: encryptedPassword,
        })
        .where({ id })

      if (individualEditedWithPassword.length)
        return res.status(500).json({
          message: 'Não foi possível conectar-se com o banco de dados.',
        })

      return res.status(200).json({ message: 'Usuário editado com sucesso.' })
    }

    const individualEdited = await knex('individuals')
      .update({
        individual_name,
        individual_email,
        individual_cpf,
      })
      .where({ id })

    if (individualEdited.length)
      return res.status(500).json({
        message: 'Não foi possível conectar-se com o banco de dados.',
      })

    return res.status(200).json({ message: 'Usuário editado com sucesso.' })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const individualDeletion = async (req, res) => {
  const { id } = req.user

  const deletedIndividual = await knex('individuals').where('id', id).del()

  if (deletedIndividual.length)
    return res
      .status(500)
      .json({ message: 'Não foi possível conectar-se com o banco de dados' })

  return res
    .status(200)
    .json({ message: 'Sua conta foi removida com sucesso.' })
}

module.exports = { individualRegistration, individualEdit, individualDeletion }
