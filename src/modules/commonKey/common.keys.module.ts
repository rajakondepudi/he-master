import { Module } from '@nestjs/common';
import { CommonKeysController } from './common.keys.controller';
import { CommonKeysService } from './common.keys.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonKeys } from '../common/entities/common.keys.entity';
import { AuthModule } from '../common/auth/auth.module';
@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([CommonKeys])],
  controllers: [CommonKeysController],
  providers: [CommonKeysService],
})
export class CommonKeysModule {}
