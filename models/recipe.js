const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const recipeSchema = new Schema({
  name: {
    type: String
  },
  ingredients: {
    type: [String]
  },
  steps: {
    type: [String]
  },
  img: {
    type: String
  },
  video: {
    type: String
  },
  difficulty: {
    type: String
  }
});

const RecipeModel = mongoose.model('recipe', recipeSchema);

module.exports = RecipeModel;
