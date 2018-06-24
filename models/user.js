const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define our model
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: String
});

// On Save Hook, encrypt password
userSchema.pre('save', function(next) {
  // get acces to the user model
  const user = this; // user.email, user.password

  // generate a salt then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    // has (encrypt) password using the salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);

      // overwrite plain text password with encrypted password
      user.password = hash;

      next();
    });
  });
});

// Create the model class
const UserModel = mongoose.model('user', userSchema);

// Export the model
module.exports = UserModel;
