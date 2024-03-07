require('dotenv').config()
const mongoose = require("mongoose");

const connectDatabase = async () => {
  // TODO: Connexion à la base de données MongoDB
  // Utilisez les variables d'environnement pour la configuration
  // et referez-vous à la documentation de Mongoose
  // Utilisez un try/catch pour gérer les erreurs et n'oublier pas d'ajouter un log pour le serveur

  mongoose.connect(`mongodb+srv://mathieu2991:${process.env.PASSWORD_DB}@cluster0.4zjw0nw.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log(error));
};

module.exports = connectDatabase;