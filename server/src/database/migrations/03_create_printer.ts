import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('printers', table => {
        table.increments('id').primary()
        table.string('patrimony', 45).notNullable()
        table.string('model', 45).notNullable()
        table.string('description', 255)
        table.integer('owner_id').unsigned().notNullable()

        table.foreign('owner_id')
            .references('id')
            .inTable('owners')
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('printers')
}