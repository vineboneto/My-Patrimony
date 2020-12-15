import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('owners', table => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.integer('sector_id').unsigned().notNullable()

        table.foreign('sector_id')
            .references('id')
            .inTable('sectors')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropSchema('owners')
}