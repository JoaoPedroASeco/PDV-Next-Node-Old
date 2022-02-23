'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DeliverySchema extends Schema {
  up () {
    this.create('deliveries', (table) => {
      table.increments()
      table.integer('idcliente').notNullable()
      table.float('troco')
      table.string('nome', 255)
      table.string('telefone', 255)
      table.string('endereco', 255)
      table.string('status', 255)
      table.integer('idstatus')
      table.string('entregador', 255)
      table.integer('identregador')
      table.timestamps()
    })
  }

  down () {
    this.drop('deliveries')
  }
}

module.exports = DeliverySchema
