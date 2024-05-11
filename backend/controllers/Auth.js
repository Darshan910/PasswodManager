const User = require('../models/User')
const dotenv = require('dotenv')
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')


dotenv.config();

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate data
        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields must be present",
            });
        }

        // Find user by email
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered, Kindly first sign-up",
            });
        }

        console.log("Retrieved user:", user);
        console.log("Retrieved user password:", user.password);
        console.log("Provided password:", password);

        // Check if both password and user.password are defined
        if (!password || !user.password) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error: Password or hashed password is undefined",
            });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            const payload = {
                email: user.email,
                id: user._id,
            };

            // Generate JWT token
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "24h",
            });

            console.log("payload is: ")
            console.log(payload)
            console.log("payload end: ")

            user.token = token;
            user.password = undefined;

            // Create cookie and send response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };

            return res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "Logged In Successfully",
            });
        } else {
            // If passwords don't match
            return res.status(401).json({
                success: false,
                message: "Incorrect Password",
            });
        }
    } catch (error) {
        // Handle any other errors
        console.error("Login Error:", error);
        return res.status(500).json({
            success: false,
            message: "Login Failed. Please try again",
        });
    }
};

exports.signUp = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword } = req.body;

        // Checking for all the fields are entered by user
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            console.log(firstName, " ", lastName, " ", email, " ", password, " ", confirmPassword, " ");
            return res.status(403).json({
                success: false,
                message: "All are the required fields"
            })
        }

        // Checking password and confirmPassword fields
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and confirm password must match, please try again",
            });
        }

        // Checking if user exists or not
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists, kindly login",
            });
        }

       

        const hashedPassword = await bcrypt.hash(password, 10)

        // Ceating user in database
        const user = await User.create({
            _id: new mongoose.Types.ObjectId(),
            firstName,
            lastName,
            email,
            password: hashedPassword,
            siteInformation: []
        });

        // const populatedUser = await User.findById(user._id);

        return res.status(200).json({
            success: true,
            user: user,
            message: "User created Succesfully.."
        })

    } catch (error) {
        console.log("Error in Sign-up\t", error);
        return res.status(500).json({
            success: false,
            message: "Please try again"
        });
    }
}
