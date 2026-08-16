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