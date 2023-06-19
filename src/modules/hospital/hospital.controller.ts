import { Controller, UseGuards } from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { Hospital } from '../common/entities/hospital.entity';
import { Crud, CrudRequest, Override, ParsedRequest } from '@nestjsx/crud';
import { HospitalDTO } from './dtos/hospital.dto';
import { AuthGuard } from '@nestjs/passport';
@Crud({
  model: {
    type: Hospital,
  },
  dto: {
    create: HospitalDTO,
  },
  params: {
    slug: {
      field: 'HOSPITAL_ID',
      type: 'number',
      primary: true,
    },
  },
  query: {
    allow: [
      'HOSPITAL_NAME',
      'HOSPITAL_TYPE',
      'ADDRESS',
      'LATITUDE',
      'LONGITUDE',
      'EMAILID',
      'WEBSITE',
      'PHONE',
      'FAX',
      'SEQ_NUM',
      'CREATED_BY',
      'CREATED_DATETIME',
      'UPDATED_BY',
      'UPDATED_DATETIME',
      'EFFECTIVE_DATE',
      'EXPIRED_DATE',
      'IS_ACTIVE',
    ],
    alwaysPaginate: true,
    limit: 6,
    join: {
      PINCODE: {
        allow: ['PINCODE', 'CITY_ID'],
        eager: true,
      },
      'PINCODE.CITY_ID': {
        alias: 'city',
        allow: ['CITY_ID', 'CITY_NAME'],
        eager: true,
      },
      'PINCODE.CITY_ID.STATE_CODE': {
        alias: 'state',
        allow: ['STATE_CODE', 'STATE_NAME'],
        eager: true,
      },
    },
  },
})
@Controller('hospitals')
// @UseGuards(AuthGuard())
export class HospitalController {
  constructor(private readonly service: HospitalService) {}

  @Override('getOneBase')
  async getOne(@ParsedRequest() parsedRequest: CrudRequest): Promise<Hospital> {
    const data: any = await this.service.getOne(parsedRequest);
    let pincode;
    let city;
    let state;
    if (data.PINCODE) {
      pincode = data.PINCODE;
      if (pincode.CITY_ID) {
        city = pincode.CITY_ID;
        if (city.STATE_CODE) {
          state = city.STATE_CODE;
        }
        delete data.PINCODE;
      }
    }
    data.PINCODE = pincode.PINCODE;
    data.CITY_NAME = city.CITY_NAME;
    data.STATE_NAME = state.STATE_NAME;
    return data;
  }

  @Override('getManyBase')
  async getMany(@ParsedRequest() parsedRequest): Promise<any[]> {
    const records: any = await this.service.getMany(parsedRequest);
    if (Array.isArray(records.data)) {
      records.data.forEach((record) => {
        let pincode;
        let city;
        let state;
        if (record.PINCODE) {
          pincode = record.PINCODE;
          if (pincode.CITY_ID) {
            city = pincode.CITY_ID;
            if (city.STATE_CODE) {
              state = city.STATE_CODE;
            }
          }
        }
        delete record.PINCODE;
        record.PINCODE = pincode.PINCODE;
        record.CITY_NAME = city.CITY_NAME;
        record.STATE_NAME = state.STATE_NAME;
      });
      return records;
    } else {
      return null;
    }
  }
}
