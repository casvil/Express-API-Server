const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  // sub shorthand for subject
  // iat issued at time
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({
      message: 'Error - Empty request. Email or password must be provided'
    });
  }

  // See if a user with a given email exists
  User.findOne({ email }, function(err, existingUser) {
    if (err) return next(err);

    // If a user with email does exist, return an error
    if (existingUser) {
      // 4XX - 422 - Unprocessable Entity
      res.status(422).send({ message: 'Error - Email is in use' });
    }

    // If a user with email does not exists, create and save user record
    const user = new User({
      email,
      password
    });

    user.save(function(err) {
      if (err) return next(err);

      // Respond to request indicating the user was created and send back a token
      res.status(201).json({ token: tokenForUser(user) });
    });
  });
};
