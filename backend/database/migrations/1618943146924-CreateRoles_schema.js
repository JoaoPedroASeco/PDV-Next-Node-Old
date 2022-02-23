
/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ConfigSchema extends Schema {
  up () {
    this.create('roles', (table) => {
      table.increments()
      table.string('name', 255).notNullable()
      table.string('descriptions', 255).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('roles')
  }
}

module.exports = ConfigSchema
