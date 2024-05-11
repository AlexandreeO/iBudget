const Group = require("../../models/group");

module.exports = {
    index,
    create,
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
