'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FinanceiroSchema extends Schema {
  up () {
    this.create('financeiros', (table) => {
      table.increments()
      table.integer('idcliente').notNullable()
      table.float('credito')
      table.float('debito')
      table.string('statusfinal', 255)
      table.timestamps()
    })
  }

  down () {
    this.drop('financeiros')
  }
}

module.exports = FinanceiroSchema
