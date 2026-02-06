import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const cookieOptions = {
  httpOnly: true,
  secure: false,    // must be false for local HTTP
  sameSite: "lax",  // change to Lax for dev
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

async function signup(req, res, next) {
    const {username, email, password} = req.body;

    if (!username || !email || !password)
        return res.status(400).send("username, email & password are required!");

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        const err = new Error("User already exists");
        err.status = 400;
        return next(err);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const usr = await User.create({username, email, password: hashedPassword});

    const payload = {
        userID: usr._id,
        username
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, cookieOptions);

    res.status(201).send({ message: "User registered successfully" });
}

async function login(req, res, next) {
    const {email, password} = req.body;
    if (!email || !password)
        return res.status(400).send("email & password are required!");

    const usr = await User.findOne({email});
    if (!usr)
        return res.status(400).send("User not found!");

    const matchPass = await bcrypt.compare(password, usr.password)
    if (!matchPass)
        return res.status(400).send("Invalid email or password!");

    const payload = {
        userID: usr._id,
        username: usr.username
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, cookieOptions);

    res.status(200).send({ message: "Login successful" });
}

async function logout(req, res, next) {
    res.clearCookie("token", cookieOptions);
    res.status(200).send({ message: "Logged out successfully" });
}

export {
    signup,
    login,
    logout
}