'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Delivery = use('App/Models/Delivery')
const Database = use('Database')

/**
 * Resourceful controller for interacting with deliveries
 */
class DeliveryController {

  async openDelivery ({ request, response, view }) {
    const { idcliente, nome, telefone, status } = request.all();
    const data = {idcliente, nome, telefone, status}
    try{
      const resp_id = await Database.insert(data).into('deliveries').returning('id')

      const id = parseFloat(resp_id) + 0;

      const up_data = await Database.
        raw(`UPDATE deliveries SET created_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = ${id}`)

      return { message: "Success", data: resp_id }
    }catch (err) {
      return `Error: ${err}`;
    }
  }

  async cancelaDelivery ({  request, response }) {
    const { id } = request.all()

    try{
      const raw1 = await Database
        .raw(`DELETE FROM deliveries WHERE id = ${id}`)

      const raw2 = await Database
        .raw(`DELETE FROM pedidos WHERE iddelivery = ${id}`)

      return "Success"
    }catch(err) {
      return `Error: ${err}`
    }
  }

  async listEmAtendimento ({ request, response }) {
    const { idcliente, nome, telefone, status } = request.all();

    try{
      const Delivery = await Database
        .raw(`SELECT * FROM deliveries WHERE status = 'EM ATENDIMENTO' `);

      return Delivery.rows;
    }catch (err) {
      return `Error: ${err}`;
    }
  }

  async finazilaDelivery ({ request, response }) {
    const { iddelivery, idcliente , credito, troco } = request.all()
    const debito = 0; 

    try{
      const raw1 = await Database
        .raw(`INSERT INTO caixas 
          ( idmesa, idcliente, credito, debito,valor_recebido, tipooperacao, formapagamento, created_at, updated_at)
          VALUES ( 0, ${idcliente}, ${credito}, ${debito}, ${credito}, 'DELIVERY', 'TOTAL DELIVERY', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP )`);

      const raw2 = await Database
        .raw(`UPDATE caixas SET status = 'BAIXADO' WHERE  idcliente = ${idcliente}`);

      const raw3 = await Database
        .raw(`UPDATE pedidos SET status = 'PREPARO PARA ENVIO' WHERE  idcliente = ${idcliente}`);

      const raw4 = await Database
        .raw(`UPDATE deliveries SET status = 'PREPARO PARA ENVIO', troco = ${troco}, total = ${credito} WHERE  id = ${iddelivery}`);

      return "Success"
    }catch (err){
      return `Error: ${err}`;
    }
  }

  async listDelivery ({ request, response }) {
    const { busca, order, boolean } = request.all()

    try{
      if(!busca && !order && !boolean){
        const raw1 = await Database
          .raw(`SELECT *, to_char(d.created_at,'HH24:MM:SS') as horario, d.id as iddelivery
          FROM deliveries as d
          INNER JOIN clientes AS c 
          ON c.id = d.idcliente 
          WHERE (status <> 'EM PREPARO') 
          ORDER BY (d.created_at,d.id,c.id,d.nome,d.entregador) ASC`)

        return raw1.rows;
      }else if( !order && !boolean ) {
        const raw1 = await Database
          .raw(`SELECT *, to_char(d.created_at,'HH24:MM:SS') as horario, d.id as iddelivery
          FROM deliveries as d
          INNER JOIN clientes AS c 
          ON c.id = d.idcliente 
          WHERE (status <> 'EM PREPARO') 
          AND  (lower(d.nome) ~* '${busca}') 
          ORDER BY (d.created_at,d.id,c.id,d.nome,d.entregador) ASC`)

        return raw1.rows;
      }else if(!busca) {
        if( parseFloat(order) == 1 && boolean == true ){
          const raw1 = await Database
            .raw(`SELECT *, to_char(d.created_at,'HH24:MM:SS') as horario, d.id as iddelivery
            FROM deliveries as d
            INNER JOIN clientes AS c 
            ON c.id = d.idcliente 
            WHERE (status <> 'EM PREPARO') 
            ORDER BY (d.created_at,d.id,c.id,d.nome,d.entregador) DESC`)

          return raw1.rows;
        }else if(parseFloat(order) == 1 && boolean == false){
          const raw1 = await Database
            .raw(`SELECT *, to_char(d.created_at,'HH24:MM:SS') as horario, d.id as iddelivery
            FROM deliveries as d
            INNER JOIN clientes AS c 
            ON c.id = d.idcliente 
            WHERE (status <> 'EM PREPARO') 
            ORDER BY (d.created_at,d.id,c.id,d.nome,d.entregador) ASC`)

          return raw1.rows;
        }else if(parseFloat(order) == 2 && boolean == true){
          const raw1 = await Database
            .raw(`SELECT *, to_char(d.created_at,'HH24:MM:SS') as horario, d.id as iddelivery
            FROM deliveries as d
            INNER JOIN clientes AS c 
            ON c.id = d.idcliente 
            WHERE (status <> 'EM PREPARO') 
            ORDER BY (d.nome,d.created_at,d.id,c.id,d.entregador) DESC`)

          return raw1.rows;
        }else if(parseFloat(order) == 2 && boolean == false){
          const raw1 = await Database
            .raw(`SELECT *, to_char(d.created_at,'HH24:MM:SS') as horario, d.id as iddelivery
            FROM deliveries as d
            INNER JOIN clientes AS c 
            ON c.id = d.idcliente 
            WHERE (status <> 'EM PREPARO') 
            ORDER BY (d.nome,d.created_at,d.id,c.id,d.entregador) ASC`)

          return raw1.rows;
        }else if(parseFloat(order) == 3 && boolean == true){
          const raw1 = await Database
            .raw(`SELECT *, to_char(d.created_at,'HH24:MM:SS') as horario, d.id as iddelivery
            FROM deliveries as d
            INNER JOIN clientes AS c 
            ON c.id = d.idcliente 
            WHERE (status <> 'EM PREPARO') 
            ORDER BY ( d.entregador, d.nome,d.created_at,d.id,c.id) DESC`)

          return raw1.rows;
        }else if(parseFloat(order) == 3 && boolean == false){
          const raw1 = await Database
            .raw(`SELECT *, to_char(d.created_at,'HH24:MM:SS') as horario, d.id as iddelivery
            FROM deliveries as d
            INNER JOIN clientes AS c 
            ON c.id = d.idcliente 
            WHERE (status <> 'EM PREPARO') 
            ORDER BY ( d.entregador, d.nome,d.created_at,d.id,c.id) ASC`)

          return raw1.rows;
        }
      }
    }catch(err){
      return `Error: ${err}`
    }
  }

