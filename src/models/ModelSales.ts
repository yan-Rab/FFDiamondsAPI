import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const SalesSchema = new mongoose.Schema({
    id_client: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'clients'
    },

    content: {
        type: String,
        required: true,
    },

    value: {
        type: Number,
        required: true
    },

    payment: {
        type: String,
        required: true,
    },

    obs: {
        type: String,
        required: false
    }

})

SalesSchema.plugin(mongoosePaginate)
const Sales = mongoose.model('sales', SalesSchema)
export default Sales