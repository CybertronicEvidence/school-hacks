const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        confirmpassword: {
            type: String,
            required: true
        }
    }, { timestamps: true }
)


class UserModel {
    constructor() {
        // 
    }
}

const UserModelSchema = mongoose.model('User', userSchema);

module.exports = {
    UserModelSchema,
    UserModel
}