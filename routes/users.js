let express = require('express');
let router = express.Router();
const User = require('../models/User');

const { expressjwt } = require("express-jwt");
const jwt = require("jsonwebtoken");



router.get('/users', 
    function(req, res) {
    User.find()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }));
  });

router.post('/create/users', function(req, res) {
    const user = new User({
        ...req.body
    })

    User.findOne({username: user.username})
        .then(user => {
            const token = jwt.sign({
                id: user.id,
                username: user.username
            }, "shhhhhhared-secret", { expiresIn: '3 hours' })
            return res.status(200).json({token: token, created: false})})
        .catch(error => {
            user.save()
            .then(( user ) => {
                const token = jwt.sign({
                    id: user.id,
                    username: user.username
                }, "shhhhhhared-secret", { expiresIn: '3 hours' })
                return res.status(201).json( 
                    {
                        token: token,
                        created: true
                    } )})
        });
});

router.post('/login', (req, res) => {
    // Pas d'information à traiter
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ message: 'Error. Please enter the correct username and password' })
    }

    // Checking
    const user = User.findOne({ username: req.body.username, password : req.body.password});

    // Pas bon
    if (!user) {
        return res.status(400).json({ message: 'Error. Wrong login or password' })
    }

    const token = jwt.sign({
        id: user.id,
        username: user.username
    }, "shhhhhhared-secret", { expiresIn: '3 hours' })

    return res.json({ access_token: token })
})

  module.exports = router;