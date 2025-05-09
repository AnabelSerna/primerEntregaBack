import CartDAO from '../dao/CartDAO.js';
import ProductDAO from '../dao/ProductDAO.js';

class CartRepository {
  async getCartById(cartId) {
    return await CartDAO.getCartById(cartId);
  }

  async addProductToCart(cartId, productId, quantity) {
    const cart = await CartDAO.getCartById(cartId);
    if (!cart) {
      throw new Error('Carrito no encontrado');
    }

    const product = await ProductDAO.getProductById(productId);
    if (!product) {
      throw new Error('Producto no encontrado');
    }

    if (product.stock < quantity) {
      throw new Error('Stock insuficiente');
    }

    // Agregar el producto al carrito
    const existingProduct = cart.products.find(
      (item) => item.productId.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    await CartDAO.updateCart(cartId, { products: cart.products });
    return cart;
  }

  async finalizePurchase(cartId, userId) {
    const cart = await CartDAO.getCartById(cartId);
    if (!cart) {
      throw new Error('Carrito no encontrado');
    }

    const productsNotProcessed = [];
    let totalAmount = 0;

    for (const item of cart.products) {
      const product = await ProductDAO.getProductById(item.productId);

      if (product.stock >= item.quantity) {
        product.stock -= item.quantity;
        await ProductDAO.updateProduct(product.id, { stock: product.stock });
        totalAmount += product.price * item.quantity;
      } else {
        productsNotProcessed.push(item.productId);
      }
    }

    cart.products = cart.products.filter((item) =>
      productsNotProcessed.includes(item.productId)
    );
    await CartDAO.updateCart(cartId, { products: cart.products });

    return { totalAmount, productsNotProcessed };
  }
}

export default new CartRepository();