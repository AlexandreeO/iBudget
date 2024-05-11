const express = require('express');
const router = express.Router();
const groupsCtrl = require('../../controllers/api/groups')

// GET /api/groups

router.get('/', groupsCtrl.index);
router.get('/:id', groupsCtrl.view);
router.post('/new', groupsCtrl.create)
router.post('/:id/invite', groupsCtrl.addGroupMember)
router.post('/:id/newExpense', groupsCtrl.addExpense)


module.exports = router;
