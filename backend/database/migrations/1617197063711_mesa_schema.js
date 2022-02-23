'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MesaSchema extends Schema {
  up () {
    this.create('mesas', (table) => {
      table.increments()
      table.string('codigo', 255).notNullable()
      table.string('descricao', 255)
      table.string('status', 255)
      table.timestamps()
    })
  }

  down () {
    this.drop('mesas')
  }
}

module.exports = MesaSchema
