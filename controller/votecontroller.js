// const Voter = require('../models/Voter');
// const Party = require('../models/party');
// const bcrypt = require('bcryptjs');

// exports.castVote = async (req, res) => {
//     const { aadharNumber, partyName } = req.body;

//     const voters = await Voter.find();
//     let matchedVoter = null;

//     for (const voter of voters) {
//         const isMatch = await bcrypt.compare(aadharNumber, voter.aadharHash);
//         if (isMatch) {
//             matchedVoter = voter;
//             break;
//         }
//     }

//     if (!matchedVoter) {
//         return res.status(400).json({ message: 'Voter not found or OTP not verified' });
//     }

//     if (matchedVoter.hasVoted) {
//         return res.status(400).json({ message: 'Already voted' });
//     }

//     // Update Voter
//     matchedVoter.hasVoted = true;
//     matchedVoter.partyVoted = partyName;
//     await matchedVoter.save();

//     // Update Party votes
//     let party = await Party.findOne({ partyName });
//     if (!party) {
//         party = new Party({ partyName, votes: 1 });
//     } else {
//         party.votes += 1;
//     }
//     await party.save();

//     res.json({ message: 'Vote casted successfully' });
// };
const Voter = require('../models/Voter');
const Party = require('../models/party');
const bcrypt = require('bcryptjs');

exports.castVote = async (req, res) => {
    const { aadharNumber, partyName } = req.body;

    const voters = await Voter.find();
    let matchedVoter = null;

    for (const voter of voters) {
        const isMatch = await bcrypt.compare(aadharNumber, voter.aadharHash);
        if (isMatch) {
            matchedVoter = voter;
            break;
        }
    }

    if (!matchedVoter) {
        return res.status(400).json({ message: 'Voter not found or OTP not verified' });
    }

    if (matchedVoter.hasVoted) {
        return res.status(400).json({ message: 'Already voted' });
    }

    // Update Voter
    matchedVoter.hasVoted = true;
    matchedVoter.partyVoted = partyName;
    await matchedVoter.save();

    // Update Party votes
    let party = await Party.findOne({ partyName });
    if (!party) {
        party = new Party({ partyName, votes: 1 });
    } else {
        party.votes += 1;
    }
    await party.save();

    res.json({ message: 'Vote casted successfully' });
};
