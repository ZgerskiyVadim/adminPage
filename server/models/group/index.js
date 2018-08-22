import mongoose from 'mongoose';
import * as validator from './validator';
import User from '../user';

const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: {type: String, required: true, unique: true, minlength: [4, 'Name must be at least 4 characters.'], maxlength: [20, 'Name must be less than 20 characters.'],
        validate: {
            validator: validator.name,
            message: 'Name is invalid. Valid characters "." "," "-"'
        }},
    title: {type: String, required: true, minlength: [6, 'Title must be at least 6 characters.'], maxlength: [20, 'Title must be less than 20 characters.']},
    users: [{type: Schema.Types.ObjectId, ref: 'User'}],
    date: { type: Date, default: Date.now }
});

export default mongoose.model('Group', groupSchema);
