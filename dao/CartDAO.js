import Cart from './models/Cart.js';

class CartDAO {
  /**
   * Crea un nuevo carrito.
   * @param {Object} cartData - Datos del carrito.
   * @returns {Promise<Object>} - Carrito creado.
   */
  static async createCart(cartData) {
    try {
      const cart = new Cart(cartData);
      return await cart.save();
    } catch (error) {
      console.error('Error creando el carrito:', error);
      throw error;
    }
  }

  /**
   * Obtiene un carrito por su ID.
   * @param {string} cartId - ID del carrito.
   * @returns {Promise<Object>} - Carrito encontrado.
   */
  static async getCartById(cartId) {
    try {
      return await Cart.findById(cartId).populate('products.productId', 'name price stock');
    } catch (error) {
      console.error('Error obteniendo el carrito:', error);
      throw error;
    }
  }

  /**
   * Actualiza un carrito por su ID.
   * @param {string} cartId - ID del carrito.
   * @param {Object} updateData - Datos para actualizar el carrito.
   * @returns {Promise<Object>} - Carrito actualizado.
   */
  static async updateCart(cartId, updateData) {
    try {
      return await Cart.findByIdAndUpdate(cartId, updateData, { new: true });
    } catch (error) {
      console.error('Error actualizando el carrito:', error);
      throw error;
    }
  }

  /**
   * Elimina un carrito por su ID.
   * @param {string} cartId - ID del carrito.
   * @returns {Promise<Object>} - Carrito eliminado.
   */
  static async deleteCart(cartId) {
    try {
      return await Cart.findByIdAndDelete(cartId);
    } catch (error) {
      console.error('Error eliminando el carrito:', error);
      throw error;
    }
  }
}

export default CartDAO;