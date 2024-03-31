const mongoose = require('mongoose');

// Définition d'un schéma Mongoose
const userSchema = new mongoose.Schema({
    username : String,
    password : String,
    name: String,
    email: String,
    age: Number
});

// Définition d'un modèle Mongoose basé sur le schéma
const User = mongoose.model('User', userSchema);

module.exports = User