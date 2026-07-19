const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    }

}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: false
    }
});

// ==========================================================
// HASH PASSWORD BEFORE SAVING
// Only re-hashes if the password field was actually changed,
// so updating the username alone won't double-hash it.
// ==========================================================
adminSchema.pre("save", async function () {

    if (!this.isModified("password")) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

});

// ==========================================================
// COMPARE PLAINTEXT PASSWORD AGAINST STORED HASH
// ==========================================================
adminSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("Admin", adminSchema);
