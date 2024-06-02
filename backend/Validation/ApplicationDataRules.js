const { check } = require("express-validator");
const { STATUS } = require("../Utils/ApplicationConstants");
const mongoose = require("mongoose");

exports.checkInput = [
    check("applicant_id")
        .trim()
        .notEmpty()
        .withMessage("Application must have an Applicant ID")
        .custom(async (applicant_id, { req }) => {
            if (!mongoose.Types.ObjectId.isValid(applicant_id)) {
                throw new Error("Invalid Applicant ID");
            }
        }),
    check("recruiter_id")
        .trim()
        .notEmpty()
        .withMessage("Application must have a Recruiter ID")
        .custom(async (recruiter_id, { req }) => {
            if (!mongoose.Types.ObjectId.isValid(recruiter_id)) {
                throw new Error("Invalid Recruiter ID");
            }
        }),
    check("job_id")
        .trim()
        .notEmpty()
        .withMessage("Application must have a Job ID")
        .custom(async (job_id, { req }) => {
            if (!mongoose.Types.ObjectId.isValid(job_id)) {
                throw new Error("Invalid Job ID");
            }
        }),
    check("status")
        .isIn(Object.values(STATUS))
        .withMessage("Invalid job status"),
    check("application_date")
        .notEmpty()
        .withMessage("Application Date is required")
        .isDate()
        .withMessage("Invalid date format. Please provide a valid date."),
];
