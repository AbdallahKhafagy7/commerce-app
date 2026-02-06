import Cart from "../models/Cart.js";
import CartItem from "../models/CartItem.js";
import Product from "../models/Product.js";

async function createCart(req, res, next) {
    const userID = req.user.userID;

    let cart = await Cart.findOne({userID});
    if (cart) {
        return res.status(200).json(cart);
    }

    cart = await Cart.create({userID});

    res.status(201).json(cart);
}

async function deleteCart(req, res, next) {
    const userID = req.user.userID;

    const cart = await Cart.findOne({userID});
    if (!cart) {
        return res.status(404).json({ message: "No cart" });
    }

    await CartItem.deleteMany({ cartID: cart._id });
    await Cart.findByIdAndDelete(cart._id);

    res.status(200).json({ message: "Cart deleted" });
}

async function getCartItems(req, res, next) {
    const { cartID } = req.params;
    const { userID } = req.user;

    const cart = await Cart.findOne({ _id: cartID, userID });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const items = await CartItem.find({ cartID }).populate("productID", "name price");

    res.status(200).json(items);
}

async function createCartItem(req, res, next) {
    const { cartID } = req.params;
    const { userID } = req.user;
    const { productID, quantity } = req.body;

    const cart = await Cart.findOne({ _id: cartID, userID });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const product = await Product.findById(productID);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cartItem = await CartItem.findOne({ cartID, productID });

    if (cartItem) {
        cartItem.quantity += quantity;
        await cartItem.save();
    } else {
        cartItem = await CartItem.create({
            cartID,
            productID,
            quantity,
        });
    }

    res.status(201).json(cartItem);
}

export {
    createCart,
    deleteCart,
    getCartItems,
    createCartItem
}