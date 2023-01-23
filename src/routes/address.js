const express = require('express');
const { requiresignin, userMiddleware } = require('../common-middleware');
const { addAddress, getAddress } = require('../controllers/address');
const router = express.Router();

router.post('/user/address/create', requiresignin, userMiddleware, addAddress);
router.post('/user/getaddress', requiresignin, userMiddleware, getAddress);

module.exports = router;