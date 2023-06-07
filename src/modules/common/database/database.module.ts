import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('db.postgres.host'),
        port: configService.get<number>('db.postgres.port'),
        username: configService.get<string>('db.postgres.username'),
        password: configService.get<string>('db.postgres.password'),
        database: configService.get<string>('db.postgres.name'),
        entities: [join(__dirname, '/../**', '*.entity.{ts,js}')],
        synchronize: false, // should be false at production!
      }),
    }),
  ],
})
export class DatabaseModule {}
