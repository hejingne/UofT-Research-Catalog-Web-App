const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");

const db = require("./database");
const profileRouter = require("./routes/profileRouter");
const userRouter = require("./routes/userRouter");
const applicationRouter = require("./routes/applicationRouter");

const app = express();
const apiPort = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true // enable set cookie
    })
);

app.use(
    session({
        secret: "oursecret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: false,
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
app.use("/application", applicationRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
