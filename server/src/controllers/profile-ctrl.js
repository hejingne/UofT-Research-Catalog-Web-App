const Profile = require("../models/profile-model");

createProfile = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: "You must provide a movie"
        });
    }

    const profile = new Profile(body);

    if (!profile) {
        return res.status(400).json({ success: false, error: err });
    }

    profile
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: profile._id,
                message: "profile created!"
            });
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: "profile not created!"
            });
        });
};

getProfile = async (req, res) => {
    await Profile.find({}, (err, collection) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!collection.length) {
            return res
                .status(404)
                .json({ success: false, error: `profile not found` });
        }
        return res.status(200).json({ success: true, data: collection });
    }).catch(err => console.log(err));
};

module.exports = {
    createProfile,
    getProfile
};
