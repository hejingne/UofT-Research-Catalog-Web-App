const schema = require("../models/schema");
const bcrypt = require("bcryptjs");

createUser = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: "you must provide email and password"
        });
    }

    const user = new schema.user(body);
    if (!user) {
        return res.status(400).json({ success: false, error: err });
    }

    bcrypt.hash(user.password, 10, (err, hash) => {
        user.password = hash;
        user.save()
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

    const user = new schema.user(body);
    if (!user) {
        return res.status(400).json({ success: false, error: err });
    }

    await schema.user
        .findOne({ emailAddress: user.emailAddress })
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

    await schema.user
        .findOne({ emailAddress: body.emailAddress })
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
            res.status(500).send(error);
        }
    });
};

module.exports = {
    createUser,
    authenticateUser,
    updatePassword,
    signOutUser
};
