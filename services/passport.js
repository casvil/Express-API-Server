const passport = require('passport');
const User = require('../models/user');
const config = require('../config.js');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Set options for Local Storage Strategy
const localOptions = { usernameField: 'email' };

// Create Local Strategy
const localLogin = new LocalStrategy(localOptions, function(
  // Verify email and password, if OK call 'done' with email
  // otherwise call 'done' with false
  email,
  password,
  done
) {
  User.findOne({ email }, function(err, user) {
    if (err) return done(err);
    if (!user) return done(null, false);

    // compare `password` with hashed user.password
  });
});

// Set options for JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // Check if user ID exists in db, otherwise
  // call 'done' without a user object
  User.findById(payload.sub, function(err, user) {
    if (err) return done(err, false);

    if (user) done(null, user);
    else done(null, false);
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
