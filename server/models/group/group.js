import mongoose from 'mongoose';
import * as validator from "./validator";
import User from '../user/user';

const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: {type: String, required: true, unique: true, minlength: 4, maxlength: 20,
        validate: {
            validator: validator.name,
            message: 'Provided name is invalid.'
        }},
    title: {type: String, required: true, minlength: 6, maxlength: 20},
    users: [{type: Schema.Types.ObjectId, ref: User}]
});

export default mongoose.model('Group', groupSchema);