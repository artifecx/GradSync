const express = require('express');
const router = express.Router();
const { register, signupRecruiter, login, isLogin, me, changePassword, updateProfile, deleteAccount } = require('../controllers/UserControllers');
const { isAuthenticated } = require('../middlewares/auth');
const { registerValidator, validateHandler, loginValidator, changePasswordValidator, updateProfileValidator, deleteAccountValidator, recruiterValidator } = require('../middlewares/validators');

router.post("/register", registerValidator(), validateHandler, register);
router.post('/signup/recruiter', recruiterValidator(), validateHandler, signupRecruiter);
router.post("/login", loginValidator(), validateHandler, login);
router.get("/isLogin", isAuthenticated, isLogin);
router.get("/me", isAuthenticated, me);
router.put("/changePassword", isAuthenticated, changePasswordValidator(), validateHandler, changePassword);
router.put("/updateProfile", isAuthenticated, updateProfileValidator(), validateHandler, updateProfile);
router.put("/deleteAccount", isAuthenticated, deleteAccountValidator(), validateHandler, deleteAccount);

module.exports = router;
