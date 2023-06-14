import { Injectable } from '@nestjs/common';
import { CommonKeys } from '../common/entities/common.keys.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommonKeysService extends TypeOrmCrudService<CommonKeys> {
  constructor(@InjectRepository(CommonKeys) repo: Repository<CommonKeys>) {
    super(repo);
  }
}
