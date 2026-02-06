import express from "express";
import {
    createCart,
    deleteCart,
    getCartItems,
    createCartItem
} from "../controllers/cart.js";

const router = express.Router();

router.route("/").post(createCart).delete(deleteCart);
router.route("/:cartID/items").get(getCartItems).post(createCartItem);

export default router;