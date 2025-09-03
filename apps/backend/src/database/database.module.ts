import { Module } from '@nestjs/common';
import { DATABASE_CONNECTION } from './constants';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isMigrating =
          configService.get<string>('DB_MIGRATING') === 'true';
        const isSeeding = configService.get<string>('DB_SEEDING') === 'true';

        const pool = new Pool({
          host: configService.get<string>('DATABASE_HOST'),
          port: configService.get<number>('DATABASE_PORT'),
          user: configService.get<string>('DATABASE_USER'),
          password: configService.get<string>('DATABASE_PASSWORD'),
          database: configService.get<string>('DATABASE_NAME'),
          max: isMigrating || isSeeding ? 1 : 10,
        });

        return drizzle(pool, {
          schema,
        });
      },
    },
  ],
  exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}
