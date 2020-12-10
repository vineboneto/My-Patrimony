import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('computers', table => {
        table.increments('id').primary()
        table.string('patrimony').notNullable()
        table.string('description')
        table.string('model')
        table.integer('owner_id').unsigned().notNullable()
        
        table.foreign('owner_id')
            .references('id')
            .inTable('owners')
    })   
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('computers')
}