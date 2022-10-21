import { CreateProductsDto } from './create-product.dto';
import { PickType } from "@nestjs/swagger";

export class UpdateProductimage extends PickType(CreateProductsDto, ['image'] as const) {}