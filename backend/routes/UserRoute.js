import express from "express";    ///importo express
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/Users.js";   //importo el controlador que nesecito en esta ruta
import { verifyUser,adminOnly } from "../middleware/AuthUser.js"; //esta importacion hace que se necesite verificar y define las funciones permitidas de cada rol

const router = express.Router();        //constante para las ruta en express

router.get('/users', verifyUser, adminOnly,  getUsers);
router.get('/users/:id', verifyUser, adminOnly, getUserById);
router.post('/users', verifyUser, adminOnly,createUser);
router.patch('/users/:id', verifyUser, adminOnly, updateUser);
router.delete('/users/:id', verifyUser, adminOnly, deleteUser);

export default router;                  //importamos diretamente las ruta