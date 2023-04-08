const { encrypt, compare } = require('../services/crypto');
const { generateOTP } = require('../services/OTP');
const User = require('../models/User');
const Profile = require('../models/Profile');

module.exports.signInUser = async (req, res) => {
  const { email, password } = req.body;
  const isExisting = await findUserByEmail(email);
  if (isExisting) {
    try {
        const otpGenerated = generateOTP();
        console.log("OTP for signIn is : " + otpGenerated);
        const user = await User.findOneAndUpdate(
            {email:email},{otp:otpGenerated}
        );
        return res.status(400).send({
            message: `User already exists. Please sign in using OTP sent to ${email}`,
          });
      } catch (error) {
        return [false, 'Unable to sign up, Please try again later', error];
      }
  }

  const newUser = await createUser(email, password);
  if (!newUser[0]) {
    return res.status(400).send({
      message: 'Unable to create new user',
    });
  }
  res.send(newUser);
};

const findUserByEmail = async (email) => {
  const user = await User.findOne({
    email,
  });
  if (!user) {
    return false;
  }
  return user;
};

const createUser = async (email, password) => {
  const hashedPassword = await encrypt(password);
  const otpGenerated = `${email}1234`; //initial OTP mapped to user
  const newUser = await User.create({
    email,
    password: hashedPassword,
    otp: otpGenerated,
  });
  const newUserProfile = await Profile.create({
    email
  })
  if (!newUser) {
    return [false, 'Unable to sign you up'];
  }
  return [true, newUser];
};
