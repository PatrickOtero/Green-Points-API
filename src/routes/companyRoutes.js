const { Router } = require('express')
const {
  companyEdit,
  companyDeletion,
} = require('../controllers/users/companies/companies')
const { companyValidation } = require('../middlewares/companyValidation')

const companyRoutes = Router()

companyRoutes.use('/companies', companyValidation)

companyRoutes.put('/companies', companyEdit)
companyRoutes.delete('/companies', companyDeletion)

module.exports = companyRoutes
