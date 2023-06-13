import { Controller } from '@nestjs/common';
import { CommonKeysService } from './common.keys.service';
import { CommonKeys } from '../common/entities/common.keys.entity';
import { CommonKeysDTO } from './dtos/common.keys.dto';
import { Crud } from '@nestjsx/crud';

@Crud({
  model: { type: CommonKeys },
  dto: { create: CommonKeysDTO },
  params: {
    slug: {
      field: 'KEY_ID',
      type: 'number',
      primary: true,
    },
  },
})
@Controller('common-keysets')
export class CommonKeysController {
  constructor(private readonly service: CommonKeysService) {}
}
