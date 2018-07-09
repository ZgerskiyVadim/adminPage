import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true, unique: true, minlength: 4, maxlength: 20, match: /[A-Za-z0-9\.\,\-]+/g},
    firstName: {type: String, required: true, minlength: 2, maxlength: 20, match: /^[a-zA-Z\s\-]*$/},
    lastName: {type: String, required: true, minlength: 2, maxlength: 20, match: /^[a-zA-Z]*$/},
    email: {type: String, required: true, unique: true, minlength: 3, maxlength: 30, match: /\S+@\S+\.\S+/},
});

export default mongoose.model('User', userSchema);