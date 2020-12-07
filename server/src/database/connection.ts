import knex from 'knex'
import path from 'path';

const port = 3306

const db = knex({
    client: 'mysql',
    connection: {
        host: `localhost:${port}`,
        user: 'root',
        password: '1234',
        database: 'mypatrimony'
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations') 
    },
    useNullAsDefault: true
})

export default db