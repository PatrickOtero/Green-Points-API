const { Router } = require('express')
const { individualValidation } = require('./middlewares/individualValidation')
const { companyValidation } = require('./middlewares/companyValidation')
const { individualLogin } = require('./controllers/users/individualLogin')
const { companyLogin } = require('./controllers/users/companyLogin')
const {
  individualRegistration,
  individualEdit,
  individualDeletion,
} = require('./controllers/users/individuals/individuals')
const {
  userLikePost,
  userDeleteLikeOnPost,
} = require('./controllers/data/userLikes')
const {
  companyRegistration,
  companyEdit,
  companyDeletion,
} = require('./controllers/users/companies/companies')
const {
  createMissionPost,
  editMissionPost,
  deleteMissionPost,
  missionPostsFeed,
} = require('./controllers/data/companyMissionPosts')

const routes = Router()

// Login Validation Middlewares
routes.use('/individuals', individualValidation)
routes.use('/companies', companyValidation)

// Users

// Individuals
routes.get('/user/individual/login', individualLogin)
routes.post('/individuals/register', individualRegistration)
routes.put('/individuals/edit', individualEdit)
routes.delete('/individuals/delete', individualDeletion)

// User reactions (likes)
routes.post('/individuals/missionLike/react/:missionId', userLikePost)
routes.delete(
  '/individuals/missionLike/deleteReaction/:missionId',
  userDeleteLikeOnPost,
)

// Individuals missions feed
routes.get('/individuals/missionsFeed/:limit', missionPostsFeed)

// Companies
routes.get('/user/company/login', companyLogin)
routes.post('/companies/register', companyRegistration)
routes.put('/companies/edit', companyEdit)
routes.delete('/companies/delete', companyDeletion)

// Mission Posts
routes.post('/companies/missions/create', createMissionPost)
routes.put('/companies/missions/edit/:missionId', editMissionPost)
routes.delete('/companies/missions/delete/:missionId', deleteMissionPost)

// Companies missions feed
routes.get('/companies/missionsFeed/:limit', missionPostsFeed)

module.exports = routes
