const express = require('express');
const router = require('express-promise-router')();
const UsersController = require('../controllers/users');
const {validateParam,validateHeader,validateBody, schemas} = require('../helpers/routeHelpers');


router.route('/')
    .get(validateHeader(schemas.tokenSchema,'authorization'),UsersController.index)
    .post(validateHeader(schemas.tokenSchema,'authorization'),validateBody(schemas.userSchema),UsersController.newUser)

router.route('/login')
    .post(validateHeader(schemas.tokenSchema,'authorization'),validateBody(schemas.loginSchema),UsersController.login)

router.route('/logout/:userId')
.get(validateParam(schemas.idSchema,'userId'),UsersController.logout)

router.route('/:userId')
    .get(validateHeader(schemas.tokenSchema,'authorization'),validateParam(schemas.idSchema,'userId'),
        UsersController.getUser)

    .put(validateHeader(schemas.tokenSchema,'authorization'),validateParam(schemas.idSchema,'userId'),
        validateBody(schemas.userSchema),
        UsersController.replaceUser)

    .patch(validateHeader(schemas.tokenSchema,'authorization'),validateParam(schemas.idSchema,'userId'),
        validateBody(schemas.userOptionalSchema),
        UsersController.updateUser)
 
    .delete(validateHeader(schemas.tokenSchema,'authorization'),validateParam(schemas.idSchema, 'userId'),
        UsersController.deleteUser)


router.route('/:userId/orders')
    .get(validateHeader(schemas.tokenSchema,'authorization'),validateParam(schemas.idSchema, 'userId'),
        UsersController.getUserOrders)

    .post(validateHeader(schemas.tokenSchema,'authorization'),validateParam(schemas.idSchema, 'userId'),
        validateBody(schemas.userCarSchema),
        UsersController.newUserOrder);


module.exports = router;