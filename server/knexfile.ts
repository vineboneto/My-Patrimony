import path from 'path';

module.exports = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        database: 'mypatrimony',
        port: 3306,
        user: 'root',
        password: '1234',
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations') 
    },
    useNullAsDefault: true
};