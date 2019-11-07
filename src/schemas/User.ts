import { Schema } from 'mongoose';

export default new Schema({
    email: String,
    phone: String,
    address: String,
    passwordHash: String
});