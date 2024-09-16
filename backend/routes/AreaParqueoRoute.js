import express from 'express';
import {
    getAreasParqueo,
    getAreaParqueoById,
    postAreaParqueo,
    updateAreaParqueo,
    updateCapacity,
    deleteAreaParqueo
} from '../controllers/AreaParqueoController.js';
import { verifyUser } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/areasParqueo', verifyUser, getAreasParqueo);
router.get('/areasParqueo/:id', getAreaParqueoById);
router.post('/areasParqueo', verifyUser, postAreaParqueo);
router.patch('/areasParqueo/:id', verifyUser, updateAreaParqueo);
router.patch('/areasParqueo/:id', updateCapacity);
router.delete('/areasParqueo/:id', verifyUser, deleteAreaParqueo);

export default router;
