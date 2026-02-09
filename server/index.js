const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Mongo Db
import { connToMongoDB } from "./helper_func/mongodb.js";


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.send('🚀 Express Server Running');
});

// Start Server
app.listen(PORT, () => {
    connToMongoDB();
    console.log(`Server running on http://localhost:${PORT}`);
});
