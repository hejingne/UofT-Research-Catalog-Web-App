const Application = require("../models/application");
const { ObjectID } = require("mongodb");
const multiparty = require("multiparty");
const fs = require("fs");

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

getApplicationsByEmail = async (req, res) => {
    if (!req.session.user) {
        return res
            .status(401)
            .json({ success: false, message: "user unauthorized" });
    }
    await Application.find(
        { emailAddress: req.params.emailAddress },
        (error, applications) => {
            if (error) {
                return res.status(400).json({ success: false, error: error });
            }

            if (!applications) {
                return res
                    .status(404)
                    .json({ success: false, error: "application not found" });
            }
            return res.status(200).json({ success: true, data: applications });
        }
    ).catch((error) => {
        return res.status(404).json({ success: false, error: error });
    });
};

getApplicationsByEmailAndResearchId = async (req, res) => {
    if (!req.session.user) {
        return res
            .status(401)
            .json({ success: false, message: "user unauthorized" });
    }
    await Application.findOne(
        {
            emailAddress: req.params.emailAddress,
            researchId: req.params.researchId
        },
        (error, applications) => {
            if (error) {
                return res.status(400).json({ success: false, error: error });
            }

            if (!applications) {
                return res
                    .status(404)
                    .json({ success: false, error: "application not found" });
            }
            return res.status(200).json({ success: true, data: applications });
        }
    ).catch((error) => {
        return res.status(404).json({ success: false, error: error });
    });
};

createApplications = async (req, res) => {
    if (!req.session.user) {
        return res
            .status(401)
            .json({ success: false, message: "user unauthorized" });
    }

    const form = new multiparty.Form();
    await form.parse(req, async (err, fields, files) => {
        if (!fields || !files || fields.length === 0 || files.length === 0) {
            return res.status(400).json({
                success: false,
                error: "data not found"
            });
        }

        const body = {};
        Object.keys(fields).forEach(function(name) {
            body[name] = fields[name][0];
        });
        Object.keys(files).forEach(function(name) {
            body[name] = files[name][0];
        });

        if (!body) {
            return res.status(400).json({
                success: false,
                error: "you must provide all required information"
            });
        }

        const application = new Application({
            researchId: body.researchId,
            researchTitle: body.researchTitle,
            emailAddress: body.emailAddress,
            applicantName: body.applicantName,
            phoneNumber: body.phoneNumber,
            areaOfStudy: body.areaOfStudy,
            answers: {
                questionOne: body.questionOne,
                questionTwo: body.questionTwo,
                questionThree: body.questionThree,
                questionFour: body.questionFour
            },
            resume: {
                data: fs.readFileSync(body.resume.path),
                contentType: "application/pdf"
            },
            transcript: {
                data: fs.readFileSync(body.transcript.path),
                contentType: "application/pdf"
            },
            status: body.status
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
    });
};

acceptApplication = async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({
            success: false,
            message: "user unauthorized"
        });
    }

    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    await Application.findOneAndUpdate(
        { _id: id },
        { $set: { status: "accepted" } },
        { new: true }
    )
        .then((restaurant) => {
            if (!restaurant) {
                res.status(404).send();
            } else {
                res.status(200).json({
                    success: true
                });
            }
        })
        .catch((error) => {
            res.status(400).send();
        });
};

deleteApplicationById = async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({
            success: false,
            message: "user unauthorized"
        });
    }

    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    await Application.findOneAndDelete({ _id: id }, (err) => {
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
    getApplicationsByEmail,
    getApplicationsByEmailAndResearchId,
    createApplications,
    deleteApplicationById,
    acceptApplication
};
