const router = require('express').Router();
const profileController = require('../controllers/profilecontroller');


//This endpoint handle fetching profile of user
router.get('/viewProfile',profileController.viewProfile);

module.exports = router;
