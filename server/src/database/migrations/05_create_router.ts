import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('routes', table => {
        table.increments('id').primary()
        table.string('description', 255)
        table.integer('sector_id').unsigned()

        table.foreign('sector_id')
            .references('id')
            .inTable('sectors')
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('printers')
}