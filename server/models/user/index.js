import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../../config';
import * as validator from './validator';
import Group from '../group';

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
    password: {type: String, required: true, minlength: 4},
    groups: [{type: Schema.Types.ObjectId, ref: Group}]
});

userSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) return next();

    hashPassword(user.password, (err, hashedPassword) => {
        if (err) return next(err);
        user.password = hashedPassword;
        next();
    });
});

userSchema.pre('findOneAndUpdate', function(next) {
    let { password } = this.getUpdate();

    password ?
        hashPassword(password, (err, hashedPassword) => {
            this.findOneAndUpdate({}, { password: hashedPassword });
            next();
        }) :
        next()
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

function hashPassword(password, cb) {
    bcrypt.genSalt(config.saltBcrypt, function(err, salt) {
        if (err) return cb(err);
        bcrypt.hash(password, salt, function(err, hash) {
            if (err) return cb(err);
            cb(null, hash);
        });
    });
}

export default mongoose.model('User', userSchema);
