import mongoose from 'mongoose';
import User from '../user/user';

const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: {type: String, required: true, unique: true, minlength: 4, maxlength: 20, match: /[A-Za-z0-9\.\,\-]+/g},
    title: {type: String, required: true, minlength: 6, maxlength: 20},
    users: [{type: Schema.Types.ObjectId, ref: User}]
});

export default mongoose.model('Group', groupSchema);