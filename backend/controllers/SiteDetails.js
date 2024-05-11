const User = require('../models/User');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config();

postSite = async (req, res) => {

    try {
        const token =
            req.cookies.token ||
            req.body.token ||
            req.header("Authorization").replace("Bearer ", "") || null;
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decode.id;
            const user = await User.findById(userId);

            const { site, username, sitePassword } = req.body;

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }
            user.siteInformation.push({
                id: new mongoose.Types.ObjectId(),
                site, username, sitePassword
            });
            await user.save();
            return res.status(201).json({
                success: true,
                message: "Site information added successfully"
            });

        } catch (error) {
            console.error("Error retrieving site information:", error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    } catch (err) {
        //verification - issue
        return res.status(401).json({
            success: false,
            message: "token is invalid",
        });
    }
};

updateSite = async (req, res) => {



    try {
        const token =
            req.cookies.token ||
            req.body.token ||
            req.header("Authorization").replace("Bearer ", "") || null;
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decode.id;

            const { id } = req.params;
            const { site, username, sitePassword } = req.body;
            const user = await User.findOneAndUpdate(
                { "siteInformation.id": id },
                {
                    "$set": {
                        "siteInformation.$.site": site,
                        "siteInformation.$.username": username,
                        "siteInformation.$.sitePassword": sitePassword
                    }
                }
            );
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Site information updated successfully"
            });
        } catch (error) {
            console.error("Error retrieving site information:", error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    } catch (err) {
        //verification - issue
        return res.status(401).json({
            success: false,
            message: "token is invalid",
        });
    }
}

getSite = async (req, res) => {
    try {
        const token =
            req.cookies.token ||
            req.body.token ||
            req.header("Authorization").replace("Bearer ", "") || null;
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decode.id;

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }
            console.log("FROM HERE")
            console.log(user)
            console.log("TILL HERE")
            return res.status(200).json(
                user.siteInformation
            );
        } catch (error) {
            console.error("Error retrieving site information:", error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    } catch (err) {
        //verification - issue
        return res.status(401).json({
            success: false,
            message: "token is invalid",
        });
    }
}

deleteSite = async (req, res) => {
    try {
        const token =
            req.cookies.token ||
            req.body.token ||
            req.header("Authorization").replace("Bearer ", "") || null;
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decode.id;
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }
            const { id } = req.params;
            user.siteInformation.pull({ id: id });
            await user.save();
            return res.status(200).json({
                success: true,
                message: "Site information deleted successfully"
            });

        } catch (error) {
            console.error("Error deleting site information:", error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    } catch (err) {
        //verification - issue
        return res.status(401).json({
            success: false,
            message: "token is invalid",
        });
    }
}

module.exports = {
    postSite,
    updateSite,
    getSite,
    deleteSite
};


// // SAVE a password
// app.post('/', async (req, res) => {
//   const password = req.body;
//   const db = client.db(dbName);
//   const collection = db.collection('passwords');
//   const finalResult = await collection.insertOne(password);
//   res.send({ success: true, Result: finalResult });
// })

// exports.updatePasswords = async (req, res) => {
//     try {
//         const { site = "", username = "", sitePassword = "" } = req.body;
//         const id = req.user.id;

//         const userDetails = await User.findById(id);
//         const SiteDetail = await SiteDetails.findById(userDetails.otherDetails)

//         SiteDetail.site = site
//         SiteDetail.username = username
//         SiteDetail.sitePassword = sitePassword

//         await SiteDetail.save();

//         return res.status(200).json({
//             success: true,
//             message: "Profile Updated successfully",
//             profileDetails,
//         });
//     } catch (error) {
//         console.log("Error in Updating")
//         return res.status(500).json({
//             success: false,
//             error: error.message,
//         });
//     }
// }


// exports.deletePassword = async (req, res) => {
//     try {
//         const id = user.id;
//         const
//     } catch (error) {
//         console.log("Error in deleting password")
//         return res.status(500).json({
//             success: false,
//             error: error.message,
//         });
//     }
// }


