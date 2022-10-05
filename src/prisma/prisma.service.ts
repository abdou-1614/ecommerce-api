import {Injectable, INestApplication} from '@nestjs/common'
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
      /** Optional — if you leave it out,
   * Prisma will connect lazily on its first call to the database.
   *
   * https://docs.nestjs.com/recipes/prisma
   */
    // async onModuleInit() {
    //     await this.$connect()
    // }

    async enableShutdownHooks(app: INestApplication) {
        this.$on('beforeExit', async () => {
            app.close()
        })
    }
}