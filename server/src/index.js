const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");

const db = require("./database");
const profileRouter = require("./routes/profileRouter");
const userRouter = require("./routes/userRouter");

const app = express();
const apiPort = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use(
    session({
        secret: "oursecret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60000,
            httpOnly: true
        }
    })
);

db.on("error", (error) =>
    console.error("MongoDB connection error: " + error.message)
);
db.once("open", () => console.log("Connected to database"));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/profile", profileRouter);
app.use("/user", userRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
