import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Vehicle from 'App/Models/Vehicle'
import CreateVehicleValidator from 'App/Validators/Vehicle/CreateVehicleValidator'
import SellOrReserveVehicleValidator from 'App/Validators/Vehicle/SellOrReserveVehicleValidator'

export default class VehiclesController {
  public async index({ request, response }: HttpContextContract) {
    const { page, perPage, status } = request.all()

    if (status) {
      const vehicles = await Vehicle.query().where('status', status).paginate(page, perPage)

      return response.json(vehicles)
    }

    const vehicles = await Vehicle.query().paginate(page, perPage)

    return response.json(vehicles)
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const adminRole = auth.user?.role

    if (adminRole !== 'admin') {
      return response.status(401)
    }

    const data = await request.validate(CreateVehicleValidator)

    const vehicle = await Vehicle.create(data)

    return response.json(vehicle)
  }

  public async show({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const vehicle = await Vehicle.findOrFail(id)

    return response.json(vehicle)
  }

  public async destroy({ request, response, auth }: HttpContextContract) {
    const adminRole = auth.user?.role

    if (adminRole !== 'admin') {
      return response.status(401)
    }

    const { id } = request.params()

    const vehicle = await Vehicle.findOrFail(id)

    await vehicle.delete()

    return response.status(200)
  }

  public async sell({ request, response, auth }: HttpContextContract) {
    const { id } = request.params()
    const sellerId = auth.user?.id
    const status = 'sold'

    const data = await request.validate(SellOrReserveVehicleValidator)

    const vehicle = await Vehicle.findOrFail(id)

    vehicle.merge({ ...data, sellerId, status })
    await vehicle.save()

    return response.json(vehicle)
  }

  public async reserve({ request, response, auth }: HttpContextContract) {
    const { id } = request.params()
    const sellerId = auth.user?.id
    const status = 'reserved'

    const data = await request.validate(SellOrReserveVehicleValidator)

    const vehicle = await Vehicle.findOrFail(id)

    vehicle.merge({ ...data, sellerId, status })
    await vehicle.save()

    return response.json(vehicle)
  }
}
