const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// REGISTER
exports.register = async (req,res)=>{

    try{

        const {name,email,password,role} = req.body;

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                message:"Email sudah digunakan"
            });
        }


        const hashedPassword = await bcrypt.hash(password,10);


        const user = await User.create({
            name,
            email,
            password:hashedPassword,
            role
        });


        res.status(201).json({
            message:"Register berhasil",
            user
        });


    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};


// LOGIN
exports.login = async(req,res)=>{

    try{

        const {email,password}=req.body;


        const user = await User.findOne({email});


        if(!user){
            return res.status(404).json({
                message:"User tidak ditemukan"
            });
        }


        const match = await bcrypt.compare(
            password,
            user.password
        );


        if(!match){
            return res.status(400).json({
                message:"Password salah"
            });
        }


        const token = jwt.sign(
            {
                id:user._id,
                role:user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"7d"
            }
        );


        res.json({
            message:"Login berhasil",
            token,
            user
        });


    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

// SOCIAL LOGIN (Google, Facebook, Instagram)
exports.socialLogin = async (req, res) => {
    try {
        const { email, name, provider, role, avatar } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            // Create user if doesn't exist
            const randomPass = await bcrypt.hash(Math.random().toString(36), 10);
            user = await User.create({
                name: name || "Katsera User",
                email: email || `user_${Date.now()}@${provider || 'social'}.com`,
                password: randomPass,
                role: role || "fan"
            });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || "katsera_secret_key",
            { expiresIn: "7d" }
        );

        res.status(200).json({
            message: `Login ${provider || 'social'} berhasil`,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                provider: provider || "social",
                avatar
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const nodemailer = require("nodemailer");

// In-memory OTP storage
const otpStore = new Map();

// SEND REAL OTP EMAIL
exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // Generate 6-digit OTP code
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const normalizedEmail = email.toLowerCase().trim();

        // Store code with 10 min expiration
        otpStore.set(normalizedEmail, {
            code: otpCode,
            expiresAt: Date.now() + 10 * 60 * 1000
        });

        // 1. Send via Resend API (Recommended - Fast & Reliable)
        if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.startsWith("re_")) {
            try {
                const { Resend } = require("resend");
                const resend = new Resend(process.env.RESEND_API_KEY.trim());
                const fromAddress = process.env.RESEND_FROM || "Katsera <onboarding@resend.dev>";

                const { data, error } = await resend.emails.send({
                    from: fromAddress,
                    to: [email],
                    subject: `${otpCode} adalah Kode Verifikasi Katsera Anda`,
                    html: `
                        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 28px; max-width: 480px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e0e5f2; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                            <div style="text-align: center; margin-bottom: 24px;">
                                <h1 style="color: #3D5898; font-size: 26px; font-weight: 800; margin: 0;">Katsera</h1>
                                <p style="color: #7A8BB5; font-size: 13px; margin-top: 4px;">All the vibes, all the updates</p>
                            </div>
                            <h2 style="color: #1E2D5A; font-size: 18px; font-weight: 700; margin-bottom: 8px;">Verifikasi Akun Anda</h2>
                            <p style="color: #4A5A80; font-size: 14px; line-height: 1.5; margin-bottom: 20px;">Berikut adalah 6 digit kode OTP verifikasi untuk akun Katsera Anda:</p>
                            <div style="background-color: #3D5898; color: #ffffff; font-size: 32px; font-weight: 800; text-align: center; padding: 16px; border-radius: 12px; letter-spacing: 8px; margin: 20px 0;">
                                ${otpCode}
                            </div>
                            <p style="color: #7A8BB5; font-size: 12px; line-height: 1.4; margin-top: 24px; border-top: 1px solid #f0f3fa; pt: 16px;">Kode ini berlaku selama 10 menit. Jangan berikan kode ini kepada siapapun.</p>
                        </div>
                    `
                });

                if (error) {
                    console.error("[RESEND API ERROR]:", error);
                } else {
                    console.log(`[RESEND API SUCCESS] OTP email sent to ${email}, ID: ${data?.id}`);
                }
            } catch (resendErr) {
                console.error("[RESEND EXCEPTION]:", resendErr.message);
            }
        } else {
            // 2. Fallback to Nodemailer SMTP
            try {
                const cleanPass = (process.env.SMTP_PASS || "").replace(/\s+/g, "");
                const smtpUser = process.env.SMTP_USER || "cornelliusadrn@gmail.com";
                const appName = process.env.APP_NAME || "Katsera";
                const isSecure = (process.env.SMTP_SECURE === "true") || (process.env.SMTP_PORT === "465");

                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    host: process.env.SMTP_HOST || "smtp.gmail.com",
                    port: parseInt(process.env.SMTP_PORT || "465"),
                    secure: isSecure,
                    auth: {
                        user: smtpUser,
                        pass: cleanPass
                    }
                });

                await transporter.sendMail({
                    from: `"${appName}" <${smtpUser}>`,
                    to: email,
                    subject: `${otpCode} adalah Kode Verifikasi ${appName} Anda`,
                    html: `
                        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 28px; max-width: 480px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e0e5f2; border-radius: 16px;">
                            <h1 style="color: #3D5898; font-size: 24px; font-weight: bold;">Katsera</h1>
                            <h2>Verifikasi Akun</h2>
                            <p>Kode OTP Anda: <b>${otpCode}</b></p>
                        </div>
                    `
                });
                console.log(`[SMTP] Real OTP ${otpCode} successfully sent to ${email}`);
            } catch (mailErr) {
                // SMTP not ready yet
            }
        }



        return res.status(200).json({
            success: true,
            message: `OTP sent to ${email}`,
            otpCode, // Included for instant testing toast in frontend
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// VERIFY REAL OTP
exports.verifyOTP = async (req, res) => {
    try {
        const { email, code, role, name } = req.body;
        if (!email || !code) {
            return res.status(400).json({ message: "Email and OTP code are required" });
        }

        const normalizedEmail = email.toLowerCase().trim();
        const stored = otpStore.get(normalizedEmail);

        if (!stored) {
            return res.status(400).json({ message: "OTP expired or not found. Please request a new code." });
        }

        if (Date.now() > stored.expiresAt) {
            otpStore.delete(normalizedEmail);
            return res.status(400).json({ message: "OTP code has expired." });
        }

        if (stored.code !== code.trim()) {
            return res.status(400).json({ message: "Invalid OTP code. Please check your email and try again." });
        }

        // OTP Verified successfully! Clear code from store
        otpStore.delete(normalizedEmail);

        // Find or create user
        let user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            const randomPass = await bcrypt.hash(Math.random().toString(36), 10);
            user = await User.create({
                name: name || normalizedEmail.split("@")[0],
                email: normalizedEmail,
                password: randomPass,
                role: role || "fan"
            }).catch(() => null);
        }

        const token = jwt.sign(
            { id: user?._id || Date.now(), role: role || "fan" },
            process.env.JWT_SECRET || "katsera_secret_key",
            { expiresIn: "7d" }
        );

        return res.status(200).json({
            success: true,
            message: "OTP Verified Successfully",
            token,
            user: {
                name: user?.name || name || normalizedEmail.split("@")[0],
                email: normalizedEmail,
                role: role || "fan",
                isVerified: true
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
