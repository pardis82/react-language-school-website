import express from "express";
import {
    getAllClasses,
    getClassesById,
    getMyClass,
    createClass,
    updateClass,
    deleteClass,
} from "../controllers/classesController.js";


const router = express.Router();
router.get("/", getAllClasses);
router.get("/:id", getClassesById);
router.get("/myclass/:userId", getMyClass)
router.post("/",createClass);
router.put ("/:id",  updateClass);
router.delete("/:id", deleteClass);

export default router;