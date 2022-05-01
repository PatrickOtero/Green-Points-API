const knex = require('knex')({
  client: 'pg',
  connection: {
    user: process.env.SVR_DB_USER || process.env.LOCAL_DB_USER,
    port: 5432,
    host: process.env.SVR_DB_HOST || process.env.LOCAL_DB_HOST,
    database: process.env.SVR_DB_DATABASE || process.env.LOCAL_DB_DATABASE,
    password: process.env.SVR_DB_PASSWORD || process.env.LOCAL_DB_PASSWORD,
    // ssl: { rejectUnauthorized: false },
  },
})

module.exports = knex
