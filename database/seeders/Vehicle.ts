import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/Vehicle'

export default class VehicleSeed extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    const uniqueKey = 'vin'

    await User.updateOrCreateMany(uniqueKey, [
      {
        brand: 'Chevrolett',
        model: 'Camaro',
        year: 2020,
        km: 10000,
        color: 'Yellow',
        vin: '1JKYB7DG8MST07080',
        purchasePrice: 389950.0,
      },
      {
        brand: 'Citroen',
        model: 'C3',
        year: 2020,
        km: 10000,
        color: 'Gray',
        vin: '1JKYB7DG8MST07081',
        purchasePrice: 389950.0,
      },
      {
        brand: 'VW',
        model: 'Golf',
        year: 2020,
        km: 10000,
        color: 'Pearl White',
        vin: '1JKYB7DG8MST07082',
        purchasePrice: 389950.0,
      },
      {
        brand: 'Jeep',
        model: 'Renegade',
        year: 2020,
        km: 10000,
        color: 'Black',
        vin: '1JKYB7DG8MST07083',
        purchasePrice: 389950.0,
      },
      {
        brand: 'VW',
        model: 'Polo',
        year: 2020,
        km: 10000,
        color: 'Silver',
        vin: '1JKYB7DG8MST07084',
        purchasePrice: 389950.0,
      },
    ])
  }
}
