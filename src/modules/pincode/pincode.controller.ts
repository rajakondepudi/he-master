import { Controller, UseGuards, Get, Param } from '@nestjs/common';
import { PinCodeService } from './pincode.service';
import { PinCode } from '../common/entities/pincode.entity';
import { PinCodeDTO } from './dtos/pincode.dto';
import { Crud, CrudRequest, Override, ParsedRequest } from '@nestjsx/crud';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('PinCode')
@Crud({
  model: { type: PinCode },
  dto: { create: PinCodeDTO },
  params: {
    slug: {
      field: 'PINCODE',
      type: 'number',
      primary: true,
    },
  },
  query: {
    join: {
      CITY_ID: {
        alias: 'city',
        allow: ['CITY_ID', 'CITY_NAME'],
        eager: true,
      },
      'CITY_ID.STATE_CODE': {
        alias: 'state',
        allow: ['STATE_CODE', 'STATE_NAME'],
        eager: true,
      },
    },
  },
})
@Controller('pincodes')
// @UseGuards(AuthGuard())
// @ApiBearerAuth('JWT-auth')   // Authetication for Swagger
export class PinCodeController {
  constructor(private readonly service: PinCodeService) {}

  @Get('start/:pincode')
  async findPincodeStartsWith(@Param('pincode') pincode: number): Promise<PinCode[]> {
    return this.service.findPincodeStartsWith(pincode);
  }

  @Override('getOneBase')
  async getOne(@ParsedRequest() ParsedRequest: CrudRequest): Promise<PinCode> {
    const data: any = await this.service.getOne(ParsedRequest);
    let city;
    let state;
    if (data.CITY_ID) {
      city = data.CITY_ID;
      if (city.STATE_CODE) {
        state = city.STATE_CODE;
      }
      delete data.CITY_ID;
    }
    data.CITY_NAME = city.CITY_NAME;
    data.STATE_NAME = state.STATE_NAME;
    return data;
  }

  @Override('getManyBase')
  async getMany(@ParsedRequest() ParsedRequest): Promise<any[]> {
    const data: any = await this.service.getMany(ParsedRequest);
    if (Array.isArray(data)) {
      data.forEach((record) => {
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
      return data;
    } else {
      return null;
    }
  }
}
