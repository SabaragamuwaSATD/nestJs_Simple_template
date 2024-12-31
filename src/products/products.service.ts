import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  // add product.............................................................
  insertProduct(
    title: string,
    desc: string,
    price: number,
    weight: number,
    vendor: string,
  ) {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, desc, price, weight, vendor);
    this.products.push(newProduct);
    return prodId;
  }

  //get all the products....................................................
  getProducts() {
    return [...this.products];
  }

  //get single product.......................................................
  getSingleProduct(productId: string) {
    const product = this.findProduct(productId)[0];
    return { ...product };
  }

  updateProduct(
    productId: string,
    title: string,
    desc: string,
    price: number,
    weight: number,
    vendor: string,
  ) {
    const [product, index] = this.findProduct(productId);
    const updatedProduct = { ...product };
    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.description = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }
    if (weight) {
      updatedProduct.weight = weight;
    }
    if (vendor) {
      updatedProduct.vendor = vendor;
    }
    this.products[index] = updatedProduct;
  }

  deleteProduct(prodId: string) {
    const index = this.findProduct(prodId)[1];
    this.products.splice(index, 1);
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return [product, productIndex];
  }
}
