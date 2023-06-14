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
        host: '127.0.0.1',
        port: 5432,
        username: 'postgres',
        password: 'admin',
        database: 'postgres',
        entities: [join(__dirname, '/../**', '*.entity.{ts,js}')],
        synchronize: false, // should be false at production!
      }),
    }),
  ],
})
export class TestDatabaseModule {}
