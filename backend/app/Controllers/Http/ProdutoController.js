'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Produto = use('App/Models/Produto')
const Database = use('Database')
/**
 * Resourceful controller for interacting with produtos
 */
class ProdutoController {

  async list ({ request, response, view }) {
    const { grupo, busca } = await request.all()

    try{
      if(grupo == null && busca == null){
        const produto = await Database
          .raw(`SELECT * FROM produtos ORDER BY nome`);

        return produto.rows;
      }else if(grupo == null){
        const produto = await Database
          .raw(`SELECT * FROM produtos
            WHERE (lower(produtos.nome) ~* '${busca}') ORDER BY nome`);

        return produto.rows;
      }else if(busca == null){
        const produto = await Database
          .raw(`SELECT * FROM produtos
            WHERE (lower(produtos.grupo) ~* '${grupo}') ORDER BY nome`);

        return produto.rows;
      }else {
        const produto = await Database
          .raw(`SELECT * FROM produtos
            WHERE (lower(produtos.grupo) ~* '${grupo}')
            AND (lower(produtos.nome) ~* '${busca}') ORDER BY nome`);

        return produto.rows;
      }
    }catch (err){
      return `Error: ${err}`;
    }

  }

  async create ({ request, response }) {
    const { id, codigo, cod_barras, nome, preco, grupo, estoque, estoqueminimo, vendaporpeso, controleestoque, valor_de_custo, controle_quantidade} = request.all();
    const data = { codigo, cod_barras, nome, preco, grupo, estoque, estoqueminimo, vendaporpeso, controleestoque, valor_de_custo, controle_quantidade };

    try{
      if(id == null || id == ""){
        const produto = await Produto.create(data)

        return "Success";
      }else {
        const produtos = await Database.table('produtos')
          .where('id', id)
          .update({ codigo: codigo, cod_barras: cod_barras, nome: nome, preco: preco, grupo: grupo, estoque: estoque, estoqueminimo: estoqueminimo, vendaporpeso: vendaporpeso, controleestoque: controleestoque, valor_de_custo: valor_de_custo, controle_quantidade: controle_quantidade })

        return produtos;
      }
    }catch(err) {
      return `Error: ${err}`;
    }
  }

  async delete ({ params , request }) {
    try{
      const { id } = request.all()

      const produto = await Produto.find(id)

      await produto.delete()
    }catch(err) {
      return `Error: ${err}`;
    }
  }

}

module.exports = ProdutoController
