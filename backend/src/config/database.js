const mongoose = require("mongoose");
const dns = require("dns");

if (dns.setDefaultResultOrder) {
    dns.setDefaultResultOrder("ipv4first");
}

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000
        });
        console.log("Database connected");
    } catch (error) {
        console.log("Database connection error:", error.message);
        throw error;
    }
};

module.exports = connectDB;