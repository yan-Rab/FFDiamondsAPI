import Knex from 'knex';

export async function up(knex: Knex){
    await knex.schema.createTable('sales', table => {
        table.increments('id').primary();
        table.integer('id_client').unsigned();
        table.foreign('id_client').references('clients.id')
        table.string('content').notNullable();
        table.float('value').notNullable();
        table.string('payment').notNullable();
        table.string('obs').notNullable();
    })
}

export async function down(knex: Knex){
    await knex.schema.dropTable('sales');
}