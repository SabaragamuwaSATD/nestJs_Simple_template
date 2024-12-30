import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

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
}
