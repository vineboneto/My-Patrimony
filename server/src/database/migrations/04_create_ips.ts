import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('ips', table => {
        table.increments('id').primary()
        table.string('ip', 15).notNullable()
        table.string('mask', 15).notNullable()
        table.string('gateway', 15).notNullable()
        table.integer('patrimony_id').unsigned().notNullable()

        table.foreign('patrimony_id')
            .references('id')
            .inTable('patrimonys')
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('ips')
}