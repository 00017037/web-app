import express from "express";
import { getUsers, deleteUser,addUserForm,addUser,editUserForm,getUserById,updateUser } from "../controllers/user-controller.js";

const router = express.Router();


router.get('/add-form',addUserForm)

router.post('/edit-form/:id',getUserById,editUserForm)

router.delete("/:id", deleteUser);

router.put('/:id',updateUser)

router.get("/", getUsers);

router.post('/',addUser)



export default router;
