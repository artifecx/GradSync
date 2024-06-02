const express = require("express");
const AdminRouter = express.Router(); // create a router

const {
    userAuthorizationHandler,
} = require("./../Middleware/UserAuthorizationMiddleware");
const {
    authenticateUser,
} = require("./../Middleware/UserAuthenticationMiddleware");

// Controllers
const AdminController = require("../Controller/AdminController");

// Authentication routes
AdminRouter.get(
    "/info",
    userAuthorizationHandler(0),
    AdminController.getAllInfo
);
AdminRouter.get(
    "/stats",
    userAuthorizationHandler(0),
    AdminController.monthlyInfo
);
AdminRouter.patch(
    "/update-role",
    userAuthorizationHandler(0),
    AdminController.updateUserRole
);
module.exports = AdminRouter;
