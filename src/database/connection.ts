import knex from 'knex';
const connection = knex({
    client: 'mysql',
    connection: {
        database: 'ffdiamonds',
        user: 'root',
        host: '127.0.0.1',
        password: ''
        
    }
})

export default connection;

