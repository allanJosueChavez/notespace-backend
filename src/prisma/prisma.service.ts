import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(config: ConfigService) {
    // super call is meant to call the constructor in order to initialize the class
    super({
      datasources: {
        db: {
          url: config.get<string>('DB_URL'),
        },
      },
    });
    // console.log(config.get<string>('DB_URL'));
  }

  async onModuleInit() {
    await this.$connect();
  }
}
