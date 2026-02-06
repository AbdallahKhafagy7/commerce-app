import express from "express";
import {
    getCartItem,
    updateCartItem,
    deleteCartItem
} from "../controllers/cartItem.js";

const router = express.Router();

router.route("/:cartItemID").get(getCartItem).patch(updateCartItem).delete(deleteCartItem);

export default router;