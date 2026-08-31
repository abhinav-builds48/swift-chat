const mongoose = require("mongoose");

const connection = async () => {
    try {
        await mongoose.connect(process.env.DB);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error.message);
    }
};

module.exports = connection;