'use strict';
var express = require('express');
var router = express.Router();
var { validation } = require('swagger-generator-express');
var userController = require('../controller/user');
var requestModel = require('../requestModel/users');

router.post('/', validation(requestModel[0]), userController.createUser);

router.get('/', userController.getUsers);

router.put('/:userId', userController.updateUser);

router.get('/:userId', userController.getUserDetails);

router.delete('/:userId', userController.deleteUser);


module.exports = router;
