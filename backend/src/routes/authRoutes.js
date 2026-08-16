const express = require("express");

const router = express.Router();

const {
    register,
    login,
    socialLogin,
    sendOTP,
    verifyOTP
} = require("../controllers/authController");


router.post("/register", register);

router.post("/login", login);

router.post("/social-login", socialLogin);

router.post("/send-otp", sendOTP);

router.post("/verify-otp", verifyOTP);


module.exports = router;
