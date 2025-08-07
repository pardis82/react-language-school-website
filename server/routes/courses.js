import express from "express";
import {
    getAllCourses,
    getCoursesById,
    createCourse,
    updateCourse,
    deleteCourse,
} from "../controllers/coursesController.js";



const router = express.Router();

router.get("/", getAllCourses);
router.get("/:id", getCoursesById);
router.post("/", createCourse);
router.put ("/:id", updateCourse);
router.delete("/:id", deleteCourse);

export default router;