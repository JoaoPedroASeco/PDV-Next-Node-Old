
/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ConfigSchema extends Schema {
  up () {
    this.create('userpermissions', (table) => {
      table.increments()
      table.integer('user_id').notNullable()
      table.integer('role_id').notNullable()
      table.integer('create').notNullable()
      table.integer('update').notNullable()
      table.integer('list').notNullable()
      table.integer('delete').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('userpermissions')
  }
}

module.exports = ConfigSchema