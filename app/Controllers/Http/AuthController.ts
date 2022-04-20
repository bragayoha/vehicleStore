import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  public async login({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const user = await User.findBy('email', email)

      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '20mins',
        name: user?.serialize().email,
      })

      auth.use('api').isLoggedIn

      return { token, user: user?.serialize().email }
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('api').revoke()

    auth.use('api').isLoggedOut

    return {
      revoked: true,
    }
  }
}
