'use strict'

const Mesa = use('App/Models/Mesa')
const Pedido = use('App/Models/Pedido')
const Delivery = use('App/Models/Delivery')
const Produto = use('App/Models/Produto')
const Database = use('Database')

class MesaController {
  // FUNCOES BASICAS - MESA //
  async list ({ request, response, view }) {
    try{
      const mesas = Database.
        raw(`SELECT * FROM mesas WHERE status <> 'FECHADO' ORDER BY id`)

      return mesas;
    }catch (err){
      return `Error: ${err}`;
    }
  }

  async create ({ request, response }) {
    const { codigo } = request.all();
    const status = "ABERTO";
    const data = { codigo, status };

    try{
      const codigoExiste = await Database.raw(`SELECT * FROM mesas WHERE codigo = '${codigo}'`);
      const rowcount = codigoExiste.rowCount;
      
      if(parseFloat(rowcount) > 0) {
        const idMesa = codigoExiste.rows[0].id;
        const upMesa = await Database.raw(`UPDATE mesas SET status = 'ABERTO' WHERE id = ${idMesa} `);

        return upMesa;
      }else{
        const mesa = await Mesa.create(data)

        return "Success"
      }
    }catch(err) {
      return `Error: ${err}`
    }
  }

  // FUNCOES CONSUMO - MENU / MESA //
  async add_Pedido ({ request, response }) {
    const { idcliente, idmesa, idproduto, quantidade, estoque, valor_de_venda, valor_de_custo,iddelivery } = request.all();
    
    try{
      if( idcliente == null ){

        const pedido = await Database
          .raw(`INSERT INTO pedidos (idmesa,idproduto, status ,quantidade, valor_de_venda, valor_de_custo, created_at, updated_at) 
          VALUES (${idmesa}, ${idproduto}, 'EM PREPARO', ${quantidade}, ${valor_de_venda}, ${valor_de_custo}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`);
        
        const upEstoque = await Database.table('produtos')
          .update({ estoque: estoque }).where({id: idproduto});

        const produtosEstoque = await Database.table('produtos')
          .select('estoque').where({id: idproduto});

        return produtosEstoque
      }else {
        const pedido = await Database
          .raw(`INSERT INTO pedidos (idcliente,idmesa,idproduto, status ,quantidade, valor_de_venda, valor_de_custo, iddelivery, created_at, updated_at) 
          VALUES (${idcliente},${idmesa}, ${idproduto}, 'EM PREPARO', ${quantidade}, ${valor_de_venda}, ${valor_de_custo}, ${iddelivery}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`);
        
        const upEstoque = await Database.table('produtos')
          .update({ estoque: estoque }).where({id: idproduto});
        
        const produtosEstoque = await Database.table('produtos')
          .select('estoque').where({id: idproduto});

        return produtosEstoque
      }
    }catch (err){
      return `Error: ${err}`;
    }
  }

  async list_Consumo ({ request, response, view }) {
    const { id, iddelivery } = request.all()
    try{
      if( !id ){
        const pedido = await Database
        .raw(`SELECT *,pedido.id AS pedidoid, produto.id AS prodid
          FROM produtos AS produto 
          INNER JOIN pedidos AS pedido ON pedido.idproduto = produto.id
          WHERE (pedido.iddelivery = ${iddelivery}) `)

        return pedido.rows;
      }else{
        const pedido = await Database
        .raw(`SELECT *,pedido.id AS pedidoid, produto.id AS prodid
          FROM produtos AS produto 
          INNER JOIN pedidos AS pedido ON pedido.idproduto = produto.id
          WHERE (pedido.idmesa = ${id}) `)

        return pedido.rows;
      }
    }catch (err){
      return `Error: ${err}`; 
    }
  }

  async delete_pedido ({  request  , response }) {
    const { id, estoque, idproduto } = request.all()
    try{
      const pedido = await Database.
        raw(`DELETE FROM pedidos WHERE id = ${id}`)

      const up_prod = await Database.
        raw(`UPDATE produtos SET estoque = ${estoque} WHERE id = ${idproduto}`)
      
      return up_prod
    }catch (err){
      return `Error: ${err}`;
    }
  }

  // FINALIZAÇÃO DE CAIXA/PEDIDO/MESA //
  async finalizaMesa ({ request, response }) {
    const { idmesa , credito } = request.all()
    const debito = 0; 
    try{
      const raw1 = await Database
        .raw(`INSERT INTO caixas 
          ( idmesa, credito, debito, valor_recebido, tipooperacao, formapagamento, created_at, updated_at)
          VALUES ( ${idmesa}, ${credito}, ${debito}, ${credito}, 'ENTRADA', 'TOTAL MESA', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`);

      const raw2 = await Database
        .raw(`UPDATE pedidos SET status = 'BAIXADO' WHERE  idmesa = ${idmesa}`);

      const raw3 = await Database
        .raw(`UPDATE caixas SET status = 'BAIXADO' WHERE  idmesa = ${idmesa}`);

      if(idmesa != 1 && idmesa != 2) {
        const raw4 = await Database
          .raw(`UPDATE mesas SET  status = 'FECHADO' WHERE  id = ${idmesa}`);
      }

      return "Success"
    }catch (err){
      return `Error: ${err}`;
    }
  }

  // DELIVERY //
  async selecionaCliente ({ params, request, response }) {
    const { id, idcliente, nome, telefone } = request.all()

    try{
      const selectCliente = Database
        .raw(`UPDATE deliveries SET idcleinte = ${idcleinte}, idcaixa = ${idcaixa}, 
        nome = '${nome}', telefone = '${telefone}' 
        WHERE id = 0`);
    }catch (err){
      return `Error: ${err}`;
    }
  }
}

module.exports = MesaController