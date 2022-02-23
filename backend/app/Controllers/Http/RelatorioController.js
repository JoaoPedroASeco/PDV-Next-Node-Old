'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Caixa = use('App/Models/Caixa')
const Pedido = use('App/Models/Pedido')
const Database = use('Database')
/**
 * Resourceful controller for interacting with relatorios
 */
class RelatorioController {
  async relatorioEntrada ({ request , response }) {
    const {inicio, fim} = request.all();

    try {
      const raw1 = await Database
        .raw(`SELECT to_char(created_at, 'DD/MM/YYYY') as created_at, to_char(created_at,'HH24:MM:SS') as horario,credito,formapagamento,tipooperacao 
        FROM caixas  
        WHERE  (created_at >= '${inicio}' AND created_at <= '${fim}')  
        GROUP BY ( caixas.created_at, caixas.credito, caixas.formapagamento, caixas.tipooperacao )`)

      return raw1.rows;
    }catch (err) {
      return `Error: ${err}`;
    }
  }

  async relatorioSaida ({ request , response }) {
    const {inicio, fim} = request.all();

    try {
      const raw1 = await Database
        .raw(`SELECT p.idproduto, prod.nome, SUM(p.quantidade ) AS quantidade , p.valor_de_venda, prod.valor_de_custo 
        FROM pedidos p 
        INNER JOIN produtos AS prod ON p.idproduto = prod.id 
        WHERE  (p.created_at >=  '${inicio}' AND p.created_at <= '${fim}' )
        GROUP BY (prod.nome, p.idproduto, p.valor_de_venda, prod.valor_de_custo )`)

      return raw1.rows;
    }catch (err) {
      return `Error: ${err}`;
    }
  }

  async relatorioLucro ({ request , response }) {
    const {inicio, fim} = request.all();

    try {
      const raw1 = await Database
        .raw(`SELECT p.idproduto, prod.nome, SUM(p.quantidade ) AS quantidade , p.valor_de_venda, prod.valor_de_custo 
        FROM pedidos p 
        INNER JOIN produtos AS prod ON p.idproduto = prod.id 
        WHERE  (p.created_at >=  '${inicio}' AND p.created_at <= '${fim}' )
        GROUP BY (prod.nome, p.idproduto, p.valor_de_venda, prod.valor_de_custo )`)

      return raw1.rows;
    }catch (err) {
      return `Error: ${err}`;
    }
  }
}

module.exports = RelatorioController
