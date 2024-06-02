const express = require("express");
const UserRouter = express.Router();

// Controllers
const UserController = require("../Controller/UserController");

const {
    checkRegisterInput,
    checkLoginInput,
    checkUserUpdateInput,
} = require("../Validation/UserDataRules");

const {
    inputValidationMiddleware,
} = require("../Validation/ValidationMiddleware");
const {
    userAuthorizationHandler,
} = require("./../Middleware/UserAuthorizationMiddleware");

// Routes
UserRouter.route("/")
    .get(userAuthorizationHandler(0), UserController.getAllUser) // Only admin (user_type 0) can get all users
    .patch(checkUserUpdateInput, inputValidationMiddleware, UserController.updateUser)
    .delete(userAuthorizationHandler(0), UserController.deleteAllUser);

UserRouter.route("/:id")
    .get(UserController.getSingleUser)
    .delete(userAuthorizationHandler(0), UserController.deleteUser); // Only admin (user_type 0) can delete users

module.exports = UserRouter;
