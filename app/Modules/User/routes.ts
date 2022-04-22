import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/users', 'UsersController.store')
  Route.get('/users', 'UsersController.index')
  Route.get('/users/:id', 'UsersController.show')
  Route.patch('/users/:id', 'UsersController.update')
  Route.delete('/users/:id', 'UsersController.destroy')
  Route.patch('/reset-password', 'UsersController.resetPassword')
}).middleware('auth')
