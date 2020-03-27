const User = require("../models/user");
const Profile = require("../models/profile");
const bcrypt = require("bcryptjs");

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
        description: body.description ? body.description : "",
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
                        req.session.user = user._id;
                        req.session.emailAddress = user.emailAddress;
                        req.session.userType = user.userType;
                        req.session.save();

                        return res.status(200).json({
                            success: true,
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
    if (req.session.user) {
        res.status(200).json({
            success: true,
            user: {
                emailAddress: req.session.emailAddress,
                userType: req.session.userType
            }
        });
    } else {
        res.status(401).json({ success: false, message: "user unauthorized" });
    }
};

module.exports = {
    createUser,
    authenticateUser,
    updatePassword,
    signOutUser,
    getSession
};
