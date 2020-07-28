import {Request, Response } from 'express'
import knex from '../database/connection';


import Clients from '../models/ModelClient';

class ClientsController {
    async create(request: Request, response: Response){
        const {dataClient} = request.body;
        
        try{
        
            //await knex('clients').insert(dataClient)
            await Clients.create(dataClient)
            
            return response.json({message: 'Cliente Cadastrado'})

        }catch(error){
            return response.status(400).json({message: 'Insert error'})
        }
        
    }

    async edit(request: Request, response: Response){
        const {name, telephone, nickname, ff_id,city,uf, _id} = request.body;
        const data = {
            name,telephone,nickname,ff_id,city, uf
        }
      
        
        try{
            //await knex('clients').where('id', id).update(data)
            await Clients.findByIdAndUpdate({_id},data)
            return response.json({message: 'Cliente Editado'})
        }catch(error){
            return response.status(400).json({message: 'Update error'})
        }
        
    }

    async show(request: Request, response: Response){
        const {ff_id} = request.params

        //const client = await knex('clients').where('ff_id', ff_id ).select('id').first();
        const client = await Clients.findOne({ff_id})
        if(!client){
            return response.status(400).json({message: 'Client not found'})
        }
        return response.json(client._id)
    }

    async listLike(request: Request, response: Response){
        const {search} = request.query;

        /*const clients = await knex('clients')
        .where('name', 'LIKE', `%${search}%`)
        .orWhere('ff_id', 'LIKE', `%${search}%`)
        .select("*") */

        const regex = new RegExp(`${search}[0-9]?`,'i');
        const clients = await Clients.find({ $or: [{name: {$regex: regex}}, {ff_id: {$regex: regex}}]})

        if(!clients){
            return response.status(400).json({message: 'Client not found'})
        }
        return response.json(clients)
    }

    async index(request: Request, response: Response){
        //const clients = await knex('clients').select('*')
        const clients = await Clients.find();

        if(!clients){
            return response.status(502).json({message: 'Internal Server error'})
        }
        return response.json(clients)
    }
}


export default ClientsController