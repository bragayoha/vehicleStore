import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SellOrReserveVehicleValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    soldAt: schema.date({
      format: 'dd-MM-yyyy',
    }),
    soldPrice: schema.number([rules.required()]),
  })

  public messages = {}
}
