const mongoose = require("mongoose");
require("dotenv").config();

const connectToDatabase = async () => {
    try {
        const username = process.env.DB_USERNAME;
        const password = process.env.DB_PASSWORD;
        const clusterUrl = process.env.DB_CLUSTER_URL;
        const databaseName = process.env.DB_NAME;

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
