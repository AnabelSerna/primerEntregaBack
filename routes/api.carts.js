import express from 'express';
import { finalizePurchase } from '../controllers/cartController.js';
import { authenticateToken } from '../middlewares/auth.js';

const router = express.Router();

router.post('/:id/purchase', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ error: 'ID del carrito es requerido' });
    }

    const result = await finalizePurchase(req);

    res.status(200).send({ message: 'Compra finalizada exitosamente', result });
  } catch (error) {
    console.error('Error finalizando la compra:', error);
    res.status(500).send({ error: 'Error interno del servidor' });
  }
});

export default router;