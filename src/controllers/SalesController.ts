import knex from '../database/connection';
import { Request, Response } from 'express';
import Sales from '../models/ModelSales';
import Clients from '../models/ModelClient';

interface SalesType{
    id: string,
    id_client: string,
    client: {
        ff_id: string,
        name: string
    }[],
    value: number,
    content: string,
    obs: string,
    payment: string
}
class SalesController{
    async create(request: Request, response: Response){
        const {id_client, content, value, payment, obs} = request.body;

        const dataSale = {
            id_client,
            content, value, payment, obs
        }
        
        //const sale = await knex('sales').insert(dataSale);
       // const client = await Clients.findOne({ff_id})
       // const id_client = client?._id
        const sale = await Sales.create(dataSale)

        if(!sale){
            return response.status(400).json({message: 'Insert error'})
        }

        return response.json({message: 'Venda Registrada'})
    } 

    async index(request:Request, response: Response){
       /* const sales = await knex('sales')
        .join('clients', 'sales.id_client', '=','clients.id')
        .select('clients.ff_id', 'clients.name', 'sales.*') */
       // const sales = await Sales.aggregate([{lookup: {from:Clients.collection.name, localField: 'id_client', foreignField: '_id'}}]);
        const sales = await Sales.aggregate([{$lookup: {from: 'clients', localField: 'id_client', foreignField: '_id', as: 'client'}}])
        
        if(!sales){
            return response.status(502).json({message: 'Internal Server Error'})
        }
        return response.json(sales)
    }

    async edit(request: Request, response: Response){
        const {_id,id_client,content,value,payment,obs} = request.body;
        const data = {
            id_client,content,value,payment,obs
        }
       
        try{
            //const saleEdit = await knex('sales').where('id', id).update(data);
            await Sales.findByIdAndUpdate({_id}, data)
            return response.json({message: 'Venda Editada'})
            

        }catch(error){
            return response.status(400).json({message: 'Update error'})
        }
        
       
        
    }   

    async indexLike(request: Request, response: Response){
        const {search} = request.query;
        /*const sales = await knex('sales')
        .join('clients', 'sales.id_client', '=','clients.id')
        .where('clients.name','LIKE',`%${search}%`)
        .orWhere('clients.ff_id', 'LIKE',`%${search}%`)
        .select('clients.ff_id', 'clients.name', 'sales.*') */
        const sales = await Sales.aggregate([{$lookup: {from: 'clients', localField: 'id_client', foreignField: '_id', as: 'client'}}])
        
        const regex = new RegExp(`${search}[0-9]?`,'i');

        const searchSales = sales.filter((sale: SalesType) => {
            const dataClient = sale.client[0]
            
            if(regex.test(dataClient.name) || regex.test(dataClient.ff_id)){
                return sale
            }
        })

        return response.json(searchSales)
    }

   
}

export default SalesController;