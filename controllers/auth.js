const { UserModelSchema: User } = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken')
const { ResponseHandler } = require('../utils');


const secret = process.env.SECRET || 'onetinysecret';

// REGISTER

const register = async (req, res) => {

    const { firstName, lastName, email, password: rawPassword, confirmpassword } = req.body;

    // Check validation

    // Encrypt password
    if (password === confirmpassword) {
        ResponseHandler(res, data = null, error = 'Passwords do not match', status = 400)
    }

    const password = CryptoJS.AES.encrypt(rawPassword, secret);

    const newUser = new User({
        firstName,
        lastName,
        email,
        password,
        confirmpassword
    });

    try {
        const savedUser = await newUser.save()
        return ResponseHandler(res, data = savedUser, error = null, status = 201);
    } catch (err) {
        return ResponseHandler(res, data = null, error = err.message, status = 400);
    }
}

const login = async (req, res) => {
    let user;
    const unAuthMessage = "Invalid email/password";
    const { email: IncomingEmail, password: IncomingPassword } = req.body;

    try {
        user = await User.findOne({ email: IncomingEmail })
    } catch (err) {
        return ResponseHandler(res, data = null, error = "Could not authenticated user", status = 400);
    }


    if (!Boolean(user)) return ResponseHandler(res, data = null, error = unAuthMessage, status = 400);

    const { password: hashedPassword } = user;


    // Decrypt password and compare.
    const unHashedPassword = CryptoJS.AES.decrypt(hashedPassword, secret);
    const decryptedPassword = unHashedPassword.toString(CryptoJS.enc.Utf8);

    if (!Object.is(IncomingPassword, decryptedPassword)) {
        return ResponseHandler(res, data = null, error = unAuthMessage);
    }

    const payload = {
        id: user._id
    }

    const token = jwt.sign(
        payload,
        process.env.JWT_SEC,
        { expiresIn: '3h' })

    const { password, __v, ...others } = user._doc

    return ResponseHandler(res, data = { ...others, token });
}

module.exports = { register, login }