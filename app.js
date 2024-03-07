require('dotenv').config();
const express = require("express");
const mustacheExpress = require("mustache-express");
const app = express();

const connectDatabase = require('./config/database');

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.use(express.static("public"));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use("/", require("./routes/annonces"));
app.use("/auth", require("./routes/users"));
connectDatabase();

app.listen(process.env.PORT, () => {
    console.log(`Serveur démarré sur le port ${process.env.PORT}`);
});

module.exports = app;