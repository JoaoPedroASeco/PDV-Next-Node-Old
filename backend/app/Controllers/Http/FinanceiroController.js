'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Financeiro = use('App/Models/Financeiro')
const Caixa = use('App/Models/Caixa')
const Cliente = use('App/Models/Cliente')
const Database = use('Database')

// const pgsp = require('pg-stored-procedure')

/**
 * Resourceful controller for interacting with financeiros
 */
class FinanceiroController {
  // ADICAO DE REGISTROS NA CARTEIRA //
  async addFinanceiro ({ request, response }) {
    const { credito, debito, idcliente, newSaldo, saldo, id } = request.all()

    try{
      if(parseFloat(newSaldo) >= 0 && id != NaN ){
        const raw1 = await Database
          .raw(`INSERT INTO financeiros (idcliente,credito,debito,statusfinal,created_at,updated_at) 
          VALUES ( ${idcliente} , ${credito}, ${debito},'EM ABERTO', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP )`);

        const raw2 = await Database
          .raw(`UPDATE financeiros SET statusfinal = 'BAIXADO' WHERE (id < ${id}) AND (idcliente = ${idcliente})`)

        return "Success";
      }else {
        const raw1 = await Database
          .raw(`INSERT INTO financeiros (idcliente,credito,debito,statusfinal,created_at,updated_at) 
          VALUES ( ${idcliente} , ${credito}, ${debito},'EM ABERTO', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP )`);
        
        return "Success"
      }
    }catch (err){
      return `Error: ${err}`;
    }
  }

  async listCarteira ({ request, response }) {
    const { idcliente } = request.all()

    try{
      const financeiro = await Database
        .raw(`SELECT *, to_char(created_at, 'DD/MM/YYYY') as data_financeiro, to_char(created_at,'HH24:MM:SS') as horario_financeiro
        FROM financeiros 
        WHERE (idcliente = ${idcliente})
        ORDER BY id ASC `);
      
      return financeiro.rows;
    }catch (err){
      return `Error: ${err}`;
    }
  }

  async insertCarteira ({ request, response }) {
    const { idcliente, debito, credito, idmesa } = request.all()

    try{
      const raw1 = await Database
        .raw(`INSERT INTO caixas 
          ( idmesa, credito,debito, valor_recebido, tipooperacao, formapagamento, created_at, updated_at )
          VALUES ( ${idmesa}, ${debito} , ${credito}, ${debito}, 'PGT_PARCIAL', 'CARTEIRA', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP )`);

      const raw2 = await Database
        .raw(`UPDATE pedidos SET status = 'BAIXADO' WHERE  idmesa = ${idmesa}`);

      const raw3 = await Database
        .raw(`UPDATE caixas SET status = 'BAIXADO' WHERE  idmesa = ${idmesa}`);

      if(idmesa != 1 && idmesa != 2){
        const raw4 = await Database
          .raw(`UPDATE mesas SET  status = 'FECHADO' WHERE  id = ${idmesa}`);
      }

      const raw5 = await Database
        .raw(`INSERT INTO financeiros (idcliente,credito,debito,statusfinal,created_at,updated_at) VALUES ( ${idcliente} , ${credito}, ${debito},'EM ABERTO', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP )`);

    }catch (err){
      return `Error: ${err}`
    }
  }

  async deleteCarteira ({ request, response }) {
    const { id } = request.all()

    try{
      await Database.table('financeiros')
        .where('financeiros.id' , '=' , id )
        .delete()
      
      return `Success`;
    }catch (err){
      return `Error: ${err}`;
    }
  }

  // PAGAMENTOS PARCIAIS //
  async listPgtParc ({ request, response }) {
    const { idmesa, idcliente } = request.all()
    try{
      if(!idmesa){
        const pedido = await Database.raw(`SELECT * FROM caixas WHERE (idcliente = ${idcliente}) AND (status = 'EM ABERTO') AND (formapagamento <> 'TOTAL MESA') `)

        return pedido.rows
      }else{
        const pedido = await Database.raw(`SELECT * FROM caixas WHERE (idmesa = ${idmesa}) AND (status = 'EM ABERTO') AND (formapagamento <> 'TOTAL MESA') `)

        return pedido.rows
      }
    }catch (err){
      return `Error: ${err}`;
    }
  }

  async addPgtParc ({ request, response }) {
    const { formapagamento, credito, idmesa, tipooperacao, status, valor_recebido, idcliente } = request.all();
    const debito = 0;

    try{
      if(!idmesa){
        const financeiro = await Database
          .raw(`INSERT INTO caixas ( idmesa, idcliente, credito, debito, valor_recebido, formapagamento, tipooperacao, status, created_at, updated_at ) VALUES ( 0, ${idcliente} , ${credito}, ${debito}, ${valor_recebido},'${formapagamento}','${tipooperacao}','EM ABERTO', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP )`);
        return financeiro
      }else {
        const financeiro = await Database
          .raw(`INSERT INTO caixas ( idmesa, credito, debito, valor_recebido, formapagamento, tipooperacao, status, created_at, updated_at ) VALUES ( ${idmesa} , ${credito}, ${debito}, ${valor_recebido}, '${formapagamento}','${tipooperacao}','EM ABERTO', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP )`);
        return financeiro
      }
    }catch (err){
      return `Error: ${err}`;
    }
  }

  async deletePgtParc ({ request, response }) {
    const { id } = request.all()

    try{
      await Database.table('caixas')
        .where('caixas.id' , '=' , id )
        .delete()

      return `Success`;
    }catch (err){
    return `Error: ${err}`;    
    }
  }
}

module.exports = FinanceiroController
