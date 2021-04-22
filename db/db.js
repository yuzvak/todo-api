const { Pool } = require('pg')

const pool = new Pool({
    user: 'sfioyfbo',
    password: 'Ph7pt0HNNjQsST_iwoR1mFo7IX_TCxtu',
    host: 'hansken.db.elephantsql.com',
    port: 5432,
    database: 'sfioyfbo'
})

module.exports = pool

