const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");

const db = require("./database");
const profileRouter = require("./routes/profileRouter");
const userRouter = require("./routes/userRouter");
const applicationRouter = require("./routes/applicationRouter");
const postingRouter = require("./routes/postingRouter");

const app = express();
const apiPort = process.env.PORT || 3001;

let originUrl;

if (process.env.NODE_ENV === "production") {
    originUrl = "https://uoftresearchcatalogue.herokuapp.com";
} else {
    originUrl = "http://localhost:" + apiPort;
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: [originUrl, "http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
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

app.use("/api/profile", profileRouter);
app.use("/api/user", userRouter);
app.use("/api/application", applicationRouter);
app.use("/api/manage-posting", postingRouter);

if (process.env.NODE_ENV === "production") {
    console.log(`Production mode detected: Serving react client`);
    const path = require("path");

    const buildDir = path.join(__dirname, "../../client/build");

    app.use(express.static(buildDir));

    app.get("*", (req, res) => {
        res.sendFile(path.join(buildDir, "index.html"));
    });
}

db.on("error", (error) =>
    console.error("MongoDB connection error: " + error.message)
);
db.once("open", () => console.log("Connected to database"));

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
