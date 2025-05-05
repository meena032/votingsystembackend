// const Voter = require('../models/Voter');
// const Party = require('../models/party');

// exports.getStats = async (req, res) => {
//     const totalVoters = await Voter.countDocuments();
//     const votesCast = await Voter.countDocuments({ hasVoted: true });
//     const parties = await Party.find();

//     let leadingParty = null;
//     if (parties.length > 0) {
//         leadingParty = parties.reduce((prev, curr) => (prev.votes > curr.votes ? prev : curr));
//     }

//     res.json({
//         totalVoters,
//         votesCast,
//         leadingParty: leadingParty ? leadingParty.partyName : 'No votes yet'
//     });
// };

// exports.getResults = async (req, res) => {
//     const parties = await Party.find().sort({ votes: -1 });
//     res.json(parties);
// };

const Voter = require('../models/Voter');
const Party = require('../models/party');

exports.getStats = async (req, res) => {
    const totalVoters = await Voter.countDocuments();
    const votesCast = await Voter.countDocuments({ hasVoted: true });
    const parties = await Party.find();

    let leadingParty = null;
    if (parties.length > 0) {
        leadingParty = parties.reduce((prev, curr) => (prev.votes > curr.votes ? prev : curr));
    }

    res.json({
        totalVoters,
        votesCast,
        leadingParty: leadingParty ? leadingParty.partyName : 'No votes yet'
    });
};

exports.getResults = async (req, res) => {
    const parties = await Party.find().sort({ votes: -1 });
    res.json(parties);
};
