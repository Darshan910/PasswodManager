const mongoose = require("mongoose");

exports.connect = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log("DB Connected Successfully"))
        .catch((error) => {
            console.log("DB Connection Failed");
            console.log(error);
            process.exit(1);
        })
}