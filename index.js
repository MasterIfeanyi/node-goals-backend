const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");
const cors = require("cors");
const verifyJWT = require("./middleware/verifyJWT");
const joi = require("joi");
const path = require("path");
const colors = require("colors");
const connectDB = require("./config/dbConn")
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();
//initialize express app
const app = express();


// Connect to MongoDB
connectDB();

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());


// MONGO_URI=mongodb+srv://mongotut:testing123@cluster0.kogqa.mongodb.net/CompanyDB?retryWrites=true&w=majority

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));


//middleware for cookies
app.use(cookieParser());



// port 
const PORT = process.env.PORT || 3500;

// routes
app.use("/logout", require("./routes/logout"));
app.use("/refresh", require("./routes/refresh"));
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use(verifyJWT);
app.use("/goals", require("./routes/api/goalRoutes"));
app.use("/users", require("./routes/api/user"));

// if (process.env.NODE_ENV === "production") {
//     //set static folder
//     app.use(express.static(path.join(__dirname, "frontend", "build")))

//     app.get("*", (req, res) => {
//         res.sendFile(path.join(__dirname, "frontend", "build", "index.html"))
//     })
// } else {
//     app.get("/", (req, res) => {
//         res.send("Please set to production");
//     })
// }

mongoose.connection.once("open", () => {
    console.log(`Connected to MongoDB`.cyan.underline)
    app.listen(PORT, () => console.log(`Server running on Port ${PORT}`))
})
