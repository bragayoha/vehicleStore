import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Vehicle from 'App/Models/Vehicle'

export default class VehiclesController {
  public async store({ request, response }: HttpContextContract) {
    const { brand, model, year, km, color, vin, purchasePrice } = request.all()

    const vehicle = await Vehicle.create({ brand, model, year, km, color, vin, purchasePrice })

    return response.json(vehicle)
  }

  public async index({ request, response }: HttpContextContract) {
    const { page, perPage, status } = request.all()

    if (status) {
      const vehicles = await Vehicle.query().where('status', status).paginate(page, perPage)

      return response.json(vehicles)
    }

    const vehicles = await Vehicle.query().paginate(page, perPage)

    return response.json(vehicles)
  }

  public async show({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const vehicle = await Vehicle.findOrFail(id)

    return response.json(vehicle)
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const vehicle = await Vehicle.findOrFail(id)

    await vehicle.delete()

    return response.status(200)
  }

  public async sell({ request, response, auth }: HttpContextContract) {
    const { id } = request.params()
    const sellerId = auth.user?.id
    const status = 'sold'
    const data = request.only(['soldAt', 'soldPrice'])

    const vehicle = await Vehicle.findOrFail(id)

    vehicle.merge({ ...data, sellerId, status })
    await vehicle.save()

    return response.json(vehicle)
  }

  public async reserve({ request, response, auth }: HttpContextContract) {
    const { id } = request.params()
    const sellerId = auth.user?.id
    const status = 'reserved'
    const data = request.only(['soldAt', 'soldPrice'])

    const vehicle = await Vehicle.findOrFail(id)

    vehicle.merge({ ...data, sellerId, status })
    await vehicle.save()

    return response.json(vehicle)
  }
}
