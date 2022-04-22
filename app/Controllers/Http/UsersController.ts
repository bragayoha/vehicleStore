import Application from '@ioc:Adonis/Core/Application'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import ResetPasswordValidator from 'App/Validators/User/ResetPasswordValidator'

export default class UsersController {
  public async index({ request, response }: HttpContextContract) {
    const { page, perPage } = request.all()

    const users = await User.query().paginate(page, perPage)

    return response.json(users)
  }

  public async store({ request, response }: HttpContextContract) {
    const { cpf, name, email, biography, roll } = request.all()

    const avatar = request.file('avatar', {
      size: '2mb',
      extnames: ['jpg', 'png'],
    })
    const fileName = `${Date.now()}.${avatar?.extname}`

    if (avatar) {
      await avatar.move(Application.tmpPath('uploads'))
    }

    const user = await User.create({
      cpf,
      name,
      email,
      biography,
      avatar: fileName,
      roll,
      password: 'default',
    })

    return response.json(user)
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
    await user.load('vehicles')

    return response.json(user)
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const user = await User.findOrFail(id)

    await user.delete()

    return response.status(200)
  }

  public async resetPassword({ request, response, auth }: HttpContextContract) {
    const id = auth.user?.id
    const password = await request.validate(ResetPasswordValidator)

    const user = await User.findOrFail(id)

    user.merge(password)
    await user.save()

    return response.status(202)
  }
}
