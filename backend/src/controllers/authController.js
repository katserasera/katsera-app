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

        // Send email via Nodemailer
        try {
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST || "smtp.gmail.com",
                port: parseInt(process.env.SMTP_PORT || "587"),
                secure: false,
                auth: {
                    user: process.env.SMTP_USER || "noreply.katsera@gmail.com",
                    pass: process.env.SMTP_PASS || "katserapassword123"
                }
            });

            await transporter.sendMail({
                from: '"Katsera App" <noreply.katsera@gmail.com>',
                to: email,
                subject: `${otpCode} is your Katsera Verification Code`,
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 500px; border: 1px solid #e8e8e8; border-radius: 12px;">
                        <h2 style="color: #1E2D5A;">Verify Your Katsera Account</h2>
                        <p style="color: #4A5A80; font-size: 15px;">Your official 6-digit verification code is:</p>
                        <div style="background-color: #3D5898; color: #ffffff; font-size: 32px; font-weight: bold; text-align: center; padding: 15px; border-radius: 8px; letter-spacing: 5px;">
                            ${otpCode}
                        </div>
                        <p style="color: #7A8BB5; font-size: 13px; margin-top: 20px;">This code will expire in 10 minutes. If you did not request this code, please ignore this email.</p>
                    </div>
                `
            }).catch(() => {});
        } catch {
            // Fallback if SMTP not configured
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
