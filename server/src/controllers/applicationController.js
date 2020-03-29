const Application = require("../models/application");

getApplications = async (req, res) => {
    if (!req.session.user) {
        return res
            .status(401)
            .json({ success: false, message: "user unauthorized" });
    }
    await Application.find({}, (error, applications) => {
        if (error) {
            return res.status(400).json({ success: false, error: error });
        }

        if (!applications) {
            return res
                .status(404)
                .json({ success: false, error: "users not found" });
        }
        return res.status(200).json({ success: true, data: applications });
    }).catch((error) => {
        return res.status(404).json({ success: false, error: error });
    });
};

createApplications = (req, res) => {
    if (!req.session.user) {
        return res
            .status(401)
            .json({ success: false, message: "user unauthorized" });
    }

    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: "you must provide all required information"
        });
    }

    const application = new Application({
        research: body.research,
        emailAddress: body.emailAddress,
        applicantName: body.applicantName,
        phoneNumber: body.phoneNumber,
        areaOfStudy: body.areaOfStudy,
        answers: body.answers,
        resume: body.resume,
        transcript: body.transcript
    });

    application
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: application._id,
                message: "application created"
            });
        })
        .catch((error) => {
            return res.status(400).json({
                success: false,
                error,
                message: "application not created"
            });
        });
};

deleteApplicationById = async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({
            success: false,
            message: "user unauthorized"
        });
    }
    await Application.findOneAndDelete({ _id: req.params.id }, (err) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        return res.status(200).json({ success: true });
    }).catch((error) => {
        return res.status(404).json({
            success: false,
            error
        });
    });
};

module.exports = {
    getApplications,
    createApplications,
    deleteApplicationById
};
