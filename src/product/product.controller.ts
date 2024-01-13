import { Req, Body, Controller, Post, Get, Res, HttpStatus, UseGuards, Put, Param, Delete } from '@nestjs/common'
import { ProductService } from './product.service'
import { Response, Request } from 'express'
import { CreateProductDto } from './productDto/create_product_dto'
import { AuthGuard } from 'src/utils/auth.guard'
import { RoleGuard } from 'src/utils/role.guard'
import { Product } from '@prisma/client'

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard)
  @UseGuards(RoleGuard)
  @Post()
  public async createProduct(
    @Req() req: Request,
    @Body() product: CreateProductDto,
    @Res() res: Response,
  ): Promise<object> {
    try {
      product.userId = req['user'].Id
      const _product = await this.productService.add(product)
      return res.status(HttpStatus.CREATED).json({
        status: 'success',
        product: _product,
      })
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        error: error.message,
      })
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  public async getAllProducts(@Res() res: Response): Promise<object> {
    try {
      const products = await this.productService.getAll()
      return res.status(HttpStatus.ACCEPTED).json({
        message: 'success',
        products: products,
      })
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        error: error.message,
      })
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @UseGuards(RoleGuard)
  public async updateProduct(@Param('id') id:string, @Body() data: object, @Res() res: Response): Promise<object> {
    try {
      console.log("id:",typeof(id));
      const numericId = Number(id);
      const _updatedProduct = await this.productService.update(numericId,data);
      console.log("_updatedProduct:",_updatedProduct);
      return res.status(HttpStatus.ACCEPTED).json({
        message: 'success',
        products: _updatedProduct,
      })
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        error: error.message,
      })
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @UseGuards(RoleGuard)
  public async removeProduct(@Param('id') id:string,@Res() res: Response){
    try {
      const numericId = Number(id);
      const _deleteProduct = await this.productService.delete(numericId);
      return res.status(HttpStatus.ACCEPTED).json({
        message: 'success product deleted',
      })
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        error: error.message,
      })
    }
  }
}
