import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('computers', table => {
        table.increments('id').primary()
        table.string('patrimony').notNullable()
        table.string('description')
        table.string('model')
        table.integer('id_owners').unsigned().notNullable()
        
        table.foreign('id_owners')
            .references('id')
            .inTable('owners')
    })   
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('computers')
}