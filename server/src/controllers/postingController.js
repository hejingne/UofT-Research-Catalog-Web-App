const Posting = require("../models/posting")

getResearches = async (req, res) => {
    if (!req.session.user) {
        return res
            .status(401)
            .json({ success: false, message: "user unauthorized" });
    }
    await Posting.find({}, (error, postings) => {
        if (error) {
            return res.status(500).json({ success: false, error: error });
        }
        if (!postings) {
            return res
                .status(404)
                .json({ success: false, error: "postings not found" });
        }
        return res.status(200).json({ success: true, data: postings });
    }).catch((error) => {
        return res.status(404).json({ success: false, error: error });
    });
};



module.exports = {
    getResearches
};