const mongoose = require("mongoose")
const userDataSchema = mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Username is required"],
    },
    accountNumber: {
        type: Number,
        required: [true, "Account Number is required"],
        unique: true,
    },
    emailAddress: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
    },
    identityNumber: {
        type: Number,
        required: [true, "Identity Number is required"],
    }
})

userDataSchema.index({ userName: 1, accountNumber: 1 });

const UserData = mongoose.model('UserData', userDataSchema)

module.exports = UserData