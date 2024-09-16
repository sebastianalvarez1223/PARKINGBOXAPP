import express from 'express';
import {
    getCategorias,
    getCategoriaById,
    createCategoria,
    updateCategoria,
    deleteCategoria
} from '../controllers/CategoriaController.js';
import { verifyUser } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/categorias',  getCategorias);
router.get('/categorias/:id', getCategoriaById);
router.post('/categorias', verifyUser, createCategoria);
router.patch('/categorias/:id', verifyUser,  updateCategoria);
router.delete('/categorias/:id', verifyUser, deleteCategoria);

export default router;
