const router = require('express').Router();
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')
router.get('/', userController.getAllUser)
router.post('/', authController.signUp)
router.get('/:id', (req, res, next) => {})

module.exports = router;