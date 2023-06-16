import { Controller, UseGuards } from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { Hospital } from '../common/entities/hospital.entity';
import { Crud } from '@nestjsx/crud';
import { HospitalDTO } from './dtos/hospital.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Hospital')
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
})
@Controller('hospitals')
// @UseGuards(AuthGuard())
// @ApiBearerAuth('JWT-auth')  // Authetication for Swagger
export class HospitalController {
  constructor(private readonly service: HospitalService) {}
}
