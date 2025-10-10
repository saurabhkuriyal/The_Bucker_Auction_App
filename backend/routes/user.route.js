const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.use(bodyParser.json());
// eoute for login
router.route("/register").post(userController.registerUser);
//route for registration
router.route("/login").post(userController.loginUser);

router.route("/getAllUser").get(userController.getAllUser);

module.exports = router;