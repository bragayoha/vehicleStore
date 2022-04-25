import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateVehicleValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    brand: schema.string([rules.required()]),
    model: schema.string([rules.required()]),
    year: schema.number([rules.required()]),
    km: schema.number([rules.required()]),
    color: schema.string([rules.required()]),
    vin: schema.string([rules.required(), rules.unique({ table: 'vehicles', column: 'vin' })]),
    purchasePrice: schema.number([rules.required()]),
  })

  public messages = {}
}
