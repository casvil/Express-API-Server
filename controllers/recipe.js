const jwt = require('jwt-simple');
const Recipe = require('../models/recipe');
const config = require('../config');

exports.addEntry = function(req, res, next) {
  if (!Object.keys(req.body)) {
    return res.status(422).send({
      err: 'Error - Empty request. All fields are be required',
      isOK: false
    });
  }

  const recipe = new Recipe({
    name: req.body.name,
    ingredients: req.body.ingredients,
    steps: req.body.steps,
    img: req.body.img,
    video: req.body.video,
    difficulty: req.body.difficulty
  });
  recipe.save(function(err) {
    if (err) return next(err);
    return res.status(201);
  });
};

exports.getAllEntries = function(req, res, next) {
  Recipe.find({}, function(err, allEntries) {
    if (err) return next(err);
    res.send({ items: allEntries, isOK: true });
  });
};
