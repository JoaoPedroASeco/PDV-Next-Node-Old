"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ClienteSchema extends Schema {
  up() {
    this.create("clientes", (table) => {
      table.increments();
      table.string("nome", 255).notNullable();
      table.string("telefone", 255).notNullable();
      table.float("saldo", 0).notNullable();
      table.string("cpf", 255).notNullable();
      table.string("funcao", 255).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("clientes");
  }
}

module.exports = ClienteSchema;
