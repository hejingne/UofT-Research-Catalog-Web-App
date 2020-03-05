const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./database");
const profileRouter = require('./routes/profile-router')


const app = express();
const apiPort = 3001;

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(bodyParser.json());

db.on("error", (error) => console.log("MongoDB connection error: " + error));
db.once("open", () => console.log("connected to database"));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use('/api', profileRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
