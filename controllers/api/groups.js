const Group = require("../../models/group");
const User = require("../../models/user");

module.exports = {
    index,
    create,
    view,
    addGroupMember,
};

async function index(req, res) {
    const userId = req.user._id;
    const groups = await Group.find({ owner: userId });
    res.json(groups);
}

async function create(req, res) {
    try {
        const userId = req.user._id;
        console.log("User ID from JWT:", userId);
        const newGroup = new Group({
            groupName: req.body.groupName,
            owner: userId, // Make sure this is correctly assigned
        });
        await newGroup.save();
        res.status(201).json(newGroup);
    } catch (error) {
        console.error("Failed to create note:", error);
        res.status(400).json({ error: "Unable to create note" });
    }
}

async function view(req, res){
    try {
        const groupId = req.params.id;
        const group = await Group.findById(groupId).populate('groupMembers');
        // if (!group) {
        //     return res.status(404).send('Group not found');
        // }
        res.status(200).json(group);
    } catch (error) {
        res.status(500).send(error.message);
    }

}

async function addGroupMember(req, res){
    try {
        const userEmail = req.body.userEmail;
        const groupId = req.params.id;

        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).send('Group not found');
        }
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Check if the user is already a member
        if (group.groupMembers.includes(user._id)) {
            return res.status(400).send('User already a member');
        }

        // Add user to the group's members list (or handle invitation logic)
        group.groupMembers.push(user._id);
        await group.save();

        res.status(200).send('User invited successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }

}