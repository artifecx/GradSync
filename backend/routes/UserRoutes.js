const express = require('express')
const { register, signUpRecruiter, login, isLogin, me, changePassword, updateProfile, deleteAccount, calculateMatchPercentage } = require('../controllers/UserControllers');
const { isAuthenticated } = require('../middlewares/auth');
const { registerValidator, validateHandler, loginValidator, changePasswordValidator, updateProfileValidator, deleteAccountValidator, recruiterValidator } = require('../middlewares/validators');
const router = express.Router()

router.post("/register", registerValidator(), validateHandler, register);
router.post('/signup/recruiter', recruiterValidator(), validateHandler, signUpRecruiter);
router.post("/login", loginValidator(), validateHandler, login);
router.get("/isLogin", isAuthenticated, isLogin);
router.get("/me", isAuthenticated, me);
router.put("/changePassword", isAuthenticated, changePasswordValidator(), validateHandler, changePassword);
router.put("/updateProfile", isAuthenticated, updateProfileValidator(), validateHandler, updateProfile);
router.put("/deleteAccount", isAuthenticated, deleteAccountValidator(), validateHandler, deleteAccount);
router.post('/calculateMatch', calculateMatchPercentage);

module.exports = router;