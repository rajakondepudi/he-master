import { Module } from '@nestjs/common';
import { HospitalController } from './hospital.controller';
import { HospitalService } from './hospital.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hospital } from '../common/entities/hospital.entity';
import { AuthModule } from '../common/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [AuthModule, PassportModule, TypeOrmModule.forFeature([Hospital])],
  controllers: [HospitalController],
  providers: [HospitalService],
})
export class HospitalModule {}
