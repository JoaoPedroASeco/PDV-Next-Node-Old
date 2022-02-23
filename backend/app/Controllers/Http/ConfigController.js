'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Database = use('Database')
const Config = use('App/Models/Config')

/**
 * Resourceful controller for interacting with clientes
 */
class ClienteController {
  async list ({ request, response, view }) {
    try {
      const config = Database.table('configs').select('*')
      return config;
    }catch(err) {
      return `Error: ${err}`;
    }
  }

  async update ({ request, response }) {
    const { nome_empresa, telefone_empresa, cnpj_empresa, endereco_empresa } = request.all();

    try{
      const config = Database
        .raw(`UPDATE configs SET 
        nome_empresa = '${nome_empresa}' , telefone_empresa = '${telefone_empresa}', 
        cnpj_empresa = '${cnpj_empresa}', endereco_empresa = '${endereco_empresa}' 
        WHERE id = 1`);
      
      return config;
    }catch (err) {
      return `Error: ${err}`;
    }
  }
}

module.exports = ClienteController
