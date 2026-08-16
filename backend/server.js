const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./src/config/database");
const authRoutes = require("./src/routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Katsera Backend Running");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
    connectDB().catch((err) => {
        console.warn("MongoDB connection warning:", err.message);
    });
});