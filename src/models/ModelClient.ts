import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate';

const ClientsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    telephone: {
        type: String,
        required: true
    },

    uf: {
        type: String,
        required: true,

    },

    city: {
        type: String,
        required: true,
    },

    nickname: {
        type: String,
        required: true,
        unique: true
    },

    ff_id: {
        type: String,
        required: true,
        unique: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

})

ClientsSchema.plugin(mongoosePaginate);

const Clients = mongoose.model("Clients", ClientsSchema)

export default Clients