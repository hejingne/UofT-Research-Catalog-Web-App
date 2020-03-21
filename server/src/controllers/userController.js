const schema = require("../models/schema");

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
        .find({ emailAddress: user.emailAddress }, (err, collection) => {
            if (err) {
                return res.status(400).json({ success: false, error: err });
            }
            if (!collection.length) {
                return res
                    .status(404)
                    .json({ success: false, error: "user not found" });
            }
            if (collection[0].emailAddress !== user.emailAddress ||
                collection[0].password !== user.password ||
                collection[0].userType !== user.userType) {
                return res
                    .status(401)
                    .json({ success: false, error: "user unauthorized" });
            }
            return res.status(200).json({ success: true, message: "user authorized" });
        })
        .catch(err => console.log(err));
};

module.exports = {
    createUser,
    validateUser
};
