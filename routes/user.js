const express = require('express') 
const router = express.Router() 
const userCtrl = require('../controllers/user') 
const cryptEmail = require('../middleware/cryptEmail')

router.post('/signup', cryptEmail, userCtrl.signup) 
router.post('/login', cryptEmail, userCtrl.login) 


module.exports = router