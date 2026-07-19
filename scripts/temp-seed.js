require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("../models/Admin");

const seed = async () => {

    await mongoose.connect(process.env.MONGO_URI);

    await Admin.deleteOne({ username: "admin" });

    await Admin.create({
        username: "admin",
        password: "admin123"
    });

    console.log('Admin "admin" reset. Log in and change the password immediately.');

    process.exit(0);

};

seed().catch((error) => {
    console.error("Seed Error:", error);
    process.exit(1);
});