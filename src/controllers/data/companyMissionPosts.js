const knex = require('../../connection')
const {
  createMissionPostSchema,
} = require('../../validations/companies/missionPosts/createMissionPostSchema')
const {
  editMissionPostSchema,
} = require('../../validations/companies/missionPosts/editMissionPostSchema')
const {
  createMissionInfoValidator,
  editMissionInfoValidator,
} = require('./missionFunctions/helpers')

const createMissionPost = async (req, res) => {
  const { mission_name, mission_title, mission_description } = req.body
  const { id } = req.user

  try {
    await createMissionPostSchema.validate(req.body)

    const errorMessage = await createMissionInfoValidator(req.body)

    if (errorMessage) return res.status(401).json({ errorMessage })

    const creatingMission = await knex('companymissionposts').insert({
      mission_name,
      mission_title,
      mission_description,
      company_id: id,
    })

    if (creatingMission.length)
      return res.status(500).json('Ocorreu um erro interno no servidor.')

    return res.status(200).json('Missão criada e postada com sucesso.')
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const editMissionPost = async (req, res) => {
  const { mission_name, mission_title, mission_description } = req.body
  const { id } = req.user
  const { missionId } = req.params

  try {
    await editMissionPostSchema.validate(req.body)

    const existMissionPost = await knex('companymissionposts')
      .where({
        id: missionId,
      })
      .first()

    if (!existMissionPost) return res.status(404).json('Esta missão não existe')

    const errorMessage = await editMissionInfoValidator(req.body, missionId)

    if (errorMessage) return res.status(401).json({ errorMessage })

    const editingMission = await knex('companymissionposts')
      .update({
        mission_name,
        mission_title,
        mission_description,
      })
      .where({ id: missionId, company_id: id })

    if (editingMission.length)
      return res.status(500).json('Ocorreu um erro interno no servidor.')

    return res.status(200).json('Missão editada com sucesso.')
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const deleteMissionPost = async (req, res) => {
  const { id } = req.user
  const { missionId } = req.params

  try {
    const existMissionPost = await knex('companymissionposts')
      .where({
        id: missionId,
      })
      .first()

    if (!existMissionPost) return res.status(404).json('Esta missão não existe')

    const deletingMissionPost = await knex('companymissionposts')
      .where({ id: missionId, company_id: id })
      .del()

    if (deletingMissionPost.length)
      return res.status(500).json('Ocorreu um erro interno no servidor')

    return res.status(200).json('Missão excluída com sucesso')
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const missionPostsFeed = async (req, res) => {
  const { id } = req.user
  const { limit } = req.params

  const TotalPosts = limit ? limit : 5

  try {
    const missionPostsList = await knex('companymissionposts').limit(TotalPosts)

    if (!missionPostsList.length)
      return res.status(404).json('Nenhuma missão postada')

    for (mission of missionPostsList) {
      const individualLikes = await knex('missionuserlikes').where({
        like_post_id: mission.id,
      })
      mission.individualLikes = individualLikes.length

      mission.likedByindividual = individualLikes.find(
        (likes) => likes.like_user_id === id,
      )
        ? true
        : false
    }
    return res.status(200).json({ missionPostsList })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

module.exports = {
  createMissionPost,
  missionPostsFeed,
  editMissionPost,
  deleteMissionPost,
}
