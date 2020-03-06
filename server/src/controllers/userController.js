const userSchema = require("../models/userSchema");

createUser = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: "you must provide email and password"
        });
    }

    const user = new userSchema(body);

    if (!user) {
        return res.status(400).json({ success: false, error: err });
    }

    user.save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: user._id,
                message: "user created"
            });
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: "user not created"
            });
        });
};

getUserByEmailAddress = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: "you must provide email and password"
        });
    }

    const user = new userSchema(body);

    if (!user) {
        return res.status(400).json({ success: false, error: err });
    }

    await userSchema
        .find({ emailAddress: user.emailAddress }, (err, collection) => {
            if (err) {
                return res.status(400).json({ success: false, error: err });
            }
            if (!collection.length) {
                return res
                    .status(404)
                    .json({ success: false, error: `user not found` });
            }
            return res.status(200).json({ success: true, data: collection });
        })
        .catch(err => console.log(err));
};

module.exports = {
    createUser,
    getUserByEmailAddress
};
