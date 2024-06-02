const mongoose = require("mongoose");
const UserModel = require("./UserModel");

const RecruiterSchema = new mongoose.Schema(
    {
        company_name: String,
        job_listings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
    }
);

const RecruiterModel = UserModel.discriminator("Recruiter", RecruiterSchema);
module.exports = RecruiterModel;
