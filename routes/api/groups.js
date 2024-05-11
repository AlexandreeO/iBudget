const express = require('express');
const router = express.Router();
const groupsCtrl = require('../../controllers/api/groups')

// GET /api/groups

router.get('/', groupsCtrl.index);
router.post('/new', groupsCtrl.create)

module.exports = router;
