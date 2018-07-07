import mongoose from 'mongoose';
import User from '../user/user';

const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: {type: String, required: true, unique: true}, //min: 4, max: 20,
    title: {type: String, required: true}, //min: 6, max: 20,
    users: [{type: Schema.Types.ObjectId, ref: User}]
});
groupSchema.index( { "$**": "text" } );

export default mongoose.model('Group', groupSchema);