import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role="user" } = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const userExists = await User.findOne({
            $or:[{name:name},{email:email}]
        })
        if(userExists){return res.status(400).json({message:"User already exists"});}

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashedPassword ,role:role});
        const userData = user.toObject();
        delete userData.password;

        const token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET)
        res.cookie("token",token);

        return res.status(201).json({ message: "user created successfully", userData });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const userData = user.toObject();
        delete userData.password;

        const token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET);
        res.cookie("token",token);

        return res.status(200).json({ message: "Login successful", userData });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export { registerUser, loginUser };