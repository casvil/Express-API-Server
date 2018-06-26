const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function authTokenForUser(user) {
  const timestamp = new Date().getTime();
  // sub shorthand for subject
  // iat issued at time
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({
      err: 'Error - Empty request. Email or password must be provided',
      isOK: false
    });
  }

  // See if a user with a given email exists
  User.findOne({ email }, function(err, existingUser) {
    if (err) return next(err);

    // If a user with email does exist, return an error
    if (existingUser) {
      // 4XX - 422 - Unprocessable Entity
      return res
        .status(422)
        .send({ err: 'Error - Email is in use', isOK: false });
    }

    // If a user with email does not exists, create and save user record
    const user = new User({
      email,
      password
    });

    user.save(function(err) {
      if (err) return next(err);

      // Respond to request indicating the user was created and send back a token
      return res
        .status(201)
        .json({ authToken: authTokenForUser(user), isOK: true });
    });
  });
};

exports.signin = function(req, res, next) {
  // User has already had their email and password auth'd -> authToken
  // We can access to req.user thx to passport
  res.send({ authToken: authTokenForUser(req.user), isOK: true });
};
