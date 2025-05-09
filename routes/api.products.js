import express from 'express';
import { createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { authenticateToken, authorizeRole } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', authenticateToken, authorizeRole('admin'), createProduct);

router.put('/:id', authenticateToken, authorizeRole('admin'), updateProduct);

router.delete('/:id', authenticateToken, authorizeRole('admin'), deleteProduct);

export default router;