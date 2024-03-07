let express = require('express');
let router = express.Router();
const Annonce = require('../models/Annonce');

const { expressjwt: jwt } = require("express-jwt");

const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limite chaque IP à 100 requêtes par windowMs
});

router.use(limiter);
router.use(
  jwt({
    secret: "shhhhhhared-secret",
    algorithms: ["HS256"],
  }).unless({ path: ["/annonces", "/auth/login", "/auth/create/users"] })
);

router.get('/annonces', 
    function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    Annonce.find()
        .then(annonces => res.status(200).json(annonces))
        .catch(error => res.status(400).json({ error }));
  });

router.get('/annonces/:id', function(req, res) {
Annonce.findOne({ _id: req.params.id })
    .then(annonces => res.status(200).json(annonces))
    .catch(error => res.status(400).json({ error }));
});


router.get('/create/annonce', function(req, res) {
    res.render ('create',
        {
          pageTitle: "Créer ton personnage",
        });
});

router.post('/create/annonce', function(req, res) {
    const annonce = new Annonce({
        ...req.body
    });
    annonce.save()
            .then(( annonce ) => res.status(201).json( annonce ))
            .catch(error => res.status(400).json({ error }));
  });

router.put('/update/:id', function(req, res) {
    Annonce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: "Objet modifié"}))
        .catch(error => res.status(400).json({ error }));
});

router.delete('/delete/:id', function(req, res) {
    Annonce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: "Objet supprimé"}))
            .catch(error => res.status(400).json({ error }));
});

module.exports = router;