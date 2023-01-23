const express = require('express');
const { requiresignin, adminMiddleware } = require('../../common-middleware');
const { initialData } = require('../../controllers/admin/initialData');
const router = express.Router();

router.post('/initialdata', requiresignin, adminMiddleware, initialData);

module.exports = router;