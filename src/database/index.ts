import knex from 'knex'

const db = knex({
  client: 'pg',
  connection: {
    host: 'postgres',
    user: 'postgres',
    password: 'test',
    database: 'stream',
  },
})

export default db
