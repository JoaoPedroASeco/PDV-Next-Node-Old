'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GrupoProdutoSchema extends Schema {
  up () {
    this.create('grupo_produtos', (table) => {
      table.increments()
      table.string('grupo', 255).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('grupo_produtos')
  }
}

module.exports = GrupoProdutoSchema
