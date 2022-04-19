import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    const { cpf, name, email, avatar, biography, type, password } = request.all()

    const user = await User.create({ cpf, name, email, avatar, biography, type, password })

    return response.json(user)
  }
}
