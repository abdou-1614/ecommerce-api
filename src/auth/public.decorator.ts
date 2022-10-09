import { CustomDecorator, SetMetadata } from "@nestjs/common/decorators/core/set-metadata.decorator";

export const IS_PUBLIC = 'isPublic'

export const Public = (): CustomDecorator => SetMetadata(IS_PUBLIC, true)