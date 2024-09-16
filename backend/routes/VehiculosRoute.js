import express from "express";
import {
    getVehiculos,
    getVehiculoById,
    createVehiculo,
    ReIngreso,
    updateVehiculo,
    deleteVehiculo,
    salidaVehiculo
} from "../controllers/VehiculoController.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js"; // Importa el middleware


const router = express.Router();

router.get('/vehiculos',  getVehiculos);
router.get('/vehiculos/:id', getVehiculoById);
router.post('/vehiculos',  createVehiculo);
router.patch('/vehiculos/:id/reingresarVehiculo', ReIngreso);
router.patch('/vehiculos/:id', verifyUser, adminOnly, updateVehiculo);
router.delete('/vehiculos/:id', verifyUser, adminOnly, deleteVehiculo);
router.get('/vehiculos/:id/salida',  salidaVehiculo);

export default router;
