const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./utils/db');

const userRoutes = require('./routes/user.route');

port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());

// Import routes
app.use('/api/users', userRoutes);


connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}).catch((err) => {
    console.error("Database connection error:", err);
});
