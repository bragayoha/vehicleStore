import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([rules.required()]),
    biography: schema.string(),
    avatar: schema.file({ size: '2mb', extnames: ['jpg', 'png'] }),
  })

  public messages = {}
}
