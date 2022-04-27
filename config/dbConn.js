const mongoose = require("mongoose");

//connect to mongodb
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
    } catch (err) {
        console.error(err);
        // stop the process
        process.exit(1);
    }
}

module.exports = connectDB;