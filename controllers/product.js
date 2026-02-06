import Product from "../models/Product.js";

async function createProduct(req, res, next) {
    const { name, price, quantity, categoryID } = req.body;

    const product = await Product.create({
        name,
        price,
        quantity,
        createdBy: req.user.userID,
        categoryID
    });

    res.status(201).json(product);
}

async function getProducts(req, res, next) {
    const products = await Product.find({
        createdBy: req.user.userID
    }).populate("categoryID", "name");

    res.json(products);
}

async function getProduct(req, res, next) {
    const product = await Product.findOne({
        _id: req.params.id,
        createdBy: req.user.userID
    }).populate("categoryID", "name");

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
}

async function updateProduct(req, res, next) {
    const product = await Product.findOneAndUpdate(
        { _id: req.params.id, createdBy: req.user.userID },
        req.body,
        { new: true, runValidators: true }
    );

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
}

async function deleteProduct(req, res, next) {
    const product = await Product.findOneAndDelete({
        _id: req.params.id,
        createdBy: req.user.userID
    });

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted" });
}

export {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}