'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Role = use('App/Models/Role')
const Database = use('Database')

class RoleController {
  async create({request , response }) {

    const { name , descriptions } = request.all()

    const data = { name , descriptions }

    const role = await Role.create(data)

    return role
  }
}

module.exports = RoleController
