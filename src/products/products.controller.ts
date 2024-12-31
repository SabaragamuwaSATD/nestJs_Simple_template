import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //add products.............................................................
  @Post('/add')
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
    @Body('weight') prodWeight: number,
    @Body('vendor') prodVendor: string,
  ) {
    const generatedId = this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
      prodWeight,
      prodVendor,
    );
    return { id: generatedId };
  }

  //get all the products....................................................
  @Get('/all')
  getAllProducts() {
    return this.productsService.getProducts();
  }

  //get single product.......................................................
  @Get('/:id')
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getSingleProduct(prodId);
  }

  //update products..........................................................
  @Patch('/:id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
    @Body('weight') prodWeight: number,
    @Body('vendor') prodVendor: string,
  ) {
    this.productsService.updateProduct(
      prodId,
      prodTitle,
      prodDesc,
      prodPrice,
      prodWeight,
      prodVendor,
    );
    return null;
  }

  @Delete('/:id')
  removeProduct(@Param('id') prodId: string) {
    this.productsService.deleteProduct(prodId);
    return null;
  }
}
