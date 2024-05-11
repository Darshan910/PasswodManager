const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const User = require("../models/User");

dotenv.config();

exports.auth = async (req, res, next) => {
    try {
        console.log("BEFORE ToKEN EXTRACTION");
        //extract token
        const token =
            req.cookies.token ||
            req.body.token ||
            req.header("Authorization").replace("Bearer ", "") 
            || null;
        console.log("AFTER TOKENNN EXTRACTION");

        //if token missing, then return response
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "TOken is missing",
            });
        }

        //verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        } catch (err) {
            //verification - issue
            return res.status(401).json({
                success: false,
                message: "token is invalid",
            });
        }
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: "Something went wrong while validating the token",
        });
    }
};

// exports.auth = async (req, res, next) => {
//     try {
//         console.log("BEFORE ToKEN EXTRACTION");
//         const token =
//             req.cookies.token ||
//             req.body.token ||
//             req.header("Authorization").replace("Bearer ", "");
//         console.log("AFTER TOKENNN EXTRACTION");

//         if (!token) {
//             return res.status(401).json({
//                 success: false,
//                 message: 'Unauthorized: No token provided'
//             });
//         }

//         try {
//             const decode = jwt.verify(token, process.env.JWT_SECRET);
//             console.log(decode);
//             req.user = decode;
//         } catch (err) {
//             //verification - issue
//             return res.status(401).json({
//                 success: false,
//                 message: "token is invalid",
//             });
//         }
//         next();
//     } catch (error) {
//         return res.status(401).json({
//             success: false,
//             message: "Something went wrong while validating the token",
//         });
//     }
// };