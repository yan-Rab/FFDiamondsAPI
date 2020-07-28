import express, {urlencoded} from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import morgan from 'morgan';
import routes from './routes';

import dotenv from 'dotenv';
dotenv.config()

const app = express();

mongoose.connect(`${process.env.MONGO_URL}`, {useNewUrlParser: true, useUnifiedTopology: true})


app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(urlencoded({extended: true}))
app.use(routes)
app.listen( process.env.PORT || 3000)
