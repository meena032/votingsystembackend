const mongoose = require('mongoose');

const VoterSchema = new mongoose.Schema({
    aadharHash: { type: String, required: true, unique: true },
    //phoneNumber: { type: String, required: true }, 
    hasVoted: { type: Boolean, default: false },
    partyVoted: { type: String, default: null },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Voter', VoterSchema);
