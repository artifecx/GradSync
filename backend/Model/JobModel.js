const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
    {
        recruiter_id: { type: mongoose.Schema.Types.ObjectId, ref: "Recruiter", required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        industry: { type: String, required: true },
        requirements: [String],
    },
    { timestamps: true }
);

const JobModel = mongoose.model("Job", JobSchema);
module.exports = JobModel;
