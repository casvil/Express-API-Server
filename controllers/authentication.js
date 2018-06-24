const User = require('../models/user');

exports.signup = function(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .send({
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

      // Respond to request indicating the user was created
      res.status(201).send({ message: 'Success - User created' });
    });
  });
};
