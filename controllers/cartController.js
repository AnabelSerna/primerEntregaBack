import Ticket from '../dao/models/Ticket.js';
import CartRepository from '../repositories/CartRepository.js';

export const finalizePurchase = async (req, res) => {
  try {
    const { cid } = req.params;
    const userId = req.user._id;

    const { totalAmount, productsNotProcessed } = await CartRepository.finalizePurchase(cid, userId);

    const ticket = await Ticket.create({
      code: `TICKET-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      purchase_datetime: new Date(),
      amount: totalAmount,
      purchaser: req.user.email,
    });

    res.status(200).send({ ticket, productsNotProcessed });
  } catch (error) {
    console.error('Error finalizando la compra:', error);
    res.status(500).send({ error: 'Error interno del servidor' });
  }
};