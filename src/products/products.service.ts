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

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return [product, productIndex];
  }
}
