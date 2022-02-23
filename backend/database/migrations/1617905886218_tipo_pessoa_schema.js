'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TipoPessoaSchema extends Schema {
  up () {
    this.create('tipo_pessoas', (table) => {
      table.increments()
      table.string('funcao', 255).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('tipo_pessoas')
  }
}

module.exports = TipoPessoaSchema
