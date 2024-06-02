const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const options = { discriminatorKey: 'user_type', timestamps: true };

const UserSchema = new mongoose.Schema(
    {
        username: String,
        email: String,
        password: String,
        profile_picture: String,
        phone_number: String,
        user_type: {
            type: Number,
            enum: [0, 1, 2], // 0 for Admin, 1 for Applicant, 2 for Recruiter
            default: 1,
        },
        location: {
            type: String,
        },
        gender: {
            type: String,
        },
    },
    options
);

// Hashing Password
UserSchema.pre("save", async function (next) {
    const password = this.password;
    const salt = await bcrypt.genSalt(16);
    const hashedPassword = bcrypt.hashSync(password, salt);
    this.password = hashedPassword;
    next();
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
