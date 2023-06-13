import { Controller, UseGuards, Get, Param } from '@nestjs/common';
import { PinCodeService } from './pincode.service';
import { PinCode } from '../common/entities/pincode.entity';
import { PinCodeDTO } from './dtos/pincode.dto';
import { Crud, CrudRequest, GetManyDefaultResponse, Override, ParsedRequest } from '@nestjsx/crud';
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
  async findPincodeStartsWith(@Param('pincode') pincode: number): Promise<PinCode[]> {
    return this.service.findPincodeStartsWith(pincode);
  }

  @Override('getOneBase')
  async getOne(@ParsedRequest() ParsedRequest:CrudRequest): Promise<PinCode> {
    let data= await this.service.getOne(ParsedRequest);
    let city=data.CITY_ID
    let state=data.CITY_ID['STATE_CODE']
    delete data.CITY_ID
    data['CITY_NAME']=city['CITY_NAME']
    data['STATE_NAME']=state['STATE_NAME']
    
    return data
}

@Override('getManyBase')
async getMany(@ParsedRequest() ParsedRequest): Promise<PinCode[]> {
  let data: PinCode[] | GetManyDefaultResponse<PinCode> = await this.service.getMany(ParsedRequest);
  if(Array.isArray(data)){
    data.forEach((record : PinCode| GetManyDefaultResponse<PinCode>) => {
      let city=record['CITY_ID']
      let state=record['CITY_ID']['STATE_CODE']
      delete record['CITY_ID']
      record['CITY_NAME']=city['CITY_NAME']
      record['STATE_NAME']=state['STATE_NAME']

      return record
  });
    return data
  }else{
    return null
  }
}

}
