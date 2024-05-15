const express = require("express");
const router = express.Router();
const groupsCtrl = require("../../controllers/api/groups");

// GET /api/groups

router.get("/", groupsCtrl.index);
router.get("/:id", groupsCtrl.view);
router.get("/:id/expenses", groupsCtrl.getGroupExpenses);
router.post("/new", groupsCtrl.create);
router.post("/:id/invite", groupsCtrl.addGroupMember);
router.post("/:id/newExpense", groupsCtrl.addExpense);
router.delete("/:id", groupsCtrl.deleteGroup);
router.put("/:id", groupsCtrl.updateGroup);

module.exports = router;
