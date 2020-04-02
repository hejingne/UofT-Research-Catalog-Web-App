const Posting = require("../models/posting")

createPostForResearcher = async (req, res) => {
    // if (!req.session.user) {
    //     return res.status(401).json({
    //         success: false,
    //         message: "user unauthorized"
    //     });
    // }
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: "you must provide all information"
        });
    }
    const postingSchema = {
        title: body.title,
        term: body.term,
        areaOfStudy: body.areaOfStudy,
        deadline: body.deadline,
        positions: body.positions,
        description: body.description
    }
    console.log(postingSchema); //test
    await Posting.findOne(
        { _id: body.researcher_id },
        (error, researcher) => {
            if (error) {
                return res.status(400).json({ success: false, erorr: error });
            }
            if (!researcher) {
                return res.status(404).json({ success: false, erorr: "researcher not found" });
            }
            researcher.postings.push(postingSchema);
            console.log("===" + researcher.postings); //test
            researcher.save((error) => {
                if (error) { return res.status(400).json({ success: false, error: "can not save researcher" }); }
                else { return res.status(200).json({ success: true, data: researcher }); }
            })
        }
    ).catch((error) => {
        return res.status(500).json({ success: false, error });
    })
}

getResearcherByEmail = async (req, res) => {
    await Posting.findOne(
        { email: req.params.email },
        (error, researcher) => {
            if (error) {
                return res.status(400).json({ success: false, erorr: error });
            }
            if (!researcher) {
                return res.status(404).json({ success: false, erorr: "researcher not found" });
            }
            return res.status(200).json({ success: true, data: researcher });
        }
    ).catch((error) => {
        return res.status(500).json({ success: false, error });
    })
}

startMakingPosts = async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({
            success: false,
            message: "user unauthorized"
        });
    }

    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: "you must provide all information"
        });
    }

    const posting = new Posting({
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        postings: []
    })
    posting.save().then(() => {
        return res.status(200).json({
            success: true,
            data: posting
        });
    })
        .catch((error) => {
            return res.status(500).json({
                success: false,
                error
            });
        })
}

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
    createPostForResearcher,
    getResearcherByEmail,
    startMakingPosts,
    getResearches
};