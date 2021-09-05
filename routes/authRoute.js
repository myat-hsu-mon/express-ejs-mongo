const authController = require('../controllers/authController')
const router = require('express').Router()

router.get('/sign-up', authController.getSignUp)
router.post('/sign-up', authController.signUp)
router.get('/sign-in', authController.getSignIn)
router.post('/sign-in', authController.signIn)
router.get('/sign-out', authController.signOut)
module.exports = router;