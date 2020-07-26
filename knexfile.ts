import path from 'path';

module.exports = {
    
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'ffdiamonds',
    },

    migrations: {
        directory: path.resolve(__dirname, 'src','database','migrations')
    },

    useNullAsDefault: true
}