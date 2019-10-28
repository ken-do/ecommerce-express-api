import { Schema } from 'mongoose';

export default new Schema({
    user_id: String,
    order_timestamp: Number,
    order_items: String
});