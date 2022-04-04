const express = require('express') 
const router = express.Router() 
const userCtrl = require('../controllers/user') 
const auth = require('../middleware/auth')
const cryptEmail = require('../middleware/cryptEmail')

router.post('/signup', cryptEmail, userCtrl.signup) 
router.post('/login', cryptEmail, userCtrl.login) 
router.delete('/users/:id', auth, userCtrl.deleteUser)


module.exports = router