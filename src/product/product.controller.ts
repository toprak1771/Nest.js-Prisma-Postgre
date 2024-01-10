import { Body, Controller, Post, Res, HttpStatus,UseGuards } from '@nestjs/common'
import { ProductService } from './product.service'
import { Response } from 'express'
import { CreateProductDto } from './productDto/create_product_dto';
import { AuthGuard } from 'src/utils/auth.guard';
import { RoleGuard } from 'src/utils/role.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard)
  @UseGuards(RoleGuard)
  @Post()
  public async createProduct(@Body() product:CreateProductDto, @Res() res:Response):Promise<any> {
     try {
        console.log("product:",product);
        product.userId = 5;
        const _product = await this.productService.add(product);
        return res.status(HttpStatus.CREATED).json({
            status: 'success',
            product:_product,
          })
     } catch (error) {
        return res.status(HttpStatus.BAD_REQUEST).json({
            status: 'error',
            error: error.message,
          })
     }
  }
}
