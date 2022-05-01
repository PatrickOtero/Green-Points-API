const knex = require('../../../connection')

const createMissionInfoValidator = async (body) => {
  const { mission_name, mission_title, mission_description } = body

  const postNameExists = await knex('companymissionposts')
    .where({
      mission_name,
    })
    .first()
  if (postNameExists) return 'Outra missão já possui este nome'

  const postTitleExists = await knex('companymissionposts')
    .where({
      mission_title,
    })
    .first()
  if (postTitleExists) return 'Outra missão já possui este título'

  const postDescriptionExists = await knex('companymissionposts')
    .where({
      mission_description,
    })
    .first()
  if (postDescriptionExists) return 'Cópias de descrição não são permitidas'
}

const editMissionInfoValidator = async (body, id) => {
  const { mission_name, mission_title, mission_description } = body

  const postNameExists = await knex('companymissionposts')
    .whereNot({ id })
    .where({
      mission_name,
    })
    .first()
  if (postNameExists) return 'Outra missão já possui este nome'

  const postTitleExists = await knex('companymissionposts')
    .whereNot({ id })
    .where({
      mission_title,
    })
    .first()
  if (postTitleExists) return 'Outra missão já possui este título'

  const postDescriptionExists = await knex('companymissionposts')
    .whereNot({ id })
    .where({
      mission_description,
    })
    .first()
  if (postDescriptionExists) return 'Cópias de descrição não são permitidas'
}

module.exports = { createMissionInfoValidator, editMissionInfoValidator }
