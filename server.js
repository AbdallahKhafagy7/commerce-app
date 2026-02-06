import express from "express";
import connectDB from "./connectDB/connect.js";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./utils/globalErrorHandler.js";
import authenticate from "./middleware/authenticate.js";
import logger from "./utils/logger.js"
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import productRouter from "./routes/product.js";
import categoryRouter from "./routes/category.js";
import cartRouter from "./routes/cart.js";
import cartItemRouter from "./routes/cartItem.js";

const PORT = process.env.PORT || 5050;
const app = express();

// CORS configuration
import cors from "cors";
app.use(cors({
  origin: "http://localhost:5500", // frontend origin
  credentials: true,               // allow cookies
}));

// Parser
app.use(cookieParser());
app.use(express.json());

// Logger
app.use((req, res, next) => {
    logger.info("Request:", { method: req.method, url: req.originalUrl, user: req.user?.userID });
    next();
});

// Routing
app.use("/api/auth/", authRouter);
app.use("/api/users/", authenticate, userRouter);
app.use("/api/products/", authenticate, productRouter);
app.use("/api/categories/", authenticate, categoryRouter);
app.use("/api/carts/", authenticate, cartRouter);
app.use("/api/cartItems/", authenticate, cartItemRouter);

// Error Handler
app.use(globalErrorHandler);

async function start() {
    try {
        await connectDB();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (error) {
        console.log("Couldn't start the server!");
    }
}

start();