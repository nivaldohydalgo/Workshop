import { Router } from 'express'
import multer from 'multer'
import uploadConfig from './config/upload'

import SessionController from './controllers/SessionController'
import HouseController from './controllers/HouseController'
import DashboardController from './controllers/DashboardController'
import ReserveController from './controllers/ReserveController'

const routes = new Router()
const upload = multer(uploadConfig)

routes.post('/sessions', SessionController.store)

routes.get('/house', HouseController.index)
routes.post('/house', upload.single('thumbnail'), HouseController.store)
routes.put('/house/:id', upload.single('thumbnail'), HouseController.update)
routes.delete('/house', HouseController.delete)

routes.get('/dashboard', DashboardController.show)

routes.post('/house/:house_id/reserve', ReserveController.store)
routes.get('/reserve', ReserveController.index)
routes.delete('/reserve', ReserveController.delete)

export default routes
