import express from "express";
import {
    getAllTeachers,
    getTeachersById,
    createTeacher,
    updateTeacher,
    deleteTeacher,
} from "../controllers/teachersController.js";


const router = express.Router();

router.get("/", getAllTeachers);
router.get("/:id", getTeachersById);
router.post("/",  createTeacher);
router.put ("/:id",  updateTeacher);
router.delete("/:id", deleteTeacher);

export default router;