import express from 'express';
import ClientsController from './controllers/ClientsController';
import SalesController from './controllers/SalesController';
const routes = express.Router();

const clientsController = new ClientsController();
const salesController = new SalesController();

routes.post('/client', clientsController.create)
routes.put('/clients', clientsController.edit)
routes.get('/client/:ff_id', clientsController.show)
routes.get('/clients', clientsController.index);
routes.get('/searchClients', clientsController.listLike)

routes.post('/sale', salesController.create)
routes.put('/sales', salesController.edit)
routes.get('/sales', salesController.index)
routes.get('/searchSales', salesController.indexLike)
export default routes;