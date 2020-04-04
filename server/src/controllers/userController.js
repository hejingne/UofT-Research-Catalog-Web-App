const User = require("../models/user");
const Profile = require("../models/profile");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

createUser = (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: "you must provide all required information"
        });
    }

    const user = new User({
        emailAddress: body.emailAddress,
        password: body.password,
        userType: body.userType
    });

    // some has default value
    const profile = new Profile({
        emailAddress: body.emailAddress,
        userType: body.userType,
        firstName: body.firstName,
        lastName: body.lastName,
        description: body.description
            ? body.description
            : "Say something about your self",
        interests: body.interests ? body.interests : [],
        currentEmployer: body.currentEmployer ? body.currentEmployer : "N/A",
        currentPosition: body.currentPosition ? body.currentPosition : "N/A"
    });

    if (!user || !profile) {
        return res.status(400).json({ success: false, error: err });
    }
    // save user to users db
    bcrypt.hash(user.password, 10, (err, hash) => {
        user.password = hash;
        user.save()
            .then(() => {
                // save profile to profiles db
                profile
                    .save()
                    .then(() => {
                        return res.status(201).json({
                            success: true,
                            id: user._id,
                            message: "user created"
                        });
                    })
                    .catch((error) => {
                        return res.status(400).json({
                            success: false,
                            error,
                            message: "user not created"
                        });
                    });
            })
            .catch((error) => {
                return res.status(400).json({
                    success: false,
                    error,
                    message: "user not created"
                });
            });
    });
};

authenticateUser = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: "you must provide email and password"
        });
    }

    const user = new User(body);
    if (!user) {
        return res.status(400).json({ success: false, error: err });
    }

    await User.findOne({ emailAddress: user.emailAddress })
        .then((existingUser) => {
            if (!existingUser) {
                return res
                    .status(404)
                    .json({ success: false, error: "user not found" });
            }

            bcrypt.compare(
                user.password,
                existingUser.password,
                (err, result) => {
                    if (
                        result &&
                        existingUser.emailAddress === user.emailAddress &&
                        existingUser.userType === user.userType
                    ) {
                        const sessionId = crypto
                            .randomBytes(30)
                            .toString("base64")
                            .replace(/\//g, "_")
                            .replace(/\+/g, "-");

                        req.session.user = user._id;
                        req.session.emailAddress = user.emailAddress;
                        req.session.userType = user.userType;
                        req.session.sessionId = sessionId;
                        req.session.save();

                        return res.status(200).json({
                            success: true,
                            sessionId: sessionId,
                            message: "user authorized"
                        });
                    } else {
                        return res.status(401).json({
                            success: false,
                            error: "user unauthorized"
                        });
                    }
                }
            );
        })
        .catch((error) => {
            return res.status(401).json({
                success: false,
                error,
                message: "user unauthorized"
            });
        });
};

getUsers = async (req, res) => {
    if (!req.session.user) {
        return res
            .status(401)
            .json({ success: false, message: "user unauthorized" });
    }
    await User.find({}, (error, users) => {
        if (error) {
            return res.status(400).json({ success: false, error: error });
        }

        if (!users) {
            return res
                .status(404)
                .json({ success: false, error: "users not found" });
        }
        return res.status(200).json({ success: true, data: users });
    }).catch((error) => {
        return res.status(404).json({ success: false, error: error });
    });
};

updatePassword = async (req, res) => {
    // check session first
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
            error: "you must provide email and password"
        });
    }

    await User.findOne({ emailAddress: body.emailAddress })
        .then((existingUser) => {
            if (!existingUser) {
                return res
                    .status(404)
                    .json({ success: false, error: "user not found" });
            }

            existingUser.password = body.password;

            bcrypt.hash(existingUser.password, 10, (err, hash) => {
                existingUser.password = hash;
                existingUser
                    .save()
                    .then(() => {
                        return res.status(200).json({
                            success: true,
                            id: existingUser._id,
                            message: "user's password updated"
                        });
                    })
                    .catch((error) => {
                        return res.status(404).json({
                            success: false,
                            error,
                            message: "user's password not updated"
                        });
                    });
            });
        })
        .catch((error) => {
            return res.status(404).json({
                success: false,
                error,
                message: "user's password not updated"
            });
        });
};

updateEmailAddressAndUserType = async (req, res) => {
    // check session first
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
            error: "you must provide email and password"
        });
    }

    await User.findOne({ emailAddress: body.emailAddress })
        .then((existingUser) => {
            if (!existingUser) {
                return res
                    .status(404)
                    .json({ success: false, error: "user not found" });
            }

            existingUser.emailAddress = body.emailAddress;
            existingUser.userType = body.userType;

            existingUser
                .save()
                .then(async () => {
                    await Profile.findOne({
                        emailAddress: body.emailAddress
                    }).then((existingProfile) => {
                        if (!existingProfile) {
                            return res.status(404).json({
                                success: false,
                                error: "user not found"
                            });
                        }

                        existingProfile.emailAddress = body.emailAddress;
                        existingProfile.userType = body.userType;

                        existingProfile.save().then(() => {
                            return res.status(200).json({
                                success: true,
                                id: existingUser._id,
                                message:
                                    "user's email address and user type updated"
                            });
                        });
                    });
                })
                .catch((error) => {
                    return res.status(404).json({
                        success: false,
                        error,
                        message:
                            "user's email address and user type not updated"
                    });
                });
        })
        .catch((error) => {
            return res.status(404).json({
                success: false,
                error,
                message: "user's email address and user type not updated"
            });
        });
};

deleteUserAndProfile = async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({
            success: false,
            message: "user unauthorized"
        });
    }
    await User.findOneAndDelete(
        { emailAddress: req.params.emailAddress },
        async (err) => {
            if (err) {
                return res.status(400).json({ success: false, error: err });
            }

            await Profile.findOneAndDelete(
                { emailAddress: req.params.emailAddress },
                (err) => {
                    if (err) {
                        return res
                            .status(400)
                            .json({ success: false, error: err });
                    }
                    return res.status(200).json({ success: true });
                }
            ).catch((error) => {
                return res.status(404).json({
                    success: false,
                    error
                });
            });
        }
    ).catch((err) => {
        return res.status(404).json({
            success: false,
            error
        });
    });
};

signOutUser = (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            return res.status(500).json({
                success: false,
                error,
                message: "user not signed out"
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "user signed out"
            });
        }
    });
};

getSession = (req, res) => {
    const sessionId = req.params.sessionId;
    if (req.session.sessionId === sessionId) {
        res.status(200).json({
            success: true,
            user: {
                emailAddress: req.session.emailAddress,
                userType: req.session.userType
            }
        });
    } else {
        res.status(200).json({
            success: false
        });
    }
};

module.exports = {
    createUser,
    authenticateUser,
    getUsers,
    updatePassword,
    signOutUser,
    getSession,
    deleteUserAndProfile,
    updateEmailAddressAndUserType
};
