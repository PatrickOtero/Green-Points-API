const swaggerAutogen = require('swagger-autogen')

swaggerAutogen()('./swagger.json', ['./routes.js'])
