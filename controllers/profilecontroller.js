const Profile = require('../models/Profile');

module.exports.viewProfile = async (req, res) => {
    const { email } = req.body;
    const user = await Profile.findOne({
        email,
    });
    res.send(user);
}

module.exports.updateProfile = async (req, res) => {
    const { fName, lName, city, state, country } = req.body;
    const user = await Profile.findOneAndUpdate(
        {email:email},{firstName:fName, lastName: lName, city: city, state: state, country: country}
    );
    res.send(user);
}