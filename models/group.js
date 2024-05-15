const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    owner: {type:Schema.Types.ObjectId, ref: 'User'},
    groupMembers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    groupName: { type: String, required: true },
    groupBalance: { type: Number, default: 0 },
    type: { type: String}
});

groupSchema.pre("save", function(next){
    if (!this.groupMembers.includes(this.owner)) {
        this.groupMembers.push(this.owner)
    }
    next()
})

const Group = mongoose.model('Group', groupSchema);
module.exports = Group;
