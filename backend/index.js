const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./utils/db');
const flyerRoutes=require("./routes/flyer.route")

const userRoutes = require('./routes/user.route');

port = process.env.PORT || 5000;
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(bodyParser.json());

// Import routes
app.use('/api/users', userRoutes);
app.use('/api/flyer',flyerRoutes);

app.get("/", (req, res) => {
    res.send("API is running....");
});

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}).catch((err) => {
    console.error("Database connection error:", err);
});
