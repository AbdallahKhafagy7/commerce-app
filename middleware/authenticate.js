import jwt from "jsonwebtoken";

async function authenticate(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        const err = new Error("No token provided!");
        err.status = 401;
        return next(err);
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        return next();
    } catch (err) {
        const e = new Error("Invalid or expired token!");
        e.status = 401;
        return next(e);
    }
}

export default authenticate;