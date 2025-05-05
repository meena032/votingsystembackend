const mongoose = require('mongoose');

const PartySchema = new mongoose.Schema({
    partyName: { type: String, required: true },
    votes: { type: Number, default: 0 }
});

module.exports = mongoose.model('Party', PartySchema);
