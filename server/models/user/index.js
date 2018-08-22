import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../../config';
import * as validator from './validator';
import Group from '../group';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true, unique: true, minlength: [4, 'Username must be at least 4 characters.'], maxlength: [20, 'Username must be less than 20 characters.'],
        validate: {
            validator: validator.username,
            message: 'Username is invalid. Valid characters "." "," "-"'
        }},
    firstName: {type: String, required: true, minlength: [2, 'First name must be at least 2 characters.'], maxlength: [20, 'First name must be less than 20 characters.'],
        validate: {
            validator: validator.firstName,
            message: 'First name is invalid. Only string. Valid characters "-"'
        }},
    lastName: {type: String, required: true, minlength: [2, 'Last name must be at least 2 characters.'], maxlength: [20, 'Last name must be less than 20 characters.'],
        validate: {
            validator: validator.lastName,
            message: 'Last name is invalid. Only string. Without symbols'
        }},
    email: {type: String, required: true, unique: true, minlength: [3, 'Email must be at least 3 characters.'], maxlength: [30, 'Email must be less than 30 characters.'],
        validate: {
            validator: validator.email,
            message: 'Email is invalid.'
        }},
    password: {type: String, required: true, minlength: [4, 'Password must be at least 4 characters.']},
    groups: [{type: Schema.Types.ObjectId, ref: 'Group'}],
    date: { type: Date, default: Date.now }
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
