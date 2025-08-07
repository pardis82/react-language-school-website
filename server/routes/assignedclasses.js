import express from "express";

import {
    getAllAssignedClasses,
} from "../controllers/assignedclassesController.js";


const router = express.Router();


router.get("/", getAllAssignedClasses);


export default router;