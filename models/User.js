import mongoose, { model, Schema, models } from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, require: true, unique: true },
    username: { type: String, require: true },
    password: { type: String, require: true },
    role: { type: String, enum: ["admin", "user"], default: "user" }

})

// Hash the password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {

        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        throw error;
    }
})

// Compare password method
userSchema.methods.comparePassword = async function (password) {
    try {

        return await bcrypt.compare(password, this.password)
    } catch (error) {
        throw error;
    }
}

export default mongoose.models.User || mongoose.model('User', userSchema);
