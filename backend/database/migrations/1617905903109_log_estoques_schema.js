'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LogEstoquesSchema extends Schema {
  up () {
    this.create('log_estoques', (table) => {
      table.increments()
      table.integer('idproduto').notNullable()
      table.integer('quantidade').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('log_estoques')
  }
}

module.exports = LogEstoquesSchema
