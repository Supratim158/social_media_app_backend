const User = require("../models/user");
const jwt = require('jsonwebtoken');

//Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,{expiresIn:'30d'});
}

//Register a new user
exports.registerUser = async (req, res) => {
    const {username, email, password} = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({message:"User Already Exists"});
        }
        await User.create({ username, email, password });
        res.status(201).json({
            message: 'Registration Successfull, Please login to your account'
        })
    } catch (error) {
        res.status(500).json( {message:error.message} );
    }
}

//login a user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne( {email} );
        if (user && (await user.matchPassword(password))) {
            res.status(200).json({
                _id:user._id,
                username:user.username,
                email:user.email,
                token:generateToken(user._id),
            })
        }
        else {
            res.status(401).json( {message:"Invalid password or email"} );
        }
        
    } catch (error) {
        res.status(500).json( {message:error.message} );
    }
}

