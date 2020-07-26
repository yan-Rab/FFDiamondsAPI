import Knex from 'knex';

export async function up(knex: Knex){
    await knex.schema.createTable('clients', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('telephone').notNullable();
        table.string('city').notNullable();
        table.string('uf',2).notNullable();
        table.string('nickname').notNullable().unique();
        table.string('ff_id').notNullable().unique();

    })
}

export async function down(knex: Knex){
    await knex.schema.dropTable('clients')
}