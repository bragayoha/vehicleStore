import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    const uniqueKey = 'cpf'

    await User.updateOrCreateMany(uniqueKey, [
      {
        cpf: '00000000001',
        name: 'Felipe',
        email: 'felipe@example.com',
        avatar: '',
        biography: '',
        password: 'seila',
        role: 'admin',
      },
      {
        cpf: '00000000002',
        name: 'Guilherme',
        email: 'guilherme@example.com',
        avatar: '',
        biography: '',
        password: '1234',
        role: 'admin',
      },
      {
        cpf: '00000000003',
        name: 'Gabriel',
        email: 'gabriel@example.com',
        avatar: '',
        biography: '',
        password: '4321',
        role: 'employeer',
      },
      {
        cpf: '00000000004',
        name: 'Hugo',
        email: 'hugo@example.com',
        avatar: '',
        biography: '',
        password: '777',
        role: 'employeer',
      },
      {
        cpf: '00000000005',
        name: 'Daniel',
        email: 'daniel@example.com',
        avatar: '',
        biography: '',
        password: 'daniel123',
        role: 'employeer',
      },
      {
        cpf: '00000000006',
        name: 'Paulo',
        email: 'paulo@example.com',
        avatar: '',
        biography: '',
        password: 'bandeirantes',
        role: 'employeer',
      },
      {
        cpf: '00000000007',
        name: 'Vinicius',
        email: 'vinicius@example.com',
        avatar: '',
        biography: '',
        password: 'palmeiras',
        role: 'employeer',
      },
    ])
  }
}
