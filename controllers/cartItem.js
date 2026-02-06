import CartItem from "../models/CartItem.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

async function getCartItem(req, res, next) {
    const {cartItemID} = req.params;
    const {userID} = req.user;

    const item = await CartItem.findById(cartItemID).populate("productID", "name price");
    if (!item) return res.status(404).json({ message: `Cart item not found for id ${cartItemID}!` });

    const cart = await Cart.findOne({ _id: item.cartID, userID });
    if (!cart) return res.status(403).json({ message: "Forbidden" });

    res.status(200).json(item);
}

async function updateCartItem(req, res, next) {
    const {cartItemID} = req.params;
    const {userID} = req.user;
    const { quantity } = req.body;

    const item = await CartItem.findById(cartItemID);
    if (!item) return res.status(404).json({ message: `Cart item not found for id ${cartItemID}!` });

    const cart = await Cart.findOne({ _id: item.cartID, userID });
    if (!cart) return res.status(403).json({ message: "Forbidden" });

    if (quantity !== undefined) {
        if (quantity <= 0) {
            await item.remove();
            return res.json({ message: "Cart item removed" });
        }
        item.quantity = quantity;
    }

    await item.save();
    res.status(200).json(item);
}

async function deleteCartItem(req, res, next) {
    const { cartItemID } = req.params;
    const { userID } = req.user;

    const item = await CartItem.findById(cartItemID);
    if (!item) return res.status(404).json({ message: `Cart item not found for id ${cartItemID}!` });

    const cart = await Cart.findOne({ _id: item.cartID, userID });
    if (!cart) return res.status(403).json({ message: "Forbidden" });

    await CartItem.findByIdAndDelete(cartItemID);

    res.json({ message: "Cart item deleted" });
}

export {
    getCartItem,
    updateCartItem,
    deleteCartItem
}