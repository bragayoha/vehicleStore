import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    const { cpf, name, email, avatar, biography, roll, password } = request.all()

    const user = await User.create({ cpf, name, email, avatar, biography, roll, password })

    return response.json(user)
  }

  public async index({ request, response }: HttpContextContract) {
    const { page, perPage } = request.all()

    const users = await User.query().paginate(page, perPage)

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

  public async destroy({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const user = await User.findOrFail(id)

    await user.delete()

    return response.status(200)
  }
}
