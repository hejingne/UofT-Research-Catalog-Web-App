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

validateUser = async (req, res) => {
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
                        req.session.email = user.emailAddress;
                        req.session.userType = user.userType;

                        console.log(req.session);
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

module.exports = {
    createUser,
    validateUser
};
