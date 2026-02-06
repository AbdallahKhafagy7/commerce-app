import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        requried: true
    },
    email: {
        type: String,
        requried: true
    },
    password: {
        type: String,
        requried: true
    },
});

export default mongoose.model("User", userSchema)