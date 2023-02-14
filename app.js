require ("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
const notFound = require("./middleware/notFound")
const authRouter = require('./routes/authRouter')
const journalRouter = require('./routes/journalRouter')
const auth = require('./middleware/authentication')
const cors = require("cors")

//middleware
app.use(express.json());
app.use(cors())


//routes
app.use("/api/v1", authRouter);
app.use("/api/v1/journal", auth, journalRouter);

//error route
app.use(notFound);



const start = async () => {
    try {
        await mongoose.connect (process.env.MONGO_URI);
        app.listen (PORT, () => {
            console.log (`server running on port ${PORT}`);
        });
    } catch (error) {
        console.log (error)
    }
}

start();