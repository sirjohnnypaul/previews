const express = require('express');
const router = require('express-promise-router')();
const VerificationController = require('../controllers/verfication');
const {validateParam,validateHeader,validateBody, schemas} = require('../helpers/routeHelpers');

router.route('/:token')
    .get(VerificationController.verify)

router.route('/paymentstatus')
    .post(VerificationController.payment)

module.exports = router;