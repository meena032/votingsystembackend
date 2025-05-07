const bcrypt = require('bcryptjs');
const Voter = require('../models/Voter');

// Temporary OTP storage (use a better storage in production)
let otpStore = {};

// Send OTP to frontend
exports.sendOtp = async (req, res) => {
    const { aadharNumber } = req.body;

    if (!aadharNumber) {
        return res.status(400).json({ success: false, message: 'Aadhaar number is required' });
    }

    try {
        // Check if Aadhaar already voted
        const voters = await Voter.find();
        const alreadyVoted = voters.some(v => bcrypt.compareSync(aadharNumber, v.aadharHash));

        if (alreadyVoted) {
            return res.status(400).json({ success: false, message: 'This Aadhaar has already voted.' });
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        otpStore[aadharNumber] = otp;

        console.log(`OTP for Aadhaar ${aadharNumber}: ${otp}`); // For dev purposes

        return res.status(200).json({ success: true, message: 'OTP generated successfully', otp }); // Send OTP for testing
    } catch (error) {
        console.error('Error sending OTP:', error);
        return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
};

// Verify OTP entered by user
exports.verifyOtp = async (req, res) => {
    const { aadharNumber, otp } = req.body;

    if (!otpStore[aadharNumber] || otpStore[aadharNumber] !== otp) {
        return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    // OTP is valid; proceed to allow voting
    const aadharHash = await bcrypt.hash(aadharNumber, 10);
    const newVoter = new Voter({ aadharHash });

    await newVoter.save();
    delete otpStore[aadharNumber]; // Clean up OTP after verification

    res.json({ success: true, message: 'OTP verified. You can now vote.' });
};













// bcrypt = require('bcryptjs');
// const Voter = require('../models/Voter');

// // Temporary OTP storage
// let otpStore = {};

// exports.sendOtp = async (req, res) => {
//     const { aadharNumber } = req.body;

//     if (!aadharNumber) {
//         return res.status(400).json({ message: 'Aadhaar number is required' });
//     }

//     // Check if Aadhaar already voted
//     const voters = await Voter.find({});
//     const alreadyVoted = voters.some(v => bcrypt.compareSync(aadharNumber, v.aadharHash));

//     if (alreadyVoted) {
//         return res.status(400).json({ message: 'This Aadhaar has already voted.' });
//     }

//     // Generate and store OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     otpStore[aadharNumber] = otp;

//     console.log(`OTP for Aadhaar ${aadharNumber}: ${otp}`); // For development only

//     res.json({ message: 'OTP generated (check console)' });
// };

// exports.verifyOtp = async (req, res) => {
//     const { aadharNumber, otp } = req.body;

//     if (!otpStore[aadharNumber] || otpStore[aadharNumber] !== otp) {
//         return res.status(400).json({ message: 'Invalid or expired OTP' });
//     }

//     // Hash and save voter
//     const aadharHash = await bcrypt.hash(aadharNumber, 10);
//     const newVoter = new Voter({ aadharHash });

//     await newVoter.save();
//     delete otpStore[aadharNumber]; // Clean up OTP

//     res.json({ message: 'OTP verified and vote permission granted' });
// };


// require('dotenv').config();
// const axios = require('axios');
// const bcrypt = require('bcryptjs');
// const Voter = require('../models/Voter');

// // TEMP Storage (for OTP Testing)
// let otpStore = {};
// let phoneStore = {};

// exports.sendOtp = async (req, res) => {
//     const { aadharNumber, phoneNumber } = req.body;

//     // Check if the required fields are provided
//     if (!aadharNumber || !phoneNumber) {
//         return res.status(400).json({ message: 'Aadhar number and phone number are required' });
//     }

//     // Generate OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     // Save in memory (temporary storage)
//     otpStore[aadharNumber] = otp;
//     phoneStore[aadharNumber] = phoneNumber;

//     // Send SMS via Fast2SMS
//     const message = `Your OTP for voting is: ${otp}`;

//     try {
//         // Use the API key from environment variables
//         const apiKey = process.env.FAST2SMS_API_KEY;

//         // Send the SMS request
//         const response = await axios.post('https://www.fast2sms.com/dev/bulkV2', {
//             route: 'p',
//             message,
//             language: 'english',
//             flash: 1,
//             numbers: phoneNumber
//         }, {
//             headers: {
//                 authorization: apiKey,
//                 'Content-Type': 'application/json'
//             }
//         });

//         console.log(`OTP ${otp} sent to ${phoneNumber}`);
//         res.json({ message: 'OTP sent via SMS' });

//     } catch (err) {
//         console.error('Error sending OTP:', err.response?.data || err.message);
//         res.status(500).json({ message: 'Failed to send OTP' });
//     }
// };

// exports.verifyOtp = async (req, res) => {
//     const { aadharNumber, otp } = req.body;

//     // Check if OTP matches the stored value
//     if (otpStore[aadharNumber] !== otp) {
//         return res.status(400).json({ message: 'Invalid OTP' });
//     }

//     // OTP matched — hash Aadhar number and check/create voter
//     try {
//         const aadharHash = await bcrypt.hash(aadharNumber, 10);

//         const existingVoter = await Voter.findOne({ aadharHash });

//         if (!existingVoter) {
//             const newVoter = new Voter({ aadharHash });
//             await newVoter.save();
//         }

//         // Cleanup temporary storage
//         delete otpStore[aadharNumber];
//         delete phoneStore[aadharNumber];

//         res.json({ message: 'OTP verified successfully' });
//     } catch (err) {
//         console.error('Error verifying OTP:', err.message);
//         res.status(500).json({ message: 'Error during OTP verification' });
//     }
// };
