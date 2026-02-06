import logger from "../utils/logger.js";

const globalErrorHandler = (err,req,res,next) => {
    logger.error({
        message: err.message,
        stack: err.stack,
        method: req.method,
        url: req.originalUrl,
        user: req.user?.userID || "Guest"
    });
    
    res.status(err.status || 500).json({message: (err.message || "Internal Server Error")});
}

export default globalErrorHandler;