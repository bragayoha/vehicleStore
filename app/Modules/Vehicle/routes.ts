import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/vehicles', 'VehiclesController.store')
  Route.get('/vehicles', 'VehiclesController.index')
  Route.get('/vehicles/:id', 'VehiclesController.show')
  Route.patch('/vehicles/sell/:id', 'VehiclesController.sell')
  Route.patch('/vehicles/reserve/:id', 'VehiclesController.reserve')
  Route.delete('/vehicles/:id', 'VehiclesController.destroy')
}).middleware('auth')
