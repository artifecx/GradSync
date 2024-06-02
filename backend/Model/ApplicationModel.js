const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema(
    {
        applicant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Applicant", required: true },
        recruiter_id: { type: mongoose.Schema.Types.ObjectId, ref: "Recruiter", required: true },
        job_id: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
        application_date: { type: Date, default: Date.now },
        status: { type: Number, enum: [0, 1, 2], default: 0 }, // 0: Pending, 1: Accepted, 2: Rejected
    },
    { timestamps: true }
);

const ApplicationModel = mongoose.model("Application", ApplicationSchema);
module.exports = ApplicationModel;
