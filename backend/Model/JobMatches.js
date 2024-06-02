const mongoose = require("mongoose");

const job_matchesSchema = new mongoose.Schema(
    {
        applicant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Applicant", required: true },
        matched_jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
    }
);

const job_matchesModel = mongoose.model("job_matches", job_matchesSchema);
module.exports = job_matchesModel;
