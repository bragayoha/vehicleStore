import Application from '@ioc:Adonis/Core/Application'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/User/CreateUserValidator'
import ResetPasswordValidator from 'App/Validators/User/ResetPasswordValidator'
import UpdateUserValidator from 'App/Validators/User/UpdateUserValidator'

export default class UsersController {
  public async index({ request, response, auth }: HttpContextContract) {
    const adminRole = auth.user?.role

    if (adminRole !== 'admin') {
      return response.status(401)
    }

    const { page, perPage } = request.all()

    const users = await User.query().paginate(page, perPage)

    return response.json(users)
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const adminRole = auth.user?.role

    if (adminRole !== 'admin') {
      return response.status(401)
    }

    const data = await request.validate(CreateUserValidator)

    const fileName = `${Date.now()}.${data.avatar?.extname}`

    if (data.avatar) {
      await data.avatar.move(Application.tmpPath('uploads'))
    }

    const user = await User.create({ ...data, avatar: fileName })

    return response.json(user)
  }

  public async update({ request, response, auth }: HttpContextContract) {
    const adminRole = auth.user?.role

    if (adminRole !== 'admin') {
      return response.status(401)
    }

    const { id } = request.params()

    const user = await User.findOrFail(id)
    const data = await request.validate(UpdateUserValidator)

    const fileName = `${Date.now()}.${data.avatar?.extname}`

    if (data.avatar) {
      await data.avatar.move(Application.tmpPath('uploads'))
    }

    user.merge({
      name: data.name,
      biography: data.biography,
      avatar: fileName,
    })
    await user.save()

    return response.json(user)
  }

  public async updateProfile({ request, response, auth }: HttpContextContract) {
    const id = auth.user?.id

    const user = await User.findOrFail(id)
    const data = await request.validate(UpdateUserValidator)

    const fileName = `${Date.now()}.${data.avatar?.extname}`

    if (data.avatar) {
      await data.avatar.move(Application.tmpPath('uploads'))
    }

    user.merge({
      name: data.name,
      biography: data.biography,
      avatar: fileName,
    })
    await user.save()

    return response.json(user)
  }

  public async show({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const user = await User.findOrFail(id)
    await user.load('vehicles')

    return response.json(user)
  }

  public async destroy({ request, response, auth }: HttpContextContract) {
    const adminRole = auth.user?.role

    if (adminRole !== 'admin') {
      return response.status(401)
    }

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
