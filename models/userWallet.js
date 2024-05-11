const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userWalletSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    walletBalance: { type: Number, required: true }
});

const UserWallet = mongoose.model('UserWallet', userWalletSchema);
module.exports = UserWallet;
