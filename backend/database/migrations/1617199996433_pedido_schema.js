'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PedidoSchema extends Schema {
  up () {
    this.create('pedidos', (table) => {
      table.increments()
      table.integer('idmesa', 255).notNullable()
      table.integer('idproduto').notNullable()
      table.string('status', 255).notNullable()
      table.float('quantidade').notNullable()
      table.float('valor_de_venda').notNullable()
      table.float('valor_de_custo').notNullable()
      table.integer('idcliente')
      table.integer('iddelivery')
      table.timestamps()
    })
  }

  down () {
    this.drop('pedidos')
  }
}

module.exports = PedidoSchema
