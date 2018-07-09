import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true, unique: true, minlength: 4, maxlength: 20},
    firstName: {type: String, required: true, minlength: 2, maxlength: 20},
    lastName: {type: String, required: true, minlength: 2, maxlength: 20},
    email: {type: String, required: true, unique: true, minlength: 3, maxlength: 30, match: /\S+@\S+\.\S+/},
});

export default mongoose.model('User', userSchema);