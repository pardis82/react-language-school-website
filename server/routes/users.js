import express from "express";
import { loginUser } from "../controllers/usersController.js";
import {
    getAllUsers,
    getUsersById,
    createUser,
    updateUser,
    deleteUser,
} from "../controllers/usersController.js";


const router = express.Router();
router.post("/login", loginUser);

router.get("/", getAllUsers);
router.get("/:id", getUsersById);
router.post("/", createUser);
router.put ("/:id", updateUser);
router.delete("/:id", deleteUser);


export default router;