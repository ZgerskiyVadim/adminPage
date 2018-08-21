import passport from 'passport';
import passportLocal from 'passport-local';
import User from '../models/user';
const LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy(
    (username, password, done) => {
        User.findOne({ username }, function (err, user) {
            if (err) return done(err);
            if (!user) return done(null, false);
            user.comparePassword(password, function (err, isMatch) {
                if (err) return done(err);
                done(null, isMatch && user)
            });
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
        if (err) { return done(err); }
        done(null, user);
    });
});

export default passport;