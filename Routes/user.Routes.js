const express = require('express');
const router = express.Router();
const userController = require('../controller/user.Controller')

//Add User
router.post('/addUser', userController.addUser)

module.exports = router;
