import mongoose from 'mongoose';
import Group from '../group/group';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true, unique: true}, //min: 4, max: 20,
    firstName: {type: String, required: true}, //min: 2, max: 20,
    lastName: {type: String, required: true}, //min: 2, max: 20,
    email: {type: String, required: true, unique: true}, //min: 3, max: 30,
    groups: [{type: Schema.Types.ObjectId, ref: Group}]
});

export default mongoose.model('User', userSchema);