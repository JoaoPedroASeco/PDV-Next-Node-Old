'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const GrupoProduto = use('App/Models/GrupoProduto')
const Database = use('Database')
/**
 * Resourceful controller for interacting with grupoprodutos
 */
class GrupoProdutoController {
  async list ({ request, response, view }) {
    const { busca } = request.all();

    try{
      if(!busca){
        const grupoProdutos = await Database
          .raw(`SELECT * FROM grupo_produtos
          ORDER BY grupo ASC`);

        return grupoProdutos.rows;
      }else{
        const grupoProdutos = await Database
          .raw(`SELECT * FROM grupo_produtos 
          WHERE (lower(p.grupo) ~* '${busca}')
          ORDER BY grupo ASC`);

        return grupoProdutos.rows;
      }
    }catch (err){
      return `Error: ${err}`
    }
  }

  async create ({ request, response }) {
    const { grupo, id } = request.all();
    const data = { grupo };

    try{
      if(id == null) {
        const grupoProduto = await GrupoProduto.create(data)

        return "Success";
      }else {
        const grupoProduto = await Database.table('grupo_produtos')
          .where('id', id).update('grupo', grupo);

        return grupoProduto;
      }
    }catch(err) {
      return `Error: ${err}`
    }
  }

  async delete ({ params , request }) {
    try{
      const { id } = request.all()

      const grupoProduto = await GrupoProduto.find(id)

      await grupoProduto.delete()

      return "Success"
    }catch (err){
      return `Error: ${err}`;
    }

  }
}

module.exports = GrupoProdutoController
