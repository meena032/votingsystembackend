// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const otpRoutes = require('./routes/otproutes');
// const voteRoutes = require('./routes/voteroutes');
// const adminRoutes = require('./routes/adminroutes');

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/otp', otpRoutes);
// app.use('/api/vote', voteRoutes);
// app.use('/api/admin', adminRoutes);

// app.get('/', (req, res) => res.send('Voting Backend Running...'));

// // MongoDB Connect
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => console.log('MongoDB Connected'))
// .catch((err) => console.log('Mongo Error:', err));

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const otpRoutes = require('./routes/otproutes');
const voteRoutes = require('./routes/voteroutes');
const adminRoutes = require('./routes/adminroutes');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/otp', otpRoutes);
app.use('/api/vote', voteRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => res.send('Voting Backend Running...'));

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch((err) => console.log('Mongo Error:', err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
