import express from "express";    ///importo express
import {Login, logOut, Me} from "../controllers/Auth.js";

const router = express.Router();        //constante para las ruta en express

router.get('/me', Me);
router.post('/login', Login);
router.delete('/logout', logOut);

export default router;                  //importamos diretamente las ruta