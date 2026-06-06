import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashedPassword });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        const createdUser = await User.findById({_id:user._id})

        return res.status(201).json({ message: "user created successfully", createdUser, token });

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
        const logInUser = await User.findById({_id:user._id})

        const token = jwt.sign({ id: logInUser._id }, process.env.JWT_SECRET);

        return res.status(200).json({ message: "Login successful", logInUser, token });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export { registerUser, loginUser };