  async listConsumoDelivery ({ request, response }) {
    const { id, idcliente } = request.all();

    try {
      const raw1 = Database.raw(`
        SELECT *,d.id AS iddelivery, p.id AS idpedido FROM pedidos AS p
        INNER JOIN deliveries AS d 
        ON p.iddelivery = d.id
        INNER JOIN produtos AS pd
        ON p.idproduto = pd.id
        WHERE (d.id = ${id})
        GROUP BY (p.id,d.id,pd.id)`);

      return raw1;
    }catch (err) {
      return `Error: ${err}`;
    } 
  }

  async insertCarteiraDelivery ({ request, response }) {
    const { idcliente, debito, credito, idmesa, troco, idcarteira, iddelivery, total } = request.all()
    try {
      const delivery = await Database
        .raw(`INSERT INTO caixas 
        ( idmesa, idcliente, credito, debito, valor_recebido, tipooperacao, formapagamento, created_at, updated_at)
        VALUES ( 0, ${idcliente}, ${total}, 0, ${total}, 'DELIVERY', 'TOTAL DELIVERY', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP )`);

      const raw1 = await Database
        .raw(`INSERT INTO caixas 
        ( idmesa, idcliente, credito, debito, valor_recebido, tipooperacao, formapagamento, created_at, updated_at)
        VALUES ( 0, ${idcliente}, ${credito}, ${debito}, ${debito}, 'DELIVERY', 'CARTEIRA', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP )`);

      const raw2 = await Database
        .raw(`UPDATE caixas SET status = 'BAIXADO' WHERE  idcliente = ${idcliente}`);

      const raw3 = await Database
        .raw(`UPDATE pedidos SET status = 'PREPARO PARA ENVIO' WHERE  idcliente = ${idcliente}`);

      const raw4 = await Database
        .raw(`UPDATE deliveries SET status = 'PREPARO PARA ENVIO', troco = ${troco}, total = ${debito} WHERE  id = ${iddelivery}`);

      const raw5 = await Database
          .raw(`INSERT INTO financeiros (idcliente,credito,debito,statusfinal,created_at,updated_at) 
          VALUES ( ${idcarteira} , ${credito}, ${debito},'PREPARO PARA ENVIO', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP )`);

      return "Success"
    } catch (err){
      return `Error: ${err}`
    }
  }

  async listEntregador ({ request, response }) {
    const Entregador = await Database
      .raw(`SELECT * FROM clientes WHERE funcao = 'Entregador'`)

    return Entregador.rows;
  }

  async listStatus ({ request, response }) {
    const status = await Database
      .raw(`SELECT * FROM status_deliveries`)

    return status.rows;
  }

  async updateStatusDelivery ({ request, response }) {
    const { status, entregador, iddelivery } = request.all();

    try {
      const raw1 = await Database
        .raw(`UPDATE deliveries SET 
        status = '${status}', entregador = '${entregador}' WHERE id = ${iddelivery}`);

      return { raw1, message: "Success" };
    }catch(err) {
      return `Error: ${err}`;
    }
  }

  async finalizaGeralDelivery ({ request, response }) {
    const { id, status } = request.all()

    try {
      const raw1 = await Database
        .raw(`UPDATE deliveries SET status = '${status}' WHERE id = ${id}`)

      const raw2 = await Database
        .raw(`UPDATE pedidos SET status = 'BAIXADO' WHERE iddelivery = ${id}`)

      return "Success";
    }catch(err) {
      return `Error: ${err}`;
    }
  }
}

module.exports = DeliveryController
