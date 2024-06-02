const { check } = require("express-validator");
const { JOB_TYPE, JOB_STATUS } = require("../Utils/JobConstants");

exports.checkJobInput = [
    check("company").trim().notEmpty().withMessage("Job must have a Company"),
    check("position").trim().notEmpty().withMessage("Job must have a Position"),
    check("jobLocation")
        .trim()
        .notEmpty()
        .withMessage("Job location is required"),
    check("jobStatus")
        .isIn(Object.values(JOB_STATUS))
        .withMessage("Invalid job status"),
    check("jobType")
        .isIn(Object.values(JOB_TYPE))
        .withMessage("Invalid job type"),
    check("jobVacancy")
        .trim()
        .notEmpty()
        .withMessage("Job Vacancy is required"),
    check("jobSalary").trim().notEmpty().withMessage("Job Salary is required"),
    check("jobDeadline")
        .trim()
        .notEmpty()
        .withMessage("Job Deadline is required"),
    check("jobDescription")
        .trim()
        .notEmpty()
        .withMessage("Job Description is required"),
    check("jobSkills").isArray({ min: 1 }).withMessage("Job Skills are required"),
    check("jobFacilities")
        .isArray({ min: 1 })
        .withMessage("Job Facilities are required"),
    check("jobContact")
        .trim()
        .notEmpty()
        .withMessage("Job contact is required"),
];
