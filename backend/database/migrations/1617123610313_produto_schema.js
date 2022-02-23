'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProdutoSchema extends Schema {
  up () {
    this.create('produtos', (table) => {
      table.increments()
      table.string('nome', 255)
      table.string('grupo', 255)
      table.string('codigo', 255)
      table.string('controle_quantidade', 255)
      table.float('preco', 0)
      table.float('valor_de_custo', 0)
      table.float('estoque', 0)
      table.float('estoqueminimo', 0)
      table.string('vendaporpeso', 255)
      table.string('controleestoque', 255)
      table.string('cod_barras', 255)
      table.timestamps()
    })
  }

  down () {
    this.drop('produtos')
  }
}

module.exports = ProdutoSchema
