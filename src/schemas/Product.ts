import { Schema } from 'mongoose';

export default new Schema({
    title: String,
    desc: String,
    price: Number,
    img: String
})
