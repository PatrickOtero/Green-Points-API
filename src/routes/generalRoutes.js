const { Router } = require('express')
const { individualLogin } = require('../controllers/users/individualLogin')
const {
  individualRegistration,
} = require('../controllers/users/individuals/individuals')
const swaggerUi = require('swagger-ui-express')
const {
  companyRegistration,
} = require('../controllers/users/companies/companies')
const { companyLogin } = require('../controllers/users/companyLogin')

const generalRoutes = Router()

// Swagger User interface route.

generalRoutes.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(require('../swagger.json')),
)

// Users

// Individuals
generalRoutes.get('/user/individual/login', individualLogin)
generalRoutes.post('/individuals', individualRegistration)

// Companies
generalRoutes.get('/user/company/login', companyLogin)
generalRoutes.post('/companies', companyRegistration)

module.exports = generalRoutes
