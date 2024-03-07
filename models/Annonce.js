const mongoose = require("mongoose");

const annonceSchema = new mongoose.Schema({
    // TODO: Définissez les champs du schéma ici, par exemple titre, prix, caractéristiques, etc.
    titre: { type: String, required: true },
    description: { type: String, required: true },
    prix: { type: Number, required: true },
    surface: { type: Number, required: true },
    localisation: {
        ville: { type: String, required: true },
        codePostal: { type: Number, required: true },
    },
    caractéristiques: {
        chambre: { type: Number, required: true },
        salleDeBain: { type: Number, required: true },
        balcon: { type: Boolean, required: true },
        jardin: { type: Boolean, required: true },
        parking: { type: Boolean, required: true },
    }
  });

const Annonce = mongoose.model("Annonce", annonceSchema);

module.exports = Annonce;