const multiparty = require("multiparty");
const fs = require("fs");
const Profile = require("../models/profile");

// createProfile = (req, res) => {
//     const body = req.body;
//
//     if (!body) {
//         return res.status(400).json({
//             success: false,
//             error: "You must provide a movie"
//         });
//     }
//
//     const profile = new Profile(body);
//
//     if (!profile) {
//         return res.status(400).json({ success: false, error: err });
//     }
//
//     profile
//         .save()
//         .then(() => {
//             return res.status(201).json({
//                 success: true,
//                 id: profile._id,
//                 message: "profile created!"
//             });
//         })
//         .catch(error => {
//             return res.status(400).json({
//                 error,
//                 message: "profile not created!"
//             });
//         });
// };

getProfileByEmail = async (req, res) => {
    await Profile.findOne(
        { emailAddress: req.params.emailAddress },
        (error, profile) => {
            if (error) {
                return res.status(400).json({ success: false, error: error });
            }

            if (!profile) {
                return res
                    .status(404)
                    .json({ success: false, error: "profile not found" });
            }
            return res.status(200).json({ success: true, data: profile });
        }
    ).catch((error) => {
        return res.status(404).json({ success: false, error: error });
    });
};

updateInterests = async (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: "data not found"
        });
    }

    await Profile.findOne({ emailAddress: body.emailAddress })
        .then((existingProfile) => {
            if (!existingProfile) {
                return res
                    .status(404)
                    .json({ success: false, error: "profile not found" });
            }

            existingProfile.interests = body.interests;

            existingProfile
                .save()
                .then(() => {
                    return res.status(200).json({
                        success: true,
                        id: existingProfile._id,
                        message: "profile's interests updated"
                    });
                })
                .catch((error) => {
                    return res.status(404).json({
                        success: false,
                        error,
                        message: "profile's interests not updated"
                    });
                });
        })
        .catch((error) => {
            return res.status(404).json({
                success: false,
                error,
                message: "profile's interests not updated"
            });
        });
};

updateDescription = async (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: "data not found"
        });
    }

    await Profile.findOne({ emailAddress: body.emailAddress })
        .then((existingProfile) => {
            if (!existingProfile) {
                return res
                    .status(404)
                    .json({ success: false, error: "profile not found" });
            }

            existingProfile.description = body.description;

            existingProfile
                .save()
                .then(() => {
                    return res.status(200).json({
                        success: true,
                        id: existingProfile._id,
                        message: "profile's description updated"
                    });
                })
                .catch((error) => {
                    return res.status(404).json({
                        success: false,
                        error,
                        message: "profile's description not updated"
                    });
                });
        })
        .catch((error) => {
            return res.status(404).json({
                success: false,
                error,
                message: "profile's description not updated"
            });
        });
};

updateEmploymentInfo = async (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: "data not found"
        });
    }

    await Profile.findOne({ emailAddress: body.emailAddress })
        .then((existingProfile) => {
            if (!existingProfile) {
                return res
                    .status(404)
                    .json({ success: false, error: "profile not found" });
            }

            existingProfile.currentEmployer = body.currentEmployer;
            existingProfile.currentPosition = body.currentPosition;

            existingProfile
                .save()
                .then(() => {
                    return res.status(200).json({
                        success: true,
                        id: existingProfile._id,
                        message: "profile's employment info updated"
                    });
                })
                .catch((error) => {
                    return res.status(404).json({
                        success: false,
                        error,
                        message: "profile's employment info not updated"
                    });
                });
        })
        .catch((error) => {
            return res.status(404).json({
                success: false,
                error,
                message: "profile's employment info not updated"
            });
        });
};

updateProfilePicture = async (req, res) => {
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

        await Profile.findOne({ emailAddress: body.emailAddress })
            .then((existingProfile) => {
                if (!existingProfile) {
                    return res
                        .status(404)
                        .json({ success: false, error: "profile not found" });
                }
                existingProfile.profilePicture = {
                    data: fs.readFileSync(body.profilePicture.path),
                    // data: JSON.stringify(body.profilePicture),
                    contentType: "image/png"
                };

                existingProfile
                    .save()
                    .then(() => {
                        return res.status(200).json({
                            success: true,
                            id: existingProfile._id,
                            message: "profile's profile picture updated"
                        });
                    })
                    .catch((error) => {
                        return res.status(404).json({
                            success: false,
                            error,
                            message: "profile's profile picture not updated"
                        });
                    });
            })
            .catch((error) => {
                return res.status(404).json({
                    success: false,
                    error,
                    message: "profile's profile picture not updated"
                });
            });
    });
};

module.exports = {
    getProfileByEmail,
    updateInterests,
    updateProfilePicture,
    updateDescription,
    updateEmploymentInfo
};
