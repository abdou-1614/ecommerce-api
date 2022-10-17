import { ProductResponse } from './dto/product-response.dto';
import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { isAdmin } from 'src/common/decorators/isAdmin.decorator';
import { CreateProductsDto } from './dto/create-product.dto';
import { Products } from './entities/products.entity';
import { FileToBodyInterceptor } from './interceptors/file.interceptor';
import { ProductsService } from './products.service';

@ApiTags('Product')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({summary: 'Admin Create Product'})
  @ApiOkResponse({
    type: ProductResponse
  })
  @ApiBody({ type: CreateProductsDto })
  @ApiConsumes('multipart/form-data')
  @isAdmin()
  @Post()
  @UseInterceptors(FileInterceptor('image'), FileToBodyInterceptor)
  async createProduct(@Body() CreateProduct: CreateProductsDto): Promise<Products> {
    return this.productsService.CreateProduct(CreateProduct)
  }
}
