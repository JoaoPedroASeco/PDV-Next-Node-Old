'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TipoPagamentoSchema extends Schema {
  up () {
    this.create('tipo_pagamentos', (table) => {
      table.increments()
      table.string('descricao', 255).notNullable()
      table.string('codigo', 255).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('tipo_pagamentos')
  }
}

module.exports = TipoPagamentoSchema
