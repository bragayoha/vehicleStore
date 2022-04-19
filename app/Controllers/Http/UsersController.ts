import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    const { cpf, name, email, avatar, biography, type, password } = request.all()

    const user = await User.create({ cpf, name, email, avatar, biography, type, password })

    return response.json(user)
  }

  public async index({ request, response }: HttpContextContract) {
    const users = await User.all()

    return response.json(users)
  }

  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params()
    const data = request.only(['name', 'avatar', 'biography'])

    const user = await User.findOrFail(id)

    user.merge(data)
    await user.save()

    return response.json(user)
  }

  public async show({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const user = await User.findOrFail(id)

    return response.json(user)
  }
}
