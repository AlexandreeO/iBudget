const Group = require("../../models/group");
const User = require("../../models/user");
const Expense = require("../../models/expense");

module.exports = {
    index,
    create,
    view,
    addGroupMember,
    addExpense,
    getGroupExpenses,
    deleteGroup, // Add this line
    updateGroup,
};

async function index(req, res) {
    const userId = req.user._id;
    const groups = await Group.find({
        $or: [{ owner: userId }, { groupMembers: userId }],
    });
    res.json(groups);
}

async function create(req, res) {
    try {
        const userId = req.user._id;
        console.log("User ID from JWT:", userId);
        const newGroup = new Group({
            groupName: req.body.groupName,
            type: req.body.type,
            owner: userId, // Make sure this is correctly assigned
        });
        await newGroup.save();
        res.status(201).json(newGroup);
    } catch (error) {
        console.error("Failed to create note:", error);
        res.status(400).json({ error: "Unable to create note" });
    }
}

async function view(req, res) {
    try {
        const groupId = req.params.id;
        const group = await Group.findById(groupId).populate("groupMembers");
        res.status(200).json(group);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function addGroupMember(req, res) {
    try {
        const userEmail = req.body.userEmail;
        const groupId = req.params.id;

        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).send("Group not found");
        }
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).send("User not found");
        }

        // Check if the user is already a member
        if (group.groupMembers.includes(user._id)) {
            return res.status(400).send("User already a member");
        }

        // Add user to the group's members list (or handle invitation logic)
        group.groupMembers.push(user._id);
        await group.save();

        res.status(200).send("User invited successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function addExpense(req, res) {
    try {
        const userId = req.user._id;
        const groupId = req.params.id;

        console.log("User ID from JWT:", userId);
        const newExpense = new Expense({
            description: req.body.description,
            amount: req.body.amount,
            date: req.body.date,
            user: userId,
            group: groupId, // Make sure this is correctly assigned
        });
        await newExpense.save();
        const newExpenseRecord = await Expense.findOne({ _id: newExpense._id }).populate(
            "user"
        );
        res.status(201).json(newExpenseRecord);
    } catch (error) {
        console.error("Failed to create expense:", error);
        res.status(400).json({ error: "Unable to create expense" });
    }
}

async function getGroupExpenses(req, res) {
    const groupId = req.params.id;
    const groupExpenses = await Expense.find({ group: groupId }).populate(
        "user"
    );
    res.json(groupExpenses);
}

async function deleteGroup(req, res) {
    try {
        const groupId = req.params.id;
        const userId = req.user._id;
        const group = await Group.findById(groupId);

        if (!group) {
            return res.status(404).send("Group not found");
        }

        if (group.owner.toString() !== userId.toString()) {
            return res
                .status(403)
                .json({ error: "You are not authorized to delete this group" });
        }

        await Group.findByIdAndDelete(groupId);
        res.status(200).json({ message: "Group deleted successfully" });
    } catch (error) {
        console.error("Failed to delete group:", error);
        res.status(400).json({ error: "Unable to delete group" });
    }
}

async function updateGroup(req, res) {
    try {
        const groupId = req.params.id;
        const userId = req.user._id;
        const group = await Group.findById(groupId);

        console.log({groupId, userId, group});
        if (!group) {
            return res.status(404).send("Group not found");
        }

        if (group.owner.toString() !== userId.toString()) {
            return res
                .status(403)
                .json({ error: "You are not authorized to update this group" });
        }

        group.groupName = req.body.groupName || group.groupName;
        group.type = req.body.type || group.type;

        await group.save();
        res.status(200).json(group);
    } catch (error) {
        console.error("Failed to update group:", error);
        res.status(400).json({ error: "Unable to update group" });
    }
}


