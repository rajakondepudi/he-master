import { Injectable } from '@nestjs/common';
import { Hospital } from '../common/entities/hospital.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class HospitalService extends TypeOrmCrudService<Hospital> {
  constructor(@InjectRepository(Hospital) repo) {
    super(repo);
  }
}
