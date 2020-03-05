const mongoose = require("mongoose");

mongoose
    .connect(
        "mongodb+srv://server:server@csc309-uoftresearchcatalogue-sql0-gzdxk.mongodb.net/uoftresearchcatalogue",
        {useNewUrlParser: true, useUnifiedTopology: true}
    )
    .catch(e => {
        console.error("Connection error", e.message);
    });
const db = mongoose.connection;

module.exports = db;
