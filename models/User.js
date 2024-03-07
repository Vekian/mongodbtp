const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    // TODO: Définissez les champs du schéma ici, par exemple titre, prix, caractéristiques, etc.
    username: { type:String, required:true },
    password: { type:String, required:true },
  });

const User = mongoose.model("User", userSchema);

module.exports = User;