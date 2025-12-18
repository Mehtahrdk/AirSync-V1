const { User } = require('../models');
const jwt = require('jsonwebtoken');

const SECRET_KEY = "airsync_secret"; // In prod, use process.env.JWT_SECRET

async function signup(req, res) {
    try {
        const user = await User.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({ success: true, message: "User created" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error creating user", error });
    }
}

async function login(req, res) {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        
        if (!user || !(await user.comparePassword(req.body.password))) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
        
        return res.status(200).json({ 
            success: true, 
            message: "Login successful", 
            data: { token, email: user.email } 
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Login failed" });
    }
}

module.exports = { signup, login };