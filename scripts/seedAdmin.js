// ==========================================================
// ONE-OFF SCRIPT: create the first admin account.
// Run locally with: node scripts/seedAdmin.js
// Requires MONGO_URI to be set (via your local .env file).
// Safe to run more than once — it skips creation if an
// admin with this username already exists.
// ==========================================================

require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("../models/Admin");

const USERNAME = "admin";
const PASSWORD = "changeThisPassword123"; // change this, then log in and change it again from the UI

const seed = async () => {

    await mongoose.connect(process.env.MONGO_URI);

    const existing = await Admin.findOne({ username: USERNAME });

    if (existing) {
        console.log(`Admin "${USERNAME}" already exists — skipping.`);
        process.exit(0);
    }

    await Admin.create({
        username: USERNAME,
        password: PASSWORD
    });

    console.log(`Admin "${USERNAME}" created. Log in and change the password immediately.`);

    process.exit(0);

};

seed().catch((error) => {
    console.error("Seed Error:", error);
    process.exit(1);
});
