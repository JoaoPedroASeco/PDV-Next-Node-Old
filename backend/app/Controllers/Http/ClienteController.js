'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Cliente = use('App/Models/Cliente')
const Database = use('Database')
/**
 * Resourceful controller for interacting with clientes
 */
class ClienteController {
  async list ({ request, response, view }) {
    const { busca } = request.all();
    try {
      if(!busca){
        const cliente = await Database
          .raw(`SELECT *,p.id as idpessoa FROM clientes p 
            LEFT JOIN (SELECT f.idcliente as idcliente, max(id) AS idsaldo,
            SUM(f.credito-f.debito) as saldofinal FROM financeiros AS f GROUP BY idcliente) 
            fg ON p.id = fg.idcliente  
            ORDER BY ( p.nome, p.id, fg.idcliente, fg.idsaldo, fg.saldofinal) ASC`);

        return cliente.rows;
      }else {
        const cliente = await Database
          .raw(`SELECT *,p.id as idpessoa FROM clientes p 
            LEFT JOIN (SELECT f.idcliente as idcliente, max(id) AS idsaldo,
            SUM(f.credito-f.debito) as saldofinal FROM financeiros AS f GROUP BY idcliente) fg ON p.id = fg.idcliente 
            WHERE (lower(p.nome) ~* '${busca}') OR (lower(p.cpf) ~* '${busca}') OR (lower(p.telefone) ~* '${busca}') 
            ORDER BY ( p.nome, p.id, fg.idcliente, fg.idsaldo, fg.saldofinal) ASC`);

        return cliente.rows;
      }
    }catch(err) {
      return `Error: ${err}`;
    }
  }

  async create ({ request, response }) {
    const { nome, cpf, telefone, funcao, id, bairro_cidade, numero, rua } = request.all();
    try{
      if(id == "" || id == null) {
        const data = { nome, cpf, telefone, funcao, bairro_cidade, numero, rua }

        const cliente = await Cliente.create(data)

        return cliente;
      }else {
        const data = { id, nome, cpf, telefone, funcao, bairro_cidade, numero, rua }

        const cliente = Database.table('clientes')
          .where('id', id)
          .update({ nome: nome, cpf: cpf, telefone: telefone, funcao: funcao, bairro_cidade: bairro_cidade , numero: numero, rua: rua })

        return cliente;
      }
    }catch (err) {
      return `Error: ${err}`;
    }
  }

  async delete ({ params, request }) {
    try {
      const { id } = request.all()

      const cliente = await Database.table('clientes').where('clientes.id', id ).delete()

      return "Success";
    }catch(err) {
      return `Error: ${err}`;
    }
  }

  async listFuncao ({ request, response, view }) {
    try {
      const funcao = await Database
        .raw(`SELECT id,funcao FROM tipo_pessoas `);

      return funcao.rows;
    }catch(err) {
      return `Error: ${err}`;
    }
  }
}

module.exports = ClienteController
