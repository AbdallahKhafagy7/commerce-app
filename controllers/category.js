import Category from "../models/Category.js";

async function createCategory(req, res, next) {
    const { name, description } = req.body;

    const category = await Category.create({
        name,
        description
    });

    res.status(201).json(category);
}

async function getCategories(req, res, next) {
    const categories = await Category.find();
    res.json(categories);
}

async function getCategory(req, res, next) {
    const category = await Category.findById(req.params.id);
    if (!category) {
        return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
}

async function updateCategory(req, res, next) {
    const allowedUpdates = ["name", "description"];
    const updates = {};

    for (const key of allowedUpdates) {
        if (req.body[key] !== undefined) {
            updates[key] = req.body[key];
        }
    }

    const category = await Category.findByIdAndUpdate(
        req.params.id,
        updates,
        { new: true, runValidators: true }
    );

    if (!category) {
        return res.status(404).json({ message: "Category not found" });
    }

    res.json(category);
}

async function deleteCategory(req, res, next) {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
        return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category deleted" });
}

export {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
}