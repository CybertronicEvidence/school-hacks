const { UserModelSchema: User } = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken')
const { ResponseHandler } = require('../utils');


const secret = process.env.SECRET || 'onetinysecret';

// REGISTER

const register = async (req, res) => {

    const { firstname, lastname, email, password: rawPassword, confirmpassword: rawConfirm } = req.body;

    // let pass = /^[A-Za-z]\w{7,14}$/
    if (req.body.password.trim() == '') {
        return ResponseHandler(res, data = null, error = 'Password required', status = 400)
    }

    if (req.body.password !== req.body.confirmpassword) {
        return ResponseHandler(res, data = null, error = 'Passwords do not match', status = 400)
    }

    // Check validation

    // Encrypt password

    const password = CryptoJS.AES.encrypt(rawPassword, secret);
    const confirmpassword = CryptoJS.AES.encrypt(rawConfirm, secret);

    // if (decrypt !== confirmpassword) {
    //     ResponseHandler(res, data = null, error = 'Passwords do not match', status = 400)
    // }

    const newUser = new User({
        firstname,
        lastname,
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
    // let user;
    // const unAuthMessage = "Invalid email/password";
    // const { email: IncomingEmail, password: IncomingPassword } = req.body;

    // try {
    //     user = await User.findOne({ email: IncomingEmail })
    // } catch (err) {
    //     return ResponseHandler(res, data = null, error = "Could not authenticated user", status = 400);
    // }


    // if (!Boolean(user)) return ResponseHandler(res, data = null, error = unAuthMessage, status = 400);

    // const { password: hashedPassword } = user;


    // // Decrypt password and compare.
    // const unHashedPassword = CryptoJS.AES.decrypt(hashedPassword, secret);
    // const decryptedPassword = unHashedPassword.toString(CryptoJS.enc.Utf8);

    // if (!Object.is(IncomingPassword, decryptedPassword)) {
    //     return ResponseHandler(res, data = null, error = unAuthMessage);
    // }

    try {
        const user = await User.findOne({ email: req.body.email })
        !user && ResponseHandler(res, data = null, error = 'Wrong Credentials!', status = 401)

        const hashedPassword = CryptoJS.AES.decrypt(user.password, secret)
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)

        OriginalPassword !== req.body.password && ResponseHandler(res, data = null, error = 'Wrong Credentials', status = 400)

        const payload = {
            id: user._id
        }

        const token = jwt.sign(
            payload,
            process.env.JWT_SEC,
            { expiresIn: '3h' })

        const { password, confirmpassword, __v, ...others } = user._doc

        return ResponseHandler(res, data = { ...others, token });

    } catch (err) {
        ResponseHandler(res, data = null, error = err, status = 500)
    }


}

module.exports = { register, login }