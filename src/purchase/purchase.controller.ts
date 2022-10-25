import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { PurchaseService } from './purchase.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Purchase } from './entities/purchase.entity';
import { FindPurchaseDto } from './dto/find-purchase.dto';
import { isAdmin } from 'src/common/decorators/isAdmin.decorator';

@ApiTags('Purchase')
@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @ApiCreatedResponse({type: Purchase})
  @ApiOperation({summary: 'Creates a new purchase'})
  @ApiBearerAuth()
  @Post()
  async create(@CurrentUser() userId: User['id'], @Body() createPurchase: CreatePurchaseDto): Promise<Purchase> {
      return this.purchaseService.create(userId, createPurchase)
  }

  @ApiOkResponse({type: [Purchase]})
  @ApiOperation({summary: 'Admin Get Purchases'})
  @isAdmin()
  @Get('/admin')
  async find(@Query() find: FindPurchaseDto): Promise<Purchase[]> {
    return this.purchaseService.findPurchase(find)
  }
}
