const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
require('dotenv').config()
const db = require("../models")
const User = db.users

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = {
        email: req.email,
        username: req.body.username,
        password: hash,
        isAdmin: false
      }
      console.log(user)
      User.create(user)
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ message: 'Email déjà utilisé !' }))
    })
    .catch(error => {
      console.log(error)
      return res.status(500).json({ error })
    })
}

exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.email } })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' })
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: new Error('Mot de passe incorrect !') })
          }
          res.status(200).json({
            userId: user.id,
            username: user.username,
            isAdmin: user.isAdmin,

            token: jwt.sign(
              {
                userId: user.id,
                isAdmin: user.isAdmin
              },
              process.env.JWT_KEY,
              { expiresIn: '24h' }
            ),
            loggedIn: true
          }
          )
        })
        .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
}

exports.deleteUser = (req, res, next) => {
  const id = req.params.id
 
  User.findByPk(id).then( () => {
    User.destroy({
      where: { id: id }
    })
      .then(() => res.status(200).json({ message: 'Utilisateur supprimé !' }))
      .catch(error => res.status(400).json({ error }))
    })
  
  }
