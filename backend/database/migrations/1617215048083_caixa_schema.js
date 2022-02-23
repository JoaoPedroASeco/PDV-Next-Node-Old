'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CaixaSchema extends Schema {
  up () {
    this.create('caixas', (table) => {
      table.increments()
      table.integer('idmesa').notNullable()
      table.integer('idcliente')
      table.float('credito')
      table.float('debito')
      table.string('status', 255)
      table.string('tipooperacao', 255).notNullable()
      table.string('formapagamento', 255).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('caixas')
  }
}

module.exports = CaixaSchema
