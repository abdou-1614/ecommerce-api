import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { PurchaseService } from './purchase.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Purchase } from './entities/purchase.entity';

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
}
