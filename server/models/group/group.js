import mongoose from 'mongoose';
import User from '../user/user';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true, unique: true}, //min: 4, max: 20,
    title: {type: String, required: true}, //min: 6, max: 20,
    users: {type: Array}
});

export default mongoose.model('Group', userSchema);