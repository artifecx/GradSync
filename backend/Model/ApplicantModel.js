const mongoose = require("mongoose");
const UserModel = require("./UserModel");

const ApplicantSchema = new mongoose.Schema(
    {
        first_name: String,
        last_name: String,
        cv: Object,
        job_matches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
        applications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Application" }],
    }
);

const ApplicantModel = UserModel.discriminator("Applicant", ApplicantSchema);
module.exports = ApplicantModel;
