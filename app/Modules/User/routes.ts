import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/users', 'UsersController.store')
  Route.get('/users', 'UsersController.index')
  Route.get('/users/:id', 'UsersController.show')
  Route.put('/users/:id', 'UsersController.update')
  Route.delete('/users/:id', 'UsersController.destroy')
  Route.put('/reset-password', 'UsersController.resetPassword')
  Route.put('/update-profile', 'UsersController.updateProfile')
  Route.get('download/:fileName', 'UserController.downloadAvatar')
}).middleware('auth')
