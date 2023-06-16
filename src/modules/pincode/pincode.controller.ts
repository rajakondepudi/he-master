import { Controller, UseGuards } from '@nestjs/common';
import { PinCodeService } from './pincode.service';
import { PinCode } from '../common/entities/pincode.entity';
import { PinCodeDTO } from './dtos/pincode.dto';
import { Crud } from '@nestjsx/crud';
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
})
@Controller('pincodes')
// @UseGuards(AuthGuard())
// @ApiBearerAuth('JWT-auth')   // Authetication for Swagger
export class PinCodeController {
  constructor(private readonly service: PinCodeService) {}
}
