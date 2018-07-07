import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true, unique: true}, //min: 4, max: 20,
    firstName: {type: String, required: true}, //min: 2, max: 20,
    lastName: {type: String, required: true}, //min: 2, max: 20,
    email: {type: String, required: true, unique: true}, //min: 3, max: 30,
});
userSchema.index({'$**': 'text'});

export default mongoose.model('User', userSchema);