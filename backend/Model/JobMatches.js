const mongoose = require("mongoose");

const JobMatchesSchema = new mongoose.Schema(
    {
        applicant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Applicant", required: true },
        matched_jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
    }
);

const JobMatchesModel = mongoose.model("JobMatches", JobMatchesSchema);
module.exports = JobMatchesModel;
