import { Injectable } from '@nestjs/common';
import { PinCode } from '../common/entities/pincode.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PinCodeService extends TypeOrmCrudService<PinCode> {
  constructor(@InjectRepository(PinCode) repo: Repository<PinCode>) {
    super(repo);
  }
}
