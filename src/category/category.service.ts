import { PrismaService } from './../prisma/prisma.service';
import {Injectable} from '@nestjs/common'

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) {}
}