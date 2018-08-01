import mongoose from 'mongoose';
import * as validator from './validator';
import Group from '../group/group';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true, unique: true, minlength: 4, maxlength: 20,
        validate: {
            validator: validator.username,
            message: 'Provided username is invalid.'
        }},
    firstName: {type: String, required: true, minlength: 2, maxlength: 20,
        validate: {
            validator: validator.firstName,
            message: 'Provided firstName is invalid.'
        }},
    lastName: {type: String, required: true, minlength: 2, maxlength: 20,
        validate: {
            validator: validator.lastName,
            message: 'Provided lastName is invalid.'
        }},
    email: {type: String, required: true, unique: true, minlength: 3, maxlength: 30,
        validate: {
            validator: validator.email,
            message: 'Provided email is invalid.'
        }},
    groups: [{type: Schema.Types.ObjectId, ref: Group}]
});

export default mongoose.model('User', userSchema);
