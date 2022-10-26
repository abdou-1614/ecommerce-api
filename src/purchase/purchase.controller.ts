import { ReviewDto } from './dto/review-purchase.dto';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { Body, Controller, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { PurchaseService } from './purchase.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Purchase } from './entities/purchase.entity';
import { FindPurchaseDto } from './dto/find-purchase.dto';
import { isAdmin } from 'src/common/decorators/isAdmin.decorator';
import { Request } from 'express';

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

  @ApiOkResponse({type: [Purchase]})
  @ApiOperation({summary: 'User Can Get All Her Purchases'})
  @ApiBearerAuth()
  @Get()
  async findAllMine(@CurrentUser() userId: User['id'], @Query() findPurchase: FindPurchaseDto): Promise<Purchase[]> {
    findPurchase.userId = userId
    return this.purchaseService.findPurchase(findPurchase)
  }

  @ApiOkResponse({type: Purchase})
  @ApiOperation({summary: 'Returns purchase by ID'})
  @ApiBearerAuth()
  @Get(':id')
  async findOne(@Req() request: Request, @Param('id') purchaseId: string): Promise<Purchase> {
    const {userId, userRole} = request.user as {
      userId: string,
      userRole: string
    }

    return this.purchaseService.findOne(purchaseId, userId, userRole)
  }

  @ApiOkResponse({type: Purchase})
  @ApiOperation({summary: 'Review Product'})
  @ApiBearerAuth()
  @Patch('/review/:id')
  async review(@CurrentUser() userId: User['id'], @Param('id') purchaseId: string, @Body() reviewDto: ReviewDto): Promise<Purchase> {
      return this.purchaseService.review(purchaseId, userId, reviewDto)
  }
}
