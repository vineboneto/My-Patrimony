import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('ips', table => {
        table.increments('id').primary()
        table.string('ip', 16).notNullable()
        table.string('mask', 16).notNullable()
        table.string('gateway', 16).notNullable()
        table.integer('computer_id').unsigned()
        table.integer('printer_id').unsigned()
        table.integer('router_id').unsigned()

        table.foreign('computer_id')
            .references('id')
            .inTable('computers')

        table.foreign('printer_id')
            .references('id')
            .inTable('printers')

        table.foreign('router_id')
            .references('id')
            .inTable('routes')
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('ips')
}