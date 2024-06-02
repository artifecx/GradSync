const { check } = require("express-validator");
const UserModel = require("../Model/UserModel");
const createHttpError = require("http-errors");

exports.checkRegisterInput = [
    check("username").trim().notEmpty().withMessage("Username is required"),
    check("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email"),
    check("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password is too short (min 8)"),
    check("user_type")
        .isIn([0, 1, 2])
        .withMessage("Invalid user type"),
];

exports.checkLoginInput = [
    check("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email"),
    check("password").trim().notEmpty().withMessage("Password is required"),
];

exports.checkUserUpdateInput = [
    check("username").trim(),
    check("email").trim(),
    check("location").trim(),
    check("gender").trim(),
    check("user_type").isIn([0, 1, 2]).withMessage("Invalid user type"),
];
