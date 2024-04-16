import SalesController from '#controllers/sales_controller'
import UsersController from '#controllers/users_controller'
import JwtMiddleware from '#middleware/jwt_middleware'
import router from '@adonisjs/core/services/router'

const jwt = new JwtMiddleware()

router
  .group(() => {
    router.resource('/customer', '#controllers/customers_controller')
    router.resource('/product', '#controllers/products_controller')
    router.post('/sale', new SalesController().store)
  })
  .use(jwt.handle)

router.post('/user/login', new UsersController().login)
router.post('/user', new UsersController().create)
