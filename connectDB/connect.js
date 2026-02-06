import mongoose from "mongoose";

async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGO_URL, {dbName: "CommerceAppDB",});
        console.log("Database connected successfully!");
    } catch (err) {
        console.log("Couldn't Connect to database! Error", err);
        process.exit(1);
    }
}

export default connectDB;