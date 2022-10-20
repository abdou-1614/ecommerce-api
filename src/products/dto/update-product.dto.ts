import { ApiProperty, OmitType } from "@nestjs/swagger";
import { CreateProductsDto } from "./create-product.dto";

export class UpdateProductDto extends OmitType(CreateProductsDto,['image'] as const) {
    @ApiProperty({
        example: '["fa244865-0878-4688-ac63-e3ecf4939a01", "531cd575-956b-49f3-a75e-2e651e21b871"]'
    })
    categories?: string[];
}