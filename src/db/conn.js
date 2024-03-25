const mongoose = require("mongoose");

const connectToDatabase =  () => {
    try {
          mongoose.connect("mongodb://127.0.0.1:27017/users", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connection to MongoDB successful");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = { connect: connectToDatabase };
