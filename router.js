const passport = require('passport');
const passportService = require('./services/passport');

const Authentication = require('./controllers/authentication');
const Recipe = require('./controllers/recipe');

const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function(app) {
  app.post('/signup', Authentication.signup);
  app.post('/recipe', requireAuth, Recipe.addEntry);
  app.get('/recipe', requireAuth, Recipe.getAllEntries);
};
