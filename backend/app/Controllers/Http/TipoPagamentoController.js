'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const TipoPgto = use('App/Models/TipoPagamento')
const Database = use('Database')
/**
 * Resourceful controller for interacting with tipopagamentos
 */
class TipoPagamentoController {
  async list ({ request, response, view }) {
    const tipoPgto = await TipoPgto.all();

    return response.json(tipoPgto);
  }

  async create ({ request, response }) {
    const data = request.all()

    const tipoPgto = await TipoPgto.create(data)

    return tipoPgto
  }

  async update ({ params, request, response }) {
    const data = request.all()

    const { id } = request.only(['id'])

    const cliente = Database.table('tipo_pagamentos').where('tipo_pagamentos.id', '=' , id ).update(data)

    return cliente
  }

  async delete ({ params , request }) {
    const { id } = request.all()

    const TipoPgto = await TipoPgto.find(id)

    await TipoPgto.delete()
  }
}

module.exports = TipoPagamentoController
