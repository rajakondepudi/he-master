import { Controller, UseGuards, Get, Param } from '@nestjs/common';
import { PinCodeService } from './pincode.service';
import { PinCode } from '../common/entities/pincode.entity';
import { PinCodeDTO } from './dtos/pincode.dto';
import { Crud } from '@nestjsx/crud';
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
export class PinCodeController {
  constructor(private readonly service: PinCodeService) {}

  @Get('start/:pincode')
  async findByNumericFieldStartsWith(@Param('pincode') pincode: number): Promise<PinCode[]> {
    return this.service.findByNumericFieldStartsWith(pincode);
  }
}
