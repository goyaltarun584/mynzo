const router = require('express').Router();
const authController = require('../controllers/authcontroller');


//This endpoint handle both signIn, if user exists and signUp, if user dont exists
router.post('/', authController.signInUser);



module.exports = router;
