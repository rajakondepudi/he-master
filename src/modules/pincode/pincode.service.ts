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

  async findPincodeStartsWith(startsWith: number): Promise<PinCode[]> {
    const entities: any = await this.repo
      .createQueryBuilder('PinCode')
      .leftJoin('PinCode.CITY_ID', 'city')
      .addSelect(['city.CITY_NAME', 'city.CITY_ID'])
      .leftJoin('city.STATE_CODE', 'state')
      .addSelect(['state.STATE_ID', 'state.STATE_CODE', 'state.STATE_NAME'])
      .where('PinCode.PINCODE :: text LIKE :startsWith', { startsWith: `${startsWith}%` })
      .getMany();
    entities.forEach((record) => {
      let city;
      let state;
      if (record.CITY_ID) {
        city = record.CITY_ID;
        if (city.STATE_CODE) {
          state = city.STATE_CODE;
        }
      }
      delete record.CITY_ID;
      record.CITY_NAME = city.CITY_NAME;
      record.STATE_NAME = state.STATE_NAME;
    });
    return entities;
  }
}
