import express from "express";
import { getUsers, deleteUser, } from "../controllers/user-controller.js";

const router = express.Router();

router.post('/edit',)


router.delete("/:id", deleteUser);


router.get("/", getUsers);

export default router;
