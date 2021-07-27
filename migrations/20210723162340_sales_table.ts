import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('sales', (table) => {
    table.uuid('id').primary()
    table.string('sku', 6)
    table.string('product', 255)
    table.integer('amount')
    table.string('first_name', 255)
    table.string('last_name', 255)
    table.date('date')
    table.string('city', 255)
    table.decimal('unit_price')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('sales')
}
