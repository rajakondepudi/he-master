import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { v4 as uuid } from 'uuid';
import { PinCodeModule } from './modules/pincode/pincode.module';
import { HealthModule } from './shared/health/health.module';
import { LoggerService } from './shared/logger/logger.service';
import Config from './shared/config';
import { HospitalModule } from './modules/hospital/hospital.module';
import { DatabaseModule } from './modules/common/database/database.module';
import { AuthModule } from './modules/common/auth/auth.module';
const logFormat = winston.format.printf((msg) => {
  return `[${msg.timestamp}] [${msg.level}] [expressRequestId=${uuid()}]: ${msg.message}`;
});

@Module({
  imports: [
    ConfigModule.forRoot({
      load: Config,
      isGlobal: true,
      cache: true,
      expandVariables: true,
      envFilePath: ['.env'],
    }),
    DatabaseModule,
    WinstonModule.forRoot({
      transports: [
        new winston.transports.File({
          filename: './logger/error.log',
          level: 'error',
        }),
        new winston.transports.File({
          filename: './logger/combination.log',
          level: 'debug',
          tailable: true,
        }),
        new winston.transports.Console({
          level: 'debug',
        }),
      ],
      format: winston.format.combine(winston.format.timestamp(), logFormat, winston.format.json()),
      levels: {
        info: 0,
        warn: 1,
        debug: 2,
        error: 3,
      },
    }),
    PinCodeModule,
    HospitalModule,
    HealthModule,
    AuthModule,
  ],
  providers: [LoggerService],
})
export class AppModule {}
