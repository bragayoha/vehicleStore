import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    cpf: schema.string([
      rules.unique({ table: 'users', column: 'cpf' }),
      rules.minLength(11),
      rules.maxLength(11),
      rules.regex(
        /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/
      ),
      rules.required(),
    ]),
    name: schema.string([rules.required()]),
    email: schema.string([
      rules.unique({ table: 'users', column: 'email' }),
      rules.email(),
      rules.required(),
    ]),
    biography: schema.string(),
    avatar: schema.file({ size: '2mb', extnames: ['jpg', 'png'] }),
    role: schema.enum(['employeer', 'admin']),
    password: schema.string([rules.confirmed(), rules.minLength(6), rules.required()]),
  })

  public messages = {}
}
