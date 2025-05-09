import Product from './models/Product.js';

class ProductDAO {
  /**
   * Crea un nuevo producto.
   * @param {Object} productData - Datos del producto.
   * @returns {Promise<Object>} - Producto creado.
   */
  async createProduct(productData) {
    try {
      const product = new Product(productData);
      return await product.save();
    } catch (error) {
      console.error('Error creando el producto:', error.message);
      throw new Error('No se pudo crear el producto');
    }
  }

  /**
   * Obtiene un producto por su ID.
   * @param {string} productId - ID del producto.
   * @returns {Promise<Object>} - Producto encontrado.
   */
  async getProductById(productId) {
    try {
      return await Product.findById(productId);
    } catch (error) {
      console.error('Error obteniendo el producto:', error.message);
      throw new Error('No se pudo obtener el producto');
    }
  }

  /**
   * Obtiene todos los productos.
   * @returns {Promise<Array>} - Lista de productos.
   */
  async getAllProducts() {
    try {
      return await Product.find();
    } catch (error) {
      console.error('Error obteniendo los productos:', error.message);
      throw new Error('No se pudo obtener la lista de productos');
    }
  }

  /**
   * Actualiza un producto por su ID.
   * @param {string} productId - ID del producto.
   * @param {Object} updateData - Datos para actualizar el producto.
   * @returns {Promise<Object>} - Producto actualizado.
   */
  async updateProduct(productId, updateData) {
    try {
      return await Product.findByIdAndUpdate(productId, updateData, { new: true });
    } catch (error) {
      console.error('Error actualizando el producto:', error.message);
      throw new Error('No se pudo actualizar el producto');
    }
  }

  /**
   * Elimina un producto por su ID.
   * @param {string} productId - ID del producto.
   * @returns {Promise<Object>} - Producto eliminado.
   */
  async deleteProduct(productId) {
    try {
      return await Product.findByIdAndDelete(productId);
    } catch (error) {
      console.error('Error eliminando el producto:', error.message);
      throw new Error('No se pudo eliminar el producto');
    }
  }

  /**
   * Verifica si hay suficiente stock para un producto.
   * @param {string} productId - ID del producto.
   * @param {number} quantity - Cantidad requerida.
   * @returns {Promise<boolean>} - `true` si hay suficiente stock, `false` en caso contrario.
   */
  async checkStock(productId, quantity) {
    try {
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error(`Producto con ID ${productId} no encontrado`);
      }

      return product.stock >= quantity;
    } catch (error) {
      console.error('Error verificando stock del producto:', error.message);
      throw new Error('No se pudo verificar el stock del producto');
    }
  }
}

export default new ProductDAO();