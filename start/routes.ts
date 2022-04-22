import Route from '@ioc:Adonis/Core/Route'
import 'App/Modules/User/routes'
import 'App/Modules/Vehicle/routes'

Route.where('id', {
  match: /^[0-9]+$/,
  cast: (id) => Number(id),
})

Route.get('/', () => {
  return 'Welcome to ours Vehicle Store!'
})

Route.post('/login', 'AuthController.login')
Route.post('/logout', 'AuthController.logout')
