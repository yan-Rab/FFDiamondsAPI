import knex from '../database/connection';
import { Request, Response } from 'express';

class SalesController{
    async create(request: Request, response: Response){
        const {id_client, content, value, payment, obs} = request.body;
        const dataSale = {
            id_client, content, value, payment, obs
        }
        const sale = await knex('sales').insert(dataSale);

        if(!sale){
            return response.status(400).json({message: 'Insert error'})
        }

        return response.json({message: 'Venda Registrada'})
    } 

    async index(request:Request, response: Response){
        const sales = await knex('sales')
        .join('clients', 'sales.id_client', '=','clients.id')
        .select('clients.ff_id', 'clients.name', 'sales.*')
        
        if(!sales){
            return response.status(502).json({message: 'Internal Server Error'})
        }
        return response.json(sales)
    }

    async edit(request: Request, response: Response){
        const {id,id_client,content,value,payment,obs} = request.body;
        const data = {
            id_client,content,value,payment,obs
        }

        const saleEdit = await knex('sales').where('id', id).update(data);

        if(!saleEdit){
            return response.status(400).json({message: 'Update error'})
        }
        return response.json({message: 'Venda Editada'})
    }

    async indexLike(request: Request, response: Response){
        const {search} = request.query;
        const sales = await knex('sales')
        .join('clients', 'sales.id_client', '=','clients.id')
        .where('clients.name','LIKE',`%${search}%`)
        .orWhere('clients.ff_id', 'LIKE',`%${search}%`)
        .select('clients.ff_id', 'clients.name', 'sales.*')
        
        return response.json(sales)
    }

   
}

export default SalesController;