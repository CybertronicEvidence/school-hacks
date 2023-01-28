const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
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