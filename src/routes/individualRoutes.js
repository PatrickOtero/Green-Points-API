const { Router } = require('express')
const {
  individualEdit,
  individualDeletion,
} = require('../controllers/users/individuals/individuals')
const { individualValidation } = require('../middlewares/individualValidation')

const individualRoutes = Router()

individualRoutes.use('/individuals', individualValidation)

individualRoutes.put('/individuals', individualEdit)
individualRoutes.delete('/individuals', individualDeletion)

module.exports = individualRoutes
