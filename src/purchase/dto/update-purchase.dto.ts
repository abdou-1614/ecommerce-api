import { CreatePurchaseDto } from './create-purchase.dto';
import {  PartialType } from '@nestjs/swagger';
export class UpdatePurchaseDto extends PartialType(CreatePurchaseDto) {}