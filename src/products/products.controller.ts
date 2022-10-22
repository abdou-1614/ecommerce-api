import { UpdateProductimage } from './dto/update-image.dto';
import { FindProductDto } from './dto/find-product.dto';
import { ProductResponse } from './dto/product-response.dto';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { isAdmin } from 'src/common/decorators/isAdmin.decorator';
import { CreateProductsDto } from './dto/create-product.dto';
import { Products } from './entities/products.entity';
import { FileToBodyInterceptor } from './interceptors/file.interceptor';
import { ProductsService } from './products.service';
import { Public } from 'src/auth/public.decorator';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileUpload } from 'src/common/decorators/file-upload.decorator';

@ApiTags('Product')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({summary: 'Admin Create Product'})
  @ApiCreatedResponse({
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


  @ApiOkResponse({type: ProductResponse})
  @ApiOperation({summary: 'Returns All Products', description: `Returns all products with pagination,      
  Default is starting on page 1 showing 10 results per page,
  searching and ordering by name`})
  @Public()
  @Get()
  async getProducts(@Query() findAllProductDto: FindProductDto): Promise<Products[]> {
    return this.productsService.findAllProduct(findAllProductDto)
  }

  @ApiOkResponse({type: ProductResponse})
  @ApiOperation({summary: 'Gets Products by Id For Admin', description: 'Find product by ID, only for admins'})
  @Get('/id/:id')
  @isAdmin()
  async getSingleProduct(@Param('id') id: string): Promise<Products>{
    return this.productsService.findProduct(id)
  }
  @ApiOkResponse({type: ProductResponse})
  @ApiOperation({summary: 'Gets Products By UrlName', description: 'Find By UrlName'})
  @Public()
  @Get(':urlName')
  async findByUrlName(@Param('urlName') urlName: string): Promise<Products>{
    return this.productsService.findProductByUrlName(urlName)
  }

  @ApiOkResponse({type: ProductResponse})
  @ApiOperation({summary: 'Update Products Only For Admin'})
  @isAdmin()
  @Patch('update')
  async updateProduct(@Param('id') id: string, @Body() updateProduct: UpdateProductDto): Promise<Products>{
    return this.productsService.updateProduct(id, updateProduct)
  }

  @ApiOkResponse({type: ProductResponse})
  @ApiOperation({summary: 'Admin Can Update Product Image'})
  @FileUpload()
  @isAdmin()
  @Patch('image/:id')
  async updateImage(@Param('id') id: string, @Body() updateImage: UpdateProductimage) {
    return this.productsService.updateImage(id, updateImage)
  }
  @ApiOperation({summary: 'Admin Delete Products'})
  @isAdmin()
  @Delete('/:id')
  async deleteProduct(@Param('id') id: string){
     return this.productsService.deleteProduct(id)
  }

}
