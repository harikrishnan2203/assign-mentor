const mongoose = require("mongoose");

const connectToDatabase = async () => {
    try {
        const username = "harikrishnan2285";
        const password = "Harikrishnan";
        const clusterUrl = "student-mentor.oi3pggv.mongodb.net";
        const databaseName = "Student-Mentor"; // Replace with your actual database name

        const uri = `mongodb+srv://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${clusterUrl}/${databaseName}?retryWrites=true&w=majority`;

        await mongoose.connect(uri);
        console.log("Database connection successful");
    } catch (error) {
        console.error("Error connecting to database:", error.message);
    }
};

module.exports = {
    connectToDatabase,
};
