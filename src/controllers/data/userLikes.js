const knex = require('../../connection')

const userLikePost = async (req, res) => {
  const { id } = req.user
  const { missionId } = req.params

  try {
    const missionPost = await knex('companymissionposts')
      .where({ id: missionId })
      .first()

    if (!missionPost)
      return res.status(404).json({ message: 'Missão não encontrada!' })

    const alreadyLiked = await knex('missionuserlikes')
      .where({ like_user_id: id, like_post_id: missionId })
      .first()

    if (alreadyLiked)
      return res.status(401).json({ message: 'Você já reagiu a esta missão' })

    const userReacting = await knex('missionuserlikes').insert({
      like_user_id: id,
      like_post_id: missionId,
    })

    if (userReacting.length)
      return res
        .status(500)
        .json({ message: 'Não foi possível reagir a esta missão.' })

    return res.status(200).json('Reação registrada com sucesso.')
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const userDeleteLikeOnPost = async (req, res) => {
  const { id } = req.user
  const { missionId } = req.params

  try {
    const missionPost = await knex('companymissionposts')
      .where({ id: missionId })
      .first()

    if (!missionPost)
      return res.status(404).json({ message: 'Missão não encontrada!' })

    const userRemovingReaction = await knex('missionuserlikes')
      .where({
        like_user_id: id,
        like_post_id: missionId,
      })
      .del()

    if (userRemovingReaction.length)
      return res
        .status(500)
        .json('Ocorreu um erro no servidor. Não foi possível desfazer a reação')

    return res.status(200).json('Reação removida com sucesso.')
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

module.exports = { userLikePost, userDeleteLikeOnPost }
