import express from "express";
import {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
} from "../controllers/category.js";

const router = express.Router();


router.route("/").get(getCategories).post(createCategory);
router.route("/:id").get(getCategory).patch(updateCategory).delete(deleteCategory);

export default router;