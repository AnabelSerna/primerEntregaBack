// filepath: /Users/anita/Desktop/primerEntrega/dto/ProductDTO.js

export default class ProductDTO {
    constructor(product) {
      this.id = product._id;
      this.name = product.name;
      this.price = product.price;
      this.category = product.category;
    }
  }