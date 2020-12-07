import knex from 'knex'
import path from 'path';
const knexfile = require('../../knexfile.ts')

const db = knex(knexfile)
// client: 'mysql',
// connection: {
//     host: 'localhost',
//     database: 'mypatrimony',
//     port: 3306,
//     user: 'root',
//     password: '1234',
// },
// migrations: {
//     directory: path.resolve(__dirname, 'src', 'database', 'migrations') 
// },
// useNullAsDefault: true

export default db