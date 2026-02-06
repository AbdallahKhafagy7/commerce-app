import User from "../models/User.js";

async function getUser(req, res, next) {
    const usr = await User.findById(req.user.userID);
    if (!usr) {
        return res.status(400).send("Invalid user!");
    }

    res.status(200).send({
        username: usr.username,
        email: usr.email,
        id: usr._id
    });
}

async function updateUser(req, res, next) {
    const usr = await User.findById(req.user.userID);
    if (!usr) {
        return res.status(400).send("Invalid user!");
    }

    if (req.body.username) usr.username = req.body.username;
    if (req.body.email) usr.email = req.body.email;
    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        usr.password = hashedPassword;
    }

    await usr.save();
    res.status(200).send({
        id: usr._id,
        username: usr.username,
        email: usr.email,
    });
}

export {
    getUser,
    updateUser
}